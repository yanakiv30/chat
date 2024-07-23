import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
  description: "Login to chat",
};

import  LoginForm from '../_components/LoginForm';

export default function Login() {
  return (
    <div className="login">
      <h2>Welcome to chatSPA</h2>
      <LoginForm />
      <br />
      <br />
      <br />
      <p>
        If you dont have an account, please register
        {/* Note: Client-side logic for registration will be handled in LoginForm */}
      </p>
    </div>
  );
}