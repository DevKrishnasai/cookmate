import { Ingredient, Recipe } from "@prisma/client";
import RecipeIngridentsSection from "./RecipeIngridentsSection";

const RightSection1 = ({
  recipe,
  ingredients,
}: {
  recipe: Recipe;
  ingredients: Ingredient[];
}) => {
  return <RecipeIngridentsSection recipe={recipe} ingredients={ingredients} />;
};

export default RightSection1;
