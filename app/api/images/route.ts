import { NextResponse } from "next/server";
import { supabase } from "@/app/_services/supabase";

const deleteImage = async (filePath: string): Promise<boolean> => {
  const { error } = await supabase.storage.from("images").remove([filePath]);

  if (error) {
    console.error("Error deleting image:", error);
    return false;
  }
  return true;
};

const getImageUrl = (path: string): string | null => {
  const { data } = supabase.storage.from("images").getPublicUrl(path);

  return data?.publicUrl ?? null;
};

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "Path is required" }, { status: 400 });
  }

  const url = getImageUrl(path);

  if (!url) {
    return NextResponse.json(
      { error: "Failed to get image URL" },
      { status: 404 }
    );
  }

  return NextResponse.json({ url });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const path = await uploadImage(file);

  if (!path) {
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }

  return NextResponse.json({ path });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get("path");

  if (!filePath) {
    return NextResponse.json(
      { error: "File path is required" },
      { status: 400 }
    );
  }

  const success = await deleteImage(filePath);

  if (!success) {
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Image deleted successfully" });
}
