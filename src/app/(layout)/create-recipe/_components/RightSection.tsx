import { Ingredient, Recipe } from "@prisma/client";
import RecipeIngridentsSection from "./RecipeIngridentsSection";
import { RecipeIngredientType } from "@/types/recipe";

const RightSection1 = ({
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
  return (
    <RecipeIngridentsSection
      recipe={recipe}
      ingredients={ingredients}
      onSubmit={onSubmit}
      setLoading={setLoading}
      formData={formData}
      setFormData={setFormData}
    />
  );
};

export default RightSection1;
