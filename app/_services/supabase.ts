import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing Supabase URL or service role key");
}
const supabase = createClient<Database>(supabaseUrl, supabaseServiceRoleKey);

export { supabase };
