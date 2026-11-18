import type { Pagination } from "@/types/pagination";
import type { UsersFilters } from "@/types/user";

export const usersQueryKeys = {
  all: ["users"] as const,
  lists: () => [...usersQueryKeys.all, "list"] as const,
  list: (filters: UsersFilters, pagination: Pagination) =>
    [...usersQueryKeys.lists(), { filters, pagination }] as const,
  detail: (id: string) => [...usersQueryKeys.all, "detail", id] as const,
};
