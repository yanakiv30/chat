import { supabase } from "../_services/supabase";
import { redirect } from 'next/navigation';

export default async function VerifyEmail({ searchParams }: { searchParams: { token: string } }) {
  const { token } = searchParams;

  if (!token) {
    redirect('/login?error=Invalid verification link');
  }

  const { data, error } = await supabase
    .from('users')
    .update({ is_verified: true, verification_token: null })
    .match({ verification_token: token })
    .select();

  if (error) {
    console.error('Error verifying email:', error);
    redirect('/login?error=An error occurred while verifying your email. Please try again later.');
  }

  if (data && data.length > 0) {
    redirect('/login?success=Your email has been verified. You can now log in.');
  } else {
    redirect('/login?error=Invalid or expired verification link');
  }
}