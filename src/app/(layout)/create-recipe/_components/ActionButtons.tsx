"use client";
import { Button } from "@/components/ui/button";
import { CloudDownload, CloudUpload } from "lucide-react";
import React, { useEffect, useState } from "react";
interface ActionButtonsProps {
  loading: boolean;
  isPublishable: boolean;
  onPublish: () => void;
  isPublished: boolean;
}
const ActionButtons = ({
  loading,
  isPublishable,
  onPublish,
  isPublished,
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

      <Button variant={"outline"}>Preview</Button>
      <Button variant={"outline"} disabled={!isPublishable} onClick={onPublish}>
        {isPublished ? "UnPublish" : "Publish"}
      </Button>
    </div>
  );
};

export default ActionButtons;
