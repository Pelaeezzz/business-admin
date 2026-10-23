"use client";

import { ThemeProvider as ThemeProviderPrimitive } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps & { children: ReactNode }) {
  return <ThemeProviderPrimitive {...props} attribute="class" defaultTheme="system" enableSystem>{children}</ThemeProviderPrimitive>;
}