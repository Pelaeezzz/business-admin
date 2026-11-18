import type { CurrencyCode } from "@/types/finance";

export interface InventoryValuePoint {
  /** Día de la semana (Lun, Mar...). */
  label: string;
  /** Valor del inventario ese día. */
  value: number;
}

export interface InventoryValueSummary {
  currency: CurrencyCode;
  /** Etiqueta del período mostrado. */
  period: string;
  points: InventoryValuePoint[];
}

export interface InvoiceProduct {
  id: string;
  name: string;
  /** Imagen del producto. */
  image: string;
  /** Unidad de medida (Botella 1 L, Saco 5 kg, kg...). */
  unit: string;
  /** Proveedor que entregó el producto. */
  supplier: string;
  /** Número de factura. `null` cuando el producto no tiene factura. */
  invoiceNumber: string | null;
  /** Fecha en la que entró el producto. */
  date: string;
  quantity: number;
  /** Importe de la compra. */
  amount: number;
}
