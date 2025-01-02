"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export default function Nav() {
  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/notes", label: "Notes" },
    { href: "/account", label: "Account" },
    { href: "/logout", label: "Logout" },
  ];

  const pathName = usePathname();
  return (
    <nav>
      <ul className="flex">
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              className={cn(
                "inline-block font-bold p-4",
                pathName === href && "bg-cyan-500"
              )}
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
