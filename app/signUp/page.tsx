"use client";

import { useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../store/userSlice";
import { supabase } from "../_services/supabase";
import { useEffect, useState } from "react";
import { createHash } from "crypto";

export default function SignUp(incomingUser: any) {
  console.log("Incoming user from server=  ", incomingUser.incomingUser);

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
    console.log("Just registered: ", data[0]);
    dispatch(setLoggedInUser(data[0]));

    router.push("/dashboard");
  }

  useEffect(() => {
    async function handleSignUp2() {
      dispatch(setLoggedInUser(incomingUser.incomingUser));
      router.push("/dashboard");
    }
    if (incomingUser.incomingUser) handleSignUp2();
  }, [incomingUser, dispatch, router]);

  if (loggedInUser) return null;
  if (incomingUser.incomingUser) return;

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
