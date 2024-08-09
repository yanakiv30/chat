
import { auth } from "../_services/auth";
import { supabase } from "../_services/supabase";
import { createHash } from 'crypto';
import SignUp from "@/app/signup/page";

async function page() {
  const session = await auth();
  const userFromGoogle = session?.user?.name;
  const emailFromGoogle = session?.user?.email;
  console.log("emailFromGoogle= ", emailFromGoogle);
  let userWithId={};

  if (!emailFromGoogle) {
    throw new Error("Email from Google is undefined");
  }

  const hashedPassword = createHash('sha256').update(emailFromGoogle).digest('hex');

  console.log("session= ", session);
  console.log("Querying for user with email: ", emailFromGoogle);

  const { data: existingUser, error: fetchError } = await supabase
  .from("users")
  .select("*")
  .eq("email", emailFromGoogle)
  

  console.log("Supabase response: ", { existingUser, fetchError });
if (fetchError && fetchError.code !== 'PGRST116') { // 'PGRST116' is the code for "No rows found"
  throw new Error(fetchError.message);
}

if (existingUser&&existingUser.length>0) {
  console.log("User already exists: ", existingUser);  
  return (
    <div className="background-login">
           <SignUp incomingUser={existingUser[0]}/> 
        </div>    
  );
}
const newUser = {
  username: userFromGoogle,
  full_name: userFromGoogle,
  avatar: "Google",
  status: "new",
  email: emailFromGoogle,
  password: hashedPassword,
};
  try {
    
    const { data, error } = await supabase
      .from("users")
      .insert([newUser])
      .select();

    if (error) {
      throw new Error(error.message);
    }
     userWithId = data[0];
    console.log("new User from account=  ",userWithId);
   
  } catch (error: any) {
    const errorMessage = "Error creating user: " + error.message;
    alert(errorMessage);
    console.error(errorMessage);
  }

  return (
    <div className="background-login">
           <SignUp incomingUser={userWithId}/> 
        </div>    
  );
}
export default page;
