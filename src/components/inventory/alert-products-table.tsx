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
import { cn } from "@/lib/utils";
import type { AlertProduct } from "@/mocks/alert-products";

interface AlertProductsTableProps {
  products: AlertProduct[];
  /** Ocupa toda la altura disponible de la tarjeta contenedora. */
  fill?: boolean;
}

export function AlertProductsTable({
  products,
  fill = false,
}: AlertProductsTableProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border",
        fill && "flex flex-1 flex-col [&>*]:min-h-0 [&>*]:flex-1",
      )}
    >
      <Table className={cn(fill && "h-full")}>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead>Producto</TableHead>
            <TableHead className="w-20 text-right">Queda</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={2}
                className="h-24 text-center text-muted-foreground"
              >
                No hay productos en alerta.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
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
                        {product.unit} · Mín. {product.minStock}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <Badge
                    variant={product.stock === 0 ? "destructive" : "secondary"}
                    className="min-w-10 justify-center tabular-nums"
                  >
                    {product.stock}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
