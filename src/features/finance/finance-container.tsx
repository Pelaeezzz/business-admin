"use client";

import { financeData } from "@/mocks/finance";

import { AccountsPayableSection } from "./sections/accounts-payable-section";
import { DailyCashFlowSection } from "./sections/daily-cash-flow-section";
import { FinanceHeader } from "./sections/finance-header";
import { QuickActionsSection } from "./sections/quick-actions-section";
import { SalesForecastSection } from "./sections/sales-forecast-section";
import { SavingsSection } from "./sections/savings-section";

export default function FinanceContainer() {
  return (
    <div className="flex flex-col gap-6">
      <FinanceHeader />

      <DailyCashFlowSection data={financeData.dailyFlow} />

      <div className="grid gap-6 lg:grid-cols-2">
        <SalesForecastSection data={financeData.forecast} />
        <SavingsSection data={financeData.savings} />
      </div>

      <AccountsPayableSection data={financeData.payables} />

      <QuickActionsSection />
    </div>
  );
}