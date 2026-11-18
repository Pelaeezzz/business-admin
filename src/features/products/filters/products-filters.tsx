import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  isProductStockStatus,
  PRODUCT_STOCK_STATUS_OPTIONS,
} from "@/constants/product-stock-status";
import type { ProductCategoryOption } from "@/services/products-service";
import type { ProductsFilters } from "@/types/product";

const ALL_OPTION = "all";

const STATUS_FILTER_OPTIONS = [
  { value: ALL_OPTION, label: "Todos" },
  ...PRODUCT_STOCK_STATUS_OPTIONS,
];

interface Props {
  filters: ProductsFilters;
  categoryOptions: ProductCategoryOption[];
  onApply: (filters: ProductsFilters) => void;
}

/**
 * Edita un borrador local y solo actualiza la URL al pulsar "Aplicar",
 * para no lanzar una petición por cada tecla.
 */
export default function ProductsFiltersForm({ filters, categoryOptions, onApply }: Props) {
  const [draft, setDraft] = useState<ProductsFilters>(filters);

  const updateDraft = (changes: Partial<ProductsFilters>) =>
    setDraft((prev) => ({ ...prev, ...changes }));

  const categoryFilterOptions = [{ value: ALL_OPTION, label: "Todas" }, ...categoryOptions];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApply({
      category: draft.category,
      status: draft.status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="filter-category">Categoría</Label>
        <Select
          items={categoryFilterOptions}
          value={draft.category ?? ALL_OPTION}
          onValueChange={(value) =>
            updateDraft({ category: value === ALL_OPTION ? undefined : (value ?? undefined) })
          }
        >
          <SelectTrigger id="filter-category" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categoryFilterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="filter-status">Estado</Label>
        <Select
          items={STATUS_FILTER_OPTIONS}
          value={draft.status ?? ALL_OPTION}
          onValueChange={(value) =>
            updateDraft({ status: isProductStockStatus(value) ? value : undefined })
          }
        >
          <SelectTrigger id="filter-status" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_FILTER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => setDraft({})}>
          Vaciar
        </Button>
        <Button type="submit">Aplicar</Button>
      </div>
    </form>
  );
}
