// not using
import React from "react";
import NavLinks from "./NavLinks";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const Navbar = () => {
  const { userId } = auth();
  return (
    <div className="sticky top-0 left-0  bg-slate-300  z-10">
      <nav className=" mx-auto h-10  max-w-screen-2xl flex  items-center ">
        <div className="flex items-center justify-between w-full">
          <p className="font-bold text-lg">LOGO</p>
          <NavLinks />
          <div className="flex gap-5 items-center">
            {userId ? (
              <UserButton />
            ) : (
              <Button variant={"outline"}>
                <Link href="/sign-in">SignIn</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
