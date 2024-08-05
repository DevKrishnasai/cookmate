"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getUserElseCreate } from "./user";
import {
  RecipeInformationType,
  RecipeIngredientType,
  RecipeStepType,
} from "@/types/recipe";
import { revalidatePath } from "next/cache";

export async function createRecipe(name: string) {
  try {
    const user = await getUserElseCreate();

    if (!user) {
      redirect("/sign-in");
    }

    console.log(user, "~~~~~~~~~~~~~~~~", name);

    const data = await db.recipe.create({
      data: {
        title: name,
        userId: user.id,
      },
    });

    return data.id;
  } catch (error) {
    console.error("Error creating recipe", error);
    return null;
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
        calories: data.calories,
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

export async function publishRecipe(recipeId: string) {
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

    await db.recipe.update({
      where: {
        userId: user.id,
        id: recipeId,
      },
      data: {
        published: !recipe.published,
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating recipe", error);
    return false;
  }
}

export async function getRecipesWithName(name: string) {
  try {
    const recipes = await db.recipe.findMany({
      where: {
        title: {
          contains: name,
        },

        published: true,
      },
      include: {
        _count: {
          select: {
            favorated: true,
            Ratings: true,
          },
        },
        Ratings: {
          select: {
            stars: true,
          },
        },
      },
    });

    // Calculate average rating for each recipe
    const recipesWithAverageRating = recipes.map((recipe) => {
      const totalStars = recipe.Ratings.reduce(
        (sum, rating) => sum + rating.stars,
        0
      );
      const averageRating =
        recipe.Ratings.length > 0 ? totalStars / recipe.Ratings.length : 0;

      return {
        ...recipe,
        averageRating: parseFloat(averageRating.toFixed(2)),
        _count: {
          ...recipe._count,
          Ratings: undefined, // Remove this as we don't need it anymore
        },
        Ratings: undefined, // Remove the raw ratings data
      };
    });

    return recipesWithAverageRating;
  } catch (error) {
    console.error("Error getting recipes", error);
    return [];
  }
}

export type SearchResultsType = Awaited<ReturnType<typeof getRecipesWithName>>;

export async function getFullRecipeDetails(title: string) {
  try {
    const recipe = await db.recipe.findFirst({
      where: {
        title,
        published: true,
      },
      include: {
        _count: {
          select: {
            favorated: true,
            Ratings: true,
          },
        },
        steps: true,
        ingredients: true,
      },
    });
    return recipe;
  } catch (error) {
    console.error("Error getting recipes", error);
    return null;
  }
}

export async function getFullRecipeDetailsById(id: string) {
  try {
    const recipe = await db.recipe.findFirst({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            favorated: true,
            Ratings: true,
          },
        },
        steps: true,
        ingredients: true,
      },
    });
    return recipe;
  } catch (error) {
    console.error("Error getting recipes", error);
    return null;
  }
}

export type DetailedRecipeType = Awaited<
  ReturnType<typeof getFullRecipeDetails>
>;

export async function favoriteARecipe(recipeId: string) {
  try {
    const user = await getUserElseCreate();

    if (!user) {
      redirect("/sign-in");
    }

    const favorite = await db.favorite.findFirst({
      where: {
        userId: user.id,
        recipeId,
      },
    });

    if (favorite) {
      await db.favorite.delete({
        where: {
          id: favorite.id,
        },
      });

      return true;
    }

    await db.favorite.create({
      data: {
        userId: user.id,
        recipeId,
      },
    });

    revalidatePath("/home");
    revalidatePath("/settings");

    return true;
  } catch (error) {
    console.error("Error favoriting recipe", error);
    return false;
  }
}

export async function rateARecipe(recipeId: string, stars: number) {
  try {
    const user = await getUserElseCreate();

    if (!user) {
      redirect("/sign-in");
    }

    const rating = await db.rating.findFirst({
      where: {
        userId: user.id,
        recipeId,
      },
    });

    if (rating) {
      await db.rating.update({
        where: {
          id: rating.id,
        },
        data: {
          stars,
        },
      });

      return true;
    }

    await db.rating.create({
      data: {
        userId: user.id,
        recipeId,
        stars,
      },
    });

    return true;
  } catch (error) {
    console.error("Error rating recipe", error);
    return false;
  }
}
