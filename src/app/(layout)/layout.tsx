import React from "react";
import SideBarWraper from "@/components/SideBarWraper";
import { auth } from "@clerk/nextjs/server";
import { getUserElseCreate } from "@/actions/user";

//add metadata
export const metadata = {
  title: "CookMate | Your Personal Recipe Hub",
  description:
    "Your personal recipe hub for creating, sharing, and discovering amazing recipes",
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (userId) {
    await getUserElseCreate();
  }
  return <SideBarWraper>{children}</SideBarWraper>;
};

export default layout;
