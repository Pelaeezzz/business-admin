import { TeamPerformanceChart } from "@/components/charts/team-performance-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { EmployeePerformanceMetric } from "@/types/employee";

interface TeamPerformanceSectionProps {
  data: EmployeePerformanceMetric[];
}

export function TeamPerformanceSection({
  data,
}: TeamPerformanceSectionProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Rendimiento general del equipo</CardTitle>
        <CardDescription>Promedio semanal</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center">
        <TeamPerformanceChart data={data} />
      </CardContent>
    </Card>
  );
}