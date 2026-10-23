"use client";

import { TooltipProvider as TooltipProviderPrimitive } from "@/components/ui/tooltip";
import type { ReactNode } from "react";

export function TooltipProvider({ children }: { children: ReactNode }) {
  return <TooltipProviderPrimitive delay={0}>{children}</TooltipProviderPrimitive>;
}