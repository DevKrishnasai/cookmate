"use client";
import React, { useState } from "react";
import PathStack from "../../_components/PathStack";
import ActionButtons from "./ActionButtons";
import RightSection1 from "./RightSection";
import LeftSection from "./LeftSection";
import RightSection2 from "./RightSection2";
import {
  updateRecipeBasicDetails,
  updateRecipeIngredients,
  updateRecipeSteps,
} from "@/actions/recipe";
import {
  RecipeInformationType,
  RecipeIngredientType,
  RecipeStepType,
} from "@/types/recipe";
import { Ingredient, Recipe, Step } from "@prisma/client";

interface PageWraperProps {
  recipe: Recipe & { ingredients: Ingredient[]; steps: Step[] };
}

const PageWraper = ({ recipe }: PageWraperProps) => {
  const [loading, setLoading] = useState(false);
  const basicDetails = async (data: RecipeInformationType) => {
    const isSuccess = await updateRecipeBasicDetails(recipe.id, {
      ...data,
    });
  };

  const ingredientsDetails = async (data: RecipeIngredientType) => {
    const formattedIngredients = data.ingredients.map((ing) => ({
      name: ing.name,
      quantity: ing.quantity,
      quantity_type: ing.quantity_type,
    }));

    const isSuccess = await updateRecipeIngredients(recipe.id, {
      ingredients: formattedIngredients,
    });
  };

  const stepsDetails = async (data: RecipeStepType) => {
    const isSuccess = await updateRecipeSteps(recipe.id, {
      steps: data.steps,
    });
  };

  return (
    <>
      <div className="flex justify-between items-center m-2">
        {/* <Link href="/home" className="flex items-center gap-1">
          <ArrowLeft size={20} />
          <p className="font-bold">back</p>
        </Link> */}
        <PathStack />

        <ActionButtons loading={loading} />
      </div>
      <div className="m-2 flex flex-col lg:flex-row max-h-[calc(100vh-140px)] gap-4 overflow-y-auto">
        <div className="w-full h-full  lg:w-2/5 border-2 shadow-xl rounded-lg p-3">
          <h1 className="font-bold text-xl">Recipe Basic Information</h1>
          <LeftSection
            recipe={recipe}
            onSubmit={basicDetails}
            setLoading={setLoading}
          />
        </div>
        <div className="flex w-full flex-col gap-5">
          <div className="w-full  min-h-fit max-h-[50%] border-2 rounded-lg p-3 overflow-y-auto shadow-xl">
            <RightSection1
              recipe={recipe}
              ingredients={recipe.ingredients}
              onSubmit={ingredientsDetails}
              setLoading={setLoading}
            />
          </div>
          <div className="w-full  min-h-fit max-h-full border-2 rounded-lg p-3 overflow-y-auto shadow-xl">
            <RightSection2
              recipe={recipe}
              steps={recipe.steps}
              onSubmit={stepsDetails}
              setLoading={setLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageWraper;
