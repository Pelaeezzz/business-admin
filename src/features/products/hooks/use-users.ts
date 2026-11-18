"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { usersService } from "@/services/users-service";
import type { Pagination } from "@/types/pagination";
import type { UsersFilters } from "@/types/user";
import { usersQueryKeys } from "../users-query-keys";

export function useUsers(filters: UsersFilters, pagination: Pagination) {
  return useQuery({
    queryKey: usersQueryKeys.list(filters, pagination),
    queryFn: () => usersService.getPage(filters, pagination),
    placeholderData: keepPreviousData,
  });
}
