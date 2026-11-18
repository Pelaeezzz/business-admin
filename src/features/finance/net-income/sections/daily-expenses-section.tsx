import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/finance/section-header";
import type { CurrencyCode, NetIncomeBreakdownItem } from "@/types/finance";

import { AddExpenseDialog } from "../components/add-expense-dialog";
import { NetIncomeBreakdownDialog } from "../components/net-income-breakdown-dialog";
import { NetIncomeBreakdownList } from "../components/net-income-breakdown-list";

interface DailyExpensesSectionProps {
  expenses: NetIncomeBreakdownItem[];
  total: number;
  currency: CurrencyCode;
  onAddExpense: (expense: NetIncomeBreakdownItem) => void;
}

export function DailyExpensesSection({
  expenses,
  total,
  currency,
  onAddExpense,
}: DailyExpensesSectionProps) {
  return (
    <section id="gastos-del-dia" className="flex flex-col gap-3">
      <SectionHeader
        title="Gastos del día"
        action={
          <NetIncomeBreakdownDialog
            title="Gastos del día"
            description="Detalle de los gastos registrados durante la jornada."
            triggerLabel="Ver todos"
            items={expenses}
            currency={currency}
            total={total}
          />
        }
      />

      <Card className="h-full">
        <CardContent className="flex flex-col gap-4">
          <NetIncomeBreakdownList items={expenses} currency={currency} />

          <AddExpenseDialog currency={currency} onAdd={onAddExpense} />
        </CardContent>
      </Card>
    </section>
  );
}
