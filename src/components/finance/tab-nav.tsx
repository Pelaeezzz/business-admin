"use client";

import { cn } from "@/lib/utils";

export interface TabNavOption<T extends string> {
  value: T;
  label: string;
}

interface TabNavProps<T extends string> {
  options: readonly TabNavOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
}

export function TabNav<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: TabNavProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        "-mx-1 flex gap-1 overflow-x-auto border-b px-1",
        className,
      )}
    >
      {options.map((option) => {
        const active = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative shrink-0 px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
              active
                ? "text-foreground after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-primary after:content-['']"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
