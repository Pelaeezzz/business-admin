"use client";

import { DownloadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { exportToCsv } from "@/lib/csv";

type CsvValue = string | number | boolean | null | undefined;

interface ComparisonExportButtonProps {
  filename: string;
  rows: Record<string, CsvValue>[];
  label?: string;
}

export function ComparisonExportButton({
  filename,
  rows,
  label = "Exportar",
}: ComparisonExportButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => exportToCsv(filename, rows)}
    >
      <DownloadIcon />
      {label}
    </Button>
  );
}
