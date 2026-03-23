import { createClient } from '@supabase/supabase-js';

const getSupabaseConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return { url, anon, service };
};

/**
 * Standard Supabase client for client-side or basic server-side use.
 */
export const supabase = (() => {
  const { url, anon } = getSupabaseConfig();
  if (!url || !anon) return null as any;
  return createClient(url, anon);
})();

/**
 * Admin client for server-side operations.
 */
export const supabaseAdmin = (() => {
  const { url, anon, service } = getSupabaseConfig();
  if (!url) return null as any;
  return createClient(url, service || anon || '');
})();

