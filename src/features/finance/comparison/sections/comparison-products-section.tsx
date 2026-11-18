"use client";

import { ArrowRightIcon } from "lucide-react";

import { SectionHeader } from "@/components/finance/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CurrencyCode, ProductComparison } from "@/types/finance";

import { ComparisonExportButton } from "../components/comparison-export-button";
import { ProductComparisonTable } from "../components/product-comparison-table";

interface ComparisonProductsSectionProps {
  products: ProductComparison[];
  currency: CurrencyCode;
  variant?: "summary" | "full";
  onViewAll?: () => void;
}

export function ComparisonProductsSection({
  products,
  currency,
  variant = "summary",
  onViewAll,
}: ComparisonProductsSectionProps) {
  const full = variant === "full";

  const exportRows = products.map((product) => ({
    Producto: product.name,
    Categoría: product.category,
    "Unidades vendidas": product.units,
    "Costo teórico": product.theoreticalCost,
    "Costo real": product.actualCost,
    Diferencia: product.difference,
    "Variación (%)": product.variation,
  }));

  return (
    <section className="flex flex-col gap-3">
      <SectionHeader
        title="Comparación por producto"
        description={
          full
            ? "Detalle de costos teóricos y reales por producto."
            : "Productos con mayor impacto en el costo del día."
        }
        action={
          <div className="flex flex-wrap items-center gap-2">
            <ComparisonExportButton
              filename="comparacion-por-producto"
              rows={exportRows}
            />

            {!full && onViewAll ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onViewAll}
              >
                Ver todos
                <ArrowRightIcon />
              </Button>
            ) : null}
          </div>
        }
      />

      <Card>
        <CardContent>
          <ProductComparisonTable
            products={products}
            currency={currency}
            showUnitCosts={full}
          />

          {full ? (
            <p className="text-xs text-muted-foreground">
              El costo unitario se calcula dividiendo el costo total entre las
              unidades vendidas.
            </p>
          ) : null}
        </CardContent>
      </Card>
    </section>
  );
}
