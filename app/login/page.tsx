import { Metadata } from 'next';
import LoginForm from '../_components/LoginForm';
import RegisterPrompt from '../_components/RegisterPrompt';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to chatSPA',
};

export default function LoginPage() {
  return (
    <div className="login">
      <h2>Welcome to chatSPA</h2>
      <LoginForm />
      <br /><br /><br />
      <RegisterPrompt />
    </div>
  );
}
