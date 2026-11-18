import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Employee } from "@/types/employee";

import { DayWorkersTable } from "../components/day-workers-table";

interface DayWorkersSectionProps {
  employees: Employee[];
}

export function DayWorkersSection({ employees }: DayWorkersSectionProps) {
  return (
    <section aria-label="Trabajadores del día" className="min-w-0">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Trabajadores del día</CardTitle>
          <CardDescription>
            {employees.length} trabajadores programados para hoy.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col">
          <DayWorkersTable employees={employees} />
        </CardContent>
      </Card>
    </section>
  );
}
