
import App from "../_components/App";
import { getUsers } from "../_services/apiGroups";
type UserSup = {
  username: string;
  id: number;
  avatar: string;
  status: string;
  created_at: string;
};
async function getData():Promise<{users:UserSup[]}> {
  "use server"
  const users=await getUsers();
  return {users}  
}

async function page() {
  const  users  = (await getData()).users;
  console.log("users=",users) ;
    return <App initialUsers={users}/>
}
export default page


//   const userCookie = cookies().get('user');
  // let userData = null;
  // if (userCookie) {
  //   try {
  //     userData = JSON.parse(userCookie.value);
  //   } catch (error) {
  //     console.error('Error parsing user cookie:', error);
  //   }
  // } 