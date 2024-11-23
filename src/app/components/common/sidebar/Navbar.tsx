'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { AddSquareMicroIcon } from '../../icons/AddSquareMicroIcon';
import { HomeMicroIcon } from '../../icons/HomeMicroIcon';
import { NavbarLink } from './NavbarLink';

export type ILink = {
  path: string;
  text: string;
  icon: JSX.Element;
};

const SIDEBAR_LINKS: ILink[] = [
  {
    path: '/',
    text: 'home',
    icon: <HomeMicroIcon />,
  },
  {
    path: '/add',
    text: 'add track',
    icon: <AddSquareMicroIcon />,
  },
];

const ADMIN_LINKS = [
  {
    path: '/dashboard',
    text: 'dasboard',
    icon: <AddSquareMicroIcon />,
  },
];

export function Navbar() {
  const path = usePathname();
  const session = useSession();

  return (
    <nav className="flex w-full flex-col gap-1 p-1">
      {SIDEBAR_LINKS.map((link) => (
        <NavbarLink key={link.path} active={path === link.path} link={link} />
      ))}
      {session.data?.user.role === 'admin' &&
        ADMIN_LINKS.map((link) => (
          <NavbarLink key={link.path} active={path === link.path} link={link} />
        ))}
    </nav>
  );
}
