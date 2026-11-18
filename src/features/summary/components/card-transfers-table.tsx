import { SignedCurrencyAmount } from "@/components/finance/signed-currency-amount";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CardTransfer } from "@/types/summary";
import type { CurrencyCode } from "@/types/finance";

import { TransferStatusBadge } from "./transfer-status-badge";

interface CardTransfersTableProps {
  transfers: CardTransfer[];
  currency: CurrencyCode;
}

export function CardTransfersTable({
  transfers,
  currency,
}: CardTransfersTableProps) {
  if (transfers.length === 0) {
    return (
      <p className="p-3 text-sm text-muted-foreground">
        Esta tarjeta no tiene transferencias registradas.
      </p>
    );
  }

  return (
    <Table className="min-w-[640px]">
      <TableHeader className="bg-muted/40">
        <TableRow>
          <TableHead scope="col">Fecha</TableHead>
          <TableHead scope="col">Movimiento</TableHead>
          <TableHead scope="col">Referencia</TableHead>
          <TableHead scope="col">Estado</TableHead>
          <TableHead scope="col" className="text-right">
            Monto
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {transfers.map((transfer) => (
          <TableRow key={transfer.id}>
            <TableCell className="text-xs text-muted-foreground">
              {transfer.date}
            </TableCell>

            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{transfer.concept}</span>
                <span className="text-xs text-muted-foreground">
                  {transfer.origin}
                </span>
              </div>
            </TableCell>

            <TableCell className="font-mono text-xs text-muted-foreground">
              {transfer.reference}
            </TableCell>

            <TableCell>
              <TransferStatusBadge status={transfer.status} />
            </TableCell>

            <TableCell className="text-right">
              <SignedCurrencyAmount
                amount={transfer.amount}
                currency={currency}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
