"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import RecipeCreateDialog from "../../_components/RecipeCreateDialog";
import { toast } from "sonner";
import { createRecipe } from "@/actions/recipe";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipeName, setRecipeName] = useState("");
  const router = useRouter();

  const createARecipe = async () => {
    toast.loading("Creating recipe...", {
      id: "create-recipe",
    });
    if (!recipeName) {
      toast.error("Please enter a recipe name", {
        id: "create-recipe",
      });
      return;
    }
    if (!/^[a-zA-Z0-9- ]*$/.test(recipeName)) {
      toast.error("Recipe name should not contain special characters", {
        id: "create-recipe",
      });
      return;
    }
    setLoading(true);
    const data = await createRecipe(recipeName);
    if (!data) {
      toast.error("Error creating recipe", {
        id: "create-recipe",
      });
      setLoading(false);
      return;
    }
    setLoading(false);
    setOpen(false);
    toast.success("Recipe created successfully", {
      id: "create-recipe",
    });
    router.push(`/create-recipe/${data}`);
  };

  return (
    <div className=" w-full px-4">
      <div className="flex items-center justify-between gap-3 pb-4 ">
        <Input
          placeholder="Filter recipes by title"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <RecipeCreateDialog
          trigger={<Button variant={"outline"}>create recipe</Button>}
          open={open}
          setOpen={setOpen}
          onSubmit={createARecipe}
          setRecipeName={setRecipeName}
          loading={loading}
        />
      </div>
      <div className="rounded-md border w-full     overflow-y-scroll">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-4 py-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Recipes Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
