import { PackageIcon, ScaleIcon, ShoppingBagIcon } from "lucide-react";

import { CurrencyAmount } from "@/components/finance/currency-amount";
import { MetricCard } from "@/components/finance/metric-card";
import { formatInteger } from "@/lib/format";
import type { SalesComparisonSummary } from "@/types/finance";

import { ComparisonDifferenceCard } from "../components/comparison-difference-card";

interface ComparisonSummarySectionProps {
  summary: SalesComparisonSummary;
}

export function ComparisonSummarySection({
  summary,
}: ComparisonSummarySectionProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label="Ventas del día"
        icon={ShoppingBagIcon}
        value={
          <CurrencyAmount amount={summary.sales} currency={summary.currency} />
        }
        valueClassName="text-xl"
        description={`${formatInteger(summary.productsSold)} productos vendidos`}
      />

      <MetricCard
        label="Costo teórico"
        icon={ScaleIcon}
        tone="info"
        value={
          <CurrencyAmount
            amount={summary.theoreticalCost}
            currency={summary.currency}
          />
        }
        valueClassName="text-xl"
        description="Según fichas de costo"
      />

      <MetricCard
        label="Costo real (IPV)"
        icon={PackageIcon}
        tone="warning"
        value={
          <CurrencyAmount
            amount={summary.actualCost}
            currency={summary.currency}
          />
        }
        valueClassName="text-xl"
        description="Según inventario físico"
      />

      <ComparisonDifferenceCard
        difference={summary.difference}
        variation={summary.variation}
        currency={summary.currency}
      />
    </section>
  );
}
