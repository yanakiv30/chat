'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

const GoogleSignInButton = ({ px, onClick }: { px: number; onClick: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    onClick(); // Call the passed onClick function
    try {
      await signIn('google', { callbackUrl: '/account' });
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      style={{ fontSize: `${px}px` }}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Sign in with Google'}
    </button>
  );
};

export default GoogleSignInButton;