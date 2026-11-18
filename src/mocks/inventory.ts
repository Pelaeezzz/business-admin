import type { InventoryValueSummary } from "@/types/inventory";

export const inventoryValueData = {
  currency: "CUP",
  period: "Esta semana",
  points: [
    { label: "Lun", value: 100_000 },
    { label: "Mar", value: 200_000 },
    { label: "Mié", value: 175_000 },
    { label: "Jue", value: 240_000 },
    { label: "Vie", value: 310_000 },
    { label: "Sáb", value: 285_000 },
    { label: "Dom", value: 210_000 },
  ],
} satisfies InventoryValueSummary;
