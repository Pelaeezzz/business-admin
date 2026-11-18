"use client";

import { RotateCcwIcon } from "lucide-react";
import FilterBadge from "@/components/filters/filter-badge/filter-badge";
import { Button } from "@/components/ui/button";
import { USER_ROLE_LABELS } from "@/constants/user-roles";
import type { UsersFilters } from "@/types/user";

interface Props {
  filters: UsersFilters;
  handleChangeFilters: (filters: Partial<UsersFilters>) => void;
  handleResetFilters: () => void;
}

export default function UsersActiveFilters({
  filters,
  handleChangeFilters,
  handleResetFilters,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.username && (
        <FilterBadge
          filterName="Usuario"
          filterValue={filters.username}
          handleDeleteFilter={() => handleChangeFilters({ username: undefined })}
        />
      )}
      {filters.email && (
        <FilterBadge
          filterName="Email"
          filterValue={filters.email}
          handleDeleteFilter={() => handleChangeFilters({ email: undefined })}
        />
      )}
      {filters.name && (
        <FilterBadge
          filterName="Nombre"
          filterValue={filters.name}
          handleDeleteFilter={() => handleChangeFilters({ name: undefined })}
        />
      )}
      {filters.role && (
        <FilterBadge
          filterName="Rol"
          filterValue={USER_ROLE_LABELS[filters.role]}
          handleDeleteFilter={() => handleChangeFilters({ role: undefined })}
        />
      )}
      <Button variant="ghost" size="sm" onClick={handleResetFilters}>
        <RotateCcwIcon />
        Limpiar filtros
      </Button>
    </div>
  );
}
