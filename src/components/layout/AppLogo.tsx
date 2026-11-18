"use client";

import Image from "next/image";
import { useSidebar } from "@/hooks/use-sidebar";

const LOGOS = {
  default: {
    light: { src: "/images/logo/logo_claro.png", width: 4944, height: 838 },
    dark: { src: "/images/logo/logo_oscuro.png", width: 4939, height: 837 },
  },
  collapsed: {
    light: { src: "/images/logo/logo_collapsed_claro.png", width: 733, height: 714 },
    dark: { src: "/images/logo/logo_collapsed_oscuro.png", width: 749, height: 710 },
  },
};

export function AppLogo() {
  const { isMobile, state } = useSidebar();
  const logo = !isMobile && state === "collapsed" ? LOGOS.collapsed : LOGOS.default;

  return (
    <>
      <Image
        {...logo.light}
        alt="Negocios"
        className="h-8 w-auto max-w-full object-contain dark:hidden"
      />
      <Image
        {...logo.dark}
        alt="Negocios"
        className="hidden h-8 w-auto max-w-full object-contain dark:block"
      />
    </>
  );
}
