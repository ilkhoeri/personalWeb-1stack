"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import AddNew from "@/components/assets/toggle/add-new";

import { twMerge } from "tailwind-merge";

import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/assets/table/data-table-view-options";
import { DataTablePagination } from "@/components/assets/table/data-table-pagination";

export type ClassNameDataTable = {
  classNames?: {
    root?: string;
    wrapper?: string;
    table?: string;
    thead?: string;
    tbody?: string;
    th?: string;
    td?: string;
  };
};

interface NewDataOnTable {
  addNew?: {
    changeButton?: React.ReactNode;
    toPath?: string;
  };
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  classNames,
  addNew,
}: DataTableProps<TData, TValue> & NewDataOnTable & ClassNameDataTable) {
  const params = useParams();
  const router = useRouter();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,

    enableRowSelection: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
  });

  return (
    <div className={twMerge("w-full relative m-0", classNames?.root)}>
      <div className={twMerge("flex items-center pt-4 pb-4", classNames?.wrapper)}>
        <Input
          placeholder="Search"
          name="search"
          autoComplete="off"
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
          className="max-w-sm bg-transparent mr-auto"
        />

        {addNew &&
          (addNew.changeButton ?? (
            <AddNew className="[--sz:36px]" onClick={() => router.push(`/${params.protectId}${addNew.toPath}`)} />
          ))}

        <DataTableViewOptions table={table} className="ml-4 md:ml-4" />
      </div>
      <div className="rounded-md border">
        <Table className={twMerge("[--max-w-subtitution:200px]", classNames?.table)}>
          <TableHeader className={classNames?.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={classNames?.th}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className={classNames?.tbody}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={classNames?.td}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
