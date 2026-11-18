import { ArrowDownLeftIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { CurrencyAmount } from "@/components/finance/currency-amount";
import { SectionHeader } from "@/components/finance/section-header";
import type { CurrencyCode, NetIncomeBreakdownItem } from "@/types/finance";

import { NetIncomeBreakdownDialog } from "../components/net-income-breakdown-dialog";
import { NetIncomeBreakdownList } from "../components/net-income-breakdown-list";

interface DailyIncomeSectionProps {
  incomes: NetIncomeBreakdownItem[];
  total: number;
  currency: CurrencyCode;
}

export function DailyIncomeSection({
  incomes,
  total,
  currency,
}: DailyIncomeSectionProps) {
  return (
    <section id="ingresos-del-dia" className="flex flex-col gap-3">
      <SectionHeader
        title="Ingresos del día"
        action={
          <NetIncomeBreakdownDialog
            title="Ingresos del día"
            description="Detalle de los ingresos registrados durante la jornada."
            triggerLabel="Ver detalle"
            items={incomes}
            currency={currency}
            total={total}
          />
        }
      />

      <Card className="h-full">
        <CardContent className="flex flex-col gap-4">
          <NetIncomeBreakdownList items={incomes} currency={currency} />

          <div className="flex items-center justify-between gap-3 border-t pt-3">
            <span className="text-sm font-medium">Total de ingresos</span>

            <div className="flex items-center gap-2">
              <CurrencyAmount
                amount={total}
                currency={currency}
                className="text-base font-semibold"
              />
              <span className="flex size-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <ArrowDownLeftIcon className="size-4" aria-hidden="true" />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
