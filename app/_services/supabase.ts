import { createClient } from "@supabase/supabase-js";
 const SUPABASE_URL = process.env.SUPABASE_URL;
 const SUPABASE_KEY = process.env.SUPABASE_KEY;
console.log("sup-url = ",SUPABASE_URL," sup-key = ",SUPABASE_KEY)
if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Supabase URL and Key must be defined");
}
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);



// import { createClient } from "@supabase/supabase-js";
// const supabaseUrl = "https://cpkaumakwusyxhmexnqr.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwa2F1bWFrd3VzeXhobWV4bnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MzczOTIsImV4cCI6MjAzMDExMzM5Mn0.cwXTdTJ4wlGUZZM59RhWvooam2EiV0S9xfKu8SS7Z2g";
// export const supabase = createClient(supabaseUrl, supabaseKey);


