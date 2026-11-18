import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SummaryLineChart } from "@/components/charts/summary-line-chart";
import { PurchaseSuggestionsPanel } from "@/components/inventory/purchase-suggestions-panel";
import { purchaseSuggestions } from "@/components/inventory/purchase-suggestions";
import { MoneyFlowSection } from "@/features/summary/sections/money-flow-section";
import { AccountsPayableSection } from "@/features/summary/sections/accounts-payable-section";
import { DayWorkersSection } from "@/features/summary/sections/day-workers-section";
import { MostConsumedProductsSection } from "@/features/summary/sections/most-consumed-products-section";
import { SummaryCashCardsSection } from "@/features/summary/sections/summary-cash-cards-section";
import { TopProductsSection } from "@/features/summary/sections/top-products-section";
import { employeesData } from "@/mocks/employees";
import {
  accountsPayableData,
  moneyFlowData,
  mostConsumedProductsData,
  summaryCashData,
  topProductsData,
} from "@/mocks/summary";

export default function ResumenPage() {
  const dayWorkers = employeesData.employees.filter(
    (employee) => employee.status === "active",
  );

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Resumen</h1>
        <p className="text-sm text-muted-foreground">
          Evolución de ingresos y gastos del año.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Ingresos vs. gastos</CardTitle>
          <CardDescription>Comparativa mensual · 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <SummaryLineChart />
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <PurchaseSuggestionsPanel suggestions={purchaseSuggestions} />
        <DayWorkersSection employees={dayWorkers} />
      </div>

      <SummaryCashCardsSection data={summaryCashData} />

      <MoneyFlowSection data={moneyFlowData} />

      <AccountsPayableSection data={accountsPayableData} />

      <div className="grid gap-6 xl:grid-cols-2">
        <TopProductsSection data={topProductsData} />
        <MostConsumedProductsSection data={mostConsumedProductsData} />
      </div>
    </div>
  );
}
