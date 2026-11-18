"use client";

import { useMemo, useState } from "react";

import { netIncomeData } from "@/mocks/finance";
import type { NetIncomeBreakdownItem } from "@/types/finance";

import { FinanceHeader } from "../sections/finance-header";
import { DailyExpensesSection } from "./sections/daily-expenses-section";
import { DailyIncomeSection } from "./sections/daily-income-section";
import { MonthlyNetIncomeSection } from "./sections/monthly-net-income-section";
import { NetIncomeSummarySection } from "./sections/net-income-summary-section";

function withPercentages(expenses: NetIncomeBreakdownItem[], total: number) {
  return expenses.map((expense) => ({
    ...expense,
    percentage: total > 0 ? (expense.amount / total) * 100 : 0,
  }));
}

export default function NetIncomeContainer() {
  const { summary: baseSummary, incomes, monthly } = netIncomeData;
  const [expenses, setExpenses] = useState<NetIncomeBreakdownItem[]>(
    () => netIncomeData.expenses,
  );

  const totalExpenses = useMemo(
    () => expenses.reduce((total, expense) => total + expense.amount, 0),
    [expenses],
  );

  const expensesWithPercentages = useMemo(
    () => withPercentages(expenses, totalExpenses),
    [expenses, totalExpenses],
  );

  const summary = useMemo(
    () => ({
      ...baseSummary,
      totalExpenses,
      netIncome:
        baseSummary.totalIncome - baseSummary.costOfSales - totalExpenses,
    }),
    [baseSummary, totalExpenses],
  );

  function handleAddExpense(expense: NetIncomeBreakdownItem) {
    setExpenses((current) => [...current, expense]);
  }

  return (
    <div className="flex flex-col gap-6">
      <FinanceHeader
        title="Utilidad neta"
        description="Resumen de ingresos, gastos y utilidad."
      />

      <NetIncomeSummarySection summary={summary} />

      <div className="grid gap-6 lg:grid-cols-2">
        <DailyExpensesSection
          expenses={expensesWithPercentages}
          total={summary.totalExpenses}
          currency={summary.currency}
          onAddExpense={handleAddExpense}
        />

        <DailyIncomeSection
          incomes={incomes}
          total={summary.totalIncome}
          currency={summary.currency}
        />
      </div>

      <MonthlyNetIncomeSection data={monthly} />
    </div>
  );
}
