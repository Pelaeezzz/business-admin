import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatTone = "warning" | "danger" | "info" | "success";

interface InventoryStatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  tone?: StatTone;
}

const TONES: Record<StatTone, string> = {
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  danger: "bg-destructive/10 text-destructive",
  info: "bg-primary/10 text-primary",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

export function InventoryStatCard({
  title,
  value,
  description,
  icon: Icon,
  tone = "info",
}: InventoryStatCardProps) {
  return (
    <Card size="sm">
      <CardContent className="gap-1.5">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-md",
              TONES[tone],
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
          </span>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
        </div>

        <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">
          {value}
        </p>

        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}