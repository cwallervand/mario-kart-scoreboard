"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import clsx from "clsx";

const links = [
  { href: "/", label: "Scoreboard" },
  { href: "/races", label: "Races" },
  { href: "/players", label: "Players" },
];

const NavigationBar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row items-center justify-around text-sm md:flex-col">
      {links.map((link) => {
        return (
          <Link
            key={link.label}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 self-stretch  p-2 text-sm hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-center md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              },
            )}
          >
            <p>{link.label}</p>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavigationBar;
