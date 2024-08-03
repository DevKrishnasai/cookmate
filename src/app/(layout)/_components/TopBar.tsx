"use client";
import { Button } from "@/components/ui/button";
import { LucideSettings, Search } from "lucide-react";
import React, { useState } from "react";
import RecipeCreateDialog from "./RecipeCreateDialog";
import { toast } from "sonner";
import { createRecipe } from "@/actions/recipe";
import { redirect, useRouter } from "next/navigation";

const TopBar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const router = useRouter();
  //TODO : add search functionality

  const createARecipe = async () => {
    toast.loading("Creating recipe...", {
      id: "create-recipe",
    });
    if (!recipeName) {
      toast.error("Please enter a recipe name", {
        id: "create-recipe",
      });
      return;
    }
    if (!/^[a-zA-Z0-9- ]*$/.test(recipeName)) {
      toast.error("Recipe name should not contain special characters", {
        id: "create-recipe",
      });
      return;
    }
    const data = await createRecipe(recipeName);
    if (!data) {
      toast.error("Error creating recipe", {
        id: "create-recipe",
      });
      return;
    }
    setOpen(false);
    toast.success("Recipe created successfully", {
      id: "create-recipe",
    });
    router.push(`/create-recipe/${recipeName.trim().split(" ").join("-")}`);
  };
  return (
    <div className="w-full my-2 flex justify-between items-center">
      <div className="w-72 flex justify-start items-center border-2 gap-3 p-3 rounded-lg">
        <Search />
        <input
          placeholder="Search"
          className="border-0 outline-none w-full h-full"
        />
      </div>
      <div className="flex items-center gap-3">
        <LucideSettings />
        <RecipeCreateDialog
          trigger={<Button variant={"outline"}>AddRecipe</Button>}
          open={open}
          setOpen={setOpen}
          onSubmit={createARecipe}
          setRecipeName={setRecipeName}
        />
      </div>
    </div>
  );
};

export default TopBar;
