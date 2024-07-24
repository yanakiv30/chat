'use server'

import { signUpUser } from "../_services/auth";
import { supabase } from "../_services/supabase";

export async function signUpAction(
  newUsername: string,
  newPassword: string,
  full_name: string,
  email: string,
  avatar: string,
  status: string
) {
  try {
    const authResponse = await signUpUser(email, newPassword);
    if (authResponse.error) {
      throw new Error(authResponse.error.message);
    }

    const newUser = {
      username: newUsername,
      full_name: full_name,
      avatar: avatar,
      status: status,
    };

    const { data, error } = await supabase
      .from("users")
      .insert([newUser])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    await supabase
      .from("users_auth")
      .insert([{ user_id: data[0].id, auth_id: authResponse.data.user!.id }])
      .select();

    return { success: true, user: data[0] };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
