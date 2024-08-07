 'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function GoogleSignInButton () {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    router.push('/api/auth/signin');
  };

  return (
    <Link href="/api/auth/signin" passHref>
      <button
        style={{ fontSize: "20px" }}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Sign with Google'}
      </button>
    </Link>
  );
};

export default GoogleSignInButton;