// app/api/teams_members/route.ts

import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    const { teamId, membersIds } = await request.json();

    if (!teamId || !membersIds || !Array.isArray(membersIds)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const rows = membersIds.map((userId) => ({
      team_id: teamId,
      user_id: userId,
      role: userId === membersIds[0] ? "admin" : "member",
    }));

    const { error } = await supabase.from("teams_members").insert(rows);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to connect users to team" }, { status: 500 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error in connectTeamWithUsers:', error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}