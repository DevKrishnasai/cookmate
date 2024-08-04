import { getUserElseCreate } from "@/actions/user";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (userId) {
    await getUserElseCreate();
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      {children}
    </div>
  );
};

export default layout;
