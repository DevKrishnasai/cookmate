import { redirect } from "next/navigation";
import { getUserElseCreate } from "@/actions/user";
import { db } from "@/lib/db";
import PageWraper from "../_components/PageWraper";

const page = async ({ params }: { params: { recipe: string } }) => {
  const user = await getUserElseCreate();
  if (!user) {
    redirect("/sign-in");
  }

  const recipeId = params.recipe;

  const recipe = await db.recipe.findFirst({
    where: {
      userId: user.id,
      id: recipeId,
    },
    include: {
      ingredients: true,
      steps: true,
    },
  });

  if (!recipe) {
    redirect("/profile");
  }

  const requiredFields = [
    recipe.title.length > 1,
    recipe.description.length > 1,
    recipe.steps.length > 0,
    recipe.cookTime > 0,
    recipe.calories > 0,
    recipe.category.length > 0,
    recipe.image.length > 0,
    recipe.ingredients.every((ing) => ing.name.length > 0),
    recipe.steps.every((step) => step.description.length > 3),
  ];

  const isRecipePublishable = requiredFields.every((field) => field);

  return (
    <div className="w-full h-full border-2 rounded-lg shadow-xl lg:m-6 lg:ml-0 p-2 space-y-3">
      <PageWraper recipe={recipe} isPublishable={isRecipePublishable} />
    </div>
  );
};

export default page;
