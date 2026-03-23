import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { session_id, event_type, source, referrer_code, gouvernorat } = await req.json();

    // The shared client is already initialized
    if (!supabase) {
      console.warn('Supabase not configured, skipping tracking log.');
      return NextResponse.json({ success: true, warning: 'mocked' });
    }

    const { error } = await supabase
      .from('page_events')
      .insert([
        { session_id, event_type, source, referrer_code, gouvernorat }
      ]);

    if(error) {
      console.error('Tracking error:', error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
