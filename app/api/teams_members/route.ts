// app/api/teams_members/route.ts

import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";
import { supabase } from "@/app/_services/supabase";

export async function POST(request: Request) {
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
      return NextResponse.json(
        { error: "Failed to connect users to team" },
        { status: 500 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error in connectTeamWithUsers:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("teams_members")
      .select("team_id")
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "teams_members could not be loaded" },
        { status: 500 }
      );
    }

    const teamsIds = data.map((x) => x.team_id);
    return NextResponse.json(teamsIds);
  } catch (error) {
    console.error("Error in getTeamsIds:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { teamId, userId } = await request.json();

    const { error } = await supabase
      .from("teams_members")
      .delete()
      .eq("team_id", teamId)
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Failed to remove user from team" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "User removed from team successfully",
    });
  } catch (error) {
    console.error("Error in removeUserFromTeam:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
