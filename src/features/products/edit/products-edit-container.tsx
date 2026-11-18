"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import usePreserveSearchParams from "@/hooks/use-preserve-search-params";
import { routes } from "@/routes/routes";
import { productsService } from "@/services/products-service";
import ProductForm from "../form/product-form";
import { useProduct } from "../hooks/use-product";
import { useUpdateProduct } from "../hooks/use-update-product";
import {
  toProductFormValues,
  toUpdateProductDto,
  type ProductFormValues,
} from "../schemas/product-form-schema";

interface Props {
  id: string;
}

export default function ProductsEditContainer({ id }: Props) {
  const router = useRouter();
  const withSearchParams = usePreserveSearchParams();
  const listUrl = withSearchParams(routes.products.list);
  const { data: product, isPending, error } = useProduct(id);
  const updateProduct = useUpdateProduct();
  const categoryOptions = useMemo(() => productsService.getCategoryOptions(), []);

  const handleSubmit = (values: ProductFormValues) => {
    updateProduct.mutate(
      { id, data: toUpdateProductDto(values) },
      { onSuccess: () => router.push(listUrl) },
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar producto</h1>
        <p className="text-muted-foreground">Modifica los datos del producto.</p>
      </div>

      <Card>
        <CardContent>
          {isPending ? (
            <Skeleton className="h-80 w-full" />
          ) : error ? (
            <AlertDestructive title="No se pudo cargar el producto" description={error.message} />
          ) : (
            <ProductForm
              mode="edit"
              categoryOptions={categoryOptions}
              defaultValues={toProductFormValues(product)}
              onSubmit={handleSubmit}
              onCancel={() => router.push(listUrl)}
              isSubmitting={updateProduct.isPending}
              errorMessage={updateProduct.error?.message}
              submitLabel="Guardar cambios"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
