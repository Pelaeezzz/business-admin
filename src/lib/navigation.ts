import {
  Settings,
  Boxes,
  ClipboardList,
  UserGroup,
  Package,
  ClipboardPenLine,
  LayoutList,
  Scale,
  Summary,
  TrendingUp,
} from "lucide-react";
import type { NavigationConfig } from "@/types/navigation";
import { routes } from "@/routes/routes";

export const navigationConfig: NavigationConfig = [
  {
    label: "Principal",
    items: [
      {
        href: routes.dashboard,
        label: "Resumen",
        icon: Summary,
      },
    ],
  },
  {
    label: "Inventario",
    items: [
      {
        href: routes.inventory,
        label: "Inventario Inteligente",
        icon: Package,
      },
    ],
  },
  {
    label: "IPV",
    items: [
      {
        href: routes.ipv,
        label: "IPV",
        icon: ClipboardPenLine,
      },
    ],
  },
  {
    label: "Productos",
    items: [
      {
        href: routes.products.list,
        label: "Productos",
        icon: Boxes,
      },
    ],
  },
  {
    label: "Finanzas",
    items: [
      {
        href: routes.finances,
        label: "Finanzas",
        icon: ClipboardList,
        children: [
          {
            href: routes.finances,
            label: "Todas",
            icon: LayoutList,
          },
          {
            href: routes.financeNetIncome,
            label: "Utilidad neta",
            icon: TrendingUp,
          },
          {
            href: routes.financeComparison,
            label: "Comparación",
            icon: Scale,
          },
        ],
      },
    ],
  },
  {
    label: "Empleados",
    items: [
      {
        href: routes.workers,
        label: "Empleados",
        icon: UserGroup,
      },
    ],
  },
  {
    label: "Sistema",
    items: [
      {
        href: routes.settings,
        label: "Configuración",
        icon: Settings,
      },
    ],
  },
];

export function getNavigationForRole(role: string): NavigationConfig {
  return navigationConfig
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => !item.roles || item.roles.includes(role),
      ),
    }))
    .filter((group) => group.items.length > 0);
}
