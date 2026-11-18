import { CurrencyAmount } from "@/components/finance/currency-amount";
import { SignedCurrencyAmount } from "@/components/finance/signed-currency-amount";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatInteger, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CurrencyCode, ProductComparison } from "@/types/finance";

interface ProductComparisonTableProps {
  products: ProductComparison[];
  currency: CurrencyCode;
  showUnitCosts?: boolean;
}

function unitCost(total: number, units: number) {
  return units > 0 ? total / units : 0;
}

export function ProductComparisonTable({
  products,
  currency,
  showUnitCosts = false,
}: ProductComparisonTableProps) {
  const columns = showUnitCosts ? 8 : 6;

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table className={cn(showUnitCosts ? "min-w-[900px]" : "min-w-[720px]")}>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead scope="col">Producto</TableHead>
            <TableHead scope="col" className="text-right">
              Ventas (unidades)
            </TableHead>
            <TableHead scope="col" className="text-right">
              Costo teórico
            </TableHead>
            <TableHead scope="col" className="text-right">
              Costo real
            </TableHead>
            {showUnitCosts ? (
              <>
                <TableHead scope="col" className="text-right">
                  Costo unitario teórico
                </TableHead>
                <TableHead scope="col" className="text-right">
                  Costo unitario real
                </TableHead>
              </>
            ) : null}
            <TableHead scope="col" className="text-right">
              Diferencia
            </TableHead>
            <TableHead scope="col" className="text-right">
              Variación
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns}
                className="h-24 text-center text-muted-foreground"
              >
                No hay productos para comparar.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => {
              const positive = product.variation >= 0;

              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {product.category}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-right tabular-nums">
                    {formatInteger(product.units)}
                  </TableCell>

                  <TableCell className="text-right">
                    <CurrencyAmount
                      amount={product.theoreticalCost}
                      currency={currency}
                    />
                  </TableCell>

                  <TableCell className="text-right">
                    <CurrencyAmount
                      amount={product.actualCost}
                      currency={currency}
                    />
                  </TableCell>

                  {showUnitCosts ? (
                    <>
                      <TableCell className="text-right">
                        <CurrencyAmount
                          amount={unitCost(
                            product.theoreticalCost,
                            product.units,
                          )}
                          currency={currency}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <CurrencyAmount
                          amount={unitCost(product.actualCost, product.units)}
                          currency={currency}
                        />
                      </TableCell>
                    </>
                  ) : null}

                  <TableCell className="text-right">
                    <SignedCurrencyAmount
                      amount={product.difference}
                      currency={currency}
                    />
                  </TableCell>

                  <TableCell
                    className={cn(
                      "text-right font-medium tabular-nums",
                      positive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-destructive",
                    )}
                  >
                    {formatPercent(product.variation)}
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
