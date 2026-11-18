import Link from "next/link";
import { ChevronRightIcon, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type MetricTone = "default" | "info" | "success" | "warning" | "danger";

const ICON_TONES: Record<MetricTone, string> = {
  default: "text-muted-foreground",
  info: "text-primary",
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  danger: "text-destructive",
};

const VALUE_TONES: Record<MetricTone, string> = {
  default: "",
  info: "text-primary",
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  danger: "text-destructive",
};

interface MetricCardProps {
  label: string;
  value: ReactNode;
  description?: ReactNode;
  icon?: LucideIcon;
  tone?: MetricTone;
  className?: string;
  valueClassName?: string;
  /** Si se indica, la tarjeta completa es un enlace. */
  href?: string;
}

export function MetricCard({
  label,
  value,
  description,
  icon: Icon,
  tone = "default",
  className,
  valueClassName,
  href,
}: MetricCardProps) {
  const card = (
    <Card
      size="sm"
      className={cn(
        href &&
          "transition-colors group-hover:bg-muted/50 group-focus-visible:bg-muted/50",
        className,
      )}
    >
      <CardContent className="gap-1">
        <div className="flex items-center gap-2">
          {Icon ? (
            <Icon
              className={cn("size-4", ICON_TONES[tone])}
              aria-hidden="true"
            />
          ) : null}
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          {href ? (
            <ChevronRightIcon
              className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          ) : null}
        </div>

        <div
          className={cn(
            "text-lg font-semibold tracking-tight",
            VALUE_TONES[tone],
            valueClassName,
          )}
        >
          {value}
        </div>

        {description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        {card}
      </Link>
    );
  }

  return card;
}
