"use client";
import { Button } from "@/components/ui/button";
import { LucideSettings, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import RecipeCreateDialog from "./RecipeCreateDialog";
import { toast } from "sonner";
import { createRecipe } from "@/actions/recipe";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
interface TopBarProps {
  recipe: string;
  // setSearch: (search: string) => void;
}
const TopBar = ({ recipe }: TopBarProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeName, setRecipeName] = useState("");
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        router.push(`/home?recipe=${search}`);
      } else {
        router.push(`/home`);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [router, search]);

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
    setLoading(true);
    const data = await createRecipe(recipeName);
    if (!data) {
      toast.error("Error creating recipe", {
        id: "create-recipe",
      });
      setLoading(false);
      return;
    }
    setLoading(false);
    setOpen(false);
    toast.success("Recipe created successfully", {
      id: "create-recipe",
    });
    router.push(`/create-recipe/${data}`);
  };

  return (
    <div className="w-full p-2 flex justify-between gap-3 items-center">
      <div className="ml-8 w-full lg:w-96 lg:ml-0  flex justify-start items-center border-2 gap-3 p-2 rounded-lg">
        <Search />
        <input
          placeholder="Search"
          className="border-0 outline-none w-full h-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3">
        <Link href="/settings">
          <LucideSettings />
        </Link>
        {isSignedIn && (
          <div className="hidden lg:block">
            <RecipeCreateDialog
              trigger={<Button variant={"outline"}>create recipe</Button>}
              open={open}
              setOpen={setOpen}
              onSubmit={createARecipe}
              setRecipeName={setRecipeName}
              loading={loading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
