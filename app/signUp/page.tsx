"use client";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../store/userSlice";
import { supabase } from "../_services/supabase";

import { createHash } from "crypto";
import { useEffect } from "react";

export default function SignUp({ incomingUser, sessionImage }: { incomingUser: any, sessionImage: any }) {
  console.log("sessionImage= ", sessionImage);    
   
  console.log("incomingUser= ", incomingUser);  
  const router = useRouter();
  const { loggedInUser } = useAppSelector((store) => store.user);
  const dispatch = useDispatch();
  async function handleSignUp(
    newUsername: string,
    newPassword: string,
    full_name: string,
    avatar: string,
    status: string
   ) {
    try {
            // First, check if the username already exists
      const { data: existingUser, error: checkError } = await supabase
        .from("users")
        .select("username")
        .eq("username", newUsername)        
   
      if (checkError ) {        
        throw new Error("Error checking username: " + checkError.message);
      }
  
      if (existingUser&& existingUser.length > 0) {
        console.log("User  exists: ", existingUser);
        alert("Username already exists, please choose another one");              
        return ;
      }

      // If we've reached this point, the username is available
      const hashedPassword = createHash("sha256")
        .update(newPassword)
        .digest("hex");

      const newUser = {
        username: newUsername,
        full_name: full_name,
        avatar: avatar,
        status: status,
        password: hashedPassword,
      };  
      const { data, error } = await supabase
        .from("users")
        .insert([newUser])
        .select();
  
      if (error) {
        throw new Error(error.message);
      }
      if (data && data.length > 0) {
      console.log("Just registered: ", data[0]);
      dispatch(setLoggedInUser(data[0]));  
      router.push("/dashboard");
      }else {
        throw new Error("User creation failed");
      }
    } catch (error: unknown) {
      let message = "An unknown error occurred";
      if (error instanceof Error) {
        message = error.message;
      }
      alert(message);
    }
  }
  useEffect(() => {
    async function handleSignUp2() {
      dispatch(setLoggedInUser(incomingUser));
      router.push("/dashboard");
    }
    if (incomingUser) handleSignUp2();
  }, [incomingUser, dispatch, router]);
  if (loggedInUser) return null;
  if (incomingUser) return;
  return (
    <div className="background-login">
      <div className="login">
        <h2>Please Sign Up</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const newUsername = formData.get("newUsername");
            const newPassword = formData.get("newPassword");
            const full_name = formData.get("full_name");

            const avatar = formData.get("avatar");
            const status = formData.get("status");

            if (
              typeof newUsername === "string" &&
              typeof newPassword === "string" &&
              typeof full_name === "string" &&
              typeof avatar === "string" &&
              typeof status === "string"
            )
              handleSignUp(newUsername, newPassword, full_name, avatar, status);
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}