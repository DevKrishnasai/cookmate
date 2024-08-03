import React from "react";
import TopBar from "../_components/TopBar";
import RecipeComponent from "./_components/RecipeCard";
import { getRecipesWithName } from "@/actions/recipe";

const page = async ({ searchParams }: { searchParams: { recipe: string } }) => {
  const recipes = await getRecipesWithName(searchParams.recipe);
  console.log(searchParams.recipe);
  return (
    <div className="w-full border-2 shadow-xl rounded-lg m-6 ml-0 p-2">
      <TopBar recipe={searchParams.recipe} />
      <RecipeComponent recipes={recipes} />
    </div>
  );
};

export default page;
