import React from "react";
import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/Column";
import { getAllRecipesByUserId } from "@/actions/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const page = async () => {
  const { userId } = auth();
  if (!userId) {
    return (
      <div className="flex w-full items-center justify-center h-screen">
        <Card className="w-full max-w-md p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Login Required
          </h1>
          <p className="text-gray-600 mb-6">
            You need to log in to view your dashboard
          </p>
          <Link href="/sign-in">
            <Button className="w-full">Log In</Button>
          </Link>
        </Card>
      </div>
    );
  }
  const user = await db.user.findFirst({
    where: {
      authId: userId,
    },
  });
  if (!user) {
    return (
      <div className="flex w-full items-center justify-center h-screen">
        <Card className="w-full max-w-md p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Login Required
          </h1>
          <p className="text-gray-600 mb-6">
            You need to log in to view your dashboard
          </p>
          <Link href="/sign-in">
            <Button className="w-full">Log In</Button>
          </Link>
        </Card>
      </div>
    );
  }
  const recipes = await getAllRecipesByUserId(user.id);

  return (
    <div className="min-h-full  w-full border-2 rounded-lg shadow-xl lg:m-6 lg:ml-0 space-y-3 ">
      {/* <div>
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <span className="text-sm">Manage your recipes</span>
      </div> */}
      <header className="mb-5 mt-12 lg:mt-3 ml-5">
        <h1 className="text-2xl  lg:text-4xl font-bold text-gray-900 ">
          Dashboard
        </h1>
        <p className="text-sm lg:text-lg text-gray-600">Manage your recipes</p>
      </header>
      <DataTable columns={columns} data={recipes || []} />
    </div>
  );
};

export default page;
