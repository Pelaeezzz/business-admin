import { formatCurrency, formatWholePercent } from "@/lib/format";
import type { SavingsGoal } from "@/types/finance";

interface SavingsGoalItemProps {
  goal: SavingsGoal;
}

export function SavingsGoalItem({ goal }: SavingsGoalItemProps) {
  const percentage =
    goal.target > 0
      ? Math.round((goal.saved / goal.target) * 100)
      : 0;

  const width = Math.min(100, Math.max(0, percentage));

  return (
    <li className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">{goal.name}</span>
        <span className="text-xs font-medium tabular-nums text-muted-foreground">
          {formatWholePercent(percentage)}
        </span>
      </div>

      <div
        className="h-2 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-label={`Progreso de ${goal.name}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
      >
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${width}%` }}
        />
      </div>

      <span className="text-xs tabular-nums text-muted-foreground">
        {formatCurrency(goal.saved, goal.currency)} /{" "}
        {formatCurrency(goal.target, goal.currency)}
      </span>
    </li>
  );
}