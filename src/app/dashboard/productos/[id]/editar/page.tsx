import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductsEditContainer from "@/features/products/edit/products-edit-container";

function EditarProductoFallback() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-5 w-64" />
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  );
}

export default async function EditarProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<EditarProductoFallback />}>
      <ProductsEditContainer id={id} />
    </Suspense>
  );
}
