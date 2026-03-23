import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nom, telephone, gouvernorat, conso_kwh_mois, type_projet, source_campaign, referrer_code, comment_connu } = body;

    const supabase = supabaseAdmin;
    if (!supabase) {
      console.warn('Supabase not configured, mocking lead creation.');
      return NextResponse.json({ id: 'mock-' + Date.now() });
    }
    console.log('Attempting to insert lead:', { nom, telephone, source_campaign });

    const { data: leadData, error: leadError } = await supabase
      .from('leads')
      .insert([{
        nom, telephone, gouvernorat, conso_kwh_mois, type_projet, source_campaign, referrer_code, comment_connu
      }])
      .select('id')
      .single();

    if (leadError) {
      console.error('Lead insertion error:', leadError);
      return NextResponse.json({ 
        error: 'Erreur Supabase', 
        details: leadError.message,
        code: leadError.code 
      }, { status: 500 });
    }

    // Handle Referral logic
    if (referrer_code && leadData) {
      const { error: refError } = await supabase
        .from('referrals')
        .insert([{
          referrer_telephone: referrer_code,
          referrer_nom: 'Utilisateur inconnu',
          referred_lead_id: leadData.id,
          reward_status: 'en_attente'
        }]);
      if (refError) console.error('Referral insertion error:', refError);
    }

    return NextResponse.json({ id: leadData.id });
  } catch (error: any) {
    console.error('Lead submission crash:', error);
    return NextResponse.json({ 
      error: 'Erreur Serveur', 
      details: error.message || 'Unknown error'
    }, { status: 500 });
  }
}

