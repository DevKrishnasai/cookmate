import { getRecipesWithName, SearchResultsType } from "@/actions/recipe";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ClockIcon, HeartIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const RightScrollSuggestions = async ({ recipeId }: { recipeId: string }) => {
  let recipes = await getRecipesWithName("");
  recipes = recipes.filter((recipe) => recipe.id !== recipeId);
  return (
    <div className="sticky top-5 right-8 w-1/4 hidden  lg:flex h-full border-2 rounded-lg shadow-xl m-6 ml-0 p-2  overflow-y-auto">
      <div className="  overflow-y-auto w-full h-full">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RightScrollSuggestions;

const RecipeCard = ({ recipe }: { recipe: any }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "from-green-400 to-green-600";
      case "medium":
        return "from-yellow-400 to-yellow-600";
      case "hard":
        return "from-red-400 to-red-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  return (
    <Link href={`/recipe/${recipe.title.trim().split(" ").join("-")}`}>
      <Card
        className={`w-full overflow-hidden rounded-xl shadow-md transition-all duration-300 ease-in-out
          hover:shadow-2xl hover:scale-[1.02] bg-white`}
      >
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-56 object-cover transition-transform duration-300"
          />
        </div>
        <CardContent className="p-0">
          <div
            className={` p-4
            bg-gradient-to-t ${getDifficultyColor(recipe.difficulty)}
            text-white`}
          >
            <h3 className="font-bold text-xl mb-2 truncate">{recipe.title}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(recipe.averageRating)
                        ? "text-yellow-300"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 font-semibold">
                  {recipe.averageRating.toFixed(1)}
                </span>
              </div>
              <span className="flex items-center gap-1 font-semibold">
                <HeartIcon className="h-5 w-5 fill-red-500" />
                {recipe._count.favorated}
              </span>
            </div>
            <div className="flex  justify-between items-center gap-2 mt-3 text-sm font-medium">
              <Badge
                variant="outline"
                className="flex items-center px-3 py-1 truncate"
              >
                <ClockIcon className="h-4 w-4 mr-1 " />
                {recipe.cookTime} mins
              </Badge>
              <Badge variant="outline" className="px-3 py-1 truncate ">
                {recipe.noOfServings} P
              </Badge>
              <Badge variant="outline" className="px-3 py-1 truncate ">
                {recipe.calories} Kcal
              </Badge>
              <Badge
                variant="outline"
                className={`capitalize  py-1
              ${getDifficultyColor(recipe.difficulty)} truncate text-clip`}
              >
                {recipe.difficulty}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
