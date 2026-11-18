"use client";

import { useState } from "react";
import SheetFilters from "@/components/filters/sheet-filters/sheet-filters";
import type { UsersFilters } from "@/types/user";
import useUsersFilters from "./hooks/use-users-filters";
import UsersActiveFilters from "./components/users-active-filters/users-active-filters";
import UsersFiltersForm from "./users-filters";

export default function UsersFiltersContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const { filters, activeFiltersCount, handleChangeFilters, handleResetFilters } =
    useUsersFilters();

  const handleApply = (newFilters: UsersFilters) => {
    handleChangeFilters(newFilters);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <SheetFilters
        title="Filtrar usuarios"
        activeFiltersCount={activeFiltersCount}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <UsersFiltersForm filters={filters} onApply={handleApply} />
      </SheetFilters>

      {activeFiltersCount > 0 && (
        <UsersActiveFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          handleResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
