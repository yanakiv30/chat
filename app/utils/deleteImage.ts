

import { supabase } from "../_services/supabase";

const deleteImage = async (filePath: string): Promise<boolean> => {
  const { error } = await supabase.storage
    .from("images")
    .remove([filePath]);

  if (error) {
    console.error("Error deleting image:", error);
    return false;
  }

  return true;
};

export default deleteImage;
