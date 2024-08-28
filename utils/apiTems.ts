export async function fetchTeams(loggedInUserId: number) {
    const response = await fetch(`/api/teams?userId=${loggedInUserId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch teams');
    }
    return response.json();
  }