"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecipeInformationType } from "@/types/recipe";
import { recipeInformation } from "@/schemas/recipe";
import { Textarea } from "@/components/ui/textarea";
import { Recipe } from "@prisma/client";
import { UploadButton } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface FieldsForRecipeInformationProps {
  onSubmit: (data: RecipeInformationType) => void;
  recipe: Recipe;
  onChange: (data: RecipeInformationType) => void;
}

const FieldsForRecipeInformation = ({
  recipe,
  onSubmit,
  onChange,
}: FieldsForRecipeInformationProps) => {
  const form = useForm<RecipeInformationType>({
    resolver: zodResolver(recipeInformation),
    defaultValues: {
      title: recipe.title,
      description: recipe.description,
      difficulty: recipe.difficulty,
      cooking_time: recipe.cookTime,
      no_of_servings: recipe.noOfServings,
      url: recipe.image,
    },
    mode: "onChange",
  });

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const subscription = form.watch((value) => {
      onChange(value as RecipeInformationType);
    });
    return () => subscription.unsubscribe();
  }, [form, onChange]);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (err) => console.error(err))}
          className="space-y-4"
        >
          <div
            className="w-full h-60 flex justify-center items-center border-2 border-dashed rounded-md hover:border-primary cursor-pointer hover:cursor-pointer"
            onClick={() => setEdit(true)}
          >
            {edit ? (
              <UploadButton
                endpoint="thumbnail"
                onClientUploadComplete={(res) => {
                  setEdit(false);
                  form.setValue("url", res[0].url);
                  console.log(res);
                }}
              />
            ) : form.getValues("url") === "" ? (
              <div className=" flex flex-col  justify-center items-center ">
                <ImageIcon size={40} />
                <p className="text-gray-500">No thumbnail uploaded</p>
                <p
                  className="hover:underline hover:cursor-pointer"
                  onClick={() => setEdit(true)}
                >
                  change
                </p>
              </div>
            ) : (
              <img
                src={form.getValues("url")}
                alt="thumbnail"
                className="object-fill w-full h-full  rounded-md"
              />
            )}
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Recipe Title
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Recipe Title (eg. Chicken Manchuria)"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Recipe name should be understandable and short
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Recipe Description
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Recipe Description (eg. A simple recipe to make Chicken Manchuria)"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Recipe description should be simple and easy to understand
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(v) => field.onChange(v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Select the difficulty level of the recipe
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cooking_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Cooking Time<span className="text-red-500">*</span> (in
                  minutes)
                </FormLabel>
                <FormControl>
                  <Input placeholder="Cooking Time (eg. 30)" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the cooking time of the recipe in minutes
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="no_of_servings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Number of Servings<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Number of Servings (eg. 4)" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the number of servings the recipe can make
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <Button className="w-full" variant={"outline"} type="submit">
            Save
          </Button> */}
        </form>
      </Form>
    </div>
  );
};

export default FieldsForRecipeInformation;
