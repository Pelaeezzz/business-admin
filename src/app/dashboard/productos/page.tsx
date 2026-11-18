import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductsContainer from "@/features/products/products-container";

function ProductosFallback() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-5 w-72" />
        </div>
        <Skeleton className="h-9 w-40" />
      </div>
      <Skeleton className="h-[520px] w-full" />
    </div>
  );
}

export default function ProductosPage() {
  return (
    <Suspense fallback={<ProductosFallback />}>
      <ProductsContainer />
    </Suspense>
  );
}
