"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { EmployeePerformanceMetric } from "@/types/employee";

const chartConfig = {
  value: {
    label: "Puntaje",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface TeamPerformanceChartProps {
  data: EmployeePerformanceMetric[];
  className?: string;
}

export function TeamPerformanceChart({
  data,
  className,
}: TeamPerformanceChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className={
        className ??
        "mx-auto h-[300px] w-full max-w-[360px]"
      }
    >
      <RadarChart
        data={data}
        outerRadius="68%"
        margin={{ top: 12, right: 36, bottom: 12, left: 36 }}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />

        <PolarAngleAxis
          dataKey="label"
          tick={{ fontSize: 10 }}
        />

        <PolarGrid />

        <PolarRadiusAxis
          domain={[0, 100]}
          tick={false}
          axisLine={false}
        />

        <Radar
          dataKey="value"
          fill="var(--color-value)"
          fillOpacity={0.25}
          stroke="var(--color-value)"
          strokeWidth={2}
          dot={{ r: 3, fill: "var(--color-value)" }}
          activeDot={{ r: 4 }}
        />
      </RadarChart>
    </ChartContainer>
  );
}