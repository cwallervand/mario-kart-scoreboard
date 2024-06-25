"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import clsx from "clsx";

const links = [
  { href: "/", label: "Stats" },

  { href: "/heats", label: "Heats" },
  { href: "/players", label: "Players" },
];

const NavigationBar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row items-center justify-around font-mario text-sm md:flex-col">
      {links.map((link) => {
        return (
          <Link
            key={link.label}
            href={link.href}
            className={clsx(
              "text-stroke text-stroke-width-1 flex h-[48px] grow items-center justify-center gap-2 self-stretch p-2 text-lg decoration-wavy decoration-1 underline-offset-4 hover:text-xl hover:underline md:flex-none md:justify-center md:p-2 md:px-3",
              {
                underline: pathname === link.href,
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
