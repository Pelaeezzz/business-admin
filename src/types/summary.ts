import type { CurrencyCode } from "@/types/finance";

export interface SummaryCashData {
  currency: CurrencyCode;
  /** Dinero real que hay en caja en el momento (ventas del día). */
  salesToday: number;
  /** Utilidad hipotética: lo que debería haber. */
  hypotheticalProfit: number;
  /** Dinero disponible en fondo (efectivo en caja). */
  fund: number;
  /** Monto con el que cerró la caja el día anterior. */
  previousClosing: number;
  /** Etiqueta del día del cierre anterior. */
  previousClosingDate: string;
}

export type TransferStatus = "completed" | "pending" | "failed";

export interface CardTransfer {
  id: string;
  /** Fecha y hora del movimiento. */
  date: string;
  /** Concepto corto del movimiento. */
  concept: string;
  /** Origen del dinero. */
  origin: string;
  /** Número o código de referencia. */
  reference: string;
  amount: number;
  status: TransferStatus;
}

export interface MoneyCard {
  id: string;
  name: string;
  /** Últimos 4 dígitos de la tarjeta. */
  last4: string;
  bank: string;
  currency: CurrencyCode;
  balance: number;
  transfers: CardTransfer[];
}

export interface MoneyFlowSummary {
  currency: CurrencyCode;
  /** Total disponible en tarjetas. */
  cardsTotal: number;
  cards: MoneyCard[];
}

export type PayableStatus = "pending" | "paid";

export interface Payable {
  id: string;
  /** Concepto del pago (renta, membresía, proveedor, nómina...). */
  concept: string;
  /** Categoría del pago. */
  category: string;
  /** A quién se le paga. */
  payee: string;
  amount: number;
  /** Fecha en la que debería hacerse el pago. */
  dueDate: string;
  status: PayableStatus;
  /** Si el pago está vencido y sigue pendiente. */
  overdue?: boolean;
}

export interface AccountsPayableSummary {
  currency: CurrencyCode;
  items: Payable[];
}

export interface TopProduct {
  id: string;
  name: string;
  category: string;
  /** Imagen del producto. */
  image: string;
  /** Unidades vendidas en el período. */
  units: number;
  /** Ingresos generados por el producto. */
  revenue: number;
}

export interface TopProductsSummary {
  currency: CurrencyCode;
  /** Etiqueta del período mostrado. */
  period: string;
  products: TopProduct[];
}

export interface ConsumedProduct {
  id: string;
  name: string;
  category: string;
  /** Imagen del producto. */
  image: string;
  /** Cantidad consumida en el período. */
  quantity: number;
  /** Unidad de medida (kg, L, unidades...). */
  unit: string;
}

export interface MostConsumedProductsSummary {
  /** Etiqueta del período mostrado. */
  period: string;
  products: ConsumedProduct[];
}
