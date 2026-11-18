import { CreditCardIcon } from "lucide-react";

import { FinanceAmountCard } from "../components/finance-amount-card";
import { SectionHeader } from "@/components/finance/section-header";
import { TrendIndicator } from "@/components/finance/trend-indicator";
import type { DailyFlowSummary } from "@/types/finance";

interface DailyCashFlowSectionProps {
  data: DailyFlowSummary;
}

export function DailyCashFlowSection({
  data,
}: DailyCashFlowSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <SectionHeader
        title="Flujo de dinero del día"
        action={
          <TrendIndicator
            value={data.changePercentage}
            label="vs ayer"
          />
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {data.flows.map((flow) => (
          <FinanceAmountCard
            key={flow.currency}
            label={flow.currency}
            amount={flow.amount}
            currency={flow.currency}
            change={flow.change}
          />
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {data.cardFlows.map((flow) => (
          <FinanceAmountCard
            key={flow.label}
            label={flow.label}
            amount={flow.amount}
            currency={flow.currency}
            change={flow.change}
            icon={
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <CreditCardIcon
                  className="size-4"
                  aria-hidden="true"
                />
              </span>
            }
          />
        ))}
      </div>
    </section>
  );
}