// export async function fetchTeams(loggedInUserId: number) {
//   const response = await fetch(`/api/teams?userId=${loggedInUserId}`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch teams');
//   }
//   return response.json();
// }
export async function fetchTeams() {
  const response = await fetch('/api/teams', {
    method: 'GET',
    credentials: 'include', // This is important for including cookies in the request
  });
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized: Please log in to fetch teams');
    }
    throw new Error('Failed to fetch teams');
  }
  return response.json();
}


export async function createTeam(newTeam: { name: string }) {
  const response = await fetch('/api/teams', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTeam),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create team');
  }

  const data = await response.json();
  console.log("data from createTeam ",data);
  return data[0];
}

export async function updateTeam(id: number, updateData: Partial<{ name: string }>) {
  const response = await fetch('/api/teams', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...updateData }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update team');
  }

  return response.json();
}

export async function deleteTeam(id: number) {
  const response = await fetch('/api/teams', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete team');
  }
//  return response.json();
}
