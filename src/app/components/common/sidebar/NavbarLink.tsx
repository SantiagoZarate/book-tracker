import Link from 'next/link';
import { ArrowTopRigthMicroIcon } from '../../icons/ArrowTopRigthMicroIcon';
import { ILink } from './Navbar';

interface Props {
  link: ILink;
  active: boolean;
}

export function NavbarLink({ link, active }: Props) {
  return (
    <Link
      href={link.path}
      className="group flex items-center gap-2 overflow-hidden rounded-sm p-4 transition hover:bg-input sm:p-2"
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
          active ? 'opacity-100' : 'opacity-50'
        }`}
      >
        {link.text}
      </p>
    </Link>
  );
}
