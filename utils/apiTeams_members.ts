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