"use client";

import { ArrowRightIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CurrencyAmount } from "@/components/finance/currency-amount";
import { formatPercentage } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CurrencyCode, NetIncomeBreakdownItem } from "@/types/finance";

interface NetIncomeBreakdownDialogProps {
  title: string;
  description: string;
  triggerLabel: string;
  items: NetIncomeBreakdownItem[];
  currency: CurrencyCode;
  total?: number;
  showPercentage?: boolean;
}

export function NetIncomeBreakdownDialog({
  title,
  description,
  triggerLabel,
  items,
  currency,
  total,
  showPercentage = true,
}: NetIncomeBreakdownDialogProps) {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
      >
        {triggerLabel}
        <ArrowRightIcon />
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead scope="col">Categoría</TableHead>
                <TableHead scope="col">Detalle</TableHead>
                {showPercentage ? (
                  <TableHead scope="col" className="text-right">
                    %
                  </TableHead>
                ) : null}
                <TableHead scope="col" className="text-right">
                  Monto
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.label}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.description}
                  </TableCell>
                  {showPercentage ? (
                    <TableCell className="text-right tabular-nums">
                      {formatPercentage(item.percentage)}
                    </TableCell>
                  ) : null}
                  <TableCell className="text-right">
                    <CurrencyAmount amount={item.amount} currency={currency} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {typeof total === "number" ? (
          <div className="flex items-center justify-between gap-3 rounded-lg bg-muted/50 px-3 py-2">
            <span className="text-sm font-medium">Total</span>
            <CurrencyAmount
              amount={total}
              currency={currency}
              className="text-base font-semibold"
            />
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
