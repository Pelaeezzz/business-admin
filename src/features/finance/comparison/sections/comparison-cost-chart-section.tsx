"use client";

import { useState } from "react";

import { CostComparisonChart } from "@/components/charts/cost-comparison-chart";
import { SegmentedControl } from "@/components/finance/segmented-control";
import { SectionHeader } from "@/components/finance/section-header";
import { Card, CardContent } from "@/components/ui/card";
import type {
  ComparisonRange,
  ComparisonSeriesPoint,
  CurrencyCode,
} from "@/types/finance";

const RANGE_OPTIONS = [
  { value: "day", label: "Por día" },
  { value: "week", label: "Por semana" },
] as const satisfies readonly {
  value: ComparisonRange;
  label: string;
}[];

interface ComparisonCostChartSectionProps {
  series: Record<ComparisonRange, ComparisonSeriesPoint[]>;
  currency: CurrencyCode;
}

export function ComparisonCostChartSection({
  series,
  currency,
}: ComparisonCostChartSectionProps) {
  const [range, setRange] = useState<ComparisonRange>("day");

  return (
    <section className="flex flex-col gap-3">
      <SectionHeader
        title="Comparación de costos"
        description="Evolución del costo teórico frente al costo real."
        action={
          <SegmentedControl
            options={RANGE_OPTIONS}
            value={range}
            onChange={setRange}
            label="Agrupación de la comparación"
          />
        }
      />

      <Card>
        <CardContent>
          <CostComparisonChart data={series[range]} currency={currency} />
        </CardContent>
      </Card>
    </section>
  );
}
