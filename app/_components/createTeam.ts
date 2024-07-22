"use client"

import { supabase } from "../_services/supabase";



async function createTeam(newTeam: { name: string }) {
  const { data, error } = await supabase.from("teams").insert(newTeam).select();
  if (error) {
    const errorMessage = "New group could not be loaded: " + error.message;
    alert(errorMessage);
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return data[0];
}

export async function connectTeamWithUsers(
  teamId: number,
  membersIds: number[]
) {
  const rows = membersIds.map((userId) => {
    return {
      team_id: teamId,
      user_id: userId,
      role: userId === membersIds.at(0) ? "admin" : "member",
    };
  });
  const { data, error } = await supabase.from("teams_members").insert(rows);
  if (error) {
    console.error(error);
    throw new Error("Failed to connect users to team");
  }
}

export async function createTeamWithMembers(
  teamName: string,
  membersIds: number[]
) {
  const newTeam = await createTeam({ name: teamName });
  await connectTeamWithUsers(newTeam.id, membersIds);
  return newTeam.id;
}
