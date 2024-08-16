"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setLoggedInUser } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/store";
import Link from "next/link";
import Google from "next-auth/providers/google";
import GoogleSignInButton from "./GoogleSignInButton";

type HandleLoginFunction = (formData: FormData) => Promise<{
  success: boolean;
  error?: string;
  redirectTo?: string;
  data?: any;
}>;
interface LoginFormProps {
  handleLogin: HandleLoginFunction;
}

export default function LoginForm({ handleLogin }: LoginFormProps) {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { loggedInUser } = useAppSelector((store) => store.user);
  console.log("loggedInUser from loginForm= ", loggedInUser);

  const onSubmit = async (formData: FormData) => {
    try {
      const result = await handleLogin(formData);
     // console.log("result from onSubmit= ", result);
      dispatch(setLoggedInUser(result.data));
      if (result.success && result.redirectTo) {
        router.push(result.redirectTo);
      } else if (result.error) {
        setError(result.error);
      }
    } catch (error: any) {
      setError("Error logging in user: " + error.message);
    }
  };
  if (loggedInUser)  return null;
  
  return (
    <div className="background-login">
      <h2>Welcome to chatSPA</h2>
      <br></br>
      <form action={onSubmit}>
        <label>
          Username:
          <input type="text" name="username" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <br></br>
      <p>
        <Link href="/api/auth/signin" passHref>
          <GoogleSignInButton px={14} />
        </Link>
        or
        <button onClick={() => router.push("/signup")}>SignUP</button>
      </p>
    </div>
  );
}
