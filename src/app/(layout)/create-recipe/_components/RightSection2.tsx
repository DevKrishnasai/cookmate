import { Recipe, Step } from "@prisma/client";
import RecipeStepsSection from "./RecipeStepsSection";

const RightSection2 = ({
  recipe,
  steps,
}: {
  recipe: Recipe;
  steps: Step[];
}) => {
  return <RecipeStepsSection recipe={recipe} steps={steps} />;
};

export default RightSection2;
