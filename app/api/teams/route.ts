import { supabase } from "@/app/_services/supabase";
import { getUserIdFromAuth } from "@/app/utils/getUserIdFromAuth";
import { NextResponse } from "next/server";

export async function GET() {
  const loggedInUserId = await getUserIdFromAuth();

  if (!loggedInUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Helper functions
    const getTeamsIds = async () => {
      const { data, error } = await supabase
        .from("teams_members")
        .select("team_id")
        .eq("user_id", loggedInUserId);
      if (error) throw new Error("teams_members could not be loaded");
      return data.map((x) => x.team_id);
    };

    const getMembersInTeams = async (teamIds: number[]) => {
      const { data, error } = await supabase
        .from("teams_members")
        .select()
        .in("team_id", teamIds);
      if (error) throw new Error("Team Members could not be loaded");
      return data;
    };

    const getMessagesInTeams = async (teamIds: number[]) => {
      const { data, error } = await supabase
        .from("messages")
        .select()
        .in("team_id", teamIds)
        .order("created_at", { ascending: true });
      if (error) throw new Error("Team Messages could not be loaded");
      return data;
    };

    const getUsers = async (userIds: number[]) => {
      const { data, error } = await supabase
        .from("users")
        .select("username,id,avatar,status,created_at")
        .in("id", userIds);
      if (error) throw new Error("Users could not be loaded");
      return data;
    };

    // Helper function
    const getHourDayDate = (date: Date) => ({
      hour: date.getHours(),
      day: date.getDate(),
      date: date.toISOString(),
    });

    // Main logic
    const teamsIds = await getTeamsIds();
    const { data: teamsData, error } = await supabase
      .from("teams")
      .select("*")
      .in("id", teamsIds);
    if (error) throw new Error("Teams could not be loaded");

    const membersInTeams = await getMembersInTeams(teamsIds);
    const messagesInTeams = await getMessagesInTeams(teamsIds);

    const userIds = [...new Set(membersInTeams.map((m) => m.user_id))];
    const users = await getUsers(userIds);

    const teamsWithMembers = teamsData.map((team) => ({
      ...team,
      members: membersInTeams
        .filter((tm) => tm.team_id === team.id)
        .map((tm) => users.find((user) => user.id === tm.user_id)!)
        .map((user) => ({
          id: user.id,
          username: user.username,
          avatar: user.avatar,
          status: user.status,
          // Omit other sensitive information
        })),
      messages: messagesInTeams
        .filter((row) => row.team_id === team.id)
        .map((row) => ({
          id: row.id!,
          senderId: row.sender_id!,
          content: row.message!,
          image_path: row.image_path!,
          ...getHourDayDate(new Date(row.created_at!)),
        })),
    }));

    return NextResponse.json(teamsWithMembers);
  } catch (error) {
    console.error("Error in getTeams:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newTeam = await request.json();
    const { data, error } = await supabase
      .from("teams")
      .insert(newTeam)
      .select();

    if (error) {
      return NextResponse.json(
        { error: "New group could not be created: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...updateData } = await request.json();
    const { data, error } = await supabase
      .from("teams")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json(
        { error: "Team could not be updated: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const { error } = await supabase.from("teams").delete().eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: "Team could not be deleted: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Team deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
