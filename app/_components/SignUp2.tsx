"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpAction } from "../_actions/signUpAction";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "@/store/userSlice";
import { useAppSelector } from "@/store/store";

export default function SignUpForm() {
  const { loggedInUser } = useAppSelector((store) => store.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUsername = formData.get("newUsername") as string;
    const newPassword = formData.get("newPassword") as string;
    const full_name = formData.get("full_name") as string;
    const email = formData.get("email") as string;
    const avatar = formData.get("avatar") as string;
    const status = formData.get("status") as string;

    const result = await signUpAction(
      newUsername,
      newPassword,
      full_name,
      email,
      avatar,
      status
    );
    console.log("result= ", result);

    if (result.success) {
      dispatch(setLoggedInUser(result.user));
      router.push("/dashboard");
    } else {
      setError(result.error || "An error occurred during sign up");
    }
  };
  if (loggedInUser) return null;
  return (
    <div className="login">
      <h2>Please Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
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
          <input type="email" name="email" required />
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
