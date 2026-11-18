"use client";

import { useState } from "react";
import { format, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/calendar/propover";
import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  className?: string;
}

function formatRange(range: DateRange | undefined) {
  if (!range?.from) {
    return "Seleccionar fechas";
  }

  if (!range.to) {
    return format(range.from, "d 'de' MMMM, yyyy", {
      locale: es,
    });
  }

  return `${format(range.from, "d MMM", { locale: es })} - ${format(
    range.to,
    "d MMM, yyyy",
    { locale: es },
  )}`;
}

export function DateRangePicker({
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>(() =>
    startOfMonth(value?.from ?? new Date()),
  );

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (nextOpen) {
      setMonth(startOfMonth(value?.from ?? new Date()));
    }
  }

  function handleSelect(nextRange: DateRange | undefined) {
    onChange(nextRange);

    if (nextRange?.from && nextRange.to) {
      setOpen(false);
    }
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        type="button"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "gap-2",
          className,
        )}
      >
        <CalendarIcon className="size-4" aria-hidden="true" />
        <span className="tabular-nums">{formatRange(value)}</span>
        <ChevronDownIcon
          className="size-4 text-muted-foreground"
          aria-hidden="true"
        />
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-auto p-0"
      >
        <Calendar
          mode="range"
          selected={value}
          onSelect={handleSelect}
          month={month}
          onMonthChange={setMonth}
          locale={es}
          autoFocus
          showOutsideDays={false}
        />
      </PopoverContent>
    </Popover>
  );
}