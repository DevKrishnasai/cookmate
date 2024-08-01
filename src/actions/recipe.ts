"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function createRecipe(name: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      redirect("/sign-in");
    }

    // const recipe = await prisma.recipe.create({
    // TODO : add recipe creation logic
  } catch (error) {
    console.error("Error creating recipe", error);
  }
}
