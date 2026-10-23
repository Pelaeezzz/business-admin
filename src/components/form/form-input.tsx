"use client";

import type { ComponentProps } from "react";
import { Controller, useFormContext, type FieldValues, type Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField } from "./form-field";

type FormInputProps<T extends FieldValues> = Omit<
  ComponentProps<"input">,
  "name" | "value" | "defaultValue" | "onChange" | "onBlur"
> & {
  name: Path<T>;
  label: string;
  description?: string;
};

export function FormInput<T extends FieldValues>({
  name,
  label,
  description,
  id,
  ...inputProps
}: FormInputProps<T>) {
  const { control } = useFormContext<T>();
  const inputId = id ?? name;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField
          id={inputId}
          label={label}
          description={description}
          error={fieldState.error?.message}
        >
          <Input
            {...inputProps}
            {...field}
            id={inputId}
            value={field.value ?? ""}
            aria-invalid={fieldState.invalid}
            aria-describedby={fieldState.error ? `${inputId}-error` : undefined}
          />
        </FormField>
      )}
    />
  );
}
