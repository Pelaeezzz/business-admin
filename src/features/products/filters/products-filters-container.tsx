"use client";

import { SearchIcon } from "lucide-react";
import { useState } from "react";
import SheetFilters from "@/components/filters/sheet-filters/sheet-filters";
import { Input } from "@/components/ui/input";
import type { ProductCategoryOption } from "@/services/products-service";
import type { ProductsFilters } from "@/types/product";
import ProductsActiveFilters from "./components/products-active-filters/products-active-filters";
import useProductsFilters from "./hooks/use-products-filters";
import ProductsFiltersForm from "./products-filters";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  categoryOptions: ProductCategoryOption[];
}

export default function ProductsFiltersContainer({
  search,
  onSearchChange,
  categoryOptions,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { filters, activeFiltersCount, handleChangeFilters, handleResetFilters } =
    useProductsFilters();

  const handleApply = (newFilters: ProductsFilters) => {
    handleChangeFilters(newFilters);
    setIsOpen(false);
  };

  const handleReset = () => {
    handleResetFilters();
    onSearchChange("");
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative">
        <SearchIcon
          className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar producto..."
          aria-label="Buscar producto"
          className="h-9 w-56 pl-8"
        />
      </div>

      <SheetFilters
        title="Filtrar productos"
        activeFiltersCount={activeFiltersCount}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <ProductsFiltersForm
          filters={filters}
          categoryOptions={categoryOptions}
          onApply={handleApply}
        />
      </SheetFilters>

      {activeFiltersCount > 0 && (
        <ProductsActiveFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          handleResetFilters={handleReset}
        />
      )}
    </div>
  );
}
