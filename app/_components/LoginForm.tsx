'use client';

import { useState } from 'react';
import { useDispatch } from "react-redux";
import { setIsRegister } from "../../store/userSlice";
import { useRouter } from 'next/navigation';

interface LoginFormProps {
  handleLogin: (formData: FormData) => Promise<{ success?: boolean; error?: string; redirectUrl?: string }>;
}

export default function LoginForm({ handleLogin }: LoginFormProps) {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    try {
      const result = await handleLogin(formData);
      if (result.success && result.redirectUrl) {
        router.push(result.redirectUrl);
      } else if (result.error) {
        setError(result.error);
      }
    } catch (error: any) {
      setError("Error logging in user: " + error.message);
    }
  };

  return (
    <div className="login">
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
      <br />
      <br />
      <br />
      <p>
        If you do not have an account, please:
        <button onClick={() => dispatch(setIsRegister(true))}>
          Register
        </button>
      </p>
    </div>
  );
}

