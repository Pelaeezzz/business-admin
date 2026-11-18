"use client";

import { useState } from "react";
import { ChevronDownIcon, CreditCardIcon } from "lucide-react";

import { CurrencyAmount } from "@/components/finance/currency-amount";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { MoneyFlowSummary } from "@/types/summary";

import { MoneyFlowCard } from "../components/money-flow-card";

interface MoneyFlowSectionProps {
  data: MoneyFlowSummary;
}

export function MoneyFlowSection({ data }: MoneyFlowSectionProps) {
  const [cardsOpen, setCardsOpen] = useState(false);
  const [openCardId, setOpenCardId] = useState<string | null>(null);

  return (
    <section aria-label="Flujo de dinero">
      <Card>
        <CardHeader>
          <CardTitle>Flujo de dinero</CardTitle>
          <CardDescription>
            Saldo y movimientos de cada tarjeta.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          {/* Tarjetas (desplegable) */}
          <div className="overflow-hidden rounded-lg border">
            <button
              type="button"
              onClick={() => setCardsOpen((open) => !open)}
              aria-expanded={cardsOpen}
              className="flex w-full items-center justify-between gap-3 p-3 text-left outline-none transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <CreditCardIcon className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium">Tarjetas</p>
                  <p className="text-xs text-muted-foreground">
                    {data.cards.length} tarjetas
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <CurrencyAmount
                  amount={data.cardsTotal}
                  currency={data.currency}
                  className="text-lg font-semibold"
                />
                <ChevronDownIcon
                  className={cn(
                    "size-4 text-muted-foreground transition-transform",
                    cardsOpen && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </div>
            </button>

            {cardsOpen ? (
              <ul className="flex flex-col gap-2 border-t bg-muted/20 p-3">
                {data.cards.map((card) => (
                  <MoneyFlowCard
                    key={card.id}
                    card={card}
                    open={openCardId === card.id}
                    onToggle={() =>
                      setOpenCardId((current) =>
                        current === card.id ? null : card.id,
                      )
                    }
                  />
                ))}
              </ul>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
