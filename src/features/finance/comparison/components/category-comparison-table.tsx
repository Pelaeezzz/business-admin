import { CurrencyAmount } from "@/components/finance/currency-amount";
import { SignedCurrencyAmount } from "@/components/finance/signed-currency-amount";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatInteger, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CategoryComparison, CurrencyCode } from "@/types/finance";

interface CategoryComparisonTableProps {
  categories: CategoryComparison[];
  currency: CurrencyCode;
}

function variationTone(variation: number) {
  return variation >= 0
    ? "text-emerald-600 dark:text-emerald-400"
    : "text-destructive";
}

export function CategoryComparisonTable({
  categories,
  currency,
}: CategoryComparisonTableProps) {
  const totals = categories.reduce(
    (accumulator, category) => ({
      products: accumulator.products + category.products,
      units: accumulator.units + category.units,
      theoreticalCost: accumulator.theoreticalCost + category.theoreticalCost,
      actualCost: accumulator.actualCost + category.actualCost,
      difference: accumulator.difference + category.difference,
    }),
    {
      products: 0,
      units: 0,
      theoreticalCost: 0,
      actualCost: 0,
      difference: 0,
    },
  );
  const totalVariation =
    totals.theoreticalCost > 0
      ? (totals.difference / totals.theoreticalCost) * 100
      : 0;

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table className="min-w-[760px]">
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead scope="col">Categoría</TableHead>
            <TableHead scope="col" className="text-right">
              Productos
            </TableHead>
            <TableHead scope="col" className="text-right">
              Unidades
            </TableHead>
            <TableHead scope="col" className="text-right">
              Costo teórico
            </TableHead>
            <TableHead scope="col" className="text-right">
              Costo real
            </TableHead>
            <TableHead scope="col" className="text-right">
              Diferencia
            </TableHead>
            <TableHead scope="col" className="text-right">
              Variación
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-24 text-center text-muted-foreground"
              >
                No hay categorías para comparar.
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatInteger(category.products)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatInteger(category.units)}
                </TableCell>
                <TableCell className="text-right">
                  <CurrencyAmount
                    amount={category.theoreticalCost}
                    currency={currency}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <CurrencyAmount
                    amount={category.actualCost}
                    currency={currency}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <SignedCurrencyAmount
                    amount={category.difference}
                    currency={currency}
                  />
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right font-medium tabular-nums",
                    variationTone(category.variation),
                  )}
                >
                  {formatPercent(category.variation)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

        {categories.length > 0 ? (
          <TableFooter>
            <TableRow>
              <TableCell className="font-medium">Total</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatInteger(totals.products)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatInteger(totals.units)}
              </TableCell>
              <TableCell className="text-right">
                <CurrencyAmount
                  amount={totals.theoreticalCost}
                  currency={currency}
                />
              </TableCell>
              <TableCell className="text-right">
                <CurrencyAmount
                  amount={totals.actualCost}
                  currency={currency}
                />
              </TableCell>
              <TableCell className="text-right">
                <SignedCurrencyAmount
                  amount={totals.difference}
                  currency={currency}
                />
              </TableCell>
              <TableCell
                className={cn(
                  "text-right font-medium tabular-nums",
                  variationTone(totalVariation),
                )}
              >
                {formatPercent(totalVariation)}
              </TableCell>
            </TableRow>
          </TableFooter>
        ) : null}
      </Table>
    </div>
  );
}
