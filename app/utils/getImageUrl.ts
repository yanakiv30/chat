//import supabase from "../services/supabase";

import { supabase } from "../_services/supabase";

const getImageUrl = (path: string): string | null => {
  const { data} = supabase.storage
    .from('images')  
    .getPublicUrl(path); 

  return data?.publicUrl ?? null;  
};

export default getImageUrl;

