import type { Product, ProductStockStatus } from "@/types/product";

export const PRODUCT_STOCK_STATUSES = ["available", "low", "out"] as const;

export const PRODUCT_STOCK_STATUS_LABELS: Record<ProductStockStatus, string> = {
  available: "Disponible",
  low: "Stock bajo",
  out: "Agotado",
};

export const PRODUCT_STOCK_STATUS_OPTIONS = PRODUCT_STOCK_STATUSES.map((value) => ({
  value,
  label: PRODUCT_STOCK_STATUS_LABELS[value],
}));

export function isProductStockStatus(value: unknown): value is ProductStockStatus {
  return PRODUCT_STOCK_STATUSES.includes(value as ProductStockStatus);
}

/** Estado derivado de las existencias frente al stock mínimo. */
export function getProductStockStatus(product: Product): ProductStockStatus {
  if (product.stock <= 0) {
    return "out";
  }

  if (product.stock <= product.minStock) {
    return "low";
  }

  return "available";
}
