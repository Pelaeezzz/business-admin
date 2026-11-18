import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Employee } from "@/types/employee";

const AVATAR_TONES = [
  "bg-sky-500/15 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300",
  "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300",
  "bg-amber-500/15 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
  "bg-rose-500/15 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300",
  "bg-violet-500/15 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300",
  "bg-cyan-500/15 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300",
];

function getTone(name: string) {
  let hash = 0;

  for (let index = 0; index < name.length; index += 1) {
    hash = (hash + name.charCodeAt(index) * (index + 1)) % AVATAR_TONES.length;
  }

  return AVATAR_TONES[hash];
}

interface DayWorkersTableProps {
  employees: Employee[];
}

export function DayWorkersTable({ employees }: DayWorkersTableProps) {
  const workers = [...employees].sort((a, b) =>
    a.arrivalTime.localeCompare(b.arrivalTime),
  );

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-lg border [&>*]:min-h-0 [&>*]:flex-1">
      <Table className="h-full min-w-[400px]">
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead scope="col">Empleado</TableHead>
            <TableHead scope="col">Cargo</TableHead>
            <TableHead scope="col">Turno</TableHead>
            <TableHead scope="col">Entrada</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {workers.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-24 text-center text-muted-foreground"
              >
                No hay trabajadores programados para hoy.
              </TableCell>
            </TableRow>
          ) : (
            workers.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="whitespace-normal">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarFallback
                        className={cn(
                          "text-xs font-semibold",
                          getTone(employee.name),
                        )}
                      >
                        {employee.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="min-w-0 font-medium">{employee.name}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <span>{employee.role}</span>
                    <span className="text-xs text-muted-foreground">
                      {employee.area}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {employee.shift}
                  </Badge>
                </TableCell>

                <TableCell className="tabular-nums">
                  {employee.arrivalTime}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
