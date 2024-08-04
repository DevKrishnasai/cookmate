import React from "react";
import { getFullRecipeDetailsById } from "@/actions/recipe";
import { getUserElseCreate } from "@/actions/user";
import { db } from "@/lib/db";
import RecipeDetail from "@/app/(layout)/_components/RecipeDetails";
import { redirect } from "next/navigation";

const page = async ({
  searchParams,
}: {
  searchParams: { recipeId: string };
}) => {
  const id = searchParams.recipeId;
  console.log(searchParams);
  const user = await getUserElseCreate();

  if (!user) {
    redirect("/sign-in");
  }

  const recipe = await getFullRecipeDetailsById(id);
  console.log(recipe);
  if (recipe) {
    const u = await db.recipe.findUnique({
      where: {
        id: recipe.id,
      },
      include: {
        user: true,
      },
    });

    if (u?.user.id !== user.id) {
      redirect("/profile");
    }
  }

  let visitedUser = true;
  let favorite = false;
  let stars = 0;

  return (
    <div className="w-full max-h-[calc(100vh-50px)] flex  ">
      {recipe ? (
        <RecipeDetail
          isPreview={true}
          recipe={recipe}
          visitedUser={visitedUser}
          isFavorited={favorite}
          stars={stars}
        />
      ) : (
        <div className="w-full h-full border-2 rounded-lg shadow-xl m-6 ml-0 p-2 space-y-3 flex justify-center items-center">
          <p>Recipe not found</p>
        </div>
      )}

      <div className="w-1/4 h-full border-2 rounded-lg shadow-xl m-6 ml-0 p-2 space-y-1 flex flex-col justify-center items-center text-center">
        <p className="font-bold">previous recipes</p>
        <span className="text-sm">
          It will be shown up when the recipe gets published
        </span>
      </div>
    </div>
  );
};

export default page;
