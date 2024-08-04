"use client";
import React, { useState } from "react";
import PathStack from "../../_components/PathStack";
import ActionButtons from "./ActionButtons";
import RightSection1 from "./RightSection";
import LeftSection from "./LeftSection";
import RightSection2 from "./RightSection2";
import {
  publishRecipe,
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PageWraperProps {
  recipe: Recipe & { ingredients: Ingredient[]; steps: Step[] };
  isPublishable: boolean;
}

const PageWraper = ({ recipe, isPublishable }: PageWraperProps) => {
  const [loading, setLoading] = useState(false);
  const [basic, setBasic] = useState<RecipeInformationType | null>(null);
  const [ingredients, setIngredients] = useState<RecipeIngredientType | null>(
    null
  );
  const [steps, setSteps] = useState<RecipeStepType | null>(null);
  const router = useRouter();
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

  const onPublish = async () => {
    toast.loading("Publishing Recipe", {
      id: "publishing",
    });
    const isSuccess = await publishRecipe(recipe.id);
    if (isSuccess) {
      toast.success(
        `Recipe ${recipe.published ? "unpublished" : "published"}`,
        {
          id: "publishing",
        }
      );
    } else {
      toast.error("Failed to Publish Recipe", {
        id: "publishing",
      });
    }
    router.refresh();
  };

  return (
    <>
      <div className="flex justify-between items-center m-2">
        {/* <Link href="/home" className="flex items-center gap-1">
          <ArrowLeft size={20} />
          <p className="font-bold">back</p>
        </Link> */}
        <PathStack />

        <ActionButtons
          recipeId={recipe.id}
          loading={loading}
          isPublishable={isPublishable}
          isPublished={recipe.published}
          onPublish={onPublish}
        />
      </div>
      <div className="m-2 flex flex-col lg:flex-row max-h-[calc(100vh-140px)] gap-4 overflow-y-auto">
        <div className="w-full h-full  lg:w-2/5 border-2 shadow-xl rounded-lg p-3">
          <h1 className="font-bold text-xl">Recipe Basic Information</h1>
          <LeftSection
            recipe={recipe}
            onSubmit={basicDetails}
            setLoading={setLoading}
            formData={basic}
            setFormData={setBasic}
          />
        </div>
        <div className="flex w-full flex-col gap-5">
          <div className="w-full  min-h-fit max-h-[50%] border-2 rounded-lg p-3 overflow-y-auto shadow-xl">
            <RightSection1
              recipe={recipe}
              ingredients={recipe.ingredients}
              onSubmit={ingredientsDetails}
              setLoading={setLoading}
              formData={ingredients}
              setFormData={setIngredients}
            />
          </div>
          <div className="w-full  min-h-fit max-h-full border-2 rounded-lg p-3 overflow-y-auto shadow-xl">
            <RightSection2
              recipe={recipe}
              steps={recipe.steps}
              onSubmit={stepsDetails}
              setLoading={setLoading}
              formData={steps}
              setFormData={setSteps}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageWraper;
