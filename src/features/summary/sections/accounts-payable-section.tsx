"use client";

import { useState } from "react";
import { CalendarIcon, CheckIcon, PlusIcon, RotateCcwIcon } from "lucide-react";

import { CurrencyAmount } from "@/components/finance/currency-amount";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { AccountsPayableSummary, Payable } from "@/types/summary";

import { PayableStatusBadge } from "../components/payable-status-badge";

interface AccountsPayableSectionProps {
  data: AccountsPayableSummary;
}

export function AccountsPayableSection({ data }: AccountsPayableSectionProps) {
  const [items, setItems] = useState<Payable[]>(data.items);

  function toggleStatus(id: string) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "paid" ? "pending" : "paid" }
          : item,
      ),
    );
  }

  const pendingTotal = items
    .filter((item) => item.status === "pending")
    .reduce((sum, item) => sum + item.amount, 0);
  const paidTotal = items
    .filter((item) => item.status === "paid")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <section aria-label="Cuentas por pagar">
      <Card>
        <CardHeader>
          <CardTitle>Cuentas por pagar</CardTitle>
          <CardDescription>
            Pagos del local y su fecha límite. Cambia el estado de cada uno de
            pendiente a pagado.
          </CardDescription>
          <CardAction>
            <Button type="button" size="sm">
              <PlusIcon className="size-4" aria-hidden="true" />
              Crear cuenta
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Pendiente</span>
              <CurrencyAmount
                amount={pendingTotal}
                currency={data.currency}
                className="text-lg font-semibold text-amber-600 dark:text-amber-400"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Pagado</span>
              <CurrencyAmount
                amount={paidTotal}
                currency={data.currency}
                className="text-lg font-semibold text-emerald-600 dark:text-emerald-400"
              />
            </div>
          </div>

          <Table className="min-w-[760px]">
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead scope="col">Concepto</TableHead>
                <TableHead scope="col">Categoría</TableHead>
                <TableHead scope="col">Vence</TableHead>
                <TableHead scope="col">Monto</TableHead>
                <TableHead scope="col">Estado</TableHead>
                <TableHead scope="col">Acción</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {items.map((item) => {
                const paid = item.status === "paid";

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span
                          className={cn(
                            "font-medium",
                            paid && "text-muted-foreground line-through",
                          )}
                        >
                          {item.concept}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.payee}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary">{item.category}</Badge>
                    </TableCell>

                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 text-sm",
                          paid
                            ? "text-muted-foreground"
                            : item.overdue
                              ? "text-destructive"
                              : "text-foreground",
                        )}
                      >
                        <CalendarIcon className="size-3.5" aria-hidden="true" />
                        {item.dueDate}
                        {!paid && item.overdue ? (
                          <span className="text-xs font-medium">· Vencida</span>
                        ) : null}
                      </span>
                    </TableCell>

                    <TableCell>
                      <CurrencyAmount
                        amount={item.amount}
                        currency={data.currency}
                        className={cn(
                          "font-medium",
                          paid && "text-muted-foreground",
                        )}
                      />
                    </TableCell>

                    <TableCell>
                      <PayableStatusBadge status={item.status} />
                    </TableCell>

                    <TableCell>
                      <Button
                        type="button"
                        variant={paid ? "ghost" : "outline"}
                        size="sm"
                        onClick={() => toggleStatus(item.id)}
                        aria-label={
                          paid
                            ? `Marcar ${item.concept} como pendiente`
                            : `Marcar ${item.concept} como pagado`
                        }
                      >
                        {paid ? (
                          <>
                            <RotateCcwIcon
                              className="size-4"
                              aria-hidden="true"
                            />
                            Marcar pendiente
                          </>
                        ) : (
                          <>
                            <CheckIcon className="size-4" aria-hidden="true" />
                            Marcar pagado
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
