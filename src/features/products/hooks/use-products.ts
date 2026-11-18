"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { productsService } from "@/services/products-service";
import type { Pagination } from "@/types/pagination";
import type { ProductsFilters } from "@/types/product";
import { productsQueryKeys } from "../products-query-keys";

export function useProducts(filters: ProductsFilters, pagination: Pagination) {
  return useQuery({
    queryKey: productsQueryKeys.list(filters, pagination),
    queryFn: () => productsService.getPage(filters, pagination),
    placeholderData: keepPreviousData,
  });
}
