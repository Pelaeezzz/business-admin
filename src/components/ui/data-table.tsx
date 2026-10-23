"use client";

import {
  ColumnDef,
  flexRender,
  useTable,
  type ColumnVisibilityState,
  type RowData,
} from "@tanstack/react-table";

import { TableFeaturesConfig, tableFeaturesConfig } from "./table-features";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTablePagination } from "./data-table-pagination";
import { Loader2Icon } from "lucide-react";
import React, { ReactNode } from "react";
import { Button } from "./button";
import { PaginationComponent } from "../pagination-component/pagination-component";

export interface ServerPagination {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  totalItems: number;
  totalPages: number;
}

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<TableFeaturesConfig, TData, unknown>[];
  data: TData[];
  dataEmptyText?: string;
  initialVisibilityState?: ColumnVisibilityState;
  filters?: ReactNode;
  isLoading?: boolean;
  serverPagination?: ServerPagination;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  dataEmptyText = "No hay resultados.",
  initialVisibilityState = {},
  filters,
  isLoading = false,
  serverPagination,
}: DataTableProps<TData>) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>(initialVisibilityState);

  const table = useTable({
    features: tableFeaturesConfig,
    data,
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    // Con paginación de servidor las filas ya llegan paginadas: no se vuelven a cortar
    manualPagination: !!serverPagination,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 py-4">
        {filters && filters}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={(props) => (
              <Button {...props} variant="outline" className="ml-auto">
                Columnas
              </Button>
            )}
          />
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-card text-card-foreground">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <Loader2Icon className="mx-auto animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {dataEmptyText}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {serverPagination ? (
        <PaginationComponent {...serverPagination} />
      ) : (
        <DataTablePagination table={table} />
      )}
    </div>
  );
}
