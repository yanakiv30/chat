
import LoginForm from "../_components/LoginForm";
import { supabase } from "../_lib/supabase";
import { signInUser } from "../_services/auth";
import { cookies } from "next/headers";

export default function Login() {
  async function handleLogin(formData: FormData) {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const authResponse = await signInUser(email, password);
      if (authResponse.error) {
        return { success: false, error: authResponse.error };
      }
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", authResponse.user_id);
      if (data && data[0]) {
        // Store user data in a cookie
        cookies().set('user', JSON.stringify(data[0]), { httpOnly: true });
        
        // Return success status and redirect path
        return { success: true, redirectTo: '/chatMembersList' };
      } else {
        return { success: false, error: error?.message || "Invalid credentials" };
      }
    } catch (error: any) {
      return { success: false, error: "Error logging in user: " + error.message };
    }
  }

  return <LoginForm handleLogin={handleLogin} />;
}
