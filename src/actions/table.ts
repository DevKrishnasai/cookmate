"use server";
import { db } from "@/lib/db";
import { getUserElseCreate } from "./user";
import { redirect } from "next/navigation";

export async function getAllRecipesByUserId(id: string) {
  try {
    const recipes = await db.recipe.findMany({
      where: {
        userId: id,
      },
      include: {
        _count: {
          select: {
            favorated: true,
            Ratings: true,
          },
        },
      },
    });

    const structuredRecipes = recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        published: recipe.published,
        favorated: recipe._count.favorated,
        ratings: recipe._count.Ratings,
      };
    });

    return structuredRecipes;
  } catch (error) {
    console.error("Error fetching recipes", error);
    return null;
  }
}

export type TableDataType = {
  id: string;
  title: string;
  favorated: number;
  published: boolean;
  ratings: number;
};

export async function deleteRecipeById(id: string) {
  try {
    const user = await getUserElseCreate();
    if (!user) {
      redirect("/sign-in");
    }
    await db.recipe.delete({
      where: {
        id,
        userId: user.id,
      },
    });
  } catch (error) {
    console.error("Error deleting recipe", error);
  }
}
