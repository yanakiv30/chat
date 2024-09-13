import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";
import { supabase } from "@/app/_services/supabase";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    return NextResponse.json({ data: existingUser, error: fetchError });
  } catch (error) {
    console.error("Error in fetchUserByEmail:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
