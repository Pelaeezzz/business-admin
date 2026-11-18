import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { routes } from "@/routes/routes";

export default function CierreCajaPage() {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href={routes.dashboard}
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "-ml-2 w-fit",
        )}
      >
        <ArrowLeftIcon className="size-4" aria-hidden="true" />
        Volver a Resumen
      </Link>

      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Cierre de caja
        </h1>
        <p className="text-sm text-muted-foreground">
          Detalle del cierre de caja del día anterior.
        </p>
      </header>

      <Card>
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          Esta sección estará disponible próximamente.
        </CardContent>
      </Card>
    </div>
  );
}
