"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon, MinusIcon, PlusIcon, TruckIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { routes } from "@/routes/routes";
import type { PurchaseSuggestion } from "./purchase-suggestions";

const CURRENCY_SYMBOL = "€";

// Formato determinista: evita diferencias de Intl entre servidor y cliente.
function formatUnitPrice(price: number, unit: string) {
  return `${price.toFixed(2).replace(".", ",")} ${CURRENCY_SYMBOL}/${unit}`;
}

type AddHandler = (suggestion: PurchaseSuggestion, quantity: number) => void;

interface PurchaseSuggestionItemProps {
  suggestion: PurchaseSuggestion;
  onAdd?: AddHandler;
}

function PurchaseSuggestionItem({
  suggestion,
  onAdd,
}: PurchaseSuggestionItemProps) {
  const [quantity, setQuantity] = useState(suggestion.needed);
  const [added, setAdded] = useState(false);

  function decrease() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function increase() {
    setQuantity((current) => current + 1);
  }

  function handleAdd() {
    onAdd?.(suggestion, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-3 gap-y-2 py-3">
      <Image
        src={suggestion.image}
        alt=""
        width={44}
        height={44}
        sizes="44px"
        className="row-span-2 size-11 shrink-0 self-start rounded-md border bg-muted object-cover"
      />

      {/* Nombre + lo que se necesita */}
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{suggestion.name}</p>
        <p className="text-xs text-muted-foreground">
          Necesitas {suggestion.needed} {suggestion.unit}
        </p>
      </div>

      {/* Selector de cantidad */}
      <div className="flex items-center justify-self-end self-start rounded-md border">
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={decrease}
          disabled={quantity <= 1}
          aria-label={`Reducir cantidad de ${suggestion.name}`}
        >
          <MinusIcon />
        </Button>
        <span
          aria-live="polite"
          className="w-8 text-center text-sm font-medium tabular-nums"
        >
          {quantity}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={increase}
          aria-label={`Aumentar cantidad de ${suggestion.name}`}
        >
          <PlusIcon />
        </Button>
      </div>

      {/* Proveedor + precio */}
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">Proveedor</p>
        <p className="truncate text-xs font-medium">{suggestion.supplier}</p>
        <p className="text-xs text-muted-foreground">
          {formatUnitPrice(suggestion.pricePerUnit, suggestion.priceUnit)}
        </p>
      </div>

      {/* Camión + agregar */}
      <div className="flex flex-col items-center justify-self-end self-end gap-1">
        <TruckIcon className="size-4 text-muted-foreground" aria-hidden="true" />
        <Button
          type="button"
          size="xs"
          variant={added ? "secondary" : "default"}
          onClick={handleAdd}
          className="min-w-20"
        >
          {added ? <CheckIcon /> : null}
          {added ? "Añadido" : "Agregar"}
        </Button>
      </div>
    </li>
  );
}

interface PurchaseSuggestionsListProps {
  suggestions: PurchaseSuggestion[];
  onAdd?: AddHandler;
}

export function PurchaseSuggestionsList({
  suggestions,
  onAdd,
}: PurchaseSuggestionsListProps) {
  if (suggestions.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No hay sugerencias de compra.
      </p>
    );
  }

  return (
    <ul className="divide-y">
      {suggestions.map((suggestion) => (
        <PurchaseSuggestionItem
          key={suggestion.id}
          suggestion={suggestion}
          onAdd={onAdd}
        />
      ))}
    </ul>
  );
}

interface PurchaseSuggestionsPanelProps {
  suggestions: PurchaseSuggestion[];
  limit?: number;
  showViewAll?: boolean;
  onAdd?: AddHandler;
}

export function PurchaseSuggestionsPanel({
  suggestions,
  limit = 5,
  showViewAll = true,
  onAdd,
}: PurchaseSuggestionsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sugerencias de compra</CardTitle>
        <CardDescription>
          Reposición recomendada según el stock actual.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <PurchaseSuggestionsList
          suggestions={suggestions.slice(0, limit)}
          onAdd={onAdd}
        />

        {showViewAll ? (
          <Link
            href={routes.inventorySuggestions}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "w-full",
            )}
          >
            Ver todas las sugerencias
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
}