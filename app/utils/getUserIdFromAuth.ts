import { redirect } from "next/navigation";
import { auth } from "../_services/auth";
import { supabase } from "../_services/supabase";

export async function getUserIdFromAuth() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }
  const { user } = session;
  const emailFromGoogle = user.email;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", emailFromGoogle)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(error.message);
  }
  const userId = data!.id;
  return userId;
}
