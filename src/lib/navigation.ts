import {
  LayoutDashboard,
  Users,
  Settings,
  Building2,
} from "lucide-react";
import type { NavigationConfig } from "@/types/navigation";

export const navigationConfig: NavigationConfig = [
  {
    label: "Principal",
    items: [
      {
        href: "/dashboard",
        label: "Resumen",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Inventario",
    items: [
      {
        href: "/inventory",
        label: "Unventario Inteligente",
        icon: Building2,
      },
    ],
  },
  {
    label: "IPV",
    items: [
      {
        href: "/ipv",
        label: "IPV",
        icon: Users,
      },
    ],
  },
  {
    label: "Sistema",
    items: [
      {
        href: "/dashboard/configuracion",
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
