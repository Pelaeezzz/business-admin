"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "@/services/users-service";
import { usersQueryKeys } from "../users-query-keys";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersService.remove,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: usersQueryKeys.detail(id) });
      return queryClient.invalidateQueries({ queryKey: usersQueryKeys.lists() });
    },
  });
}
