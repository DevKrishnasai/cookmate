"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { FaClock, FaUsers, FaFire, FaCheckCircle } from "react-icons/fa";
import { DetailedRecipeType, favoriteARecipe } from "@/actions/recipe";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { FcRating } from "react-icons/fc";
import RatingPopUp from "./RatingPopUp";

// interface Ingredient {
//   amount: string;
//   name: string;
// }

// interface Step {
//   number: number;
//   description: string;
// }

// interface Recipe {
//   name: string;
//   image: string;
//   author: string;
//   description: string;
//   prepTime: string;
//   servings: string;
//   calories: string;
//   ingredients: Ingredient[];
//   steps: Step[];
// }

// const recipeData: Recipe = {
//   name: "Portakallı Pankek",
//   image: "/cupcakes.jpg", // Replace with your actual image path
//   author: "Seda Turan Tarifi",
//   description: "Herkesin severek yediği portakallı pankek tarifimiz",
//   prepTime: "Toplam 40dk",
//   servings: "4 kişilik",
//   calories: "1 adet 270 kalori",
//   ingredients: [
//     { amount: "1 adet", name: "Portakal" },
//     { amount: "500 gr", name: "Pankek Hamuru" },
//     { amount: "1 adet", name: "Yumurta" },
//     { amount: "1 paket", name: "Vanilya" },
//     { amount: "2 yemek kaşığı", name: "Yoğurt" },
//   ],
//   steps: [
//     { number: 1, description: "Portakalı yıkayın ve kabuğunu rendeleyin." },
//     { number: 2, description: "Bir kasede pankek hamurunu hazırlayın." },
//     {
//       number: 3,
//       description: "Yumurtayı, vanilyayı ve yoğurdu ekleyip karıştırın.",
//     },
//     { number: 4, description: "Portakal rendesini ve suyunu hamura ekleyin." },
//     { number: 5, description: "Tavada pankekleri pişirin." },
//   ],
// };

interface RecipeDetailProps {
  recipe: DetailedRecipeType;
  visitedUser: boolean;
  isFavorited: boolean;
  stars: number;
}

const RecipeDetail = ({
  recipe,
  visitedUser,
  isFavorited,
  stars,
}: RecipeDetailProps) => {
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);
  const [isFavorite, setIsFavorite] = React.useState(isFavorited);
  const [open, setOpen] = React.useState(false);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber)
        ? prev.filter((step) => step !== stepNumber)
        : [...prev, stepNumber]
    );
    localStorage.setItem(
      `${recipe?.id}-steps`,
      JSON.stringify(
        completedSteps.includes(stepNumber)
          ? completedSteps.filter((step) => step !== stepNumber)
          : [...completedSteps, stepNumber]
      )
    );
  };

  //save to local storage
  useEffect(() => {
    const steps = localStorage.getItem(`${recipe?.id}-steps`);
    if (steps) {
      setCompletedSteps(JSON.parse(steps));
    }
  }, []);

  const toggleFavorite = async () => {
    try {
      if (!recipe) return;
      setIsFavorite((f) => !f);
      await favoriteARecipe(recipe.id);
    } catch (error) {
      console.error("Error while toggling favorite", error);
    }
  };

  return (
    <div className="w-full h-full border-2 rounded-lg shadow-xl m-6 ml-0 p-2 space-y-3 overflow-y-auto">
      <div className="relative">
        <Image
          src={recipe?.image || ""}
          alt={recipe?.title || ""}
          width={800}
          height={400}
          className="w-full h-80 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <h1 className="text-4xl font-bold text-white mb-2">
            {recipe?.title}
          </h1>

          <p className="text-lg text-gray-200">{recipe?.description}</p>
        </div>
      </div>
      <div className="p-3 space-y-8">
        <div className="flex items-center gap-2 w-full">
          <div className="flex w-full items-center justify-between text-sm text-gray-600 bg-gray-100 p-4 rounded-lg">
            <span className="flex items-center">
              <FaClock className="mr-2" /> {recipe?.cookTime} mins
            </span>
            <span className="flex items-center">
              <FaUsers className="mr-2" />{" "}
              {recipe?.noOfServings && recipe.noOfServings >= 2
                ? `${recipe.noOfServings} Servings`
                : `${recipe?.noOfServings} Serving`}
            </span>
            <span className="flex items-center">
              <FaFire className="mr-2" /> 20 Calories
            </span>
          </div>
          {!visitedUser &&
            (isFavorite ? (
              <>
                <Heart
                  size={30}
                  className={cn(
                    "ml-3  border-none",
                    isFavorite && "fill-red-500"
                  )}
                  onClick={toggleFavorite}
                />
                <RatingPopUp
                  trigger={
                    <FcRating
                      size={30}
                      className={cn(
                        "ml-3  border-none",
                        isFavorite && "fill-red-500"
                      )}
                      onClick={() => setOpen(true)}
                    />
                  }
                  open={open}
                  setOpen={setOpen}
                  recipeId={recipe?.id || ""}
                  stars={stars}
                />
              </>
            ) : (
              <Heart
                size={30}
                className={cn(
                  "ml-3  border-none",
                  isFavorite && "fill-red-500"
                )}
                onClick={toggleFavorite}
              />
            ))}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4">
            {recipe?.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className=" bg-orange-100 p-3 flex justify-between items-center rounded-full"
              >
                <span>{ingredient.name}</span>
                <span className="font-medium mr-2">
                  {ingredient.quantity} {ingredient.quantityType}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Steps</h2>
          <ol className="space-y-4">
            {recipe?.steps.map((step) => (
              <li
                key={step.step}
                className={`flex items-start p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                  completedSteps.includes(step.step)
                    ? "bg-green-100"
                    : "bg-gray-100"
                }`}
                onClick={() => toggleStep(step.step)}
              >
                <span className="font-bold mr-4">{step.step}.</span>
                <p className="flex-grow">{step.description}</p>
                <FaCheckCircle
                  className={`text-2xl ${
                    completedSteps.includes(step.step)
                      ? "text-green-500"
                      : "text-gray-300"
                  }`}
                />
              </li>
            ))}
          </ol>
        </div>

        <div className="text-center"></div>
      </div>
    </div>
  );
};

export default RecipeDetail;
