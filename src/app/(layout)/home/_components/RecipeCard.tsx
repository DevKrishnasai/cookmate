import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarIcon } from "lucide-react";
import { SearchResultsType } from "@/actions/recipe";
import Link from "next/link";

const RecipeCard = ({ recipe }: { recipe: SearchResultsType[0] }) => (
  <Link href={`/recipe/${recipe.title.trim().split(" ").join("-")}`}>
    <Card className="w-full">
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
          <Button variant="outline" size="sm">
            View Recipe
          </Button>
        </div>
      </CardFooter>
    </Card>
  </Link>
);

interface RecipeComponentProps {
  recipes: SearchResultsType;
}

const RecipeComponent = ({ recipes }: RecipeComponentProps) => {
  return (
    <div className=" mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Learn, Cook, & Eat your food</h1>
      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="pizza">
          <TabsList>
            <TabsTrigger value="pizza">Pizza</TabsTrigger>
            <TabsTrigger value="dessert">Dessert</TabsTrigger>
            <TabsTrigger value="noodle">Noodle</TabsTrigger>
            <TabsTrigger value="cocktails">Cocktails</TabsTrigger>
            <TabsTrigger value="salad">Salad</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[calc(100vh-300px)] overflow-y-auto">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeComponent;
