"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { navigationConfig } from "@/lib/navigation";
import { useSidebar } from "@/hooks/use-sidebar";
import { Plus } from "lucide-react";
import { routes } from "@/lib/routes";
import { AppLogo } from "./AppLogo";

function isNavItemActive(pathname: string, href: string) {
  if (href === routes.dashboard) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navegación</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navigationConfig.map((group) =>
              group.items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    tooltip={state === "collapsed" ? item.label : undefined}
                    isActive={isNavItemActive(pathname, item.href)}
                  >
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
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
                render={<Link href={routes.users.new} />}
                tooltip={state === "collapsed" ? "Nuevo usuario" : undefined}
                isActive={pathname === routes.users.new}
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                <span>Nuevo usuario</span>
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
          <Link href={routes.dashboard} className="flex h-16 items-center justify-center">
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
