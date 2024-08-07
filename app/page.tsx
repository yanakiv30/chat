
// import { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Login",
//   description: "Login to chat",
// };

// import { cookies } from "next/headers";

// import { createHash } from 'crypto';
// import { supabase } from "./_services/supabase";
// import LoginForm from "./_components/LoginForm";

// export default function Login() {
//   async function handleLogin(formData: FormData) {
//     "use server";
//     const username = formData.get("username") as string;
//     const password = formData.get("password") as string;
//     const hashedPassword = createHash('sha256').update(password).digest('hex');
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
//         cookies().set("user", JSON.stringify(data), { httpOnly: true });
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
import Link from "next/link";
import GoogleSignInButton from "./_components/GoogleSignInButton";
export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to chatSPA",
};
export default async function HomePage() {
  return (
    <div className="app-container" style={{ position: "relative" }}>
      <div>
        <p style={{ fontSize: "70px" }}>Welcome to Chat</p>
        <br></br>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <Link href="/login">
            <button style={{ fontSize: "20px" }}>Go to Login</button>
          </Link>
          <span style={{ fontSize: "20px" }}> or </span>
          <GoogleSignInButton/>        
        </div>
      </div>
    </div>
  );
}


