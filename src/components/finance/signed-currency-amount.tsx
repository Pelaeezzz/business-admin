import { formatSignedAmount } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CurrencyCode } from "@/types/finance";

interface SignedCurrencyAmountProps {
  amount: number;
  currency: CurrencyCode;
  className?: string;
  currencyClassName?: string;
}

export function SignedCurrencyAmount({
  amount,
  currency,
  className,
  currencyClassName,
}: SignedCurrencyAmountProps) {
  const tone =
    amount > 0
      ? "text-emerald-600 dark:text-emerald-400"
      : amount < 0
        ? "text-destructive"
        : "text-muted-foreground";

  return (
    <span className={cn("whitespace-nowrap tabular-nums", tone, className)}>
      {formatSignedAmount(amount)}{" "}
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
