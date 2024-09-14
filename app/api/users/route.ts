export const dynamic = "force-dynamic";

import { supabase } from "@/app/_services/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("username,id,avatar,status,created_at");

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Users could not be loaded" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in getUsers:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
