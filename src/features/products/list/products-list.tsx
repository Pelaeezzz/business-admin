"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash2Icon } from "lucide-react";
import { type ReactNode } from "react";
import { DataTable, type ServerPagination } from "@/components/ui/data-table";
import { TableFeaturesConfig } from "@/components/ui/table-features";
import TableMenu from "@/components/ui/table-menu";
import { Badge } from "@/components/ui/badge";
import {
  getProductStockStatus,
  PRODUCT_STOCK_STATUS_LABELS,
} from "@/constants/product-stock-status";
import { formatWholeCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CurrencyCode } from "@/types/finance";
import type { Product, ProductStockStatus } from "@/types/product";

const statusClasses: Record<ProductStockStatus, string> = {
  available:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  low: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  out: "border-destructive/30 bg-destructive/10 text-destructive",
};

interface Props {
  products: Product[];
  currency: CurrencyCode;
  isLoading?: boolean;
  filters?: ReactNode;
  dataEmptyText?: string;
  serverPagination: ServerPagination;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductsList({
  products,
  currency,
  isLoading,
  filters,
  dataEmptyText,
  serverPagination,
  onEdit,
  onDelete,
}: Props) {
  const columns: ColumnDef<TableFeaturesConfig, Product, unknown>[] = [
    {
      accessorKey: "name",
      header: "Producto",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex items-center gap-3">
            <Image
              src={product.image}
              alt=""
              width={40}
              height={40}
              sizes="40px"
              className="size-10 shrink-0 rounded-md border bg-muted object-cover"
            />

            <div className="flex min-w-0 flex-col">
              <span className="truncate font-medium">{product.name}</span>
              <span className="truncate text-xs text-muted-foreground">{product.id}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Categoría",
      cell: ({ row }) => <span className="text-muted-foreground">{row.original.category}</span>,
    },
    {
      accessorKey: "unit",
      header: "Unidad",
      cell: ({ row }) => <span className="text-muted-foreground">{row.original.unit}</span>,
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Precio</div>,
      cell: ({ row }) => (
        <div className="text-right whitespace-nowrap tabular-nums">
          {formatWholeCurrency(row.original.price, currency)}
        </div>
      ),
    },
    {
      accessorKey: "stock",
      header: () => <div className="text-right">Stock</div>,
      cell: ({ row }) => {
        const product = row.original;
        const status = getProductStockStatus(product);

        return (
          <div className="text-right tabular-nums">
            <span
              className={cn(
                "font-medium",
                status === "out" && "text-destructive",
                status === "low" && "text-amber-600 dark:text-amber-400",
              )}
            >
              {product.stock}
            </span>
            <span className="ml-1 text-xs text-muted-foreground">/ mín. {product.minStock}</span>
          </div>
        );
      },
    },
    {
      id: "status",
      header: "Estado",
      cell: ({ row }) => {
        const status = getProductStockStatus(row.original);

        return (
          <Badge variant="outline" className={statusClasses[status]}>
            {PRODUCT_STOCK_STATUS_LABELS[status]}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <TableMenu
              titleTableMenu="Acciones"
              actions={[
                {
                  label: "Editar",
                  icon: <EditIcon />,
                  action: () => onEdit(row.original),
                },
                {
                  label: "Eliminar",
                  icon: <Trash2Icon />,
                  variant: "destructive",
                  action: () => onDelete(row.original),
                },
              ]}
            />
          </div>
        );
      },
    },
  ];

  return (
    <DataTable<Product>
      columns={columns}
      data={products}
      isLoading={isLoading}
      filters={filters}
      dataEmptyText={dataEmptyText}
      serverPagination={serverPagination}
    />
  );
}
