'use client';

import { Button } from '@/app/components/ui/button';
import { signIn, signOut } from 'next-auth/react';

export default function page() {
  return (
    <section className="mx-auto flex w-full max-w-[320px] flex-col gap-2">
      <Button onClick={() => signOut()}>Sign out</Button>
      <Button onClick={() => signIn('github')}>Sign in</Button>
    </section>
  );
}
