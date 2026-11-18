import { CurrencyAmount } from "@/components/finance/currency-amount";
import { formatPercentage } from "@/lib/format";
import type { CurrencyCode, NetIncomeBreakdownItem } from "@/types/finance";

import { NetIncomeIconBadge } from "./net-income-icon";

interface NetIncomeBreakdownListProps {
  items: NetIncomeBreakdownItem[];
  currency: CurrencyCode;
  showPercentage?: boolean;
}

export function NetIncomeBreakdownList({
  items,
  currency,
  showPercentage = true,
}: NetIncomeBreakdownListProps) {
  return (
    <ul className="flex flex-col">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center gap-3 border-b border-border/60 py-3 first:pt-0 last:border-0 last:pb-0"
        >
          <NetIncomeIconBadge icon={item.icon} tone={item.tone} />

          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="truncate text-sm font-medium">{item.label}</p>
            <p className="truncate text-xs text-muted-foreground">
              {item.description}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-0.5">
            <CurrencyAmount
              amount={item.amount}
              currency={currency}
              className="text-sm font-semibold"
            />

            {showPercentage ? (
              <span className="text-xs tabular-nums text-muted-foreground">
                {formatPercentage(item.percentage)}
              </span>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
