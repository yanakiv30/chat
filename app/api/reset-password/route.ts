


import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import { timingSafeEqual } from 'crypto';
import type { Database } from '@/types/supabase';

// Simple in-memory store for rate limiting
// Note: This will reset when the server restarts
const rateLimitStore: { [key: string]: { count: number, lastReset: number } } = {};

// Rate limit function
function rateLimit(identifier: string, limit: number = 2, windowMs: number = 60000): boolean {
  const now = Date.now();
  if (!rateLimitStore[identifier]) {
    rateLimitStore[identifier] = { count: 1, lastReset: now };
    return true;
  }

  const windowExpired = now - rateLimitStore[identifier].lastReset > windowMs;
  if (windowExpired) {
    rateLimitStore[identifier] = { count: 1, lastReset: now };
    return true;
  }

  if (rateLimitStore[identifier].count >= limit) {
    return false;
  }

  rateLimitStore[identifier].count++;
  return true;
}

export async function POST(request: Request) {
  const identifier = request.headers.get('x-forwarded-for') || 'unknown';
  if (!rateLimit(identifier)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { token, newPassword } = await request.json();
  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    // Verify the token
    const { data: resetToken, error: tokenError } = await supabase
      .from('password_reset_tokens')
      .select('user_id, id, token')
      .eq('token', token)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (tokenError || !resetToken || !timingSafeEqual(Buffer.from(resetToken.token), Buffer.from(token))) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    // Check password strength
    if (newPassword.length < 8 || 
        !/[A-Z]/.test(newPassword) || 
        !/[a-z]/.test(newPassword) || 
        !/[0-9]/.test(newPassword) || 
        !/[^A-Za-z0-9]/.test(newPassword)) {
      return NextResponse.json({ 
        error: 'Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters' 
      }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the user's password
    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        password: hashedPassword,
        updated_at: new Date().toISOString()
      })
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