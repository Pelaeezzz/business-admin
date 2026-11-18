import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PayableStatus } from "@/types/summary";

const STATUS_CONFIG: Record<
  PayableStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pendiente",
    className:
      "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  paid: {
    label: "Pagado",
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
};

export function PayableStatusBadge({ status }: { status: PayableStatus }) {
  const config = STATUS_CONFIG[status];

  return (
    <Badge variant="outline" className={cn(config.className)}>
      {config.label}
    </Badge>
  );
}
