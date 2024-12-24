'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '../../ui/button';

export function HeaderNav() {
  const { data } = useSession();

  if (!data) {
    return (
      <Link href={'/signin'}>
        <Button>Login</Button>
      </Link>
    );
  }

  return (
    <Link href={'/home'}>
      <Button>Home</Button>
    </Link>
  );
}
