"use client";

import { TabNav } from "@/components/finance/tab-nav";
import type { ComparisonTab } from "@/types/finance";

const COMPARISON_TABS = [
  { value: "summary", label: "Resumen" },
  { value: "product", label: "Por producto" },
  { value: "category", label: "Por categoría" },
  { value: "ipv", label: "Detalles IPV" },
] as const satisfies readonly {
  value: ComparisonTab;
  label: string;
}[];

interface ComparisonTabsSectionProps {
  value: ComparisonTab;
  onChange: (value: ComparisonTab) => void;
}

export function ComparisonTabsSection({
  value,
  onChange,
}: ComparisonTabsSectionProps) {
  return (
    <section>
      <TabNav
        options={COMPARISON_TABS}
        value={value}
        onChange={onChange}
        label="Secciones de la comparación"
      />
    </section>
  );
}
