import { z } from "zod";
import type { CreateProductDto, Product, UpdateProductDto } from "@/types/product";

/** Campo numérico como texto: el formulario valida y los DTO convierten. */
const numericText = (label: string, { integer = false } = {}) =>
  z
    .string()
    .trim()
    .min(1, `${label} es obligatorio`)
    .refine((value) => !Number.isNaN(Number(value)), `${label} debe ser un número`)
    .refine((value) => Number(value) >= 0, `${label} no puede ser negativo`)
    .refine(
      (value) => !integer || Number.isInteger(Number(value)),
      `${label} debe ser un número entero`,
    );

export const productFormSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "El código es obligatorio")
    .max(24, "El código no puede superar los 24 caracteres")
    .regex(/^[A-Za-z0-9._-]+$/, "Solo letras, números, puntos, guiones y guiones bajos"),
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres"),
  category: z.string().trim().min(1, "Selecciona una categoría"),
  unit: z.string().trim().min(1, "Indica la unidad de medida"),
  price: numericText("El precio"),
  stock: numericText("Las existencias", { integer: true }),
  minStock: numericText("El stock mínimo", { integer: true }),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export function toCreateProductDto(values: ProductFormValues): CreateProductDto {
  return {
    id: values.id,
    name: values.name,
    category: values.category,
    unit: values.unit,
    price: Number(values.price),
    stock: Number(values.stock),
    minStock: Number(values.minStock),
  };
}

export function toUpdateProductDto(values: ProductFormValues): UpdateProductDto {
  return {
    name: values.name,
    category: values.category,
    unit: values.unit,
    price: Number(values.price),
    stock: Number(values.stock),
    minStock: Number(values.minStock),
  };
}

export function toProductFormValues(product: Product): ProductFormValues {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    unit: product.unit,
    price: String(product.price),
    stock: String(product.stock),
    minStock: String(product.minStock),
  };
}
