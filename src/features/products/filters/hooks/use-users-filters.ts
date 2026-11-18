"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { isUserRole } from "@/constants/user-roles";
import useUrlFilters from "@/hooks/use-url-filters";
import type { UsersFilters } from "@/types/user";

const EMPTY_FILTERS: Record<keyof UsersFilters, undefined> = {
  username: undefined,
  email: undefined,
  name: undefined,
  role: undefined,
};

function parseUsersFilters(searchParams: URLSearchParams): UsersFilters {
  const role = searchParams.get("role");

  return {
    username: searchParams.get("username") || undefined,
    email: searchParams.get("email") || undefined,
    name: searchParams.get("name") || undefined,
    role: isUserRole(role) ? role : undefined,
  };
}

/** Filtros de usuarios con la URL como única fuente de verdad. */
export default function useUsersFilters() {
  const searchParams = useSearchParams();
  const { updateFiltersInUrl } = useUrlFilters();

  const filters = useMemo(() => parseUsersFilters(searchParams), [searchParams]);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  // Cualquier cambio de filtros vuelve a la primera página
  const handleChangeFilters = (updatedFilters: Partial<UsersFilters>) => {
    updateFiltersInUrl({ ...updatedFilters, page: undefined });
  };

  const handleResetFilters = () => {
    updateFiltersInUrl({ ...EMPTY_FILTERS, page: undefined });
  };

  return { filters, activeFiltersCount, handleChangeFilters, handleResetFilters };
}
