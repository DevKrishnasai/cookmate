import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavLinks from "./NavLinks";

const LeftBar = () => {
  return (
    <div className="w-full h-[calc(100vh-50px)]  bg-green-50 lg:bg-transparent  border-2 rounded-lg m-6 mr-3 flex flex-col justify-between text-center shadow-xl">
      <div>
        <h2 className="text-center font-bold text-2xl mt-3">LOGO</h2>
        <div className="flex flex-col gap-3 justify-center items-center w-full mx-auto h-60 mt-10">
          <Avatar className="w-40 h-40 ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h1 className="text-2xl font-bold">user name</h1>
            <p className="text-gray-400">Masrer Chef</p>
          </div>
        </div>
        <div className="mt-16">
          <NavLinks />
        </div>
      </div>
      <p className="mb-2">© 2021 All rights reserved</p>
    </div>
  );
};

export default LeftBar;
