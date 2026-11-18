"use client";

import { FileTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CurrencyAmount } from "@/components/finance/currency-amount";
import { TrendIndicator } from "@/components/finance/trend-indicator";
import type { MonthlyNetIncome } from "@/types/finance";

interface MonthlyNetIncomeSectionProps {
  data: MonthlyNetIncome;
  onReport?: () => void;
}

export function MonthlyNetIncomeSection({
  data,
  onReport,
}: MonthlyNetIncomeSectionProps) {
  function handleReport() {
    if (onReport) {
      onReport();
      return;
    }

    window.print();
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-muted-foreground">
            Utilidad neta acumulada (mes)
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <CurrencyAmount
              amount={data.netIncome}
              currency={data.currency}
              className="text-2xl font-semibold tracking-tight"
            />

            <TrendIndicator
              value={data.changePercentage}
              label="vs mes anterior"
            />
          </div>
        </div>

        <Button type="button" variant="outline" onClick={handleReport}>
          <FileTextIcon />
          Reporte financiero
        </Button>
      </CardContent>
    </Card>
  );
}
