export async function connectTeamWithUsers(teamId: number, membersIds: number[]) {
    const response = await fetch('/api/teams_members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ teamId, membersIds }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to connect users to team');
    }
}

export async function getTeamsIds(userId: number) {
  const response = await fetch(`/api/teams_members?userId=${userId}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch team IDs');
  }
  return response.json();
}

export async function removeUserFromTeam(teamId: number, userId: number) {
  const response = await fetch('/api/teams_members', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ teamId, userId }),
  });


  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to remove user from team');
  }  
}