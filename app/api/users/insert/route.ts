import { supabase } from "@/app/_services/supabase";

import { NextRequest, NextResponse } from "next/server";

const rateLimitStore = new Map<string, number>();

export async function POST(request: NextRequest) {
  
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const lastRequest = rateLimitStore.get(ip) || 0;
  
  if (now - lastRequest < 2000) { // 10000 ms = 10 seconds
      return new Response('Too Many Requests', { status: 429 });
  }  
  rateLimitStore.set(ip, now);
  
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
