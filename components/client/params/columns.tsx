"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { DataTableColumnHeader } from "@/components/assets/table/data-table-column-header";
import MarkBoolean from "@/components/ui/mark-boolean";
import { LuCommand } from "react-icons/lu";

export type ParamsColumn = {
  id: string;
  slug: string;
  heading: string;
  markHead: string;
  sections?: string;
  notes?: string;
  isNew: boolean;
  createdAt: string;
};

export const paramsColumns: ColumnDef<ParamsColumn>[] = [
  {
    accessorKey: "slug",
    header: ({ column }) => <DataTableColumnHeader column={column} title="slug" />,
  },
  {
    accessorKey: "heading",
    header: ({ column }) => <DataTableColumnHeader column={column} title="heading" />,
  },
  {
    accessorKey: "isNew",
    header: ({ column }) => <DataTableColumnHeader column={column} title="isNew" />,
    cell: ({ row }) => <MarkBoolean mark={row.original.isNew} />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Create Date" />,
  },
  {
    id: "actions",
    header: () => <LuCommand size={18} className="w-full flex items-center justify-center" />,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
