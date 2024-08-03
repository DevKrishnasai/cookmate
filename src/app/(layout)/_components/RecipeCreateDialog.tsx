"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import React from "react";

interface RecipeCreateDialogProps {
  trigger: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
  setRecipeName: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}

const RecipeCreateDialog = ({
  trigger,
  open,
  setOpen,
  onSubmit,
  setRecipeName,
  loading,
}: RecipeCreateDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen((o) => !o)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you ready to how your skills?</DialogTitle>
          <DialogDescription>
            Create a new recipe to show your skills to the world.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Recipe Name"
          onChange={(e) => setRecipeName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        />
        <Button variant="outline" onClick={onSubmit} disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeCreateDialog;
