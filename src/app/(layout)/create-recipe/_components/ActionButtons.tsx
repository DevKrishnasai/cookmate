"use client";
import { Button } from "@/components/ui/button";
import { CloudDownload, CloudUpload } from "lucide-react";
import React, { useEffect, useState } from "react";
interface ActionButtonsProps {
  loading: boolean;
}
const ActionButtons = ({ loading }: ActionButtonsProps) => {
  //after every 10 seconds, the useEffect will run and set the loading to false if it was true
  //   useEffect(() => {
  //     const save = setInterval(() => {
  //       if (loading) {
  //         setLoading(false);
  //       }
  //     }, 10000);

  //     return () => clearInterval(save);
  //   }, [loading]);

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
      <Button variant={"outline"}>Publish</Button>
    </div>
  );
};

export default ActionButtons;
