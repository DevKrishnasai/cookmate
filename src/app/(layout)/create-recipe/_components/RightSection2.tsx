import { Recipe, Step } from "@prisma/client";
import RecipeStepsSection from "./RecipeStepsSection";
import { RecipeStepType } from "@/types/recipe";

const RightSection2 = ({
  recipe,
  steps,
  onSubmit,
  setLoading,
}: {
  recipe: Recipe;
  steps: Step[];
  onSubmit: (data: RecipeStepType) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <RecipeStepsSection
      recipe={recipe}
      steps={steps}
      onSubmit={onSubmit}
      setLoading={setLoading}
    />
  );
};

export default RightSection2;
