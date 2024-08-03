import React from "react";
import RecipeDetail from "../_components/RecipeDetails";
import RightScrollSuggestions from "../_components/RightScrollSuggestions";
import { getFullRecipeDetails } from "@/actions/recipe";
import { getUserElseCreate } from "@/actions/user";
import { db } from "@/lib/db";

const page = async ({ params }: { params: { recipe: string } }) => {
  const name = params.recipe.trim().split("-").join(" ");
  console.log(name);
  const user = await getUserElseCreate();
  const recipe = await getFullRecipeDetails(name);
  console.log(recipe);

  let visitedUser = true;
  let favorite = false;
  let stars = 0;

  if (user) {
    visitedUser = false;
    favorite = (await db.favorite.findFirst({
      where: {
        userId: user.id,
        recipeId: recipe?.id,
      },
    }))
      ? true
      : false;

    stars = await db.rating
      .findFirst({
        where: {
          userId: user.id,
          recipeId: recipe?.id,
        },
      })
      .then((r) => r?.stars || 0);
  }

  return (
    <div className="w-full max-h-[calc(100vh-50px)] flex  ">
      {recipe ? (
        <RecipeDetail
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
      {/* show the right scroll suggestions */}
      <RightScrollSuggestions recipeId={recipe?.id || ""} />
    </div>
  );
};

export default page;
