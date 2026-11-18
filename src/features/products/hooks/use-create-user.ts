"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "@/services/users-service";
import { usersQueryKeys } from "../users-query-keys";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: usersQueryKeys.all }),
  });
}
