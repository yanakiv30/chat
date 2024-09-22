import { supabase } from "@/app/_services/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      console.log("Bad request: No email provided");
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        console.log("User not found for email:", email);
        return NextResponse.json({ userExists: false, data: null });
      } else {
        console.error("Supabase error:", fetchError);
        return NextResponse.json(
          { error: "Error fetching user", details: fetchError.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ userExists: true, data: existingUser });
  } catch (error) {
    console.error("Unexpected error in fetchUserByEmail:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
