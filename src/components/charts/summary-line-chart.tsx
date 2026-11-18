"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// Datos de ejemplo (luego los sustituyes por datos reales / API)
const data = [
  { mes: "Ene", ingresos: 12400, gastos: 8200 },
  { mes: "Feb", ingresos: 14100, gastos: 9100 },
  { mes: "Mar", ingresos: 13200, gastos: 8700 },
  { mes: "Abr", ingresos: 16800, gastos: 10400 },
  { mes: "May", ingresos: 15900, gastos: 9800 },
  { mes: "Jun", ingresos: 18400, gastos: 11200 },
  { mes: "Jul", ingresos: 20100, gastos: 11800 },
  { mes: "Ago", ingresos: 19200, gastos: 12100 },
  { mes: "Sep", ingresos: 21600, gastos: 12600 },
  { mes: "Oct", ingresos: 23400, gastos: 13100 },
  { mes: "Nov", ingresos: 22100, gastos: 12900 },
  { mes: "Dic", ingresos: 25800, gastos: 14400 },
];

const chartConfig = {
  ingresos: {
    label: "Ingresos",
    color: "var(--chart-1)",
  },
  gastos: {
    label: "Gastos",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function SummaryLineChart() {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[320px] w-full">
      <LineChart
        accessibilityLayer
        data={data}
        margin={{ top: 8, right: 12, left: 4, bottom: 0 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="4 4" />
        <XAxis
          dataKey="mes"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          width={48}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value: number) => `${value / 1000}k`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="ingresos"
          type="monotone"
          stroke="var(--color-ingresos)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
        <Line
          dataKey="gastos"
          type="monotone"
          stroke="var(--color-gastos)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ChartContainer>
  );
}