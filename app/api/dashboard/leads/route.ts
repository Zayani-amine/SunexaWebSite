import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const isAuth = cookieStore.get('sunexa_dash_auth')?.value === '1';
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const source = searchParams.get('source');
  const gov = searchParams.get('gouvernorat');
  const statut = searchParams.get('statut');
  const search = searchParams.get('search');

  try {
    const supabase = supabaseAdmin;
    if (!supabase) return NextResponse.json({ leads: [] });

    let query = supabase.from('leads').select('*').order('created_at', { ascending: false });

    if (source && source !== 'All') query = query.eq('source_campaign', source);
    if (gov && gov !== 'All') query = query.eq('gouvernorat', gov);
    if (statut && statut !== 'All') query = query.eq('statut', statut);
    if (search) {
      query = query.or(`nom.ilike.%${search}%,telephone.ilike.%${search}%`);
    }

    const { data: leads, error } = await query;
    if (error) throw error;

    return NextResponse.json({ leads });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur Serveur' }, { status: 500 });
  }
}
