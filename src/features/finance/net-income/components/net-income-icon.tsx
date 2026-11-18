import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  BanknoteIcon,
  EllipsisIcon,
  HandCoinsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  WalletIcon,
  WrenchIcon,
  ZapIcon,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { NetIncomeIcon, NetIncomeTone } from "@/types/finance";

const ICONS: Record<NetIncomeIcon, LucideIcon> = {
  "arrow-down-left": ArrowDownLeftIcon,
  "arrow-up-right": ArrowUpRightIcon,
  banknote: BanknoteIcon,
  "shopping-cart": ShoppingCartIcon,
  zap: ZapIcon,
  wrench: WrenchIcon,
  ellipsis: EllipsisIcon,
  "shopping-bag": ShoppingBagIcon,
  "hand-coins": HandCoinsIcon,
  wallet: WalletIcon,
};

const TONES: Record<NetIncomeTone, string> = {
  default: "bg-muted text-muted-foreground",
  info: "bg-primary/10 text-primary",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  danger: "bg-destructive/10 text-destructive",
  violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

interface NetIncomeIconBadgeProps {
  icon: NetIncomeIcon;
  tone?: NetIncomeTone;
  className?: string;
}

export function NetIncomeIconBadge({
  icon,
  tone = "default",
  className,
}: NetIncomeIconBadgeProps) {
  const Icon = ICONS[icon];

  return (
    <span
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full",
        TONES[tone],
        className,
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
    </span>
  );
}
