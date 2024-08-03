"use client";

import React, { useEffect, useState, useCallback } from "react";
import FieldsForRecipeInformation from "./FieldsForRecipeInformation";
import { RecipeInformationType } from "@/types/recipe";
import { toast } from "sonner";
import { updateRecipeBasicDetails } from "@/actions/recipe";
import { Recipe } from "@prisma/client";
import { recipeInformation } from "@/schemas/recipe";

interface LeftSectionProps {
  recipe: Recipe;
  onSubmit: (data: RecipeInformationType) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftSection = ({ recipe, onSubmit, setLoading }: LeftSectionProps) => {
  const [formData, setFormData] = useState<RecipeInformationType | null>(null);

  const saveRecipeInfo = useCallback(
    async (data: RecipeInformationType) => {
      setLoading(true);
      toast.loading("auto saving...", {
        id: "auto-save",
      });

      const isSuccess = await updateRecipeBasicDetails(recipe.id, {
        ...data,
      });

      if (isSuccess) {
        toast.success("saved your recipe...", {
          id: "auto-save",
        });
      } else {
        toast.error("Failed to auto save", {
          id: "auto-save",
        });
      }
      setLoading(false);
    },
    [recipe.id]
  );

  useEffect(() => {
    if (formData) {
      const timeout = setTimeout(() => {
        console.log("Auto saving...");
        saveRecipeInfo(formData);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [formData, saveRecipeInfo]);

  const onChange = (data: RecipeInformationType) => {
    const formatedData = recipeInformation.safeParse(data);
    if (formatedData.success) {
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
