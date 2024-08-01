import React from "react";
import LeftBar from "./_components/LeftBar";
import { Toaster } from "@/components/ui/sonner";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex ">
      <LeftBar />
      {children}
      <Toaster />
    </div>
  );
};

export default layout;
