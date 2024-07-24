"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setIsRegister, setLoggedInUser } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/store";

type HandleLoginFunction = (formData: FormData) => Promise<{
  success: boolean;
  error?: string;
  redirectTo?: string;
  data?: any;
}>;
interface LoginFormProps {
  handleLogin: HandleLoginFunction;
}

export default function LoginForm({ handleLogin}: LoginFormProps) {
  
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { loggedInUser, isRegister } = useAppSelector((store) => store.user);
  console.log("loggedInUser",loggedInUser);
  console.log("isRegister= ", isRegister)

  const onSubmit = async (formData: FormData) => {
    try {
      const result = await handleLogin(formData);
      console.log("result= ",result);
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
 
  return (
    <div className="background-login">
      <h2>Welcome to chatSPA</h2>     

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
          <button onClick={() => router.push('/signup')}>
            Register
          </button>
        </p>        
    </div>
  );
}