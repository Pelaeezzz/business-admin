import { InfoIcon } from "lucide-react";

import { SectionHeader } from "@/components/finance/section-header";
import { Card, CardContent } from "@/components/ui/card";
import type { CurrencyCode, IpvComparisonDetail } from "@/types/finance";

import { ComparisonExportButton } from "../components/comparison-export-button";
import { IpvDetailTable } from "../components/ipv-detail-table";

interface ComparisonIpvSectionProps {
  details: IpvComparisonDetail[];
  currency: CurrencyCode;
}

export function ComparisonIpvSection({
  details,
  currency,
}: ComparisonIpvSectionProps) {
  const exportRows = details.map((detail) => ({
    Producto: detail.product,
    Categoría: detail.category,
    Unidades: detail.units,
    "Costo unitario teórico": detail.theoreticalUnitCost,
    "Costo unitario real": detail.actualUnitCost,
    Impacto: detail.impact,
  }));

  return (
    <section className="flex flex-col gap-3">
      <SectionHeader
        title="Detalles IPV"
        description="Diferencia entre el costo teórico y el inventario físico."
        action={
          <ComparisonExportButton
            filename="comparacion-detalles-ipv"
            rows={exportRows}
          />
        }
      />

      <Card>
        <CardContent>
          <IpvDetailTable details={details} currency={currency} />

          <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
            <InfoIcon
              className="mt-0.5 size-4 shrink-0 text-amber-500"
              aria-hidden="true"
            />
            <p>
              El costo real se obtiene del inventario físico (IPV). Una
              diferencia negativa indica que el costo real supera al costo
              teórico.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
