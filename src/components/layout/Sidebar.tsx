"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Plus } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { navigationConfig } from "@/lib/navigation";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { routes } from "@/routes/routes";
import type { NavItem } from "@/types/navigation";
import { AppLogo } from "./AppLogo";

function isNavItemActive(pathname: string, href: string) {
  if (href === routes.dashboard) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

interface SidebarNavItemProps {
  item: NavItem;
  pathname: string;
  collapsed: boolean;
}

function SidebarNavItem({ item, pathname, collapsed }: SidebarNavItemProps) {
  const children = item.children ?? [];
  const hasChildren = children.length > 0;

  // De los hijos que coinciden con la ruta, el más específico es el activo.
  const activeChildHref = children.reduce<string | null>((best, child) => {
    if (!isNavItemActive(pathname, child.href)) return best;
    if (best && best.length >= child.href.length) return best;
    return child.href;
  }, null);
  const hasActiveChild = activeChildHref !== null;
  const isActive = isNavItemActive(pathname, item.href) && !hasActiveChild;

  // `null` = el usuario no ha tocado la fila: el submenú sigue a la ruta.
  const [manualOpen, setManualOpen] = React.useState<boolean | null>(null);
  const open = manualOpen ?? hasActiveChild;

  const label = (
    <>
      <item.icon className="h-4 w-4" aria-hidden="true" />
      <span className="truncate">{item.label}</span>
    </>
  );

  return (
    <SidebarMenuItem>
      {hasChildren && !collapsed ? (
        // La fila entera es pulsable: abre/cierra el desplegable.
        <Collapsible
          open={open}
          onOpenChange={(nextOpen) => setManualOpen(nextOpen)}
        >
          <SidebarMenuButton
            render={<CollapsibleTrigger />}
            isActive={isActive}
            aria-label={
              open
                ? `Ocultar secciones de ${item.label}`
                : `Mostrar secciones de ${item.label}`
            }
          >
            {label}
            <ChevronRight
              className={cn(
                "ml-auto shrink-0 transition-transform duration-200",
                open && "rotate-90",
              )}
              aria-hidden="true"
            />
          </SidebarMenuButton>

          <CollapsibleContent>
            <SidebarMenuSub>
              {children.map((child) => (
                <SidebarMenuSubItem key={child.href}>
                  <SidebarMenuSubButton
                    render={<Link href={child.href} />}
                    isActive={child.href === activeChildHref}
                  >
                    <child.icon className="h-4 w-4" aria-hidden="true" />
                    <span className="truncate">{child.label}</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        // Sin hijos (o barra colapsada): la fila navega.
        <SidebarMenuButton
          render={<Link href={item.href} />}
          tooltip={collapsed ? item.label : undefined}
          isActive={isActive}
        >
          {label}
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  );
}

function SidebarNav() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navegación</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navigationConfig.map((group) =>
              group.items.map((item) => (
                <SidebarNavItem
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  collapsed={collapsed}
                />
              )),
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarSeparator />

      <SidebarGroup>
        <SidebarGroupLabel>Acciones</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href={routes.products.new} />}
                tooltip={collapsed ? "Nuevo producto" : undefined}
                isActive={pathname === routes.products.new}
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                <span>Nuevo producto</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}

export function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r">
      <SidebarHeader>
        <SidebarHeader>
          <Link
            href={routes.dashboard}
            className="flex h-16 items-center justify-center"
          >
            <AppLogo />
          </Link>
        </SidebarHeader>
      </SidebarHeader>

      <SidebarNav />

      <SidebarFooter>
        <SidebarTrigger className="w-full justify-center" />
      </SidebarFooter>
    </Sidebar>
  );
}
