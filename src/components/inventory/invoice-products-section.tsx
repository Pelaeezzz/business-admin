"use client";

import { useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import {
  EditIcon,
  FilePlusIcon,
  FileTextIcon,
  FileXIcon,
  Trash2Icon,
} from "lucide-react";

import ConfirmDialog from "@/components/confirm-dialog/confirm-dialog";
import { SegmentedControl } from "@/components/finance/segmented-control";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableMenu from "@/components/ui/table-menu";
import { formatWholeCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CurrencyCode } from "@/types/finance";
import type { InvoiceProduct } from "@/types/inventory";

type InvoiceFilter = "all" | "with" | "without";

interface InvoiceDialogState {
  mode: "add" | "edit";
  product: InvoiceProduct;
}

interface InvoiceProductsSectionProps {
  products: InvoiceProduct[];
  currency: CurrencyCode;
}

export function InvoiceProductsSection({
  products: initialProducts,
  currency,
}: InvoiceProductsSectionProps) {
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState<InvoiceFilter>("all");

  const [invoiceDialog, setInvoiceDialog] = useState<InvoiceDialogState | null>(
    null,
  );
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<InvoiceProduct | null>(null);

  const withInvoice = products.filter(
    (product) => product.invoiceNumber !== null,
  ).length;
  const withoutInvoice = products.length - withInvoice;

  const options = useMemo(
    () =>
      [
        { value: "all", label: `Todos (${products.length})` },
        { value: "with", label: `Con factura (${withInvoice})` },
        { value: "without", label: `Sin factura (${withoutInvoice})` },
      ] as const,
    [products.length, withInvoice, withoutInvoice],
  );

  const filtered = products.filter((product) => {
    if (filter === "with") {
      return product.invoiceNumber !== null;
    }
    if (filter === "without") {
      return product.invoiceNumber === null;
    }
    return true;
  });

  const emptyMessage =
    filter === "with"
      ? "No hay productos con factura."
      : filter === "without"
        ? "No hay productos sin factura."
        : "No hay productos registrados.";

  function openAddInvoice(product: InvoiceProduct) {
    setInvoiceNumber("");
    setInvoiceDate(product.date);
    setInvoiceDialog({ mode: "add", product });
  }

  function openEditInvoice(product: InvoiceProduct) {
    setInvoiceNumber(product.invoiceNumber ?? "");
    setInvoiceDate(product.date);
    setInvoiceDialog({ mode: "edit", product });
  }

  function handleInvoiceSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!invoiceDialog) {
      return;
    }

    const number = invoiceNumber.trim();
    if (!number) {
      return;
    }

    const { product } = invoiceDialog;
    const date = invoiceDate.trim();

    setProducts((current) =>
      current.map((item) =>
        item.id === product.id
          ? { ...item, invoiceNumber: number, date: date || item.date }
          : item,
      ),
    );

    setInvoiceDialog(null);
  }

  function handleDeleteInvoice() {
    if (!deleteTarget) {
      return;
    }

    setProducts((current) =>
      current.map((item) =>
        item.id === deleteTarget.id ? { ...item, invoiceNumber: null } : item,
      ),
    );

    setDeleteTarget(null);
  }

  return (
    <section aria-label="Productos y facturas">
      <Card>
        <CardHeader>
          <CardTitle>Productos y facturas</CardTitle>
          <CardDescription>
            Productos recibidos y si tienen factura registrada.
          </CardDescription>
          <CardAction>
            <SegmentedControl
              options={options}
              value={filter}
              onChange={setFilter}
              label="Filtrar productos por factura"
            />
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className="overflow-hidden rounded-lg border">
            <Table className="min-w-[920px]">
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead scope="col" className="w-16">
                    <span className="sr-only">Imagen</span>
                  </TableHead>
                  <TableHead scope="col">Producto</TableHead>
                  <TableHead scope="col">Proveedor</TableHead>
                  <TableHead scope="col">N.º factura</TableHead>
                  <TableHead scope="col">Fecha</TableHead>
                  <TableHead scope="col" className="text-right">
                    Cantidad
                  </TableHead>
                  <TableHead scope="col" className="text-right">
                    Importe
                  </TableHead>
                  <TableHead scope="col">Estado</TableHead>
                  <TableHead scope="col" className="w-12 text-right">
                    <span className="sr-only">Acciones</span>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="h-24 text-center text-muted-foreground"
                    >
                      {emptyMessage}
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((product) => {
                    const hasInvoice = product.invoiceNumber !== null;

                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Image
                            src={product.image}
                            alt=""
                            width={40}
                            height={40}
                            sizes="40px"
                            className="size-10 shrink-0 rounded-md border bg-muted object-cover"
                          />
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{product.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {product.unit}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="text-muted-foreground">
                          {product.supplier}
                        </TableCell>

                        <TableCell>
                          {hasInvoice ? (
                            <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm">
                              <FileTextIcon
                                className="size-3.5 text-muted-foreground"
                                aria-hidden="true"
                              />
                              {product.invoiceNumber}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm text-muted-foreground">
                              <FileXIcon
                                className="size-3.5"
                                aria-hidden="true"
                              />
                              Sin factura
                            </span>
                          )}
                        </TableCell>

                        <TableCell className="whitespace-nowrap text-muted-foreground">
                          {product.date}
                        </TableCell>

                        <TableCell className="text-right tabular-nums">
                          {product.quantity}
                        </TableCell>

                        <TableCell className="text-right tabular-nums whitespace-nowrap">
                          {formatWholeCurrency(product.amount, currency)}
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              hasInvoice
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
                            )}
                          >
                            {hasInvoice ? "Con factura" : "Sin factura"}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <TableMenu
                              titleTableMenu="Acciones"
                              actions={
                                hasInvoice
                                  ? [
                                      {
                                        label: "Editar factura",
                                        icon: <EditIcon />,
                                        action: () => openEditInvoice(product),
                                      },
                                      {
                                        label: "Eliminar factura",
                                        icon: <Trash2Icon />,
                                        variant: "destructive",
                                        action: () => setDeleteTarget(product),
                                      },
                                    ]
                                  : [
                                      {
                                        label: "Agregar factura",
                                        icon: <FilePlusIcon />,
                                        action: () => openAddInvoice(product),
                                      },
                                    ]
                              }
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Agregar / editar factura */}
      <Dialog
        open={invoiceDialog !== null}
        onOpenChange={(open) => {
          if (!open) {
            setInvoiceDialog(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <form
            key={
              invoiceDialog
                ? `${invoiceDialog.mode}-${invoiceDialog.product.id}`
                : "closed"
            }
            onSubmit={handleInvoiceSubmit}
            className="flex flex-col gap-4"
          >
            <DialogHeader>
              <DialogTitle>
                {invoiceDialog?.mode === "edit"
                  ? "Editar factura"
                  : "Agregar factura"}
              </DialogTitle>
              <DialogDescription>
                {invoiceDialog
                  ? `${invoiceDialog.product.name} · ${invoiceDialog.product.supplier}`
                  : ""}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="invoice-number">N.º de factura</Label>
                <Input
                  id="invoice-number"
                  value={invoiceNumber}
                  onChange={(event) => setInvoiceNumber(event.target.value)}
                  placeholder="Ej. FAC-2026-0000"
                  required
                  autoFocus
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="invoice-date">Fecha</Label>
                <Input
                  id="invoice-date"
                  value={invoiceDate}
                  onChange={(event) => setInvoiceDate(event.target.value)}
                  placeholder="Ej. 15 nov 2026"
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose className={buttonVariants({ variant: "outline" })}>
                Cancelar
              </DialogClose>
              <Button type="submit">
                {invoiceDialog?.mode === "edit"
                  ? "Guardar cambios"
                  : "Agregar factura"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Eliminar factura */}
      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        title="Eliminar factura"
        description={
          deleteTarget
            ? `¿Seguro que quieres eliminar la factura ${deleteTarget.invoiceNumber} de ${deleteTarget.name}? El producto quedará como «sin factura».`
            : ""
        }
        confirmButtonText="Eliminar factura"
        isDestructive
        onConfirm={handleDeleteInvoice}
      />
    </section>
  );
}
