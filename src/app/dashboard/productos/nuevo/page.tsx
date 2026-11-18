import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductsCreateContainer from "@/features/products/create/products-create-container";

function NuevoProductoFallback() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-5 w-80" />
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  );
}

export default function NuevoProductoPage() {
  return (
    <Suspense fallback={<NuevoProductoFallback />}>
      <ProductsCreateContainer />
    </Suspense>
  );
}
