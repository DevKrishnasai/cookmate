"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { recipeStepsInformation } from "@/schemas/recipe";
import { RecipeStepType } from "@/types/recipe";
import { PlusCircle } from "lucide-react";
import { Recipe, Step } from "@prisma/client";
import { toast } from "sonner";
import { updateRecipeSteps } from "@/actions/recipe";
import { useRouter } from "next/navigation";

interface RecipeStepsSectionProps {
  recipe: Recipe;
  steps: Step[];
  onSubmit: (data: RecipeStepType) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  formData: RecipeStepType | null;
  setFormData: React.Dispatch<React.SetStateAction<RecipeStepType | null>>;
}

const RecipeStepsSection = ({
  recipe,
  steps,
  onSubmit,
  setLoading,
  formData,
  setFormData,
}: RecipeStepsSectionProps) => {
  const form = useForm<RecipeStepType>({
    resolver: zodResolver(recipeStepsInformation),
    defaultValues: {
      steps,
    },
    mode: "onChange",
  });
  const router = useRouter();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "steps",
  });

  const saveRecipeInfo = useCallback(
    async (data: RecipeStepType) => {
      let isSuccess = recipeStepsInformation.safeParse(data);
      if (!isSuccess.success) {
        return;
      }
      setLoading(true);
      toast.loading("Saving recipe information", {
        id: "recipe-steps",
      });

      const success = await updateRecipeSteps(recipe.id, {
        steps: isSuccess.data.steps,
      });

      if (success) {
        toast.success("Recipe information saved", {
          id: "recipe-steps",
        });
      } else {
        toast.error("Failed to save recipe information", {
          id: "recipe-steps",
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

  useEffect(() => {
    const onChange = (data: RecipeStepType) => {
      const formatedData = recipeStepsInformation.safeParse(data);
      if (formatedData.success) {
        setFormData(formatedData.data);
      }
    };

    const subscription = form.watch((value) => {
      onChange(value as RecipeStepType);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center gap-4">
          <h1 className="font-bold text-xl">Recipe Steps</h1>
          {/* <Button type="submit">save</Button> */}
        </div>
        <div className="w-full  flex flex-col gap-4 ">
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`steps.${index}.description`}
              render={({ field }) => (
                <FormItem className="w-full space-y-3">
                  <FormLabel className="flex justify-between items-center gap-4">
                    <p>Description for step-{`${index + 1}`}</p>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                      >
                        Remove Step
                      </Button>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button
          className="w-full mt-4"
          type="button"
          variant="outline"
          onClick={() => append({ step: fields.length + 1, description: "" })}
        >
          <PlusCircle size={20} className="mr-1" />
          Add Step
        </Button>
      </form>
    </Form>
  );
};

export default RecipeStepsSection;
