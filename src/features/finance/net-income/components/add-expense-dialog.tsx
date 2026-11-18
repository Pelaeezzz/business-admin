"use client";

import { useState, type FormEvent } from "react";
import { PlusIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type {
  CurrencyCode,
  NetIncomeBreakdownItem,
  NetIncomeIcon,
  NetIncomeTone,
} from "@/types/finance";

interface ExpenseCategory {
  value: string;
  label: string;
  icon: NetIncomeIcon;
  tone: NetIncomeTone;
}

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  {
    value: "payroll",
    label: "Nómina",
    icon: "banknote",
    tone: "success",
  },
  {
    value: "supplies",
    label: "Compras e insumos",
    icon: "shopping-cart",
    tone: "danger",
  },
  {
    value: "services",
    label: "Servicios",
    icon: "zap",
    tone: "warning",
  },
  {
    value: "operating",
    label: "Gastos operativos",
    icon: "wrench",
    tone: "violet",
  },
  {
    value: "other",
    label: "Otros gastos",
    icon: "ellipsis",
    tone: "default",
  },
];

interface AddExpenseDialogProps {
  currency: CurrencyCode;
  onAdd: (expense: NetIncomeBreakdownItem) => void;
}

export function AddExpenseDialog({ currency, onAdd }: AddExpenseDialogProps) {
  const [open, setOpen] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const category =
      EXPENSE_CATEGORIES.find(
        (option) => option.value === formData.get("category"),
      ) ?? EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1];
    const amount = Number(formData.get("amount"));
    const description = String(formData.get("description") ?? "").trim();

    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }

    onAdd({
      id: `${category.value}-${Date.now()}`,
      label: category.label,
      description: description || "Gasto registrado",
      amount,
      percentage: 0,
      icon: category.icon,
      tone: category.tone,
    });

    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(buttonVariants({ variant: "outline" }), "mx-auto")}
      >
        <PlusIcon />
        Agregar gasto
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Agregar gasto</DialogTitle>
            <DialogDescription>
              Registra un gasto del día para actualizar los totales.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="expense-category">Categoría</Label>
              <select
                id="expense-category"
                name="category"
                defaultValue="supplies"
                className="h-9 w-full rounded-md border border-input bg-transparent px-2.5 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
              >
                {EXPENSE_CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="expense-description">Descripción</Label>
              <Input
                id="expense-description"
                name="description"
                placeholder="Ej. Compra de café"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="expense-amount">Monto ({currency})</Label>
              <Input
                id="expense-amount"
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                required
                placeholder="0,00"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose className={buttonVariants({ variant: "outline" })}>
              Cancelar
            </DialogClose>
            <button
              type="submit"
              className={buttonVariants({ variant: "default" })}
            >
              Agregar gasto
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
