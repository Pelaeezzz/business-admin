"use client";

import { RotateCcwIcon } from "lucide-react";
import FilterBadge from "@/components/filters/filter-badge/filter-badge";
import { Button } from "@/components/ui/button";
import { PRODUCT_STOCK_STATUS_LABELS } from "@/constants/product-stock-status";
import type { ProductsFilters } from "@/types/product";

interface Props {
  filters: ProductsFilters;
  handleChangeFilters: (filters: Partial<ProductsFilters>) => void;
  handleResetFilters: () => void;
}

export default function ProductsActiveFilters({
  filters,
  handleChangeFilters,
  handleResetFilters,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.category && (
        <FilterBadge
          filterName="Categoría"
          filterValue={filters.category}
          handleDeleteFilter={() => handleChangeFilters({ category: undefined })}
        />
      )}
      {filters.status && (
        <FilterBadge
          filterName="Estado"
          filterValue={PRODUCT_STOCK_STATUS_LABELS[filters.status]}
          handleDeleteFilter={() => handleChangeFilters({ status: undefined })}
        />
      )}
      <Button variant="ghost" size="sm" onClick={handleResetFilters}>
        <RotateCcwIcon />
        Limpiar filtros
      </Button>
    </div>
  );
}
