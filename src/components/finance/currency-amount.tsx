import { formatAmount } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CurrencyCode } from "@/types/finance";

interface CurrencyAmountProps {
  amount: number;
  currency: CurrencyCode;
  className?: string;
  currencyClassName?: string;
}

export function CurrencyAmount({
  amount,
  currency,
  className,
  currencyClassName,
}: CurrencyAmountProps) {
  return (
    <span className={cn("whitespace-nowrap tabular-nums", className)}>
      {formatAmount(amount)}{" "}
      <span
        className={cn(
          "text-xs font-medium text-muted-foreground",
          currencyClassName,
        )}
      >
        {currency}
      </span>
    </span>
  );
}