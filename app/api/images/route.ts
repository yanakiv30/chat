// app/api/images/route.ts

import { deleteImage, getImageUrl, uploadImage } from '@/apiUtils/apiImages';
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  
  if (!path) {
    return NextResponse.json({ error: 'Path is required' }, { status: 400 });
  }

  const url = getImageUrl(path);
  
  if (!url) {
    return NextResponse.json({ error: 'Failed to get image URL' }, { status: 404 });
  }

  return NextResponse.json({ url });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const path = await uploadImage(file);

  if (!path) {
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }

  return NextResponse.json({ path });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('path');

  if (!filePath) {
    return NextResponse.json({ error: 'File path is required' }, { status: 400 });
  }

  const success = await deleteImage(filePath);

  if (!success) {
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Image deleted successfully' });
}