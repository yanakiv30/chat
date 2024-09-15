'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

const GithubSignInButton = ({ px, onClick }: { px: number; onClick: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const makeSignInRequest = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    onClick(); // Call the passed onClick function
    try {
      await signIn('github', { callbackUrl: '/account' });
    } catch (error) {
      console.error('Error signing in with GitHub:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      style={{ fontSize: `${px}px` }}
      onClick={makeSignInRequest}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Sign in with GitHub'}
    </button>
  );
};

export default GithubSignInButton;