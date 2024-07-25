"use client";

import { useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../store/userSlice";
import { signUpUser } from "../_services/supAuth";
import { supabase } from "../_services/supabase";

export default function SignUp() {
  const router = useRouter();
  const { loggedInUser } = useAppSelector((store) => store.user);
  const dispatch = useDispatch();
  async function handleSignUp(
    newUsername: string,
    newPassword: string,
    full_name: string,
    email: string,
    avatar: string,
    status: string
  ) {
    try {
      const authResponse = await signUpUser(email, newPassword);
      if (authResponse.error) {
        throw new Error(authResponse.error.message);
      }

      const newUser = {
        username: newUsername,
        full_name: full_name,
        avatar: avatar,
        status: status,
      };
      const { data, error } = await supabase
        .from("users")
        .insert([newUser])
        .select();

      if (error) {
        throw new Error(error.message);
      }
      console.log(data[0]);
      dispatch(setLoggedInUser(data[0]));
      const usersAuthData = await supabase
        .from("users_auth")
        .insert([{ user_id: data[0].id, auth_id: authResponse.data.user!.id }])
        .select();
    } catch (error: any) {
      const errorMessage = "Error creating user: " + error.message;
      alert(errorMessage);
      console.error(errorMessage);
    }
    router.push("/dashboard");
  }
  if (loggedInUser) return null;
  return (
    <div className="login">
      <h2>Please Sign Up</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const newUsername = formData.get("newUsername");
          const newPassword = formData.get("newPassword");
          const full_name = formData.get("full_name");
          const email = formData.get("email");
          const avatar = formData.get("avatar");
          const status = formData.get("status");

          if (
            typeof newUsername === "string" &&
            typeof newPassword === "string" &&
            typeof full_name === "string" &&
            typeof email === "string" &&
            typeof avatar === "string" &&
            typeof status === "string"
          )
            handleSignUp(
              newUsername,
              newPassword,
              full_name,
              email,
              avatar,
              status
            );
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
          Email:
          <input type="text" name="email" required />
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
  );
}
