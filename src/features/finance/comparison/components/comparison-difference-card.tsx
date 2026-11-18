import { ArrowDownRightIcon, ArrowUpRightIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { CurrencyAmount } from "@/components/finance/currency-amount";
import { formatPercentage, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CurrencyCode } from "@/types/finance";

interface ComparisonDifferenceCardProps {
  difference: number;
  variation: number;
  currency: CurrencyCode;
}

export function ComparisonDifferenceCard({
  difference,
  variation,
  currency,
}: ComparisonDifferenceCardProps) {
  const negative = difference < 0;
  const Icon = negative ? ArrowDownRightIcon : ArrowUpRightIcon;

  return (
    <Card size="sm">
      <CardContent className="gap-1">
        <p className="text-xs font-medium text-muted-foreground">Diferencia</p>

        <div className="flex flex-wrap items-baseline gap-2">
          <CurrencyAmount
            amount={difference}
            currency={currency}
            className={cn(
              "text-xl font-semibold",
              negative
                ? "text-destructive"
                : "text-emerald-600 dark:text-emerald-400",
            )}
          />

          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-medium tabular-nums",
              negative
                ? "text-destructive"
                : "text-emerald-600 dark:text-emerald-400",
            )}
          >
            <Icon className="size-3.5" aria-hidden="true" />
            {formatPercent(variation)}
          </span>
        </div>

        <p className="text-xs text-muted-foreground">
          {negative
            ? `${formatPercentage(Math.abs(variation))} menos de lo esperado vs. costo teórico`
            : `${formatPercentage(variation)} más de lo esperado vs. costo teórico`}
        </p>
      </CardContent>
    </Card>
  );
}
