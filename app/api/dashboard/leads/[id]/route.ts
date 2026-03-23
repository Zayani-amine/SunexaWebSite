import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const isAuth = cookieStore.get('sunexa_dash_auth')?.value === '1';
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { statut, notes } = body;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ success: true, warning: 'mocked' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const updateData: any = {};
    if (statut !== undefined) updateData.statut = statut;
    if (notes !== undefined) updateData.notes = notes;

    const { data, error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Lead update error', error);
    return NextResponse.json({ error: 'Erreur Serveur' }, { status: 500 });
  }
}
