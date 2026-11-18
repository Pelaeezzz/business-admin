import { ArrowRightIcon, PlusIcon } from "lucide-react";

import { PayablesTable } from "../components/payables-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CurrencyAmount } from "@/components/finance/currency-amount";
import { MetricCard } from "@/components/finance/metric-card";
import { SectionHeader } from "@/components/finance/section-header";
import type { PayablesSummary } from "@/types/finance";

interface AccountsPayableSectionProps {
  data: PayablesSummary;
  onViewAll?: () => void;
  onAddPayable?: () => void;
}

export function AccountsPayableSection({
  data,
  onViewAll,
  onAddPayable,
}: AccountsPayableSectionProps) {
  const metrics = [
    {
      label: "Total por pagar",
      amount: data.total,
      tone: "default" as const,
    },
    {
      label: "Vencen esta semana",
      amount: data.thisWeek,
      tone: "warning" as const,
    },
    {
      label: "Vencidas",
      amount: data.overdue,
      tone: "danger" as const,
    },
    {
      label: "Próximas 30 días",
      amount: data.next30Days,
      tone: "info" as const,
    },
  ];

  return (
    <section id="cuentas-por-pagar" className="flex flex-col gap-3">
      <SectionHeader
        title="Cuentas por pagar"
        action={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onViewAll}
          >
            Ver todas
            <ArrowRightIcon />
          </Button>
        }
      />

      <Card>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.label}
                label={metric.label}
                tone={metric.tone}
                value={
                  <CurrencyAmount
                    amount={metric.amount}
                    currency={data.currency}
                  />
                }
              />
            ))}
          </div>

          <PayablesTable accounts={data.accounts} />

          <Button
            type="button"
            variant="outline"
            className="mx-auto"
            onClick={onAddPayable}
          >
            <PlusIcon />
            Nueva cuenta por pagar
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}