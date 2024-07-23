"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setIsRegister, setLoggedInUser } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/store";

interface LoginFormProps {
  handleLogin: (
    formData: FormData
  ) => Promise<{ success: boolean; error?: string; redirectTo?: string }>;
  userData: any | null;
}

export default function LoginForm({ handleLogin, userData }: LoginFormProps) {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { loggedInUser } = useAppSelector((store) => store.user);
  console.log("loggedInUser",loggedInUser);
  const onSubmit = async (formData: FormData) => {
    try {
      const result = await handleLogin(formData);
      if (result.success && result.redirectTo) {
        router.push(result.redirectTo);
      } else if (result.error) {
        setError(result.error);
      }
    } catch (error: any) {
      setError("Error logging in user: " + error.message);
    }
  };

  if (userData) {
    dispatch(setLoggedInUser(userData)); //user is a object
  } else {
    console.error(error);
    alert("Invalid credentials");
  }
 
  return (
    <div className="login">
      <h2>Welcome to chatSPA</h2>

      {userData && <p>loggedInUser={JSON.stringify(userData, null, 2)}</p>}

      <form action={onSubmit}>
        <label>
          Email:
          <input type="text" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
          If you dont have an account , please :
          <button onClick={() => dispatch(setIsRegister(true))}>
            Register
          </button>
        </p>

        
    </div>
  );
}