import supabase from "../services/supabase";

const uploadImage = async (file: File): Promise<string | undefined> => {
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

export default uploadImage;
