
import { cookies } from "next/headers";
import ConditionalComponent from "../_components/ConditionalComponent"
import { getTeams, getUsers } from "../_services/apiGroups";

async function page() {
     const userInitial = await getUsers();
    console.log("userInitial", userInitial);

    const userCookie = cookies().get('user');
  let userData = null;
  if (userCookie) {
    try {
      userData = JSON.parse(userCookie.value);
    } catch (error) {
      console.error('Error parsing user cookie:', error);
    }
  }
  console.log("userData from dashboard.id= ", userData.id);

  const allowedTeams = await getTeams(+userData.id);
  console.log("allowedTeams from dashboard.id= ", allowedTeams);

    return <ConditionalComponent userInitial={userInitial}/>
}
export default page
