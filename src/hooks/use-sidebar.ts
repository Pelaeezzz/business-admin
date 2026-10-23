"use client";

import { useSidebar as useSidebarBase } from "@/components/ui/sidebar";

export type UseSidebarReturn = ReturnType<typeof useSidebarBase>;

export function useSidebar(): UseSidebarReturn {
  return useSidebarBase();
}
