import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;

console.log('Supabase URL:', supabaseUrl);

let supabase: SupabaseClient;

if (typeof window === 'undefined') {
  // Server-side
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  console.log('Service Role Key:', supabaseServiceRoleKey ? 'Set' : 'Not set');
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing Supabase URL or service role key');
  }
  supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
} else {
  // Client-side
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  console.log('Anon Key:', supabaseAnonKey ? 'Set' : 'Not set');
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anon key');
  }
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };