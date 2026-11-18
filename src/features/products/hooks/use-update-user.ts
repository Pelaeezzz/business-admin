"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "@/services/users-service";
import type { UpdateUserDto } from "@/types/user";
import { usersQueryKeys } from "../users-query-keys";

interface UpdateUserVariables {
  id: string;
  data: UpdateUserDto;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateUserVariables) => usersService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: usersQueryKeys.all }),
  });
}
