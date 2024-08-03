import { redirect } from "next/navigation";
import { getUserElseCreate } from "@/actions/user";
import { db } from "@/lib/db";
import PageWraper from "../_components/PageWraper";

const page = async ({ params }: { params: { recipe: string } }) => {
  const user = await getUserElseCreate();
  if (!user) {
    redirect("/sign-in");
  }

  const recipeTitle = params.recipe.replace(/-/g, " ");

  console.log(recipeTitle);

  const recipe = await db.recipe.findFirst({
    where: {
      userId: user.id,
      title: recipeTitle,
    },
    include: {
      ingredients: true,
      steps: true,
    },
  });

  if (!recipe) {
    redirect("/profile");
  }

  return (
    <div className="w-full border-2 rounded-lg shadow-xl m-6 ml-0 p-2 space-y-3">
      <PageWraper recipe={recipe} />
    </div>
  );
};

export default page;
