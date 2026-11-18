"use client";
import React, { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./button";

interface Action {
  label: string;
  icon?: ReactNode;
  action: () => void;
  /** Estilo del ítem; usa "destructive" para acciones que borran. */
  variant?: "default" | "destructive";
}

interface Props {
  titleTableMenu?: string;
  actions: Action[];
}

export default function TableMenu({
  titleTableMenu = "Acciones",
  actions,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={(props) => (
          <Button {...props} variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )}
      />
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{titleTableMenu}</DropdownMenuLabel>

          <DropdownMenuSeparator />

          {actions.map((action, index) => (
            <DropdownMenuItem
              className="flex gap-2"
              variant={action.variant}
              key={index}
              onClick={action.action}
            >
              {action.icon && action.icon}
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
