"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
  formatWholeCurrency,
  formatWholePercent,
} from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CurrencyCode } from "@/types/finance";
import type { Employee } from "@/types/employee";

import { EmployeeAvatar } from "../components/employee-avatar";

const PREVIEW_LIMIT = 5;

interface EmployeesTableSectionProps {
  employees: Employee[];
  currency: CurrencyCode;
}

export function EmployeesTableSection({
  employees,
  currency,
}: EmployeesTableSectionProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleEmployees = showAll
    ? employees
    : employees.slice(0, PREVIEW_LIMIT);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todos los empleados</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead scope="col">Empleado</TableHead>
                <TableHead scope="col">Cargo</TableHead>
                <TableHead scope="col">Turno</TableHead>
                <TableHead scope="col" className="text-right">
                  Ventas (semana)
                </TableHead>
                <TableHead scope="col" className="text-right">
                  Punt.
                </TableHead>
                <TableHead scope="col" className="text-right">
                  Asistencia
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {visibleEmployees.map((employee) => {
                const inactive = employee.status === "inactive";

                return (
                  <TableRow
                    key={employee.id}
                    className={cn(inactive && "opacity-60")}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <EmployeeAvatar
                          name={employee.name}
                          initials={employee.initials}
                          className="size-7"
                        />
                        <span className="font-medium">
                          {employee.name}
                        </span>
                        {inactive ? (
                          <Badge
                            variant="secondary"
                            className="ml-1"
                          >
                            Inactivo
                          </Badge>
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {employee.role}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className="font-normal"
                      >
                        {employee.shift}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right tabular-nums">
                      {inactive
                        ? "—"
                        : formatWholeCurrency(
                            employee.weeklySales,
                            currency,
                          )}
                    </TableCell>

                    <TableCell className="text-right tabular-nums">
                      {inactive
                        ? "—"
                        : formatWholePercent(
                            employee.performance,
                          )}
                    </TableCell>

                    <TableCell className="text-right">
                      {inactive ? (
                        "—"
                      ) : (
                        <Badge
                          variant="secondary"
                          className={cn(
                            "border-transparent",
                            employee.attendance >= 100
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                              : "bg-amber-500/10 text-amber-700 dark:text-amber-400",
                          )}
                        >
                          {formatWholePercent(
                            employee.attendance,
                          )}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <Button
          type="button"
          variant="outline"
          className="mx-auto"
          onClick={() => setShowAll((value) => !value)}
          aria-expanded={showAll}
        >
          {showAll ? "Mostrar menos" : "Ver todos los empleados"}
        </Button>
      </CardContent>
    </Card>
  );
}