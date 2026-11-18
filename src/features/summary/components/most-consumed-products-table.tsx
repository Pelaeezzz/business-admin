import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDecimal, formatInteger } from "@/lib/format";
import type { ConsumedProduct } from "@/types/summary";

interface MostConsumedProductsTableProps {
  products: ConsumedProduct[];
}

export function MostConsumedProductsTable({
  products,
}: MostConsumedProductsTableProps) {
  const ranked = [...products].sort((a, b) => b.quantity - a.quantity);

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table className="min-w-[400px]">
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead scope="col" className="w-12">
              #
            </TableHead>
            <TableHead scope="col" className="w-16">
              <span className="sr-only">Imagen</span>
            </TableHead>
            <TableHead scope="col">Producto</TableHead>
            <TableHead scope="col">Cantidad consumida</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {ranked.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-24 text-center text-muted-foreground"
              >
                No hay productos consumidos en este período.
              </TableCell>
            </TableRow>
          ) : (
            ranked.map((product, index) => {
              const quantity = Number.isInteger(product.quantity)
                ? formatInteger(product.quantity)
                : formatDecimal(product.quantity);

              return (
                <TableRow key={product.id}>
                  <TableCell className="text-sm font-medium text-muted-foreground tabular-nums">
                    {index + 1}
                  </TableCell>

                  <TableCell>
                    <Image
                      src={product.image}
                      alt=""
                      width={40}
                      height={40}
                      sizes="40px"
                      className="size-10 shrink-0 rounded-md border bg-muted object-cover"
                    />
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {product.category}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="tabular-nums">
                    {quantity} {product.unit}
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
