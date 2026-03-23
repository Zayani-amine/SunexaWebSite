import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nom, telephone, gouvernorat, conso_kwh_mois, type_projet, source_campaign, referrer_code, comment_connu } = body;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // We use service role key for inserting leads if possible, else standard anon key + RLS
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase not configured, mocking lead creation.');
      return NextResponse.json({ id: 'mock-12345678-uuid' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert lead
    const { data: leadData, error: leadError } = await supabase
      .from('leads')
      .insert([{
        nom, telephone, gouvernorat, conso_kwh_mois, type_projet, source_campaign, referrer_code, comment_connu
      }])
      .select('id')
      .single();

    if (leadError) throw leadError;

    // Handle Referral logic
    if (referrer_code && leadData) {
      await supabase
        .from('referrals')
        .insert([{
          referrer_telephone: referrer_code,
          referrer_nom: 'Utilisateur inconnu', // We'd ideally look this up
          referred_lead_id: leadData.id,
          reward_status: 'en_attente'
        }]);
    }

    return NextResponse.json({ id: leadData.id });
  } catch (error: any) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
