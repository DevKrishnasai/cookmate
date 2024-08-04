"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { recipeIngredient, recipeQuantityInformation } from "@/schemas/recipe";
import { PlusCircle } from "lucide-react";
import * as z from "zod";
import { Ingredient, Recipe } from "@prisma/client";
import { toast } from "sonner";
import { updateRecipeIngredients } from "@/actions/recipe";
import { useCallback, useEffect, useState } from "react";
import { RecipeIngredientType } from "@/types/recipe";
import { useRouter } from "next/navigation";

type RecipeFormType = z.infer<typeof recipeQuantityInformation>;

const RecipeIngredientsSection = ({
  recipe,
  ingredients,
  onSubmit,
  setLoading,
  formData,
  setFormData,
}: {
  recipe: Recipe;
  ingredients: Ingredient[];
  onSubmit: (data: RecipeIngredientType) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  formData: RecipeIngredientType | null;
  setFormData: React.Dispatch<
    React.SetStateAction<RecipeIngredientType | null>
  >;
}) => {
  const filteredIngredients = ingredients.map((ingredient) => ({
    name: ingredient.name || "",
    quantity: ingredient.quantity,
    quantity_type: ingredient.quantityType as
      | "Cup"
      | "Tablespoon"
      | "Gram"
      | "Kilogram"
      | "Pound"
      | "Milliliter"
      | "Unit",
  }));

  const form = useForm<RecipeFormType>({
    resolver: zodResolver(recipeQuantityInformation),
    defaultValues: {
      ingredients: filteredIngredients,
    },
    mode: "onChange",
  });
  const router = useRouter();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const saveIngredients = useCallback(
    async (data: RecipeFormType) => {
      const isSuccess = recipeQuantityInformation.safeParse(data);
      if (!isSuccess.success) {
        return;
      }
      setLoading(true);
      toast.loading("auto saveing...", {
        id: "auto-save",
      });

      const formattedIngredients = data.ingredients.map((ing) => ({
        name: ing.name,
        quantity: ing.quantity,
        quantity_type: ing.quantity_type,
      }));

      const success = await updateRecipeIngredients(recipe.id, {
        ingredients: formattedIngredients,
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
        saveIngredients(formData);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [formData, saveIngredients]);

  useEffect(() => {
    const onChange = (data: RecipeIngredientType) => {
      const formatedData = recipeQuantityInformation.safeParse(data);
      if (formatedData.success) {
        setFormData(formatedData.data);
      }
    };

    const subscription = form.watch((value) => {
      onChange(value as RecipeIngredientType);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const addIngredient = () => {
    append({ name: "", quantity: 1, quantity_type: "Unit" });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) =>
          console.error("Form errors", errors)
        )}
        className="space-y-3"
      >
        <div className="flex justify-between items-center gap-4">
          <h1 className="font-bold text-xl">Recipe Ingredients</h1>
          {/* <Button type="submit">Save</Button> */}
        </div>
        <div className="w-full flex flex-col gap-5">
          {fields.map((field, index) => (
            <div key={field.id} className="flex w-full items-center gap-2">
              <FormField
                control={form.control}
                name={`ingredients.${index}.name`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Ingredient name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`ingredients.${index}.quantity`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Quantity (eg. 1)"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10) || "")
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`ingredients.${index}.quantity_type`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          "Cup",
                          "Tablespoon",
                          "Gram",
                          "Kilogram",
                          "Pound",
                          "Milliliter",
                          "Unit",
                        ].map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => remove(index)}
                disabled={index === 0}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
        <Button
          className="w-full"
          type="button"
          variant="outline"
          onClick={addIngredient}
        >
          <PlusCircle size={20} className="mr-1" />
          Add Ingredient
        </Button>
      </form>
    </Form>
  );
};

export default RecipeIngredientsSection;
