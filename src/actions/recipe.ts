"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getUserElseCreate } from "./user";
import {
  RecipeInformationType,
  RecipeIngredientType,
  RecipeStepType,
} from "@/types/recipe";
import { Ingredient } from "@prisma/client";

export async function createRecipe(name: string) {
  try {
    const user = await getUserElseCreate();

    if (!user) {
      redirect("/sign-in");
    }

    console.log(user, "~~~~~~~~~~~~~~~~", name);

    await db.recipe.create({
      data: {
        title: name,
        userId: user.id,
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating recipe", error);
    return false;
  }
}

export async function updateRecipeBasicDetails(
  recipeId: string,
  data: RecipeInformationType
) {
  try {
    const user = await getUserElseCreate();

    if (!user) {
      redirect("/sign-in");
    }

    await db.recipe.update({
      where: {
        userId: user.id,
        id: recipeId,
      },
      data: {
        title: data.title,
        noOfServings: data.no_of_servings,
        difficulty: data.difficulty,
        cookTime: data.cooking_time,
        description: data.description,
        image: data.url,
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating recipe", error);
    return false;
  }
}

export async function updateRecipeIngredients(
  recipeId: string,
  ingredients: RecipeIngredientType
) {
  try {
    const user = await getUserElseCreate();

    if (!user) {
      redirect("/sign-in");
    }

    const recipe = await db.recipe.findFirst({
      where: {
        userId: user.id,
        id: recipeId,
      },
    });

    if (!recipe) {
      return false;
    }

    await db.ingredient.deleteMany({
      where: {
        recipeId: recipeId,
      },
    });

    const x = await db.ingredient.createMany({
      data: ingredients.ingredients.map((ingredient) => ({
        recipeId: recipeId,
        name: ingredient.name,
        quantity: ingredient.quantity,
        quantityType: ingredient.quantity_type,
      })),
    });

    console.log("Ingredients", x);

    return true;
  } catch (error) {
    console.error("Error creating recipe", error);
    return false;
  }
}

export async function updateRecipeSteps(
  recipeId: string,
  steps: RecipeStepType
) {
  const user = await getUserElseCreate();

  if (!user) {
    redirect("/sign-in");
  }

  const recipe = await db.recipe.findFirst({
    where: {
      userId: user.id,
      id: recipeId,
    },
  });

  if (!recipe) {
    return false;
  }

  await db.step.deleteMany({
    where: {
      recipeId: recipeId,
    },
  });

  await db.step.createMany({
    data: steps.steps.map((step) => ({
      recipeId: recipeId,
      step: step.step,
      description: step.description,
    })),
  });

  return true;
}
