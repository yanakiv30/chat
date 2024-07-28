import SignUp from "../_components/SignUp";
import { auth } from "../_services/auth";
import { supabase } from "../_services/supabase";

async function page() {
  const session = await auth();
  console.log("session= ", session);  

  const { data: existingUser, error: fetchError } = await supabase
  .from("users")
  .select("*")
  .eq("email", session?.user?.email)
  .single();

if (fetchError && fetchError.code !== 'PGRST116') { // 'PGRST116' is the code for "No rows found"
  throw new Error(fetchError.message);
}

if (existingUser) {
  console.log("User already exists: ", existingUser);  
  return (
    <div className="background-login">
           <SignUp incomingUser={existingUser}/> 
        </div>    
  );
}
const newUser = {
  username: session?.user?.name,
  full_name: session?.user?.name,
  avatar: "Google",
  status: "new",
  email:session?.user?.email,
  password: session?.user?.email,
};
  try {
    
    const { data, error } = await supabase
      .from("users")
      .insert([newUser])
      .select();

    if (error) {
      throw new Error(error.message);
    }
    console.log("data[0]= ",data[0]);
   
  } catch (error: any) {
    const errorMessage = "Error creating user: " + error.message;
    alert(errorMessage);
    console.error(errorMessage);
  }

  return (
    <div className="background-login">
           <SignUp incomingUser={newUser}/> 
        </div>    
  );
}
export default page;
