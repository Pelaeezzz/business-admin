"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput, FormSelect, type FormSelectOption } from "@/components/form";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import { Button } from "@/components/ui/button";
import { productFormSchema, type ProductFormValues } from "../schemas/product-form-schema";

interface Props {
  mode: "create" | "edit";
  categoryOptions: readonly FormSelectOption[];
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  errorMessage?: string;
  submitLabel?: string;
}

export default function ProductForm({
  mode,
  categoryOptions,
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
  errorMessage,
  submitLabel = "Guardar",
}: Props) {
  const isEdit = mode === "edit";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    mode: "onTouched",
    defaultValues: {
      id: "",
      name: "",
      unit: "",
      price: "",
      stock: "",
      minStock: "",
      ...defaultValues,
    },
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
        {errorMessage && (
          <AlertDestructive title="No se pudo guardar el producto" description={errorMessage} />
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <FormInput<ProductFormValues>
            name="id"
            label="Código (SKU)"
            autoComplete="off"
            disabled={isEdit}
            description={isEdit ? "El código no se puede cambiar" : "Ej.: ACE-001"}
          />
          <FormInput<ProductFormValues> name="name" label="Nombre" autoComplete="off" />
          <FormSelect<ProductFormValues>
            name="category"
            label="Categoría"
            options={categoryOptions}
            placeholder="Selecciona una categoría"
          />
          <FormInput<ProductFormValues>
            name="unit"
            label="Unidad de medida"
            autoComplete="off"
            description="Ej.: Botella 1 L, Saco 5 kg, kg"
          />
          <FormInput<ProductFormValues>
            name="price"
            label="Precio de venta"
            type="number"
            inputMode="decimal"
            min={0}
            step="0.01"
          />
          <FormInput<ProductFormValues>
            name="stock"
            label="Existencias"
            type="number"
            inputMode="numeric"
            min={0}
            step="1"
          />
          <FormInput<ProductFormValues>
            name="minStock"
            label="Stock mínimo"
            type="number"
            inputMode="numeric"
            min={0}
            step="1"
            description="Por debajo de esta cantidad el producto aparece como stock bajo"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2Icon className="animate-spin" />}
            {submitLabel}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
