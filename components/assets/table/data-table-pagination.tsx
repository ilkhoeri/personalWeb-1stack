import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight } from "react-icons/lu";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div
        title={`${table.getFilteredSelectedRowModel().rows.length} of${" "}${
          table.getFilteredRowModel().rows.length
        } row(s) selected.`}
        className="hidden md:flex flex-1 text-sm text-muted-foreground truncate"
      >
        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      <div className="flex items-center flex-row flex-nowrap justify-between w-full space-x-5 lg:space-x-8">
        <div className="flex items-center md:space-x-2">
          <p className="text-sm font-medium hidden lg:block">Rows per page</p>

          <Select
            name="set-table-view"
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger title="Rows per page" className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>

            <SelectContent className="max-w-max">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div
          title={`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
          className="flex w-[100px] items-center justify-center text-sm font-medium"
        >
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            title="Go to first page"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <LuChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            title="Go to previous page"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <LuChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            title="Go to next page"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <LuChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            title="Go to last page"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <LuChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
