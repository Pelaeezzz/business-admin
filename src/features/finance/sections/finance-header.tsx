"use client";

import type { ReactNode } from "react";

import { FinanceDatePicker } from "@/components/finance/finance-date-picker";

interface FinanceHeaderProps {
  title?: string;
  description?: string;
  initialDate?: Date;
  maxDate?: Date;
  actions?: ReactNode;
  /**
   * Se emite cuando el usuario selecciona una fecha.
   * Sirve para filtrar las secciones de Finanzas más adelante.
   */
  onDateChange?: (date: Date) => void;
}

export function FinanceHeader({
  title = "Finanzas",
  description = "Resumen general de tu negocio.",
  initialDate,
  maxDate,
  actions,
  onDateChange,
}: FinanceHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <FinanceDatePicker
          initialDate={initialDate}
          maxDate={maxDate}
          onDateChange={onDateChange}
        />
        {actions}
      </div>
    </header>
  );
}
