"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsService } from "@/services/products-service";
import { productsQueryKeys } from "../products-query-keys";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsService.remove,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: productsQueryKeys.detail(id) });
      return queryClient.invalidateQueries({ queryKey: productsQueryKeys.lists() });
    },
  });
}
