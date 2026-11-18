import { PlusIcon } from "lucide-react";

import { SavingsGoalItem } from "../components/savings-goal-item";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CurrencyAmount } from "@/components/finance/currency-amount";
import { ProgressRing } from "@/components/finance/progress-ring";
import {
  formatCurrency,
  formatWholePercent,
} from "@/lib/format";
import type { SavingsSummary } from "@/types/finance";

interface SavingsSectionProps {
  data: SavingsSummary;
  onAddGoal?: () => void;
}

export function SavingsSection({
  data,
  onAddGoal,
}: SavingsSectionProps) {
  const totalPercentage =
    data.target > 0
      ? Math.round((data.totalSaved / data.target) * 100)
      : 0;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Ahorros</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-6 sm:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center gap-3">
          <ProgressRing
            value={totalPercentage}
            size={112}
            strokeWidth={10}
            label="Progreso total de ahorro"
          >
            <span className="text-2xl font-semibold tabular-nums">
              {formatWholePercent(totalPercentage)}
            </span>
          </ProgressRing>

          <div className="flex flex-col items-center gap-0.5 text-center">
            <p className="text-xs text-muted-foreground">
              Total ahorrado
            </p>
            <CurrencyAmount
              amount={data.totalSaved}
              currency={data.currency}
              className="text-lg font-semibold"
            />
            <p className="text-xs text-muted-foreground">
              Meta: {formatCurrency(data.target, data.currency)}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <h3 className="text-sm font-medium">
            Ahorros por objetivo
          </h3>

          <ul className="flex flex-col gap-4">
            {data.goals.map((goal) => (
              <SavingsGoalItem key={goal.id} goal={goal} />
            ))}
          </ul>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onAddGoal}
          >
            <PlusIcon />
            Nuevo objetivo de ahorro
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}