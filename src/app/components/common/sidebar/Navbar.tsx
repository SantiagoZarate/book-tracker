'use client';

import { TFunction } from '@/app/i18n/type';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { AddSquareMicroIcon } from '../../icons/AddSquareMicroIcon';
import { ChartMicroIcon } from '../../icons/ChartMicroIcon';
import { HomeMicroIcon } from '../../icons/HomeMicroIcon';
import { NavbarLink } from './NavbarLink';

export type ILink = {
  path: string;
  text: string;
  icon: JSX.Element;
};

const getPubliLinks = (i18n: TFunction) =>
  [
    { text: i18n('nav.home'), path: '/home', icon: <HomeMicroIcon /> },
    { text: i18n('nav.add'), path: '/add', icon: <AddSquareMicroIcon /> },
  ] satisfies ILink[];

const getPrivateLinks = (i18n: TFunction) =>
  [
    {
      text: i18n('nav.dashboard'),
      path: '/dashboard',
      icon: <ChartMicroIcon />,
    },
  ] satisfies ILink[];

export function Navbar() {
  const path = usePathname();
  const session = useSession();
  const i18n = useTranslations();

  const lastSegmente = '/' + path.split('/')[2];

  return (
    <nav className="flex w-full flex-col gap-1 p-1">
      {getPubliLinks(i18n).map((link) => (
        <NavbarLink
          key={link.path}
          active={lastSegmente === link.path}
          link={link}
        />
      ))}
      {session.data?.user.role === 'admin' &&
        getPrivateLinks(i18n).map((link) => (
          <NavbarLink
            key={link.path}
            active={lastSegmente === link.path}
            link={link}
          />
        ))}
    </nav>
  );
}
