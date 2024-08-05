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
        className="lg:hidden fixed top-7 left-4 z-50"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={cn(
          showSidebar ? " w-2/3 absolute -top-5 -left-5 " : "hidden ",
          "lg:flex lg:w-1/5 lg:relative"
        )}
      >
        <LeftBar open={showSidebar} setOpen={setShowSidebar} />
      </div>

      {children}

      <Toaster />
    </div>
  );
};

export default SideBarWraper;
