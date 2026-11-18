import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TransferStatus } from "@/types/summary";

const STATUS_CONFIG: Record<
  TransferStatus,
  { label: string; className: string }
> = {
  completed: {
    label: "Completada",
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  pending: {
    label: "Pendiente",
    className:
      "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  failed: {
    label: "Fallida",
    className: "border-destructive/30 bg-destructive/10 text-destructive",
  },
};

export function TransferStatusBadge({ status }: { status: TransferStatus }) {
  const config = STATUS_CONFIG[status];

  return (
    <Badge variant="outline" className={cn(config.className)}>
      {config.label}
    </Badge>
  );
}
