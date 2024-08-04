"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { TableDataType } from "@/actions/table";
import ActionsField from "./ActionsField";

export const columns: ColumnDef<TableDataType>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "favorated",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Favorited
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "published",
    header: "Published",
    cell: ({ row: { original } }) => {
      return original.published ? "Published" : "UnPublished";
    },
  },

  {
    accessorKey: "ratings",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ratings
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row: { original } }) => {
      return <ActionsField recipe={original} />;
    },
  },
];
