"use client";

import { TagsIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FinanceHeader } from "../../sections/finance-header";

const COMPARISON_DATE = new Date(2024, 4, 24);

interface ComparisonHeaderSectionProps {
  onViewCategories: () => void;
}

export function ComparisonHeaderSection({
  onViewCategories,
}: ComparisonHeaderSectionProps) {
  return (
    <FinanceHeader
      title="Comparación por ventas"
      description="Analiza tus costos según las ventas del día."
      initialDate={COMPARISON_DATE}
      actions={
        <Button type="button" variant="outline" onClick={onViewCategories}>
          <TagsIcon />
          Ver por categorías
        </Button>
      }
    />
  );
}
