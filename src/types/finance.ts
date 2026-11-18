export type CurrencyCode = "CUP" | "USD" | "EUR";

export interface CurrencyFlow {
  currency: CurrencyCode;
  amount: number;
  change: number;
}

export interface CardFlow {
  label: string;
  currency: CurrencyCode;
  amount: number;
  change: number;
}

export interface DailyFlowSummary {
  changePercentage: number;
  flows: CurrencyFlow[];
  cardFlows: CardFlow[];
}

export type ForecastRange = "7d" | "30d" | "90d";

export interface ForecastPoint {
  label: string;
  value: number;
}

export interface ForecastRangeData {
  total: number;
  series: ForecastPoint[];
}

export interface SalesForecast {
  currency: CurrencyCode;
  changePercentage: number;
  insight: string;
  ranges: Record<ForecastRange, ForecastRangeData>;
}

export interface SavingsGoal {
  id: string;
  name: string;
  saved: number;
  target: number;
  currency: CurrencyCode;
}

export interface SavingsSummary {
  totalSaved: number;
  target: number;
  currency: CurrencyCode;
  goals: SavingsGoal[];
}

export type PayableStatus = "this-week" | "overdue" | "next";

export interface PayableAccount {
  id: string;
  supplier: string;
  concept: string;
  dueDate: string;
  amount: number;
  currency: CurrencyCode;
  status: PayableStatus;
}

export interface PayablesSummary {
  total: number;
  thisWeek: number;
  overdue: number;
  next30Days: number;
  currency: CurrencyCode;
  accounts: PayableAccount[];
}

export interface FinanceData {
  dailyFlow: DailyFlowSummary;
  forecast: SalesForecast;
  savings: SavingsSummary;
  payables: PayablesSummary;
}

export type NetIncomeIcon =
  | "arrow-down-left"
  | "arrow-up-right"
  | "banknote"
  | "shopping-cart"
  | "zap"
  | "wrench"
  | "ellipsis"
  | "shopping-bag"
  | "hand-coins"
  | "wallet";

export type NetIncomeTone =
  "default" | "info" | "success" | "warning" | "danger" | "violet";

export interface NetIncomeBreakdownItem {
  id: string;
  label: string;
  description: string;
  amount: number;
  percentage: number;
  icon: NetIncomeIcon;
  tone: NetIncomeTone;
}

export interface NetIncomeSummary {
  netIncome: number;
  changePercentage: number;
  totalIncome: number;
  totalExpenses: number;
  costOfSales: number;
  currency: CurrencyCode;
}

export interface MonthlyNetIncome {
  netIncome: number;
  changePercentage: number;
  currency: CurrencyCode;
}

export interface NetIncomeData {
  summary: NetIncomeSummary;
  expenses: NetIncomeBreakdownItem[];
  incomes: NetIncomeBreakdownItem[];
  monthly: MonthlyNetIncome;
}

export type ComparisonTab = "summary" | "product" | "category" | "ipv";

export type ComparisonRange = "day" | "week";

export interface SalesComparisonSummary {
  sales: number;
  productsSold: number;
  theoreticalCost: number;
  actualCost: number;
  difference: number;
  variation: number;
  currency: CurrencyCode;
}

export interface ComparisonSeriesPoint {
  label: string;
  theoretical: number;
  actual: number;
}

export interface ProductComparison {
  id: string;
  name: string;
  category: string;
  units: number;
  theoreticalCost: number;
  actualCost: number;
  difference: number;
  variation: number;
}

export interface CategoryComparison {
  id: string;
  name: string;
  products: number;
  units: number;
  theoreticalCost: number;
  actualCost: number;
  difference: number;
  variation: number;
}

export interface IpvComparisonDetail {
  id: string;
  product: string;
  category: string;
  units: number;
  theoreticalUnitCost: number;
  actualUnitCost: number;
  impact: number;
}

export interface SalesComparisonData {
  summary: SalesComparisonSummary;
  series: Record<ComparisonRange, ComparisonSeriesPoint[]>;
  products: ProductComparison[];
  categories: CategoryComparison[];
  ipvDetails: IpvComparisonDetail[];
}
