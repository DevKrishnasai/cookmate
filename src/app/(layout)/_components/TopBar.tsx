"use client";
import { Button } from "@/components/ui/button";
import { LucideSettings, Search } from "lucide-react";
import React, { useState } from "react";
import RecipeCreateDialog from "./RecipeCreateDialog";
import { toast } from "sonner";

const TopBar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [recipeName, setRecipeName] = useState("");
  //TODO : add search functionality

  const createARecipe = () => {
    toast.loading("Creating recipe...", {
      id: "create-recipe",
    });
    if (!recipeName) {
      toast.error("Please enter a recipe name", {
        id: "create-recipe-name",
      });
      return;
    }
    setOpen(false);
    toast.success("Recipe created successfully", {
      id: "create-recipe",
    });
    //TODO : add recipe creation logic
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
        />
      </div>
    </div>
  );
};

export default TopBar;
