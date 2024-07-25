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
      // Хеширайте паролата преди да я сравните с базата данни
      //const hashedPassword = createHash('sha256').update(password).digest('hex');

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






// import { cookies } from "next/headers";
// import { signInUser } from "../_services/supAuth";
// import { supabase } from "../_services/supabase";
// import LoginForm from "../_components/LoginForm";

// export default function Login() {
//   async function handleLogin(formData: FormData) {
//     "use server";
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     try {
//       const authResponse = await signInUser(email, password);
//       if (authResponse.error) {
//         return { success: false, error: authResponse.error };
//       }
//       const { data, error } = await supabase
//         .from("users")
//         .select()
//         .eq("id", authResponse.user_id);
//       if (data && data[0]) {
//         console.log("data from server  ", data);
//         cookies().set("user", JSON.stringify(data[0]), { httpOnly: true });
//         return { success: true, redirectTo: "/dashboard", data: data[0] };
//       } else {
//         return {
//           success: false,
//           error: error?.message || "Invalid credentials",
//         };
//       }
//     } catch (error: any) {
//       return {
//         success: false,
//         error: "Error logging in user: " + error.message,
//       };
//     }
//   }
//   return <LoginForm handleLogin={handleLogin} />;
// }
