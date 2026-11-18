import type { CurrencyCode } from "@/types/finance";

const amountFormatter = new Intl.NumberFormat("es-ES", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const integerFormatter = new Intl.NumberFormat("es-ES", {
  maximumFractionDigits: 0,
});

const decimalFormatter = new Intl.NumberFormat("es-ES", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function formatAmount(value: number) {
  return amountFormatter.format(value);
}

export function formatCurrency(value: number, currency: CurrencyCode) {
  return `${formatAmount(value)} ${currency}`;
}

export function formatSignedAmount(value: number) {
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}${formatAmount(Math.abs(value))}`;
}

export function formatPercent(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1).replace(".", ",")}%`;
}

export function formatPercentage(value: number) {
  return `${decimalFormatter.format(value)}%`;
}

export function formatInteger(value: number) {
  return integerFormatter.format(value);
}

export function formatDecimal(value: number) {
  return decimalFormatter.format(value);
}

export function formatWholeCurrency(
  value: number,
  currency: CurrencyCode,
) {
  return `${formatInteger(value)} ${currency}`;
}

export function formatWholePercent(value: number) {
  return `${integerFormatter.format(Math.round(value))}%`;
}

export function formatCompactAmount(value: number) {
  if (Math.abs(value) >= 1000) {
    return `${integerFormatter.format(Math.round(value / 1000))}K`;
  }

  return integerFormatter.format(value);
}