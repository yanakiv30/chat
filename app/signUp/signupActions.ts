// "use server";

// import { supabase } from "../_services/supabase";
// import { sendVerificationEmail } from "../_services/emailService";
// import crypto from 'crypto';

// export async function handleSignUp(formData: FormData) {
//   const newUsername = formData.get("newUsername") as string;
//   const newPassword = formData.get("newPassword") as string;
//   const full_name = formData.get("full_name") as string;
//   const avatar = formData.get("avatar") as string;
//   const status = formData.get("status") as string;
//   const email = formData.get("email") as string;

//   try {
//     const { data: existingUser, error: checkError } = await supabase
//       .from("users")
//       .select("username")
//       .eq("username", newUsername);

//     if (checkError) {
//       throw new Error("Error checking username: " + checkError.message);
//     }

//     if (existingUser && existingUser.length > 0) {
//       return {
//         success: false,
//         error: "Username already exists, please choose another one",
//       };
//     }

//     const { data: existingEmail, error: emailCheckError } = await supabase
//       .from("users")
//       .select("email")
//       .eq("email", email)
//       .single();

//     if (emailCheckError && emailCheckError.code !== "PGRST116") {
//       throw new Error("Error checking email: " + emailCheckError.message);
//     }

//     if (existingEmail) {
//       return {
//         success: false,
//         error: "Email already exists, please use another email or log in",
//       };
//     }

//     const bcrypt = await import("bcrypt");
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

//     const verificationToken = crypto.randomBytes(32).toString('hex');

//     const newUser = {
//       username: newUsername,
//       full_name: full_name,
//       avatar: avatar,
//       status: status,
//       password: hashedPassword,
//       email: email,
//       is_verified: false, 
//       verification_token: verificationToken,   
//     };
//     const { data, error } = await supabase
//       .from("users")
//       .insert([newUser])
//       .select();

//     if (error) {
//       throw new Error(error.message);
//     }
//     if (data && data.length > 0) {
//       
      
//       await sendVerificationEmail(email, verificationToken);
//       return { success: true, user: data[0], message: "Please check your email to verify your account." };
//     } else {
//       throw new Error("User creation failed");
//     }
//   } catch (error: unknown) {
//     let message = "An unknown error occurred";
//     if (error instanceof Error) {
//       message = error.message;
//     }
//     return { success: false, error: message };
//   }
// }
