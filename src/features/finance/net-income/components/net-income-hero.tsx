import { InfoIcon, WalletIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { CurrencyAmount } from "@/components/finance/currency-amount";
import { TrendIndicator } from "@/components/finance/trend-indicator";
import type { CurrencyCode } from "@/types/finance";

interface NetIncomeHeroProps {
  amount: number;
  currency: CurrencyCode;
  changePercentage: number;
}

export function NetIncomeHero({
  amount,
  currency,
  changePercentage,
}: NetIncomeHeroProps) {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-background to-emerald-100/60 ring-emerald-900/10 dark:from-emerald-950/30 dark:via-background dark:to-emerald-900/20 dark:ring-emerald-100/10">
      <CardContent className="relative gap-2 py-1">
        <div className="relative z-10 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <p className="text-sm text-muted-foreground">
              Utilidad neta del día
            </p>
            <span
              className="inline-flex text-muted-foreground"
              title="Ingresos menos gastos y costos de venta del día"
            >
              <InfoIcon className="size-3.5" aria-hidden="true" />
            </span>
          </div>

          <CurrencyAmount
            amount={amount}
            currency={currency}
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          />

          <TrendIndicator value={changePercentage} label="vs ayer" />
        </div>

        <div
          className="pointer-events-none absolute -right-8 -top-12 size-44 rounded-full bg-emerald-300/40 blur-2xl dark:bg-emerald-700/20"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-10 right-6 size-28 rounded-full bg-emerald-200/50 blur-xl dark:bg-emerald-800/20"
          aria-hidden="true"
        />
        <WalletIcon
          className="pointer-events-none absolute -bottom-5 right-6 size-28 text-emerald-900/5 dark:text-emerald-100/5"
          aria-hidden="true"
        />
      </CardContent>
    </Card>
  );
}
