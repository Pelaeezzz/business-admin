"use client";

import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/services/products-service";
import { productsQueryKeys } from "../products-query-keys";

export function useProduct(id: string) {
  return useQuery({
    queryKey: productsQueryKeys.detail(id),
    queryFn: () => productsService.getById(id),
  });
}
