import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type EmployeeStatTone =
  | "default"
  | "info"
  | "success"
  | "warning"
  | "danger";

const ICON_TONES: Record<EmployeeStatTone, string> = {
  default: "bg-muted text-muted-foreground",
  info: "bg-primary/10 text-primary",
  success:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  danger: "bg-destructive/10 text-destructive",
};

interface EmployeeStatCardProps {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon: LucideIcon;
  tone?: EmployeeStatTone;
  className?: string;
}

export function EmployeeStatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
  className,
}: EmployeeStatCardProps) {
  return (
    <Card size="sm" className={className}>
      <CardContent className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-medium text-muted-foreground">
            {label}
          </p>

          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full",
              ICON_TONES[tone],
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-2xl font-semibold tracking-tight">
            {value}
          </div>

          {hint ? (
            <div className="text-xs text-muted-foreground">{hint}</div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}