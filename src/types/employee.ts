import type { CurrencyCode } from "@/types/finance";

export type EmployeeStatus = "active" | "inactive";

export type EmployeeShift = "Mañana" | "Tarde";

export type EmployeeRankingTab =
  | "performance"
  | "attendance"
  | "sales"
  | "evaluations"
  | "payroll";

export interface Employee {
  id: string;
  name: string;
  initials: string;
  role: string;
  area: string;
  shift: EmployeeShift;
  weeklySales: number;
  performance: number;
  attendance: number;
  evaluation: number;
  arrivalTime: string;
  averageTicket: number;
  salesPerHour: number;
  weeklyPay: number;
  status: EmployeeStatus;
}

export interface EmployeeMetrics {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  scheduledShifts: number;
  teamSales: number;
  salesChange: number;
  hoursWorked: number;
  averageHours: number;
  currency: CurrencyCode;
}

export interface EmployeeAreaSummary {
  id: string;
  name: string;
  sales: number;
  employees: number;
  performance: number;
}

export interface EmployeePerformanceMetric {
  label: string;
  value: number;
}

export interface EmployeeBirthday {
  employeeId: string;
  name: string;
  initials: string;
  date: string;
  month: number;
  day: number;
}

export interface EmployeeRankings {
  performance: Employee[];
  attendance: Employee[];
  sales: Employee[];
  arrivals: Employee[];
  evaluations: Employee[];
  averageTicket: Employee[];
  salesPerHour: Employee[];
}

export interface EmployeesData {
  metrics: EmployeeMetrics;
  employees: Employee[];
  areas: EmployeeAreaSummary[];
  performance: EmployeePerformanceMetric[];
  birthdays: EmployeeBirthday[];
  period: {
    from: Date;
    to: Date;
  };
}