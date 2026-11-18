"use client";

import { CakeIcon } from "lucide-react";
import { es } from "date-fns/locale";

import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { EmployeeBirthday } from "@/types/employee";

import { EmployeeAvatar } from "../components/employee-avatar";

const CALENDAR_YEAR = 2024;

interface UpcomingBirthdaysSectionProps {
  birthdays: EmployeeBirthday[];
}

export function UpcomingBirthdaysSection({
  birthdays,
}: UpcomingBirthdaysSectionProps) {
  const birthdayDates = birthdays.map(
    (birthday) =>
      new Date(CALENDAR_YEAR, birthday.month, birthday.day),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cumpleaños próximos</CardTitle>

        <CardAction>
          <Dialog>
            <DialogTrigger
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              Ver calendario
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Calendario de cumpleaños</DialogTitle>
                <DialogDescription>
                  Próximas celebraciones del equipo.
                </DialogDescription>
              </DialogHeader>

              <Calendar
                defaultMonth={new Date(CALENDAR_YEAR, 4, 1)}
                locale={es}
                showOutsideDays={false}
                modifiers={{ birthday: birthdayDates }}
                modifiersClassNames={{
                  birthday:
                    "rounded-md bg-primary/10 font-semibold text-primary",
                }}
              />

              <ul className="flex flex-col gap-2">
                {birthdays.map((birthday) => (
                  <li
                    key={birthday.employeeId}
                    className="flex items-center gap-2 text-sm"
                  >
                    <CakeIcon
                      className="size-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="flex-1">
                      {birthday.name}
                    </span>
                    <span className="text-muted-foreground">
                      {birthday.date}
                    </span>
                  </li>
                ))}
              </ul>
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>

      <CardContent>
        <ul className="flex flex-col gap-3">
          {birthdays.map((birthday) => (
            <li
              key={birthday.employeeId}
              className="flex items-center gap-3"
            >
              <EmployeeAvatar
                name={birthday.name}
                initials={birthday.initials}
                className="size-8"
              />

              <span className="min-w-0 flex-1 truncate text-sm font-medium">
                {birthday.name}
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <CakeIcon
                  className="size-3.5"
                  aria-hidden="true"
                />
                {birthday.date}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}