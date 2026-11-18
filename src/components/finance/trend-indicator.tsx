import { ArrowDownRightIcon, ArrowUpRightIcon } from "lucide-react";

import { formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

interface TrendIndicatorProps {
  value: number;
  label?: string;
  className?: string;
}

export function TrendIndicator({
  value,
  label,
  className,
}: TrendIndicatorProps) {
  const positive = value >= 0;
  const Icon = positive ? ArrowUpRightIcon : ArrowDownRightIcon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium",
        positive
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-destructive",
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      <span className="tabular-nums">{formatPercent(value)}</span>
      {label ? (
        <span className="font-normal text-muted-foreground">{label}</span>
      ) : null}
    </span>
  );
}