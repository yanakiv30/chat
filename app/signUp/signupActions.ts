 'use server';

import { supabase } from "../_services/supabase";

export async function handleSignUp(formData: FormData) {
  const newUsername = formData.get("newUsername") as string;
  const newPassword = formData.get("newPassword") as string;
  const full_name = formData.get("full_name") as string;
  const avatar = formData.get("avatar") as string;
  const status = formData.get("status") as string;
  const email = formData.get("email") as string;

  try {
    // First, check if the username already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("username")
      .eq("username", newUsername)        
 
    if (checkError) {        
      throw new Error("Error checking username: " + checkError.message);
    }

    if (existingUser && existingUser.length > 0) {
      return { success: false, error: "Username already exists, please choose another one" };
    }

    // If we've reached this point, the username is available
    const bcrypt = await import('bcrypt');
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const newUser = {
      username: newUsername,
      full_name: full_name,
      avatar: avatar,
      status: status,
      password: hashedPassword,
      email: email,
    };  
    const { data, error } = await supabase
      .from("users")
      .insert([newUser])
      .select();

    if (error) {
      throw new Error(error.message);
    }
    if (data && data.length > 0) {
      console.log("Just registered: ", data[0]);
      return { success: true, user: data[0] };
    } else {
      throw new Error("User creation failed");
    }
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) {
      message = error.message;
    }
    return { success: false, error: message };
  }
}