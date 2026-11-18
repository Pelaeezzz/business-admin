import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PurchaseSuggestionsList } from "@/components/inventory/purchase-suggestions-panel";
import { purchaseSuggestions } from "@/components/inventory/purchase-suggestions";
import { cn } from "@/lib/utils";
import { routes } from "@/routes/routes";

export default function SugerenciasCompraPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <Link
          href={routes.inventory}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "-ml-2 w-fit",
          )}
        >
          <ArrowLeftIcon className="size-4" aria-hidden="true" />
          Volver a Inventario
        </Link>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sugerencias de compra
          </h1>
          <p className="text-sm text-muted-foreground">
            {purchaseSuggestions.length} productos recomendados para reposición.
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Productos sugeridos</CardTitle>
          <CardDescription>
            Ajusta la cantidad y agrega los productos que quieras comprar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PurchaseSuggestionsList suggestions={purchaseSuggestions} />
        </CardContent>
      </Card>
    </div>
  );
}