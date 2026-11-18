"use client";

import { LightbulbIcon } from "lucide-react";
import { useState } from "react";

import { SalesForecastChart } from "@/components/charts/sales-forecast-chart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CurrencyAmount } from "@/components/finance/currency-amount";
import { SegmentedControl } from "@/components/finance/segmented-control";
import { TrendIndicator } from "@/components/finance/trend-indicator";
import type {
  ForecastRange,
  SalesForecast,
} from "@/types/finance";

const RANGE_OPTIONS = [
  { value: "7d", label: "7 días" },
  { value: "30d", label: "30 días" },
  { value: "90d", label: "90 días" },
] as const satisfies readonly {
  value: ForecastRange;
  label: string;
}[];

interface SalesForecastSectionProps {
  data: SalesForecast;
}

export function SalesForecastSection({
  data,
}: SalesForecastSectionProps) {
  const [range, setRange] = useState<ForecastRange>("30d");
  const current = data.ranges[range];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Pronóstico de ventas</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <SegmentedControl
          options={RANGE_OPTIONS}
          value={range}
          onChange={setRange}
          label="Periodo del pronóstico"
        />

        <div className="flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">
            Proyección total
          </p>
          <CurrencyAmount
            amount={current.total}
            currency={data.currency}
            className="text-2xl font-semibold"
          />
          <TrendIndicator
            value={data.changePercentage}
            label="vs periodo anterior"
          />
        </div>

        <SalesForecastChart data={current.series} />

        <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
          <LightbulbIcon
            className="mt-0.5 size-4 shrink-0 text-amber-500"
            aria-hidden="true"
          />
          <p>{data.insight}</p>
        </div>
      </CardContent>
    </Card>
  );
}