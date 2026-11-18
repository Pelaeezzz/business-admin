import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TopProductsSummary } from "@/types/summary";

import { TopProductsTable } from "../components/top-products-table";

interface TopProductsSectionProps {
  data: TopProductsSummary;
}

export function TopProductsSection({ data }: TopProductsSectionProps) {
  return (
    <section aria-label="Productos más vendidos" className="min-w-0">
      <Card>
        <CardHeader>
          <CardTitle>Productos más vendidos</CardTitle>
          <CardDescription>
            Ranking por unidades vendidas · {data.period}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <TopProductsTable products={data.products} currency={data.currency} />
        </CardContent>
      </Card>
    </section>
  );
}
