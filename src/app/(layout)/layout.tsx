import React from "react";
import SideBarWraper from "@/components/SideBarWraper";
import { auth } from "@clerk/nextjs/server";
import { getUserElseCreate } from "@/actions/user";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (userId) {
    await getUserElseCreate();
  }
  return <SideBarWraper>{children}</SideBarWraper>;
};

export default layout;
