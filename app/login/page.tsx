import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
  description: "Login to chat",
};

import { cookies } from "next/headers";
import { signInUser } from "../_services/auth";
import { supabase } from "../_services/supabase";
import LoginForm from "../_components/LoginForm";
import { revalidatePath } from "next/cache";

export default function Login() {

  async function handleLogin(formData: FormData) {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      cookies().delete('user');
      revalidatePath('/login');
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
        console.log("data from server  ",data);
        cookies().set('user', JSON.stringify(data[0]), { httpOnly: true });
        revalidatePath('/dashboard');        
        return { success: true, redirectTo: '/dashboard' };       
      } else {
        return { success: false, error: error?.message || "Invalid credentials" };
      }
    } catch (error: any) {
      return { success: false, error: "Error logging in user: " + error.message };
    }
  }

  
  const userCookie = cookies().get('user');
  let userData = null;
  if (userCookie) {
    try {
      userData = JSON.parse(userCookie.value);
    } catch (error) {
      console.error('Error parsing user cookie:', error);
    }
  }

  return <LoginForm handleLogin={handleLogin} userData={userData}/>;
}