"use client";

import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { EmployeeAvatar } from "./employee-avatar";

export interface RankingCardEntry {
  id: string;
  name: string;
  initials?: string;
  subtitle?: string;
  value: ReactNode;
}

interface RankingCardProps {
  title: string;
  description: string;
  entries: RankingCardEntry[];
  previewCount?: number;
  className?: string;
}

const RANK_CLASSES = [
  "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  "bg-slate-400/15 text-slate-600 dark:text-slate-300",
  "bg-orange-500/15 text-orange-700 dark:text-orange-300",
];

export function RankingCard({
  title,
  description,
  entries,
  previewCount = 5,
  className,
}: RankingCardProps) {
  const [expanded, setExpanded] = useState(false);

  const hasMore = entries.length > previewCount;
  const visibleEntries = expanded
    ? entries
    : entries.slice(0, previewCount);

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border bg-background",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2 p-4 pb-2">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="truncate text-sm font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        </div>

        {hasMore ? (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
          >
            {expanded ? "Ver menos" : "Ver todos"}
          </Button>
        ) : null}
      </div>

      <ul className="flex flex-1 flex-col gap-1 px-2">
        {visibleEntries.map((entry, index) => (
          <li
            key={entry.id}
            className="flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-muted/50"
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold tabular-nums",
                RANK_CLASSES[index] ??
                  "bg-muted text-muted-foreground",
              )}
            >
              {index + 1}
            </span>

            <EmployeeAvatar
              name={entry.name}
              initials={entry.initials}
              className="size-8"
            />

            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium">
                {entry.name}
              </span>

              {entry.subtitle ? (
                <span className="truncate text-xs text-muted-foreground">
                  {entry.subtitle}
                </span>
              ) : null}
            </div>

            <span className="shrink-0 text-sm font-semibold tabular-nums">
              {entry.value}
            </span>
          </li>
        ))}
      </ul>

      {hasMore ? (
        <div className="mt-2 border-t p-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
          >
            {expanded ? "Mostrar menos" : "Ver ranking completo"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}