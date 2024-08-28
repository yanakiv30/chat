// app/api/messages/route.ts

import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    const { data, error } = await supabase
      .from("messages")
      .select()
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Team Messages could not be loaded" }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in getMessages:', error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    const newGroupMessageObject = await request.json();
    const { data, error } = await supabase
      .from("messages")
      .insert(newGroupMessageObject)
      .select();

    if (error) {
      return NextResponse.json({ error: "Message could not be created: " + error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in createMessage:', error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    const { id, message } = await request.json();
    const { data, error } = await supabase
      .from("messages")
      .update({ message })
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json({ error: "Message could not be edited: " + error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in updateMessage:', error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    const { id } = await request.json();
    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: "Message could not be deleted: " + error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error('Error in deleteMessage:', error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}