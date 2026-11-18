import { ActionCard } from "@/components/action-card/action-card";
import { cn } from "@/lib/utils";

export interface StepItem {
  number: number | string;
  title: string;
  description?: string;
  href: string;
}

interface StepCardsProps {
  steps: StepItem[];
  /** Etiqueta accesible del nav */
  label?: string;
  /** Permite cambiar columnas, por ejemplo "md:grid-cols-4" */
  className?: string;
}

export function StepBadge({ value }: { value: number | string }) {
  return (
    <span
      aria-hidden="true"
      className="flex size-9 items-center justify-center rounded-md bg-muted text-sm font-semibold text-muted-foreground"
    >
      {value}
    </span>
  );
}

export function StepCards({
  steps,
  label = "Pasos",
  className,
}: StepCardsProps) {
  return (
    <nav aria-label={label} className={cn("grid gap-4 md:grid-cols-3", className)}>
      {steps.map((step) => (
        <ActionCard
          key={`${step.number}-${step.title}`}
          href={step.href}
          title={step.title}
          description={step.description}
          leading={<StepBadge value={step.number} />}
        />
      ))}
    </nav>
  );
}