"use client";

import { Controller, useFormContext, type FieldValues, type Path } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "./form-field";

export interface FormSelectOption {
  value: string;
  label: string;
}

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  options: readonly FormSelectOption[];
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
}

export function FormSelect<T extends FieldValues>({
  name,
  label,
  options,
  placeholder = "Selecciona una opción",
  description,
  disabled,
  id,
}: FormSelectProps<T>) {
  const { control } = useFormContext<T>();
  const selectId = id ?? name;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField
          id={selectId}
          label={label}
          description={description}
          error={fieldState.error?.message}
        >
          <Select
            items={options}
            value={field.value ?? null}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger
              id={selectId}
              ref={field.ref}
              onBlur={field.onBlur}
              className="w-full"
              aria-invalid={fieldState.invalid}
              aria-describedby={fieldState.error ? `${selectId}-error` : undefined}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      )}
    />
  );
}
