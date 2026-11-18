import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { MostConsumedProductsSummary } from "@/types/summary";

import { MostConsumedProductsTable } from "../components/most-consumed-products-table";

interface MostConsumedProductsSectionProps {
  data: MostConsumedProductsSummary;
}

export function MostConsumedProductsSection({
  data,
}: MostConsumedProductsSectionProps) {
  return (
    <section aria-label="Productos más consumidos" className="min-w-0">
      <Card>
        <CardHeader>
          <CardTitle>Productos más consumidos</CardTitle>
          <CardDescription>
            Cantidad consumida en el período · {data.period}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <MostConsumedProductsTable products={data.products} />
        </CardContent>
      </Card>
    </section>
  );
}
