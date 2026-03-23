import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const isAuth = cookieStore.get('sunexa_dash_auth')?.value === '1';
  if (!isAuth) return new NextResponse('Unauthorized', { status: 401 });

  const { searchParams } = new URL(req.url);
  const source = searchParams.get('source');
  const gov = searchParams.get('gouvernorat');
  const statut = searchParams.get('statut');
  const search = searchParams.get('search');

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) { return new NextResponse('Missing DB Config', { status: 500 }) }

    const supabase = createClient(supabaseUrl, supabaseKey);

    let query = supabase.from('leads').select('*').order('created_at', { ascending: false });

    if (source && source !== 'All') query = query.eq('source_campaign', source);
    if (gov && gov !== 'All') query = query.eq('gouvernorat', gov);
    if (statut && statut !== 'All') query = query.eq('statut', statut);
    if (search) {
      query = query.or(`nom.ilike.%${search}%,telephone.ilike.%${search}%`);
    }

    const { data: leads, error } = await query;
    if (error) throw error;

    if (!leads || leads.length === 0) {
      return new NextResponse('Aucun lead trouvé', { status: 404 });
    }

    const csvRows = [];
    // Headers
    const headers = ['Date', 'Nom', 'Téléphone', 'Gouvernorat', 'Consommation', 'Type Projet', 'Source', 'Statut', 'Notes'];
    csvRows.push(headers.join(','));

    // Data rows
    for (const lead of leads) {
      const values = [
        new Date(lead.created_at).toLocaleDateString('fr-TN'),
        `"${lead.nom}"`,
        lead.telephone,
        lead.gouvernorat,
        lead.conso_kwh_mois || '',
        lead.type_projet || '',
        lead.source_campaign || 'direct',
        lead.statut,
        `"${lead.notes || ''}"`
      ];
      csvRows.push(values.join(','));
    }

    const csvContent = csvRows.join('\n');
    const filename = `sunexa-leads-${new Date().toISOString().split('T')[0]}.csv`;

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });

  } catch (error) {
    return new NextResponse('Erreur Serveur', { status: 500 });
  }
}
