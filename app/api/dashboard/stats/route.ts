import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  const cookieStore = await cookies();
  const isAuth = cookieStore.get('sunexa_dash_auth')?.value === '1';
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const supabase = supabaseAdmin;

    // Get total leads
    const { count: totalLeads } = await supabase.from('leads').select('*', { count: 'exact', head: true });
    
    // Get leads today
    const { count: todayLeads } = await supabase.from('leads').select('*', { count: 'exact', head: true })
      .gte('created_at', new Date(new Date().setHours(0,0,0,0)).toISOString());

    // Get stats for conversion
    const { count: totalEvents } = await supabase.from('page_events').select('*', { count: 'exact', head: true }).eq('event_type', 'visit');
    const conversionRate = totalEvents ? ((totalLeads || 0) / totalEvents) * 100 : 0;

    return NextResponse.json({
      total: totalLeads || 0,
      today: todayLeads || 0,
      conversion: conversionRate.toFixed(2),
      revenue_potential: (totalLeads || 0) * 8000
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur Serveur' }, { status: 500 });
  }
}
