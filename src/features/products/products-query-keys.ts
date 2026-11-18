import type { Pagination } from "@/types/pagination";
import type { ProductsFilters } from "@/types/product";

export const productsQueryKeys = {
  all: ["products"] as const,
  lists: () => [...productsQueryKeys.all, "list"] as const,
  list: (filters: ProductsFilters, pagination: Pagination) =>
    [...productsQueryKeys.lists(), { filters, pagination }] as const,
  detail: (id: string) => [...productsQueryKeys.all, "detail", id] as const,
};
