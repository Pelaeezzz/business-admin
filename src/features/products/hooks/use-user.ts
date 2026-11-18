"use client";

import { useQuery } from "@tanstack/react-query";
import { usersService } from "@/services/users-service";
import { usersQueryKeys } from "../users-query-keys";

export function useUser(id: string) {
  return useQuery({
    queryKey: usersQueryKeys.detail(id),
    queryFn: () => usersService.getById(id),
  });
}
