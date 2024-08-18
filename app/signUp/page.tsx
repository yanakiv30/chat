// "use client";
// import { useAppSelector } from "@/store/store";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { setLoggedInUser } from "../../store/userSlice";
// import { supabase } from "../_services/supabase";
// import { useEffect } from "react";

// export default function SignUp(incomingUserProp:any)  {
//   //console.log("sessionImage= ", sessionImage);  
//  const incomingUser= incomingUserProp.incomingUser;  
   
//   console.log("incomingUser= ", incomingUser);  
//   const router = useRouter();
//   const { loggedInUser } = useAppSelector((store) => store.user);
//   const dispatch = useDispatch();

//   async function handleSignUp(
//     newUsername: string,
//     newPassword: string,
//     full_name: string,
//     avatar: string,
//     status: string,
//     email: string
//    ) {
//     try {
//             // First, check if the username already exists
//       const { data: existingUser, error: checkError } = await supabase
//         .from("users")
//         .select("username")
//         .eq("username", newUsername)        
   
//       if (checkError ) {        
//         throw new Error("Error checking username: " + checkError.message);
//       }
  
//       if (existingUser&& existingUser.length > 0) {
//         console.log("User  exists: ", existingUser);
//         alert("Username already exists, please choose another one");              
//         return ;
//       }

//       // If we've reached this point, the username is available
//       const bcrypt = await import('bcrypt');
//       const saltRounds = 10;
//       const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

//       const newUser = {
//         username: newUsername,
//         full_name: full_name,
//         avatar: avatar,
//         status: status,
//         password: hashedPassword,
//         email: email,
//       };  
//       const { data, error } = await supabase
//         .from("users")
//         .insert([newUser])
//         .select();
  
//       if (error) {
//         throw new Error(error.message);
//       }
//       if (data && data.length > 0) {
//       console.log("Just registered: ", data[0]);
//       dispatch(setLoggedInUser(data[0]));  
//       router.push("/dashboard");
//       }else {
//         throw new Error("User creation failed");
//       }
//     } catch (error: unknown) {
//       let message = "An unknown error occurred";
//       if (error instanceof Error) {
//         message = error.message;
//       }
//       alert(message);
//     }
//   }
//   useEffect(() => {
//     async function handleSignUp2() {
//       dispatch(setLoggedInUser(incomingUser));
//       router.push("/dashboard");
//     }
//     if (incomingUser) handleSignUp2();
//   }, [incomingUser, dispatch, router]);
//   if (loggedInUser) return null;
//   if (incomingUser) return;
//   return (
//     <div className="background-login">
//       <div className="login">
//         <h2>Please Sign Up</h2>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             const formData = new FormData(e.target as HTMLFormElement);
//             const newUsername = formData.get("newUsername");
//             const newPassword = formData.get("newPassword");
//             const full_name = formData.get("full_name");

//             const avatar = formData.get("avatar");
//             const status = formData.get("status");
//             const email = formData.get("email");
//             if (
//               typeof newUsername === "string" &&
//               typeof newPassword === "string" &&
//               typeof full_name === "string" &&
//               typeof avatar === "string" &&
//               typeof status === "string"&&
//               typeof email === "string"

//             )
//               handleSignUp(newUsername, newPassword, full_name, avatar, status,email);
//           }}
//         >
//           <label>
  
//             New Username:
//             <input type="text" name="newUsername" required />
//           </label>
//           <label>
//             New Password:
//             <input type="password" name="newPassword" required />
//           </label>
//           <label>
//             Full Name:
//             <input type="text" name="full_name" required />
//           </label>

//           <label>
//             Avatar:
//             <input type="text" name="avatar" required />
//           </label>
//           <label>
//             Status:  
//             <input type="text" name="status" required />
//           </label>
//           <label>
//             Email:  
//             <input type="email" name="email" required />
//           </label>
//           <button type="submit">Sign Up</button>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../store/userSlice";
import { useEffect } from "react";
import { handleSignUp } from './signupActions';

export default function SignUp(incomingUserProp: any) {
  const incomingUser = incomingUserProp.incomingUser;
  
  console.log("incomingUser= ", incomingUser);  
  const router = useRouter();
  const { loggedInUser } = useAppSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function handleSignUp2() {
      dispatch(setLoggedInUser(incomingUser));
      router.push("/dashboard");
    }
    if (incomingUser) handleSignUp2();
  }, [incomingUser, dispatch, router]);

  if (loggedInUser) return null;
  if (incomingUser) return null;

  return (
    <div className="background-login">
      <div className="login">
        <h2>Please Sign Up</h2>
        <form
          action={async (formData) => {
            const result = await handleSignUp(formData);
            if (result.success) {
              dispatch(setLoggedInUser(result.user));
              router.push("/dashboard");
            } else {
              alert(result.error);
            }
          }}
        >
          <label>
            New Username:
            <input type="text" name="newUsername" required />
          </label>
          <label>
            New Password:
            <input type="password" name="newPassword" required />
          </label>
          <label>
            Full Name:
            <input type="text" name="full_name" required />
          </label>
          <label>
            Avatar:
            <input type="text" name="avatar" required />
          </label>
          <label>
            Status:  
            <input type="text" name="status" required />
          </label>
          <label>
            Email:  
            <input type="email" name="email" required />
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

