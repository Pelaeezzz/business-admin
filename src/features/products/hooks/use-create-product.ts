"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsService } from "@/services/products-service";
import { productsQueryKeys } from "../products-query-keys";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productsQueryKeys.all }),
  });
}
