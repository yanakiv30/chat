import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
  description: "Login to chat",
};

import { cookies } from "next/headers";
import { supabase } from "../_services/supabase";
import LoginForm from "../_components/LoginForm";
import { createHash } from 'crypto';

export default function Login() {
  async function handleLogin(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
     

      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("email", email)
        .eq("password", password)
        .single();

      if (error) {
        return {
          success: false,
          error: "Error querying the database: " + error.message,
        };
      }

      if (data) {
        console.log("User found:", data);
        cookies().set("user", JSON.stringify(data), { httpOnly: true });
        return { success: true, redirectTo: "/dashboard", data: data };
      } else {
        return {
          success: false,
          error: "Invalid credentials",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: "Error logging in user: " + error.message,
      };
    }
  }

  return <LoginForm handleLogin={handleLogin} />;
}
