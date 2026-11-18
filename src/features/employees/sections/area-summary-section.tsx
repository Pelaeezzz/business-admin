import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatInteger,
  formatWholePercent,
} from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CurrencyCode } from "@/types/finance";
import type { EmployeeAreaSummary } from "@/types/employee";

interface AreaSummarySectionProps {
  areas: EmployeeAreaSummary[];
  currency: CurrencyCode;
}

function getPerformanceClass(value: number) {
  if (value >= 90) {
    return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
  }

  if (value >= 85) {
    return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
  }

  return "bg-destructive/10 text-destructive";
}

export function AreaSummarySection({
  areas,
  currency,
}: AreaSummarySectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen por área</CardTitle>
        <CardDescription>Esta semana</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead scope="col" className="h-9 px-2">
                  Área
                </TableHead>
                <TableHead
                  scope="col"
                  className="h-9 px-2 text-right"
                >
                  Ventas ({currency})
                </TableHead>
                <TableHead
                  scope="col"
                  className="h-9 px-2 text-center"
                >
                  Empleados
                </TableHead>
                <TableHead
                  scope="col"
                  className="h-9 px-2 text-right"
                >
                  Rendimiento
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {areas.map((area) => (
                <TableRow key={area.id}>
                  <TableCell className="px-2 font-medium">
                    {area.name}
                  </TableCell>

                  <TableCell className="px-2 text-right tabular-nums">
                    {formatInteger(area.sales)}
                  </TableCell>

                  <TableCell className="px-2 text-center tabular-nums">
                    {formatInteger(area.employees)}
                  </TableCell>

                  <TableCell className="px-2 text-right">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "border-transparent",
                        getPerformanceClass(area.performance),
                      )}
                    >
                      {formatWholePercent(area.performance)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}