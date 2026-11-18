"use client";

import { useState } from "react";
import { format, isSameDay, startOfDay, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/calendar/propover";
import { cn } from "@/lib/utils";

interface FinanceDatePickerProps {
  initialDate?: Date;
  maxDate?: Date;
  onDateChange?: (date: Date) => void;
  className?: string;
}

export function FinanceDatePicker({
  initialDate,
  maxDate,
  onDateChange,
  className,
}: FinanceDatePickerProps) {
  const today = startOfDay(new Date());
  const limitDate = startOfDay(maxDate ?? today);

  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    startOfDay(initialDate ?? today),
  );
  const [month, setMonth] = useState<Date>(() =>
    startOfMonth(initialDate ?? today),
  );
  const [open, setOpen] = useState(false);

  const isToday = isSameDay(selectedDate, today);
  const formattedDate = format(selectedDate, "d 'de' MMMM", {
    locale: es,
  });
  const buttonLabel = isToday ? `Hoy, ${formattedDate}` : formattedDate;

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (nextOpen) {
      setMonth(startOfMonth(selectedDate));
    }
  }

  function handleSelect(nextDate: Date | undefined) {
    if (!nextDate) {
      return;
    }

    const normalizedDate = startOfDay(nextDate);

    setSelectedDate(normalizedDate);
    setOpen(false);
    onDateChange?.(normalizedDate);
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
        <CalendarIcon className="size-4" />
        {buttonLabel}
        <ChevronDownIcon className="size-4 text-muted-foreground" />
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={8} className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          month={month}
          onMonthChange={setMonth}
          disabled={{ after: limitDate }}
          endMonth={startOfMonth(limitDate)}
          locale={es}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
