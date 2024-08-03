import {
  recipeInformation,
  recipeQuantityInformation,
  recipeStepsInformation,
} from "@/schemas/recipe";
import { z } from "zod";

export type RecipeInformationType = z.infer<typeof recipeInformation>;

export type RecipeIngredientType = z.infer<typeof recipeQuantityInformation>;

export type RecipeStepType = z.infer<typeof recipeStepsInformation>;
