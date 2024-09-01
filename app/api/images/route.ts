

import { supabase } from "@/app/_services/supabase";

export const deleteImage = async (filePath: string): Promise<boolean> => {
  const { error } = await supabase.storage
    .from("images")
    .remove([filePath]);

  if (error) {
    console.error("Error deleting image:", error);
    return false;
  }

  return true;
};

export const getImageUrl = (path: string): string | null => {
  const { data } = supabase.storage
    .from('images')
    .getPublicUrl(path);

  return data?.publicUrl ?? null;
};

export const uploadImage = async (file: File): Promise<string | undefined> => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const fileName = `public/${uniqueSuffix}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("images") 
    .upload(fileName, file);

  if (error) {
    console.error("Error uploading image:", error);
    return undefined;
  }

  return data?.path;
};
