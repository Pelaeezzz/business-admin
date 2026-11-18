"use client";

import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { DateRangePicker } from "../components/date-range-picker";

interface EmployeesHeaderProps {
  initialRange: DateRange;
  onRangeChange?: (range: DateRange | undefined) => void;
}

export function EmployeesHeader({
  initialRange,
  onRangeChange,
}: EmployeesHeaderProps) {
  const [range, setRange] = useState<DateRange | undefined>(
    initialRange,
  );

  function handleChange(nextRange: DateRange | undefined) {
    setRange(nextRange);
    onRangeChange?.(nextRange);
  }

  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Empleados
        </h1>
        <p className="text-sm text-muted-foreground">
          Gestiona tu equipo y su rendimiento.
        </p>
      </div>

      <DateRangePicker value={range} onChange={handleChange} />
    </header>
  );
}