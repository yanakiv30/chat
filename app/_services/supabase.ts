import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cpkaumakwusyxhmexnqr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwa2F1bWFrd3VzeXhobWV4bnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MzczOTIsImV4cCI6MjAzMDExMzM5Mn0.cwXTdTJ4wlGUZZM59RhWvooam2EiV0S9xfKu8SS7Z2g";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
