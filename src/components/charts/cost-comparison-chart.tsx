"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatCompactAmount, formatCurrency } from "@/lib/format";
import type { ComparisonSeriesPoint, CurrencyCode } from "@/types/finance";

const chartConfig = {
  theoretical: {
    label: "Costo teórico (debería)",
    color: "var(--chart-1)",
  },
  actual: {
    label: "Costo real (IPV)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface CostComparisonChartProps {
  data: ComparisonSeriesPoint[];
  currency: CurrencyCode;
  className?: string;
}

export function CostComparisonChart({
  data,
  currency,
  className,
}: CostComparisonChartProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: "var(--chart-1)" }}
            aria-hidden="true"
          />
          Costo teórico (debería)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: "var(--chart-2)" }}
            aria-hidden="true"
          />
          Costo real (IPV)
        </span>
      </div>

      <ChartContainer
        config={chartConfig}
        className={className ?? "aspect-auto h-[280px] w-full"}
      >
        <LineChart
          accessibilityLayer
          data={data}
          margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="4 4" />

          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />

          <YAxis
            width={48}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value: number) => formatCompactAmount(value)}
          />

          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                indicator="line"
                formatter={(value, name) => (
                  <div className="flex w-full items-center justify-between gap-4">
                    <span className="text-muted-foreground">{name}</span>
                    <span className="font-medium tabular-nums">
                      {formatCurrency(Number(value), currency)}
                    </span>
                  </div>
                )}
              />
            }
          />

          <Line
            dataKey="theoretical"
            type="monotone"
            stroke="var(--color-theoretical)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            dataKey="actual"
            type="monotone"
            stroke="var(--color-actual)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
