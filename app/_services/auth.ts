

import { supabase } from "./supabase";

//import supabase from "./supabase";

export async function signUpUser(email: string, password: string) {
  const response = await supabase.auth.signUp({ email, password });
  return response;
}

export async function signInUser(email: string, password: string) {
  let authResponse = await supabase.auth.signInWithPassword({ email, password }) as any;
  const authId=authResponse.data?.user?.id;
  if(authId){
    const { data, error } = await supabase
    .from('users_auth')
    .select('user_id')
    .eq('auth_id', authId);  

    authResponse={...authResponse, user_id:data![0].user_id};
  }
  return authResponse;
}