"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatWholeCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CurrencyCode } from "@/types/finance";
import type { Product, ProductStockStatus } from "@/types/product";

const statusConfig: Record<
  ProductStockStatus,
  { label: string; className: string }
> = {
  available: {
    label: "Disponible",
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  low: {
    label: "Stock bajo",
    className:
      "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  out: {
    label: "Agotado",
    className: "border-destructive/30 bg-destructive/10 text-destructive",
  },
};

function getStockStatus(product: Product): ProductStockStatus {
  if (product.stock <= 0) {
    return "out";
  }

  if (product.stock <= product.minStock) {
    return "low";
  }

  return "available";
}

interface ProductsTableProps {
  products: Product[];
  currency: CurrencyCode;
  emptyMessage?: string;
}

export function ProductsTable({
  products,
  currency,
  emptyMessage = "No hay productos registrados.",
}: ProductsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table className="min-w-[880px]">
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead scope="col">Producto</TableHead>
            <TableHead scope="col">Categoría</TableHead>
            <TableHead scope="col">Unidad</TableHead>
            <TableHead scope="col" className="text-right">
              Precio
            </TableHead>
            <TableHead scope="col" className="text-right">
              Stock
            </TableHead>
            <TableHead scope="col">Estado</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => {
              const status = getStockStatus(product);
              const config = statusConfig[status];

              return (
                <TableRow key={product.id}>
                  <TableCell>
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
                        <span className="truncate font-medium">
                          {product.name}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {product.id}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {product.category}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {product.unit}
                  </TableCell>

                  <TableCell className="text-right whitespace-nowrap tabular-nums">
                    {formatWholeCurrency(product.price, currency)}
                  </TableCell>

                  <TableCell className="text-right tabular-nums">
                    <span
                      className={cn(
                        "font-medium",
                        status === "out" && "text-destructive",
                        status === "low" &&
                          "text-amber-600 dark:text-amber-400",
                      )}
                    >
                      {product.stock}
                    </span>
                    <span className="ml-1 text-xs text-muted-foreground">
                      / mín. {product.minStock}
                    </span>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className={config.className}>
                      {config.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
