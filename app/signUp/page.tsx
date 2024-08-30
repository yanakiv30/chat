

"use client";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../store/userSlice";
import { useEffect, useState } from "react";
import { handleSignUp } from './signupActions';

export default function SignUp(incomingUserProp: any) {
  const incomingUser = incomingUserProp.incomingUser;
  
  console.log("incomingUser= ", incomingUser);  
  const router = useRouter();
  const { loggedInUser } = useAppSelector((store) => store.user);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function signWithGoogle() {
      dispatch(setLoggedInUser(incomingUser));
      router.push("/dashboard");
    }
    if (incomingUser) signWithGoogle();
  }, [incomingUser, dispatch, router]);

  if (loggedInUser) return null;
  if (incomingUser) return null;

  // return (
  //   <div className="background-login">
  //     <div className="login">
  //       <h2>Please Sign Up</h2>
  //       {message && <p>{message}</p>}
  //       <form
  //         action={async (formData) => {
  //           const result = await handleSignUp(formData);

  //           if (result.success) {
  //             setMessage(result.message || 'Signup successful. Please check your email to verify your account.');
  //             // Don't dispatch or redirect immediately
  //           } else {
  //             setMessage(result.error || 'An error occurred during signup.');
  //           }
  //         }}
  //       >
  //         <label>
  //           New Username:
  //           <input type="text" name="newUsername" required />
  //         </label>
  //         <label>
  //           New Password:
  //           <input type="password" name="newPassword" required />
  //         </label>
  //         <label>
  //           Full Name:
  //           <input type="text" name="full_name" required />
  //         </label>
  //         <label>
  //           Avatar:
  //           <input type="text" name="avatar" required />
  //         </label>
  //         <label>
  //           Status:  
  //           <input type="text" name="status" required />
  //         </label>
  //         <label>
  //           Email:  
  //           <input type="email" name="email" required />
  //         </label>
  //         <button type="submit">Sign Up</button>
  //       </form>
  //     </div>
  //   </div>
  // );
}

