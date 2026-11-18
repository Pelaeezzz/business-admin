import type { CurrencyCode } from "@/types/finance";

/** Estado de existencias de un producto. */
export type ProductStockStatus = "available" | "low" | "out";

export interface Product {
  /** SKU o código del producto. */
  id: string;
  name: string;
  category: string;
  /** Imagen del producto. */
  image: string;
  /** Unidad de medida (Botella 1 L, Saco 5 kg, kg...). */
  unit: string;
  /** Precio de venta. */
  price: number;
  /** Existencias actuales. */
  stock: number;
  /** Stock mínimo antes de considerarse bajo. */
  minStock: number;
}

export interface ProductCatalog {
  currency: CurrencyCode;
  products: Product[];
}
