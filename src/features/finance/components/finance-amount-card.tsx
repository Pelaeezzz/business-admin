import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { CurrencyAmount } from "@/components/finance/currency-amount";
import { formatSignedAmount } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CurrencyCode } from "@/types/finance";

const CURRENCY_BADGES: Record<
  CurrencyCode,
  { symbol: string; className: string }
> = {
  CUP: {
    symbol: "$",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  USD: {
    symbol: "$",
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  EUR: {
    symbol: "€",
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
};

interface FinanceAmountCardProps {
  label: string;
  amount: number;
  currency: CurrencyCode;
  change: number;
  icon?: ReactNode;
  className?: string;
}

export function FinanceAmountCard({
  label,
  amount,
  currency,
  change,
  icon,
  className,
}: FinanceAmountCardProps) {
  const positive = change >= 0;

  return (
    <Card size="sm" className={className}>
      <CardContent className="gap-1.5">
        <div className="flex items-center gap-2">
          {icon ?? <CurrencyBadge currency={currency} />}
          <span className="text-xs font-medium text-muted-foreground">
            {label}
          </span>
        </div>

        <CurrencyAmount
          amount={amount}
          currency={currency}
          className="text-xl font-semibold"
        />

        <span
          className={cn(
            "text-xs font-medium tabular-nums",
            positive
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-destructive",
          )}
        >
          {formatSignedAmount(change)}{" "}
          <span className="font-normal text-muted-foreground">
            {currency}
          </span>
        </span>
      </CardContent>
    </Card>
  );
}

function CurrencyBadge({ currency }: { currency: CurrencyCode }) {
  const badge = CURRENCY_BADGES[currency];

  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
        badge.className,
      )}
      aria-hidden="true"
    >
      {badge.symbol}
    </span>
  );
}