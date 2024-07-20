'use client';

import { useDispatch } from 'react-redux';


export default function LoginForm() {
  const dispatch = useDispatch();

  const handleLogin = (email: string, password: string) => {
    // Implement your login logic here
    console.log('Logging in:', email, password);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('email');
        const password = formData.get('password');
        if (typeof email === 'string' && typeof password === 'string')
          handleLogin(email, password);
      }}
    >
      <label>
        Email:
        <input type="text" name="email" required />
      </label>
      <label>
        Password:
        <input type="password" name="password" required />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
