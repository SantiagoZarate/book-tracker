"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AddSquareMicroIcon } from "../../icons/AddSquareMicroIcon";
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
  console.log({ path });

  return (
    <nav className="w-full flex flex-col">
      {SIDEBAR_LINKS.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className="flex gap-2 items-center sm:p-2 p-4 hover:bg-card transition"
        >
          <span>{link.icon}</span>
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
