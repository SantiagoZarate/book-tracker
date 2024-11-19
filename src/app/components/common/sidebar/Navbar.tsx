"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AddSquareMicroIcon } from "../../icons/AddSquareMicroIcon";
import { ArrowTopRigthMicroIcon } from "../../icons/ArrowTopRigthMicroIcon";
import { HomeMicroIcon } from "../../icons/HomeMicroIcon";

const SIDEBAR_LINKS = [
  {
    path: "/",
    text: "home",
    icon: <HomeMicroIcon />,
  },
  {
    path: "/add",
    text: "add track",
    icon: <AddSquareMicroIcon />,
  },
];

export function Navbar() {
  const path = usePathname();

  return (
    <nav className="w-full flex flex-col">
      {SIDEBAR_LINKS.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className="flex gap-2 items-center sm:p-2 p-4 hover:bg-card transition group"
        >
          <section className="relative">
            <span className="opacity-0">
              <ArrowTopRigthMicroIcon />
            </span>
            <span className="absolute top-0 left-0 group-hover:-translate-y-4 transition group-hover:opacity-0">
              {link.icon}
            </span>
            <span className="opacity-0 absolute group-hover:-translate-y-4 group-hover:opacity-100 transition">
              <ArrowTopRigthMicroIcon />
            </span>
          </section>
          <p
            className={`hidden sm:block uppercase tracking-wider text-xs transition ${
              path === link.path ? "opacity-100" : "opacity-50"
            }`}
          >
            {link.text}
          </p>
        </Link>
      ))}
    </nav>
  );
}
