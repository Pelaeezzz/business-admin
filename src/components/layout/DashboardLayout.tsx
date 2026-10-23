"use client";

import * as React from "react";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { Header } from "./Header";
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      {" "}
      {/* Asegura que el sidebar esté abierto por defecto */}
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col">
          <Header />
          <main className="min-h-0 flex-1 overflow-auto">
            <div className="container mx-auto p-4 md:p-6 lg:p-8">{children}</div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
