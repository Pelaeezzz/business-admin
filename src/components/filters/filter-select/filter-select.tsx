"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL_VALUE = "all";

interface Option {
  value: string;
  label: string;
}

interface Props {
  id: string;
  label: string;
  options: readonly Option[];
  value?: string;
  onChange: (value?: string) => void;
  allLabel?: string;
}

/** Select de filtro con una opción "Todos" que equivale a no filtrar. */
export default function FilterSelect({
  id,
  label,
  options,
  value,
  onChange,
  allLabel = "Todos",
}: Props) {
  const items = [{ value: ALL_VALUE, label: allLabel }, ...options];

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Select
        items={items}
        value={value ?? ALL_VALUE}
        onValueChange={(newValue) =>
          onChange(newValue && newValue !== ALL_VALUE ? newValue : undefined)
        }
      >
        <SelectTrigger id={id} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
