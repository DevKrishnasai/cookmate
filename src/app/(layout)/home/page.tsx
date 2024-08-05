import React from "react";
import TopBar from "../_components/TopBar";
import RecipeComponent from "./_components/RecipeCard";
import { getRecipesWithName } from "@/actions/recipe";
import { auth } from "@clerk/nextjs/server";
import { getUserElseCreate } from "@/actions/user";

const page = async ({ searchParams }: { searchParams: { recipe: string } }) => {
  const { userId } = auth();
  if (userId) {
    await getUserElseCreate();
  }
  const recipes = await getRecipesWithName(searchParams.recipe);
  console.log(searchParams.recipe);
  return (
    <div className="w-full border-2 shadow-xl rounded-lg lg:m-6 lg:ml-0 p-2">
      <TopBar recipe={searchParams.recipe} />
      <RecipeComponent recipes={recipes} />
    </div>
  );
};

export default page;
