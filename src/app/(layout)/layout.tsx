import React from "react";
import SideBarWraper from "@/components/SideBarWraper";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <SideBarWraper>{children}</SideBarWraper>;
};

export default layout;
