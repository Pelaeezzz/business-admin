import { SectionHeader } from "@/components/finance/section-header";
import { Card, CardContent } from "@/components/ui/card";
import type { CategoryComparison, CurrencyCode } from "@/types/finance";

import { CategoryComparisonTable } from "../components/category-comparison-table";
import { ComparisonExportButton } from "../components/comparison-export-button";

interface ComparisonCategoriesSectionProps {
  categories: CategoryComparison[];
  currency: CurrencyCode;
}

export function ComparisonCategoriesSection({
  categories,
  currency,
}: ComparisonCategoriesSectionProps) {
  const exportRows = categories.map((category) => ({
    Categoría: category.name,
    Productos: category.products,
    Unidades: category.units,
    "Costo teórico": category.theoreticalCost,
    "Costo real": category.actualCost,
    Diferencia: category.difference,
    "Variación (%)": category.variation,
  }));

  return (
    <section className="flex flex-col gap-3">
      <SectionHeader
        title="Comparación por categoría"
        description="Costos teóricos y reales agrupados por categoría."
        action={
          <ComparisonExportButton
            filename="comparacion-por-categoria"
            rows={exportRows}
          />
        }
      />

      <Card>
        <CardContent>
          <CategoryComparisonTable
            categories={categories}
            currency={currency}
          />

          <p className="text-xs text-muted-foreground">
            Los totales por categoría incluyen todos los productos vendidos del
            día.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
