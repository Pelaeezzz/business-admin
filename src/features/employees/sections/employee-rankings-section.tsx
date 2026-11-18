"use client";

import { useState, type ReactNode } from "react";
import {
  BadgeCheckIcon,
  CalendarCheckIcon,
  CoinsIcon,
  StarIcon,
  UserCheckIcon,
  WalletIcon,
} from "lucide-react";

import { SegmentedControl } from "@/components/finance/segmented-control";
import { Card, CardContent } from "@/components/ui/card";
import {
  formatInteger,
  formatWholeCurrency,
  formatWholePercent,
} from "@/lib/format";
import type { CurrencyCode } from "@/types/finance";
import type {
  Employee,
  EmployeeRankingTab,
  EmployeeRankings,
} from "@/types/employee";

import { EmployeeStatCard } from "../components/employee-stat-card";
import { PayrollTable } from "../components/payroll-table";
import {
  RankingCard,
  type RankingCardEntry,
} from "../components/ranking-card";

const RANKING_TABS = [
  { value: "performance", label: "Rendimiento" },
  { value: "attendance", label: "Asistencia" },
  { value: "sales", label: "Ventas" },
  { value: "evaluations", label: "Evaluaciones" },
  { value: "payroll", label: "Nómina" },
] as const satisfies readonly {
  value: EmployeeRankingTab;
  label: string;
}[];

function toEntries(
  employees: Employee[],
  valueFor: (employee: Employee) => ReactNode,
): RankingCardEntry[] {
  return employees.map((employee) => ({
    id: employee.id,
    name: employee.name,
    initials: employee.initials,
    subtitle: `${employee.role} · ${employee.area}`,
    value: valueFor(employee),
  }));
}

function currencyValue(value: number, currency: CurrencyCode) {
  return (
    <span>
      {formatInteger(value)}
      <span className="ml-1 text-xs font-normal text-muted-foreground">
        {currency}
      </span>
    </span>
  );
}

function PayrollContent({
  employees,
  currency,
}: {
  employees: Employee[];
  currency: CurrencyCode;
}) {
  const activeEmployees = employees.filter(
    (employee) => employee.status === "active",
  );

  const total = activeEmployees.reduce(
    (sum, employee) => sum + employee.weeklyPay,
    0,
  );

  const average =
    activeEmployees.length > 0
      ? total / activeEmployees.length
      : 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <EmployeeStatCard
          label="Nómina semanal"
          value={formatWholeCurrency(total, currency)}
          hint={`${formatInteger(activeEmployees.length)} empleados activos`}
          icon={WalletIcon}
          tone="success"
        />

        <EmployeeStatCard
          label="Promedio por empleado"
          value={formatWholeCurrency(average, currency)}
          hint="Salario semanal"
          icon={CoinsIcon}
          tone="info"
        />
      </div>

      <PayrollTable
        employees={activeEmployees}
        currency={currency}
      />
    </div>
  );
}

function getRankingCards(
  tab: EmployeeRankingTab,
  rankings: EmployeeRankings,
  currency: CurrencyCode,
  employees: Employee[],
): ReactNode {
  const activeEmployees = employees.filter(
    (employee) => employee.status === "active",
  );

  switch (tab) {
    case "attendance": {
      const averageAttendance =
        activeEmployees.length > 0
          ? activeEmployees.reduce(
              (sum, employee) => sum + employee.attendance,
              0,
            ) / activeEmployees.length
          : 0;

      const perfectAttendance = activeEmployees.filter(
        (employee) => employee.attendance >= 100,
      ).length;

      return (
        <>
          <RankingCard
            title="Mejor asistencia"
            description="Porcentaje de asistencia"
            entries={toEntries(rankings.attendance, (employee) =>
              formatWholePercent(employee.attendance),
            )}
          />

          <RankingCard
            title="Llegan más temprano"
            description="Promedio de llegada semanal"
            entries={toEntries(
              rankings.arrivals,
              (employee) => employee.arrivalTime,
            )}
          />

          <div className="flex flex-col gap-4">
            <EmployeeStatCard
              label="Asistencia promedio"
              value={formatWholePercent(averageAttendance)}
              hint="Equipo activo"
              icon={UserCheckIcon}
              tone="success"
              className="flex-1"
            />

            <EmployeeStatCard
              label="Asistencia perfecta"
              value={formatInteger(perfectAttendance)}
              hint="Empleados con 100%"
              icon={CalendarCheckIcon}
              tone="info"
              className="flex-1"
            />
          </div>
        </>
      );
    }

    case "sales":
      return (
        <>
          <RankingCard
            title="Más ventas generadas"
            description="Ventas totales de la semana"
            entries={toEntries(rankings.sales, (employee) =>
              currencyValue(employee.weeklySales, currency),
            )}
          />

          <RankingCard
            title="Ticket promedio"
            description="Promedio por venta"
            entries={toEntries(rankings.averageTicket, (employee) =>
              currencyValue(employee.averageTicket, currency),
            )}
          />

          <RankingCard
            title="Ventas por hora"
            description="Rendimiento de ventas por hora"
            entries={toEntries(
              rankings.salesPerHour,
              (employee) => (
                <span>
                  {currencyValue(employee.salesPerHour, currency)}
                  <span className="text-xs font-normal text-muted-foreground">
                    /h
                  </span>
                </span>
              ),
            )}
          />
        </>
      );

    case "evaluations": {
      const averageEvaluation =
        activeEmployees.length > 0
          ? activeEmployees.reduce(
              (sum, employee) => sum + employee.evaluation,
              0,
            ) / activeEmployees.length
          : 0;

      const evaluatedEmployees = activeEmployees.filter(
        (employee) => employee.evaluation > 0,
      ).length;

      return (
        <>
          <RankingCard
            title="Mejores evaluaciones"
            description="Según evaluación del período"
            entries={toEntries(rankings.evaluations, (employee) =>
              formatWholePercent(employee.evaluation),
            )}
          />

          <RankingCard
            title="Desempeño general"
            description="Puntaje de desempeño"
            entries={toEntries(rankings.performance, (employee) =>
              formatWholePercent(employee.performance),
            )}
          />

          <div className="flex flex-col gap-4">
            <EmployeeStatCard
              label="Promedio de evaluación"
              value={formatWholePercent(averageEvaluation)}
              hint="Equipo activo"
              icon={StarIcon}
              tone="warning"
              className="flex-1"
            />

            <EmployeeStatCard
              label="Empleados evaluados"
              value={formatInteger(evaluatedEmployees)}
              hint="Este período"
              icon={BadgeCheckIcon}
              tone="info"
              className="flex-1"
            />
          </div>
        </>
      );
    }

    case "payroll":
      return null;

    case "performance":
    default:
      return (
        <>
          <RankingCard
            title="Mejores en desempeño"
            description="Según evaluaciones y productividad"
            entries={toEntries(rankings.performance, (employee) =>
              formatWholePercent(employee.performance),
            )}
          />

          <RankingCard
            title="Llegan más temprano"
            description="Promedio de llegada semanal"
            entries={toEntries(
              rankings.arrivals,
              (employee) => employee.arrivalTime,
            )}
          />

          <RankingCard
            title="Más ventas generadas"
            description="Ventas totales de la semana"
            entries={toEntries(rankings.sales, (employee) =>
              currencyValue(employee.weeklySales, currency),
            )}
          />
        </>
      );
  }
}

interface EmployeeRankingsSectionProps {
  employees: Employee[];
  rankings: EmployeeRankings;
  currency: CurrencyCode;
}

export function EmployeeRankingsSection({
  employees,
  rankings,
  currency,
}: EmployeeRankingsSectionProps) {
  const [tab, setTab] =
    useState<EmployeeRankingTab>("performance");

  const rankingCards = getRankingCards(
    tab,
    rankings,
    currency,
    employees,
  );

  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <div className="-mx-1 overflow-x-auto px-1 pb-1">
          <SegmentedControl
            options={RANKING_TABS}
            value={tab}
            onChange={setTab}
            label="Tipo de ranking"
          />
        </div>

        {tab === "payroll" ? (
          <PayrollContent
            employees={employees}
            currency={currency}
          />
        ) : (
          <div className="grid gap-4 lg:grid-cols-3">
            {rankingCards}
          </div>
        )}
      </CardContent>
    </Card>
  );
}