import { formatPercentage } from "@/lib/format";
import type { NetIncomeSummary } from "@/types/finance";

import { NetIncomeHero } from "../components/net-income-hero";
import { NetIncomeMetricCard } from "../components/net-income-metric-card";

interface NetIncomeSummarySectionProps {
  summary: NetIncomeSummary;
}

function shareOfIncome(value: number, totalIncome: number) {
  if (totalIncome <= 0) {
    return 0;
  }

  return (value / totalIncome) * 100;
}

export function NetIncomeSummarySection({
  summary,
}: NetIncomeSummarySectionProps) {
  const expenseShare = shareOfIncome(
    summary.totalExpenses,
    summary.totalIncome,
  );
  const costShare = shareOfIncome(summary.costOfSales, summary.totalIncome);
  const netShare = shareOfIncome(summary.netIncome, summary.totalIncome);

  return (
    <section className="flex flex-col gap-3">
      <NetIncomeHero
        amount={summary.netIncome}
        currency={summary.currency}
        changePercentage={summary.changePercentage}
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <NetIncomeMetricCard
          label="Ingresos"
          amount={summary.totalIncome}
          currency={summary.currency}
          description="Ventas + otros"
          icon="arrow-down-left"
          tone="success"
        />

        <NetIncomeMetricCard
          label="Gastos"
          amount={summary.totalExpenses}
          currency={summary.currency}
          description={`${formatPercentage(expenseShare)} de ingresos`}
          icon="arrow-up-right"
          tone="danger"
        />

        <NetIncomeMetricCard
          label="Costos de venta"
          amount={summary.costOfSales}
          currency={summary.currency}
          description={`${formatPercentage(costShare)} de ingresos`}
          icon="shopping-cart"
          tone="info"
        />

        <NetIncomeMetricCard
          label="Utilidad neta"
          amount={summary.netIncome}
          currency={summary.currency}
          description={`${formatPercentage(netShare)} de ingresos`}
          icon="wallet"
          tone="success"
        />
      </div>
    </section>
  );
}
