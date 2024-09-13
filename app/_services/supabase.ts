// import { createClient, SupabaseClient } from "@supabase/supabase-js";

// const supabaseUrl =
//   process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;

// let supabase: SupabaseClient;

// if (typeof window === "undefined") {
//   const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

//   if (!supabaseUrl || !supabaseServiceRoleKey) {
//     throw new Error("Missing Supabase URL or service role key");
//   }
//   supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
// } else {
//   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//   if (!supabaseUrl || !supabaseAnonKey) {
//     throw new Error("Missing Supabase URL or anon key");
//   }
//   supabase = createClient(supabaseUrl, supabaseAnonKey);
// }

// export { supabase };

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;

let supabase: SupabaseClient;

const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing Supabase URL or service role key");
}
supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export { supabase };
