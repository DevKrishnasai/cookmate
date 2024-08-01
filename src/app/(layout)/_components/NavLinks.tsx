"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const links = [
  { href: "/home", label: "Home" },
  { href: "/trending", label: "Trending" },
  { href: "/profile", label: "Profile" },
];
const NavLinks = () => {
  const activePath = usePathname();
  return (
    <div className="flex flex-col justify-center items-center gap-5 ">
      {links.map(({ href, label }) => (
        <Link
          href={href}
          key={label}
          className={cn(
            "text-base bg-black text-white w-3/4 h-full text-center p-2 rounded-lg ",
            activePath === href && "font-bold"
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
