"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { CurrencyCode } from "@/types/finance";
import type { Product } from "@/types/product";

import { ProductsTable } from "../components/products-table";

/** Normaliza texto para buscar sin distinguir mayúsculas ni acentos. */
function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

interface ProductsTableSectionProps {
  products: Product[];
  currency: CurrencyCode;
}

export function ProductsTableSection({
  products,
  currency,
}: ProductsTableSectionProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = normalize(query.trim());

    if (!term) {
      return products;
    }

    return products.filter((product) =>
      [product.name, product.id, product.category].some((value) =>
        normalize(value).includes(term),
      ),
    );
  }, [products, query]);

  const description =
    filtered.length === products.length
      ? `${products.length} productos registrados.`
      : `${filtered.length} de ${products.length} productos.`;

  return (
    <section aria-label="Listado de productos" className="min-w-0">
      <Card>
        <CardHeader>
          <CardTitle>Listado de productos</CardTitle>
          <CardDescription>{description}</CardDescription>
          <CardAction>
            <div className="relative">
              <SearchIcon
                className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar producto..."
                aria-label="Buscar producto"
                className="h-8 w-56 pl-8"
              />
            </div>
          </CardAction>
        </CardHeader>

        <CardContent>
          <ProductsTable
            products={filtered}
            currency={currency}
            emptyMessage={
              query.trim()
                ? "No hay productos que coincidan con la búsqueda."
                : undefined
            }
          />
        </CardContent>
      </Card>
    </section>
  );
}
