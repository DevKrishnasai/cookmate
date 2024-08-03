import { Ingredient, Recipe } from "@prisma/client";
import RecipeIngridentsSection from "./RecipeIngridentsSection";
import { RecipeIngredientType } from "@/types/recipe";

const RightSection1 = ({
  recipe,
  ingredients,
  onSubmit,
  setLoading,
}: {
  recipe: Recipe;
  ingredients: Ingredient[];
  onSubmit: (data: RecipeIngredientType) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <RecipeIngridentsSection
      recipe={recipe}
      ingredients={ingredients}
      onSubmit={onSubmit}
      setLoading={setLoading}
    />
  );
};

export default RightSection1;
