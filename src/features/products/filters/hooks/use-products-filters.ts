"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { isProductStockStatus } from "@/constants/product-stock-status";
import useUrlFilters from "@/hooks/use-url-filters";
import type { ProductsFilters } from "@/types/product";

const EMPTY_FILTERS: Record<keyof Omit<ProductsFilters, "search">, undefined> = {
  category: undefined,
  status: undefined,
};

/**
 * La búsqueda no vive en la URL porque el buscador filtra al escribir:
 * pasarla por `router.replace` en cada tecla haría perder pulsaciones.
 */
function parseProductsFilters(searchParams: URLSearchParams): ProductsFilters {
  const status = searchParams.get("status");

  return {
    category: searchParams.get("category") || undefined,
    status: isProductStockStatus(status) ? status : undefined,
  };
}

/** Filtros de productos con la URL como única fuente de verdad. */
export default function useProductsFilters() {
  const searchParams = useSearchParams();
  const { updateFiltersInUrl } = useUrlFilters();

  const filters = useMemo(() => parseProductsFilters(searchParams), [searchParams]);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  // Cualquier cambio de filtros vuelve a la primera página
  const handleChangeFilters = (updatedFilters: Partial<ProductsFilters>) => {
    updateFiltersInUrl({ ...updatedFilters, page: undefined });
  };

  const handleResetFilters = () => {
    updateFiltersInUrl({ ...EMPTY_FILTERS, page: undefined });
  };

  return { filters, activeFiltersCount, handleChangeFilters, handleResetFilters };
}
