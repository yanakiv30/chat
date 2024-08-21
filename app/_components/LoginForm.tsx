"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setLoggedInUser } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/store";
import Link from "next/link";
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loggedInUser } = useAppSelector((store) => store.user);

  useEffect(() => {
    const errorMessage = searchParams.get('error');
    const success = searchParams.get('success');
    
    if (errorMessage) {
      setError(errorMessage);
      router.replace('/login');
    } else if (success) {
      setSuccessMessage(success);
      router.replace('/login');
    }
  }, [searchParams, router]);

  const onSubmit = async (formData: FormData) => {
    try {
      const result = await handleLogin(formData);

      if (!result.success) {
        setError(result.error || "An error occurred during login");
        if (result.redirectTo) {
          router.push(result.redirectTo);
        }
      } else {
        dispatch(setLoggedInUser(result.data));
        if (result.redirectTo) {
          router.push(result.redirectTo);
        }
      }
    } catch (error: any) {
      setError("Error logging in user: " + error.message);
    }
  };

  if (loggedInUser) return null;

  return (
    <div className="background-login">
      <h2>Welcome to chatSPA</h2>
      {successMessage && <p className="success">{successMessage}</p>}
      {error && <p className="error">{error}</p>}
      <br />
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
      <br />
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
