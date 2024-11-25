'use client';

import { signOut, useSession } from 'next-auth/react';
import { SignOutMicroIcon } from '../../icons/SignOutMicroIcon';
import { IconButton } from '../../ui/button';
import { ThemeSwitcher } from './ThemeSwitcher';

export function SidebarFooter() {
  const { data } = useSession();

  if (!data) {
    return <p className="hidden sm:block">No inicio sesion</p>;
  }

  return (
    <footer className="hidden p-1 sm:block">
      <ThemeSwitcher />
      <p className="text-xs">{data.user?.name}</p>
      <p className="text-xs">{data.user?.role}</p>
      <IconButton
        icon={<SignOutMicroIcon />}
        className="w-full"
        onClick={() => signOut({ redirect: true, callbackUrl: '/signin' })}
      >
        Sign out
      </IconButton>
    </footer>
  );
}
