import { Badge } from "@/components/ui/badge";
import { CurrencyAmount } from "@/components/finance/currency-amount";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { PayableAccount, PayableStatus } from "@/types/finance";

const STATUS_LABELS: Record<PayableStatus, string> = {
  "this-week": "Esta semana",
  overdue: "Vencida",
  next: "Próximo",
};

const STATUS_CLASSES: Record<PayableStatus, string> = {
  "this-week": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  overdue: "bg-destructive/10 text-destructive",
  next: "bg-muted text-muted-foreground",
};

function PayableStatusBadge({ status }: { status: PayableStatus }) {
  return (
    <Badge
      variant="secondary"
      className={cn("border-transparent", STATUS_CLASSES[status])}
    >
      {STATUS_LABELS[status]}
    </Badge>
  );
}

interface PayablesTableProps {
  accounts: PayableAccount[];
  className?: string;
}

export function PayablesTable({
  accounts,
  className,
}: PayablesTableProps) {
  return (
    <div className={cn("overflow-hidden rounded-lg border", className)}>
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead scope="col">Proveedor</TableHead>
            <TableHead scope="col">Concepto</TableHead>
            <TableHead scope="col">Vencimiento</TableHead>
            <TableHead scope="col" className="text-right">
              Monto
            </TableHead>
            <TableHead scope="col">Estado</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {accounts.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center text-muted-foreground"
              >
                No hay cuentas por pagar.
              </TableCell>
            </TableRow>
          ) : (
            accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="font-medium">
                  {account.supplier}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {account.concept}
                </TableCell>
                <TableCell>{account.dueDate}</TableCell>
                <TableCell className="text-right">
                  <CurrencyAmount
                    amount={account.amount}
                    currency={account.currency}
                  />
                </TableCell>
                <TableCell>
                  <PayableStatusBadge status={account.status} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}