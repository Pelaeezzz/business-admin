import {
    ArrowDownLeftIcon,
    ArrowLeftRightIcon,
    ArrowUpRightIcon,
    FileTextIcon,
    type LucideIcon,
  } from "lucide-react";
  
  import { Button } from "@/components/ui/button";
  import { SectionHeader } from "@/components/finance/section-header";
  import { cn } from "@/lib/utils";
  
  interface QuickAction {
    id: string;
    label: string;
    icon: LucideIcon;
    iconClassName: string;
    onClick?: () => void;
  }
  
  interface QuickActionsSectionProps {
    onRegisterIncome?: () => void;
    onRegisterExpense?: () => void;
    onTransfer?: () => void;
    onReport?: () => void;
  }
  
  export function QuickActionsSection({
    onRegisterIncome,
    onRegisterExpense,
    onTransfer,
    onReport,
  }: QuickActionsSectionProps) {
    const actions: QuickAction[] = [
      {
        id: "income",
        label: "Registrar ingreso",
        icon: ArrowDownLeftIcon,
        iconClassName:
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        onClick: onRegisterIncome,
      },
      {
        id: "expense",
        label: "Registrar gasto",
        icon: ArrowUpRightIcon,
        iconClassName: "bg-destructive/10 text-destructive",
        onClick: onRegisterExpense,
      },
      {
        id: "transfer",
        label: "Transferencia",
        icon: ArrowLeftRightIcon,
        iconClassName: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        onClick: onTransfer,
      },
      {
        id: "report",
        label: "Reporte financiero",
        icon: FileTextIcon,
        iconClassName:
          "bg-violet-500/10 text-violet-600 dark:text-violet-400",
        onClick: onReport,
      },
    ];
  
    return (
      <section className="flex flex-col gap-3">
        <SectionHeader title="Acciones rápidas" />
  
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {actions.map((action) => {
            const Icon = action.icon;
  
            return (
              <Button
                key={action.id}
                type="button"
                variant="outline"
                className="h-auto flex-col gap-2 py-3"
                onClick={action.onClick}
              >
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full",
                    action.iconClassName,
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="text-xs font-medium">
                  {action.label}
                </span>
              </Button>
            );
          })}
        </div>
      </section>
    );
  }