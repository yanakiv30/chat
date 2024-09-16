import { supabase } from "@/app/_services/supabase";
import { getUserIdFromAuth } from "@/app/utils/getUserIdFromAuth";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(request: NextRequest) {
  try {
    const authUserId = await getUserIdFromAuth();
    if (!authUserId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq('id', authUserId)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, message: "User account deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}