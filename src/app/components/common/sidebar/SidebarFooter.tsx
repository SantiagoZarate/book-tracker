'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button } from '../../ui/button';

export function SidebarFooter() {
  const { data } = useSession();

  if (!data) {
    return <p className="hidden sm:block">No inicio sesion</p>;
  }

  return (
    <footer className="hidden p-1 sm:block">
      <p className="text-xs">{data.user?.name}</p>
      <Button
        className="w-full"
        onClick={() => signOut({ redirect: true, callbackUrl: '/signin' })}
      >
        Sign out
      </Button>
    </footer>
  );
}
