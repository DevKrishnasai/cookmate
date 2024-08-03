import { Recipe, Step } from "@prisma/client";
import RecipeStepsSection from "./RecipeStepsSection";
import { RecipeStepType } from "@/types/recipe";

const RightSection2 = ({
  recipe,
  steps,
  onSubmit,
  setLoading,
  formData,
  setFormData,
}: {
  recipe: Recipe;
  steps: Step[];
  onSubmit: (data: RecipeStepType) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  formData: RecipeStepType | null;
  setFormData: React.Dispatch<React.SetStateAction<RecipeStepType | null>>;
}) => {
  return (
    <RecipeStepsSection
      recipe={recipe}
      steps={steps}
      onSubmit={onSubmit}
      setLoading={setLoading}
      formData={formData}
      setFormData={setFormData}
    />
  );
};

export default RightSection2;
