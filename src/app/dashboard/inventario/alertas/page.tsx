import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { cn } from "@/lib/utils" 
import { buttonVariants } from "@/components/ui/button";
import { AlertProductsTable } from "@/components/inventory/alert-products-table";
import { alertProducts } from "@/mocks/alert-products";
import { routes } from "@/routes/routes";

export default function AlertasInventarioPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
      <Link
  href={routes.inventory}
  className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "-ml-2 w-fit")}
>
  <ArrowLeftIcon className="size-4" aria-hidden="true" />
  Volver a Inventario
</Link>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Productos en alerta
          </h1>
          <p className="text-sm text-muted-foreground">
            {alertProducts.length} productos con stock por debajo del mínimo.
          </p>
        </div>
      </header>

      <section aria-label="Listado completo de productos en alerta">
        <AlertProductsTable products={alertProducts} />
      </section>
    </div>
  );
}