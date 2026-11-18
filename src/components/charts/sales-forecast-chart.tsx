"use client";

import { useId } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatCompactAmount } from "@/lib/format";
import type { ForecastPoint } from "@/types/finance";

const chartConfig = {
  value: {
    label: "Ventas",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface SalesForecastChartProps {
  data: ForecastPoint[];
  className?: string;
}

export function SalesForecastChart({
  data,
  className,
}: SalesForecastChartProps) {
  const gradientId = `forecast-${useId().replace(/:/g, "")}`;

  return (
    <ChartContainer
      config={chartConfig}
      className={className ?? "aspect-auto h-[240px] w-full"}
    >
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="var(--color-value)"
              stopOpacity={0.35}
            />
            <stop
              offset="95%"
              stopColor="var(--color-value)"
              stopOpacity={0.02}
            />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} strokeDasharray="4 4" />

        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />

        <YAxis
          width={44}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value: number) =>
            formatCompactAmount(value)
          }
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />

        <Area
          dataKey="value"
          type="monotone"
          stroke="var(--color-value)"
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </AreaChart>
    </ChartContainer>
  );
}