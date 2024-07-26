import SignUp from "../_components/SignUp";
import { auth } from "../_services/auth";
import { supabase } from "../_services/supabase";

async function page() {
  const session = await auth();
  console.log("session= ", session); 

//    async function getUsers() {
//     const { data, error } = await supabase
//       .from("users")
//       .select("*")     
//     console.log("data from getUsers = ",data);
    
//     if (error) {
//       console.error(error);      
//     }  
//     return JSON.stringify(data);
//   }
// let result= await getUsers()

  return (
    <div className="background-login">
           <SignUp session={session}/> 
        </div>
    
  );
}
export default page;
