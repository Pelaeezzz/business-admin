"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ConfirmDialog from "@/components/confirm-dialog/confirm-dialog";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import { buttonVariants } from "@/components/ui/button";
import { DEFAULT_PAGINATION } from "@/constants/pagination";
import usePreserveSearchParams from "@/hooks/use-preserve-search-params";
import useServerPagination from "@/hooks/use-server-pagination";
import { routes } from "@/routes/routes";
import { productCurrency, productsService } from "@/services/products-service";
import type { Product, ProductsFilters } from "@/types/product";
import ProductsFiltersContainer from "./filters/products-filters-container";
import useProductsFilters from "./filters/hooks/use-products-filters";
import { useDeleteProduct } from "./hooks/use-delete-product";
import { useProducts } from "./hooks/use-products";
import ProductsList from "./list/products-list";

export default function ProductsContainer() {
  const router = useRouter();
  const withSearchParams = usePreserveSearchParams();
  const { filters } = useProductsFilters();
  const { pagination, serverHandleChangePage, serverHandlePageSizeChange } = useServerPagination({
    defaultPagination: DEFAULT_PAGINATION,
  });
  const [search, setSearch] = useState("");
  const categoryOptions = useMemo(() => productsService.getCategoryOptions(), []);

  const queryFilters = useMemo<ProductsFilters>(
    () => ({ ...filters, search: search.trim() || undefined }),
    [filters, search],
  );

  const { data, isPending, isPlaceholderData, error } = useProducts(queryFilters, pagination);
  const deleteProduct = useDeleteProduct();
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const totalPages = data?.meta.totalPages;

  useEffect(() => {
    if (totalPages === undefined || isPlaceholderData) return;

    const lastPage = Math.max(1, totalPages);
    if (pagination.page > lastPage) serverHandleChangePage(lastPage);
  }, [totalPages, isPlaceholderData, pagination.page, serverHandleChangePage]);

  const handleSearchChange = (value: string) => {
    setSearch(value);

    // Buscar reinicia el listado a la primera página sin ensuciar la URL por tecla
    if (pagination.page !== DEFAULT_PAGINATION.page) {
      serverHandleChangePage(DEFAULT_PAGINATION.page);
    }
  };

  const closeDeleteDialog = () => {
    setProductToDelete(null);
    deleteProduct.reset();
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;

    deleteProduct.mutate(productToDelete.id, { onSuccess: closeDeleteDialog });
  };

  const hasFilters = Boolean(search.trim() || filters.category || filters.status);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
          <p className="text-muted-foreground">
            Catálogo de productos, precios de venta y existencias.
          </p>
        </div>
        <Link href={withSearchParams(routes.products.new)} className={buttonVariants()}>
          <Plus />
          Nuevo producto
        </Link>
      </div>

      {error && (
        <AlertDestructive title="No se pudieron cargar los productos" description={error.message} />
      )}

      <ProductsList
        products={data?.rows ?? []}
        currency={productCurrency}
        isLoading={isPending}
        dataEmptyText={
          hasFilters
            ? "No hay productos que coincidan con los filtros."
            : "No hay productos registrados."
        }
        filters={
          <ProductsFiltersContainer
            search={search}
            onSearchChange={handleSearchChange}
            categoryOptions={categoryOptions}
          />
        }
        serverPagination={{
          currentPage: pagination.page,
          itemsPerPage: pagination.limit,
          totalItems: data?.meta.total ?? 0,
          totalPages: totalPages ?? 1,
          onPageChange: serverHandleChangePage,
          onItemsPerPageChange: serverHandlePageSizeChange,
        }}
        onEdit={(product) => router.push(withSearchParams(routes.products.edit(product.id)))}
        onDelete={setProductToDelete}
      />

      <ConfirmDialog
        open={productToDelete !== null}
        onOpenChange={(open) => !open && closeDeleteDialog()}
        title="Eliminar producto"
        description={`Se eliminará ${productToDelete?.name ?? ""} (${productToDelete?.id ?? ""}). Esta acción no se puede deshacer.`}
        confirmButtonText="Eliminar"
        isDestructive
        isLoading={deleteProduct.isPending}
        error={deleteProduct.error?.message}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
