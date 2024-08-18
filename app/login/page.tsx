// import { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Login",
//   description: "Login to chat",
// };
// import { supabase } from "../_services/supabase";
// import LoginForm from "../_components/LoginForm";
// import { createHash } from "crypto";
// import { cookies } from "next/headers";

// export default function Login() {
//   async function handleLogin(formData: FormData) {
//     "use server";
//     const username = formData.get("username") as string;
//     const password = formData.get("password") as string;
//     const hashedPassword = createHash("sha256").update(password).digest("hex");
//     try {
//       const { data, error } = await supabase
//         .from("users")
//         .select()
//         .eq("username", username)
//         .eq("password", hashedPassword)
//         .single();

//       if (error) {
//         return {
//           success: false,
//           error: "Error querying the database: " + error.message,
//         };
//       }

//       if (data) {
//         console.log("User found:", data);
//         cookies().set('user', JSON.stringify(data), { httpOnly: true });
//         return { success: true, redirectTo: "/dashboard", data: data };
//       } else {
//         return {
//           success: false,
//           error: "Invalid credentials",
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




import { Metadata } from "next";
import { supabase } from "../_services/supabase";
import LoginForm from "../_components/LoginForm";
import { createHash } from "crypto";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to chat",
};

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const message = searchParams.message;

  async function handleLogin(formData: FormData) {
    "use server";
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const hashedPassword = createHash("sha256").update(password).digest("hex");
    try {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("username", username)
        .eq("password", hashedPassword)
        .single();

      if (error) {
        return {
          success: false,
          error: "Error querying the database: " + error.message,
        };
      }

      if (data) {
        console.log("User found:", data);
        cookies().set('user', JSON.stringify(data), { httpOnly: true });
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

  return (
    <div>
      {message && <p style={{ color: 'blue' ,fontSize:"50px"}}>{decodeURIComponent(message)}</p>}
      <br></br><br></br>
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
}