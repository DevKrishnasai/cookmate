import { z } from "zod";

export const recipeInformation = z.object({
  title: z
    .string()
    .min(3, { message: "recipe title should be understandable" })
    .max(50, { message: "recipe title should be short" }),
  no_of_servings: z.coerce.number().int().positive(),
  cooking_time: z.coerce.number().int().positive(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  calories: z.coerce.number().int().positive(),
  description: z.string().min(1, {
    message: "description should be at least 10 characters",
  }),
  url: z.string().optional(),
  category: z.string().min(1, {
    message: "category should be given",
  }),
});

export const recipeIngredient = z.object({
  name: z
    .string()
    .min(3, {
      message: "should be at least 3 characters",
    })
    .max(30, {
      message: "should be at most 30 characters",
    }),
  quantity_type: z.enum([
    "Cup",
    "Tablespoon",
    "Gram",
    "Kilogram",
    "Pound",
    "Milliliter",
    "Unit",
  ]),
  quantity: z.coerce
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .int()
    .positive(),
});

export const recipeQuantityInformation = z.object({
  ingredients: z.array(recipeIngredient),
});

export const recipeStep = z.object({
  step: z.coerce.number().int().positive(),
  description: z
    .string()
    .min(5, { message: "should be at least 5 characters" }),
});

export const recipeStepsInformation = z.object({
  steps: z.array(recipeStep),
});
