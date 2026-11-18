import {
  ClockIcon,
  LandmarkIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";

import { CurrencyAmount } from "@/components/finance/currency-amount";
import { MetricCard } from "@/components/finance/metric-card";
import { routes } from "@/routes/routes";
import type { SummaryCashData } from "@/types/summary";

interface SummaryCashCardsSectionProps {
  data: SummaryCashData;
}

export function SummaryCashCardsSection({
  data,
}: SummaryCashCardsSectionProps) {
  return (
    <section
      aria-label="Resumen de caja del día"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      <MetricCard
        label="Ventas del día"
        icon={WalletIcon}
        tone="success"
        value={
          <CurrencyAmount amount={data.salesToday} currency={data.currency} />
        }
        valueClassName="text-2xl"
        description="Dinero real en caja"
      />

      <MetricCard
        label="Utilidad hipotética"
        icon={TrendingUpIcon}
        tone="info"
        value={
          <CurrencyAmount
            amount={data.hypotheticalProfit}
            currency={data.currency}
          />
        }
        valueClassName="text-2xl"
        description="Lo que debería haber"
      />

      <MetricCard
        label="Fondo"
        icon={LandmarkIcon}
        tone="default"
        value={<CurrencyAmount amount={data.fund} currency={data.currency} />}
        valueClassName="text-2xl"
        description="Efectivo disponible en caja"
      />

      <MetricCard
        label="Cierre de caja del día anterior"
        icon={ClockIcon}
        tone="warning"
        href={routes.cashClosing}
        value={
          <CurrencyAmount
            amount={data.previousClosing}
            currency={data.currency}
          />
        }
        valueClassName="text-2xl"
        description={`Cerró el ${data.previousClosingDate}`}
      />
    </section>
  );
}
