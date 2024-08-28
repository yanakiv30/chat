"use client";

import { createTeam } from "@/apiUtils/apiTeams";

export async function connectTeamWithUsers(
  teamId: number,
  membersIds: number[]
) {
  const response = await fetch("/api/teams_members", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ teamId, membersIds }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(errorData.error);
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
