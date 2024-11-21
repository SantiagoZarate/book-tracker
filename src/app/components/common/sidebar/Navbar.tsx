'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AddSquareMicroIcon } from '../../icons/AddSquareMicroIcon';
import { ArrowTopRigthMicroIcon } from '../../icons/ArrowTopRigthMicroIcon';
import { HomeMicroIcon } from '../../icons/HomeMicroIcon';

const SIDEBAR_LINKS = [
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

export function Navbar() {
  const path = usePathname();

  return (
    <nav className="flex w-full flex-col gap-1 p-1">
      {SIDEBAR_LINKS.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className="group flex items-center gap-2 overflow-hidden rounded-sm p-4 transition hover:bg-secondary sm:p-2"
        >
          <section className="relative">
            <span className="opacity-0">
              <ArrowTopRigthMicroIcon />
            </span>
            <span className="absolute left-0 top-0 transition group-hover:-translate-y-4 group-hover:opacity-0">
              {link.icon}
            </span>
            <span className="absolute opacity-0 transition group-hover:-translate-y-4 group-hover:opacity-100">
              <ArrowTopRigthMicroIcon />
            </span>
          </section>
          <p
            className={`hidden text-xs uppercase tracking-wider transition sm:block ${
              path === link.path ? 'opacity-100' : 'opacity-50'
            }`}
          >
            {link.text}
          </p>
        </Link>
      ))}
    </nav>
  );
}
