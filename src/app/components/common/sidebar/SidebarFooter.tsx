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
    <footer className="hidden flex-col gap-1 p-1 sm:flex">
      <section className="flex flex-col">
        <p className="text-xs capitalize text-black/50">{data.user?.role}</p>
        <p className="text-sm">{data.user?.name}</p>
      </section>
      <ThemeSwitcher />
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
