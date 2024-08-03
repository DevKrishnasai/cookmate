import { redirect } from "next/navigation";
import PathStack from "../../_components/PathStack";
import { Button } from "@/components/ui/button";
import LeftSection from "../_components/LeftSection";
import { getUserElseCreate } from "@/actions/user";
import RightSection1 from "../_components/RightSection";
import RightSection2 from "../_components/RightSection2";
import { db } from "@/lib/db";

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
      <div className="flex justify-between items-center m-2">
        {/* <Link href="/home" className="flex items-center gap-1">
          <ArrowLeft size={20} />
          <p className="font-bold">back</p>
        </Link> */}
        <PathStack />

        <div className="flex  gap-2 items-center">
          <Button variant={"outline"}>Preview</Button>
          <Button variant={"outline"}>Save</Button>
          <Button variant={"outline"}>Publish</Button>
        </div>
      </div>
      <div className="m-2 flex flex-col lg:flex-row max-h-[calc(100vh-140px)] gap-4 overflow-y-auto">
        <div className="w-full h-full  lg:w-2/5 border-2 shadow-xl rounded-lg p-3">
          <h1 className="font-bold text-xl">Recipe Basic Information</h1>
          <LeftSection recipe={recipe} />
        </div>
        <div className="flex w-full flex-col gap-5">
          <div className="w-full  min-h-fit max-h-[50%] border-2 rounded-lg p-3 overflow-y-auto shadow-xl">
            <RightSection1 recipe={recipe} ingredients={recipe.ingredients} />
          </div>
          <div className="w-full  min-h-fit max-h-full border-2 rounded-lg p-3 overflow-y-auto shadow-xl">
            <RightSection2 recipe={recipe} steps={recipe.steps} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
