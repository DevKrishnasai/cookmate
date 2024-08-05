"use client";

import React, { useEffect, useState, useCallback } from "react";
import FieldsForRecipeInformation from "./FieldsForRecipeInformation";
import { RecipeInformationType } from "@/types/recipe";
import { toast } from "sonner";
import { updateRecipeBasicDetails } from "@/actions/recipe";
import { Recipe } from "@prisma/client";
import { recipeInformation } from "@/schemas/recipe";
import { useRouter } from "next/navigation";

interface LeftSectionProps {
  recipe: Recipe;
  onSubmit: (data: RecipeInformationType) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  formData: RecipeInformationType | null;
  setFormData: React.Dispatch<
    React.SetStateAction<RecipeInformationType | null>
  >;
}

const LeftSection = ({
  recipe,
  onSubmit,
  setLoading,
  formData,
  setFormData,
}: LeftSectionProps) => {
  const router = useRouter();

  const saveRecipeInfo = useCallback(
    async (data: RecipeInformationType) => {
      const isSuccess = recipeInformation.safeParse(data);
      if (!isSuccess.success) {
        return;
      }
      setLoading(true);
      toast.loading("auto saving...", {
        id: "auto-save",
      });

      const success = await updateRecipeBasicDetails(recipe.id, {
        ...data,
      });

      if (success) {
        toast.success("saved your recipe...", {
          id: "auto-save",
        });
      } else {
        toast.error("Failed to auto save", {
          id: "auto-save",
        });
      }
      setLoading(false);
      router.refresh();
    },
    [recipe.id]
  );

  useEffect(() => {
    if (formData) {
      const timeout = setTimeout(() => {
        console.log("Auto saving...");
        saveRecipeInfo(formData);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [formData, saveRecipeInfo]);

  const onChange = (data: RecipeInformationType) => {
    console.log(data);
    const formatedData = recipeInformation.safeParse(data);
    if (formatedData.success) {
      console.log(formatedData.data);
      setFormData(formatedData.data);
    }
  };

  return (
    <div className="mt-2 space-y-3">
      <FieldsForRecipeInformation
        onSubmit={onSubmit}
        onChange={onChange}
        recipe={recipe}
      />
    </div>
  );
};

export default LeftSection;
