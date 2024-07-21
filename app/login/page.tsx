import LoginForm from "../_components/LoginForm";
import { supabase } from "../_lib/supabase";
import { signInUser } from "../_services/auth";

export default function Login() {
  async function handleLogin(formData: FormData) {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const authResponse = await signInUser(email, password);
      if (authResponse.error) {
        return { error: authResponse.error };
      }
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", authResponse.user_id);
      if (data && data[0]) {
        // Encode user data to be passed in URL
        const encodedUserData = encodeURIComponent(JSON.stringify(data[0]));
        console.log("encodedUserData",encodedUserData)
        // Return success status and redirect URL
        return { success: true, redirectUrl: `/chatMembersList?user=${encodedUserData}` };
      } else {
        return { error: error || "Invalid credentials" };
      }
    } catch (error: any) {
      return { error: "Error logging in user: " + error.message };
    }
  }

  return <LoginForm handleLogin={handleLogin} />;
}

