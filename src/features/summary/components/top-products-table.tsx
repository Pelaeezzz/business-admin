import Image from "next/image";

import { CurrencyAmount } from "@/components/finance/currency-amount";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatInteger } from "@/lib/format";
import type { CurrencyCode } from "@/types/finance";
import type { TopProduct } from "@/types/summary";

interface TopProductsTableProps {
  products: TopProduct[];
  currency: CurrencyCode;
}

export function TopProductsTable({
  products,
  currency,
}: TopProductsTableProps) {
  const ranked = [...products].sort((a, b) => b.units - a.units);

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
            <TableHead scope="col">Unidades</TableHead>
            <TableHead scope="col">Ingresos</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {ranked.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center text-muted-foreground"
              >
                No hay productos vendidos en este período.
              </TableCell>
            </TableRow>
          ) : (
            ranked.map((product, index) => (
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
                  {formatInteger(product.units)}
                </TableCell>

                <TableCell>
                  <CurrencyAmount
                    amount={product.revenue}
                    currency={currency}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
