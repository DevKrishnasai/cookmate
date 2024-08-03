"use client";
import React from "react";
import FieldsForRecipeInformation from "./FieldsForRecipeInformation";
import { UploadButton } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import { RecipeInformationType } from "@/types/recipe";
import { toast } from "sonner";
import { updateRecipeBasicDetails } from "@/actions/recipe";
import { Recipe } from "@prisma/client";

interface LeftSectionProps {
  recipe: Recipe;
}

const LeftSection = ({ recipe }: LeftSectionProps) => {
  const [edit, setEdit] = React.useState(false);
  const [thumbnail, setThumbnail] = React.useState(recipe.image);
  const onSubmit = async (data: RecipeInformationType) => {
    if (thumbnail === "") {
      toast.error("Please upload a thumbnail", {
        id: "saving-recipe-basic-information",
      });
      return;
    }
    toast.loading("Saving recipe information", {
      id: "saving-recipe-basic-information",
    });

    const isSuccess = await updateRecipeBasicDetails(recipe.id, {
      ...data,
      url: thumbnail,
    });

    if (isSuccess) {
      toast.success("Recipe information saved", {
        id: "saving-recipe-basic-information",
      });
    } else {
      toast.error("Failed to save recipe information", {
        id: "saving-recipe-basic-information",
      });
    }

    console.log(data);
  };
  return (
    <div className="mt-2 space-y-3">
      <div
        className="w-full h-60 flex justify-center items-center border-2 border-dashed rounded-md hover:border-primary cursor-pointer hover:cursor-pointer"
        onClick={() => setEdit(true)}
      >
        {edit ? (
          <UploadButton
            endpoint="thumbnail"
            onClientUploadComplete={(res) => {
              setEdit(false);
              setThumbnail(res[0].url);
            }}
          />
        ) : thumbnail === "" ? (
          <div className=" flex flex-col  justify-center items-center ">
            <ImageIcon size={40} />
            <p className="text-gray-500">No thumbnail uploaded</p>
            <p
              className="hover:underline hover:cursor-pointer"
              onClick={() => setEdit(true)}
            >
              change
            </p>
          </div>
        ) : (
          <img
            src={thumbnail}
            alt="thumbnail"
            className="object-fill w-full h-full  rounded-md"
          />
        )}
      </div>
      <FieldsForRecipeInformation onSubmit={onSubmit} recipe={recipe} />
    </div>
  );
};

export default LeftSection;
