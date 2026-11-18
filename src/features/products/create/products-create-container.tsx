"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import usePreserveSearchParams from "@/hooks/use-preserve-search-params";
import { routes } from "@/routes/routes";
import { productsService } from "@/services/products-service";
import ProductForm from "../form/product-form";
import { useCreateProduct } from "../hooks/use-create-product";
import { toCreateProductDto, type ProductFormValues } from "../schemas/product-form-schema";

export default function ProductsCreateContainer() {
  const router = useRouter();
  const withSearchParams = usePreserveSearchParams();
  const listUrl = withSearchParams(routes.products.list);
  const createProduct = useCreateProduct();
  const categoryOptions = useMemo(() => productsService.getCategoryOptions(), []);

  const handleSubmit = (values: ProductFormValues) => {
    createProduct.mutate(toCreateProductDto(values), {
      onSuccess: () => router.push(listUrl),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nuevo producto</h1>
        <p className="text-muted-foreground">Completa los datos para dar de alta un producto.</p>
      </div>

      <Card>
        <CardContent>
          <ProductForm
            mode="create"
            categoryOptions={categoryOptions}
            onSubmit={handleSubmit}
            onCancel={() => router.push(listUrl)}
            isSubmitting={createProduct.isPending}
            errorMessage={createProduct.error?.message}
            submitLabel="Crear producto"
          />
        </CardContent>
      </Card>
    </div>
  );
}
