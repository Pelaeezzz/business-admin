import {
    CalendarClockIcon,
    ClockIcon,
    TrendingUpIcon,
    UsersIcon,
  } from "lucide-react";
  
  import { TrendIndicator } from "@/components/finance/trend-indicator";
  import {
    formatDecimal,
    formatInteger,
  } from "@/lib/format";
  import type { EmployeeMetrics } from "@/types/employee";
  
  import { EmployeeStatCard } from "../components/employee-stat-card";
  
  interface EmployeeMetricsSectionProps {
    metrics: EmployeeMetrics;
  }
  
  export function EmployeeMetricsSection({
    metrics,
  }: EmployeeMetricsSectionProps) {
    return (
      <section
        aria-label="Indicadores del equipo"
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        <EmployeeStatCard
          label="Total de empleados"
          value={formatInteger(metrics.totalEmployees)}
          hint={`${formatInteger(metrics.activeEmployees)} activos · ${formatInteger(
            metrics.inactiveEmployees,
          )} inactivo`}
          icon={UsersIcon}
          tone="info"
        />
  
        <EmployeeStatCard
          label="Turnos esta semana"
          value={formatInteger(metrics.scheduledShifts)}
          hint="Programados"
          icon={CalendarClockIcon}
          tone="info"
        />
  
        <EmployeeStatCard
          label="Ventas del equipo"
          value={
            <span>
              {formatInteger(metrics.teamSales)}
              <span className="ml-1 text-sm font-medium text-muted-foreground">
                {metrics.currency}
              </span>
            </span>
          }
          hint={
            <TrendIndicator
              value={metrics.salesChange}
              label="vs semana anterior"
            />
          }
          icon={TrendingUpIcon}
          tone="success"
        />
  
        <EmployeeStatCard
          label="Horas trabajadas"
          value={
            <span>
              {formatInteger(metrics.hoursWorked)}
              <span className="ml-1 text-sm font-medium text-muted-foreground">
                h
              </span>
            </span>
          }
          hint={`Prom. ${formatDecimal(metrics.averageHours)} h por empleado`}
          icon={ClockIcon}
          tone="warning"
        />
      </section>
    );
  }