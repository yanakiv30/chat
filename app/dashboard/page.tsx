import { cookies } from "next/headers";
import { getTeams, getUsers } from "../_services/apiGroups";
//import App from "../_components/App";
import Empty from "../_components/Empty";

async function page() {
    //  const userInitial = await getUsers();
    // console.log("userInitial", userInitial);

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

  // const allowedTeams = await getTeams(+userData.id);
  // console.log("allowedTeams from dashboard.id= ", allowedTeams);

    return <Empty />
}
export default page
