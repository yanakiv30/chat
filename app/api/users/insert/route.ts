import { supabase } from "@/app/_services/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const newUser = await request.json();

    if (!newUser) {
      return NextResponse.json(
        { error: "User data is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("users")
      .insert([newUser])
      .select();

    return NextResponse.json({ data, error });
  } catch (error) {
    console.error("Error in insertNewUser:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
