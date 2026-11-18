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
import { formatInteger } from "@/lib/format";
import type { CurrencyCode, IpvComparisonDetail } from "@/types/finance";

interface IpvDetailTableProps {
  details: IpvComparisonDetail[];
  currency: CurrencyCode;
}

export function IpvDetailTable({ details, currency }: IpvDetailTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table className="min-w-[760px]">
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead scope="col">Producto</TableHead>
            <TableHead scope="col">Categoría</TableHead>
            <TableHead scope="col" className="text-right">
              Unidades
            </TableHead>
            <TableHead scope="col" className="text-right">
              Costo unitario teórico
            </TableHead>
            <TableHead scope="col" className="text-right">
              Costo unitario real
            </TableHead>
            <TableHead scope="col" className="text-right">
              Impacto
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {details.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-muted-foreground"
              >
                No hay detalles IPV para mostrar.
              </TableCell>
            </TableRow>
          ) : (
            details.map((detail) => (
              <TableRow key={detail.id}>
                <TableCell className="font-medium">{detail.product}</TableCell>
                <TableCell className="text-muted-foreground">
                  {detail.category}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatInteger(detail.units)}
                </TableCell>
                <TableCell className="text-right">
                  <CurrencyAmount
                    amount={detail.theoreticalUnitCost}
                    currency={currency}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <CurrencyAmount
                    amount={detail.actualUnitCost}
                    currency={currency}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <SignedCurrencyAmount
                    amount={detail.impact}
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
