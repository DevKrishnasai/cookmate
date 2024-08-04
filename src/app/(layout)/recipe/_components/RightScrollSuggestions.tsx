import { getRecipesWithName, SearchResultsType } from "@/actions/recipe";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const RightScrollSuggestions = async ({ recipeId }: { recipeId: string }) => {
  let recipes = await getRecipesWithName("");
  recipes = recipes.filter((recipe) => recipe.id !== recipeId);
  return (
    <div className="w-1/4 hidden lg:flex h-full border-2 rounded-lg shadow-xl m-6 ml-0 p-2  overflow-y-auto">
      <div className="  overflow-y-auto w-full h-full">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RightScrollSuggestions;

const RecipeCard = ({ recipe }: { recipe: SearchResultsType[0] }) => (
  <Link href={`/recipe/${recipe.title.trim().split(" ").join("-")}`}>
    <Card className="w-full mt-2">
      <CardContent className="p-0">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <h3 className="font-semibold text-lg">{recipe.title}</h3>
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-4 w-4 ${
                i < 3 ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-500 ml-1">
            ({recipe._count.favorated} reviews)
          </span>
        </div>
        <div className="flex justify-between items-center w-full mt-2">
          <span className="text-sm text-gray-500">{recipe.cookTime} mins</span>
          {/* <Button variant="outline" size="sm">
            View Recipe
          </Button> */}
        </div>
      </CardFooter>
    </Card>
  </Link>
);
