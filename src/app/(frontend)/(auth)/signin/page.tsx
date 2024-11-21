'use client';

import { Button } from '@/app/components/ui/button';
import { signIn, signOut } from 'next-auth/react';

export default function page() {
  return (
    <>
      <Button onClick={() => signOut()}>Sign out</Button>
      <Button onClick={() => signIn('github')}>Sign in</Button>
    </>
  );
}
