"use client";

import { ChevronDownIcon, CreditCardIcon } from "lucide-react";

import { CurrencyAmount } from "@/components/finance/currency-amount";
import { cn } from "@/lib/utils";
import type { MoneyCard } from "@/types/summary";

import { CardTransfersTable } from "./card-transfers-table";

interface MoneyFlowCardProps {
  card: MoneyCard;
  open: boolean;
  onToggle: () => void;
}

export function MoneyFlowCard({ card, open, onToggle }: MoneyFlowCardProps) {
  return (
    <li className="overflow-hidden rounded-lg border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 p-3 text-left outline-none transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <CreditCardIcon className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              {card.name} •••• {card.last4}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {card.bank}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <CurrencyAmount
            amount={card.balance}
            currency={card.currency}
            className="text-sm font-semibold"
          />
          <ChevronDownIcon
            className={cn(
              "size-4 text-muted-foreground transition-transform",
              open && "rotate-180",
            )}
            aria-hidden="true"
          />
        </div>
      </button>

      {open ? (
        <div className="border-t bg-muted/20">
          <CardTransfersTable
            transfers={card.transfers}
            currency={card.currency}
          />
        </div>
      ) : null}
    </li>
  );
}
