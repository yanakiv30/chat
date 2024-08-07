 'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const GoogleSignInButton = ({ px }: { px: number }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    router.push('/api/auth/signin');
  };

  return (
    <button
      style={{ fontSize: `${px}px` }}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Sign with Google'}
    </button>
  );
};

export default GoogleSignInButton;