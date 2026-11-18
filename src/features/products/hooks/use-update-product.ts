"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsService } from "@/services/products-service";
import type { UpdateProductDto } from "@/types/product";
import { productsQueryKeys } from "../products-query-keys";

interface UpdateProductVariables {
  id: string;
  data: UpdateProductDto;
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateProductVariables) => productsService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productsQueryKeys.all }),
  });
}
