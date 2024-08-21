import { supabase } from "../_services/supabase";

export default async function VerifyEmail({ searchParams }: { searchParams: { token: string } }) {
  const { token } = searchParams;

  if (!token) {
    return <div>Invalid verification link.</div>;
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .update({ is_verified: true, verification_token: null })
      .match({ verification_token: token })
      .select();

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      return <div>Your email has been verified. You can now log in.</div>;
    } else {
      return <div>Invalid or expired verification link.</div>;
    }
  } catch (error) {
    console.error('Error verifying email:', error);
    return <div>An error occurred while verifying your email. Please try again later.</div>;
  }
}