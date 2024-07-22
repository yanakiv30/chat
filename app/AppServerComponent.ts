import { cookies } from 'next/headers'
import { getTeams, getUsers } from './_services/apiGroups';
export async function AppServerComponent() {  
  const userCookie = cookies().get('user')
  
  if (!userCookie) {
    return { loggedInUser: null, users: [], teams: [] }
  }

  const loggedInUser = JSON.parse(userCookie.value)
  
  try {
    const [users, teams] = await Promise.all([
      getUsers(),
      getTeams(+loggedInUser.id)
    ]);

    return { loggedInUser, users, teams }
  } catch (error) {
    console.error("Error fetching data:", error);
    return { loggedInUser, users: [], teams: [] }
  }
}