"use server";

import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getUserElseCreate() {
  try {
    const { userId } = auth();
    if (!userId) {
      redirect("/sign-in");
    }

    let user = await db.user.findFirst({
      where: {
        authId: userId,
      },
    });

    if (!user) {
      const auth = await currentUser();
      user = await db.user.create({
        data: {
          authId: userId,
          name:
            auth?.fullName ||
            auth?.firstName ||
            auth?.emailAddresses[0].emailAddress.split("@")[0]!,
          email: auth?.emailAddresses[0].emailAddress!,
          image: auth?.imageUrl,
        },
      });
    }

    return user;
  } catch (error) {
    console.error("Error getting user", error);
    return null;
  }
}
