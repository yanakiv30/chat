import { NextResponse } from 'next/server';
import { supabase } from '@/app/_services/supabase';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { email } = await request.json();

  try {
    // Check if the user exists
    const { data: user, error } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    // Generate a reset token
    const resetToken = uuidv4();
    const expiresAt = new Date(Date.now() + 3600000); // Token expires in 1 hour

    // Store the reset token in the database
    await supabase
      .from('password_reset_tokens')
      .insert({ user_id: user.id, token: resetToken, expires_at: expiresAt });

    // Send reset email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // You'll need to set this up
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Password Reset Instructions',
      text: `Click the following link to reset your password: ${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`,
      html: `<p>Click <a href="${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}">here</a> to reset your password.</p>`,
    });

    return NextResponse.json({ message: 'Password reset instructions sent' });
  } catch (error) {
    console.error('Error in forgot password:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

