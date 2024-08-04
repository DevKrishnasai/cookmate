"use client";
import { deleteRecipeById, TableDataType } from "@/actions/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ActionsFieldProps {
  recipe: TableDataType;
}
const ActionsField = ({ recipe }: ActionsFieldProps) => {
  const router = useRouter();

  const pushToEditScreen = (recipeId: string) => {
    toast.loading("loading recipe edit page...", {
      id: "loading-recipe",
    });
    router.push(`/create-recipe/${recipeId}`);
    toast.success("recipe page loaded now you can edit", {
      id: "loading-recipe",
    });
  };

  const deleteRecipe = async (recipeId: string) => {
    await deleteRecipeById(recipeId);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => pushToEditScreen(recipe.id)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteRecipe(recipe.id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsField;
