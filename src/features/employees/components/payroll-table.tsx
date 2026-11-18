import { cn } from "@/lib/utils";
import { formatWholeCurrency } from "@/lib/format";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CurrencyCode } from "@/types/finance";
import type { Employee } from "@/types/employee";

import { EmployeeAvatar } from "./employee-avatar";

interface PayrollTableProps {
  employees: Employee[];
  currency: CurrencyCode;
  className?: string;
}

export function PayrollTable({
  employees,
  currency,
  className,
}: PayrollTableProps) {
  const total = employees.reduce(
    (sum, employee) => sum + employee.weeklyPay,
    0,
  );

  return (
    <div className={cn("overflow-hidden rounded-lg border", className)}>
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead scope="col">Empleado</TableHead>
            <TableHead scope="col">Cargo</TableHead>
            <TableHead scope="col" className="text-right">
              Salario semanal
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <EmployeeAvatar
                    name={employee.name}
                    initials={employee.initials}
                    className="size-7"
                  />
                  <span className="font-medium">{employee.name}</span>
                </div>
              </TableCell>

              <TableCell className="text-muted-foreground">
                {employee.role}
              </TableCell>

              <TableCell className="text-right tabular-nums">
                {formatWholeCurrency(employee.weeklyPay, currency)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total semanal</TableCell>
            <TableCell className="text-right tabular-nums">
              {formatWholeCurrency(total, currency)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}