import type { LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
  children?: NavItem[];
  roles?: string[];
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export type NavigationConfig = NavGroup[];