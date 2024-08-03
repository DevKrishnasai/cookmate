"use client";
import LeftBar from "@/app/(layout)/_components/LeftBar";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Cross, Crosshair, Menu, X } from "lucide-react";
import React, { useState } from "react";

const SideBarWraper = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen flex relative">
      <button
        className="lg:hidden fixed top-4 left-4 z-20"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={cn(
          showSidebar ? " w-1/2 absolute top-0 left-0 " : "hidden",
          "lg:flex lg:w-1/5"
        )}
      >
        <LeftBar />
      </div>

      {children}

      <Toaster />
    </div>
  );
};

export default SideBarWraper;
