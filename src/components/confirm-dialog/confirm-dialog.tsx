"use client";

import { AlertTriangleIcon, Loader2Icon } from "lucide-react";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
  error?: string | null;
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmButtonText = "Confirmar",
  cancelButtonText = "Cancelar",
  isDestructive = false,
  isLoading = false,
  error,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !isLoading && onOpenChange(nextOpen)}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isDestructive && <AlertTriangleIcon className="size-5 text-destructive" />}
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {error && <AlertDestructive title="No se pudo completar la acción" description={error} />}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            {cancelButtonText}
          </Button>
          <Button
            variant={isDestructive ? "destructive" : "default"}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading && <Loader2Icon className="animate-spin" />}
            {confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
