"use client";

import { employeesData } from "@/mocks/employees";
import type {
  Employee,
  EmployeeRankings,
} from "@/types/employee";

import { AreaSummarySection } from "./sections/area-summary-section";
import { EmployeeMetricsSection } from "./sections/employee-metrics-section";
import { EmployeeRankingsSection } from "./sections/employee-rankings-section";
import { EmployeesHeader } from "./sections/employees-header";
import { EmployeesTableSection } from "./sections/employees-table-section";
import { MotivationSection } from "./sections/motivation-section";
import { TeamPerformanceSection } from "./sections/team-performance-section";
import { UpcomingBirthdaysSection } from "./sections/upcoming-birthdays-section";

function sortEmployees(
  employees: Employee[],
  getValue: (employee: Employee) => number,
) {
  return [...employees].sort(
    (first, second) => getValue(second) - getValue(first),
  );
}

function arrivalInMinutes(employee: Employee) {
  const [hours, minutes] = employee.arrivalTime
    .split(":")
    .map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return Number.POSITIVE_INFINITY;
  }

  return hours * 60 + minutes;
}

export default function EmployeesContainer() {
  const activeEmployees = employeesData.employees.filter(
    (employee) => employee.status === "active",
  );

  const rankings: EmployeeRankings = {
    performance: sortEmployees(
      activeEmployees,
      (employee) => employee.performance,
    ),
    attendance: sortEmployees(
      activeEmployees,
      (employee) => employee.attendance,
    ),
    sales: sortEmployees(
      activeEmployees,
      (employee) => employee.weeklySales,
    ),
    arrivals: [...activeEmployees].sort(
      (first, second) =>
        arrivalInMinutes(first) - arrivalInMinutes(second),
    ),
    evaluations: sortEmployees(
      activeEmployees,
      (employee) => employee.evaluation,
    ),
    averageTicket: sortEmployees(
      activeEmployees,
      (employee) => employee.averageTicket,
    ),
    salesPerHour: sortEmployees(
      activeEmployees,
      (employee) => employee.salesPerHour,
    ),
  };

  return (
    <div className="flex flex-col gap-6">
      <EmployeesHeader
        initialRange={{
          from: employeesData.period.from,
          to: employeesData.period.to,
        }}
      />

      <EmployeeMetricsSection metrics={employeesData.metrics} />

      <EmployeeRankingsSection
        employees={employeesData.employees}
        rankings={rankings}
        currency={employeesData.metrics.currency}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <TeamPerformanceSection data={employeesData.performance} />

        <div className="flex flex-col gap-6">
          <AreaSummarySection
            areas={employeesData.areas}
            currency={employeesData.metrics.currency}
          />

          <UpcomingBirthdaysSection
            birthdays={employeesData.birthdays}
          />
        </div>
      </div>

      <EmployeesTableSection
        employees={employeesData.employees}
        currency={employeesData.metrics.currency}
      />

      <MotivationSection />
    </div>
  );
}