"use client";
import { Button } from "@/components/ui/button";
import { CloudDownload, CloudUpload } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
interface ActionButtonsProps {
  loading: boolean;
  isPublishable: boolean;
  onPublish: () => void;
  isPublished: boolean;
  recipeId: string;
}
const ActionButtons = ({
  loading,
  isPublishable,
  onPublish,
  isPublished,
  recipeId,
}: ActionButtonsProps) => {
  return (
    <div className="flex  gap-3 items-center">
      {loading ? (
        <div className="flex items-center gap-2 ">
          <CloudUpload size={20} className="animate-bounce" />
          <span>Saving...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <CloudDownload size={20} />
          <span>Saved</span>
        </div>
      )}
      <Link href={`/create-recipe/${recipeId}/preview?recipeId=${recipeId}`}>
        <Button variant={"outline"}>Preview</Button>
      </Link>
      <Button variant={"outline"} disabled={!isPublishable} onClick={onPublish}>
        {isPublished ? "UnPublish" : "Publish"}
      </Button>
    </div>
  );
};

export default ActionButtons;
