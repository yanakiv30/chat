

import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";
import { getUserIdFromAuth } from "@/app/utils/getUserIdFromAuth";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    const authUserId = await getUserIdFromAuth();
    if (!authUserId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }
    const { team_id, message, image_path } = await request.json(); 
    if (!team_id || (!message && !image_path)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newGroupMessageObject = {
      sender_id: authUserId,
      team_id,
      type: image_path ? "image" : "text",
      message: message || "",
      image_path: image_path || null,
      created_at: new Date().toISOString(),
    };

    
    const { data, error } = await supabase
      .from("messages")
      .insert(newGroupMessageObject)
      .select();

    if (error) {
      return NextResponse.json(
        { error: "Message could not be created: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in createMessage:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    const authUserId = await getUserIdFromAuth();
    const { id, message } = await request.json();

    const { data: row, error: fetchError } = await supabase
      .from("messages")
      .select("id, sender_id")
      .eq("id", id)
      .single();

    if (fetchError || !row) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    if (row.sender_id !== authUserId) {
      return NextResponse.json(
        { error: "You are not authorized to update this message" },
        { status: 403 }
      );
    }

    const { data, error } = await supabase
      .from("messages")
      .update({ message })
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json(
        { error: "Message could not be edited: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in updateMessage:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    const authUserId = await getUserIdFromAuth();
    if (!authUserId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }
    const { id } = await request.json();
    const { data: message, error: fetchError } = await supabase
      .from("messages")
      .select("id, sender_id")
      .eq("id", id)
      .single();

    if (fetchError || !message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    if (message.sender_id !== authUserId) {
      return NextResponse.json(
        { error: "You are not authorized to delete this message" },
        { status: 403 }
      );
    }
    const { error: deleteError } = await supabase
      .from("messages")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return NextResponse.json(
        { error: "Message could not be deleted: " + deleteError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMessage:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
