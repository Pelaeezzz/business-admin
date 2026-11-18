import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { CurrencyAmount } from "@/components/finance/currency-amount";
import { cn } from "@/lib/utils";
import type {
  CurrencyCode,
  NetIncomeIcon,
  NetIncomeTone,
} from "@/types/finance";

import { NetIncomeIconBadge } from "./net-income-icon";

interface NetIncomeMetricCardProps {
  label: string;
  amount: number;
  currency: CurrencyCode;
  description: ReactNode;
  icon: NetIncomeIcon;
  tone?: NetIncomeTone;
  className?: string;
}

export function NetIncomeMetricCard({
  label,
  amount,
  currency,
  description,
  icon,
  tone = "default",
  className,
}: NetIncomeMetricCardProps) {
  return (
    <Card size="sm" className={className}>
      <CardContent className="gap-3">
        <NetIncomeIconBadge icon={icon} tone={tone} />

        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>

          <CurrencyAmount
            amount={amount}
            currency={currency}
            className={cn(
              "text-xl font-semibold tracking-tight",
              tone === "danger" && "text-destructive",
            )}
          />

          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
      </CardContent>
    </Card>
  );
}
