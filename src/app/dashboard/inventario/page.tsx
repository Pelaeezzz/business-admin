import Link from "next/link";
import {
  AlertTriangleIcon,
  ClockIcon,
  ShoppingCartIcon,
  WalletIcon,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InventoryValueChart } from "@/components/charts/inventory-value-chart";
import { AlertProductsTable } from "@/components/inventory/alert-products-table";
import { alertProducts } from "@/mocks/alert-products";
import { inventoryValueData } from "@/mocks/inventory";
import { InventoryStatCard } from "@/components/inventory/inventory-stat-card";
import { InvoiceProductsSection } from "@/components/inventory/invoice-products-section";
import { PurchaseSuggestionsPanel } from "@/components/inventory/purchase-suggestions-panel";
import { purchaseSuggestions } from "@/components/inventory/purchase-suggestions";
import { invoiceProducts } from "@/mocks/invoice-products";
import { routes } from "@/routes/routes";

// Moneda del negocio (viene del mock; cámbiala ahí si usas otra).
const CURRENCY = inventoryValueData.currency;

const numberFormatter = new Intl.NumberFormat("es-ES");

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: CURRENCY,
  maximumFractionDigits: 0,
});

// Datos de ejemplo: luego los sustituyes por la API / React Query
const summary = {
  alertProducts: alertProducts.length,
  runningOutToday: 6,
  suggestedProducts: 38,
  suggestedValue: 4_820,
};

export default function InventarioPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Inventario Inteligente
        </h1>
        <p className="text-sm text-muted-foreground">
          Estado del stock y recomendaciones de compra.
        </p>
      </header>

      <section
        aria-label="Indicadores de inventario"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <InventoryStatCard
          title="Productos en alerta"
          value={numberFormatter.format(summary.alertProducts)}
          description="Stock bajo"
          icon={AlertTriangleIcon}
          tone="warning"
        />

        <InventoryStatCard
          title="Por agotarse hoy"
          value={numberFormatter.format(summary.runningOutToday)}
          description="Crítico"
          icon={ClockIcon}
          tone="danger"
        />

        <InventoryStatCard
          title="Sugerencia de compra"
          value={numberFormatter.format(summary.suggestedProducts)}
          description="Productos"
          icon={ShoppingCartIcon}
          tone="info"
        />

        <InventoryStatCard
          title="Valor sugerido"
          value={currencyFormatter.format(summary.suggestedValue)}
          description="Valor de compra"
          icon={WalletIcon}
          tone="success"
        />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Dinero en inventario</CardTitle>
          <CardDescription>
            Valor del stock por día · {inventoryValueData.period}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InventoryValueChart
            data={inventoryValueData.points}
            currency={CURRENCY}
          />
        </CardContent>
      </Card>

      {/* Productos en alerta y sugerencias de compra */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Productos en alerta</CardTitle>
            <CardDescription>
              Productos con stock por debajo del mínimo.
            </CardDescription>
            <CardAction>
              <Link
                href={routes.inventoryAlerts}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                )}
              >
                Ver todos
              </Link>
            </CardAction>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col">
            <AlertProductsTable products={alertProducts} fill />
          </CardContent>
        </Card>
        <PurchaseSuggestionsPanel suggestions={purchaseSuggestions} />
      </div>

      <InvoiceProductsSection products={invoiceProducts} currency={CURRENCY} />
    </div>
  );
}
