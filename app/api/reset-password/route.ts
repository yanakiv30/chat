// import { NextResponse } from 'next/server';
// import { supabase } from '@/app/_services/supabase';
// import bcrypt from 'bcrypt';



// export async function POST(request: Request) {
//   const { token, newPassword } = await request.json();

//   try {
//     // Verify the token
//     const { data: resetToken, error: tokenError } = await supabase
//       .from('password_reset_tokens')
//       .select('user_id')
//       .eq('token', token)
//       .gt('expires_at', new Date().toISOString())
//       .single();

//     if (tokenError || !resetToken) {
//       return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the user's password
//     const { error: updateError } = await supabase
//       .from('users')
//       .update({ password: hashedPassword })
//       .eq('id', resetToken.user_id);

//     if (updateError) {
//       throw updateError;
//     }

//     // Delete the used token
//     await supabase
//       .from('password_reset_tokens')
//       .delete()
//       .eq('token', token);

//     return NextResponse.json({ message: 'Password reset successfully' });
//   } catch (error) {
//     console.error('Error in reset password:', error);
//     return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
//   }
// }

// File: app/api/reset-password/route.ts

// File: app/api/users/route.ts

// File: app/api/reset-password/route.ts

import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import type { Database } from '@/types/supabase';

export async function POST(request: Request) {
  const { token, newPassword } = await request.json();
  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    // Verify the token
    const { data: resetToken, error: tokenError } = await supabase
      .from('password_reset_tokens')
      .select('user_id, id')
      .eq('token', token)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (tokenError || !resetToken) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    const { error: updateError } = await supabase
      .from('users')
      .update({ password: hashedPassword })
      .eq('id', resetToken.user_id);

    if (updateError) {
      throw updateError;
    }

    // Delete the used token
    await supabase
      .from('password_reset_tokens')
      .delete()
      .eq('id', resetToken.id);

    return NextResponse.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error in reset password:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}