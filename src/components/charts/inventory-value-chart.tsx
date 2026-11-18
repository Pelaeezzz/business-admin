"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatCompactAmount, formatCurrency } from "@/lib/format";
import type { CurrencyCode } from "@/types/finance";
import type { InventoryValuePoint } from "@/types/inventory";

const chartConfig = {
  value: {
    label: "Valor en inventario",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface InventoryValueChartProps {
  data: InventoryValuePoint[];
  currency: CurrencyCode;
  className?: string;
}

export function InventoryValueChart({
  data,
  currency,
  className,
}: InventoryValueChartProps) {
  return (
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
          width={52}
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
          dataKey="value"
          type="monotone"
          stroke="var(--color-value)"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
