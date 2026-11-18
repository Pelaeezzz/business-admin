"use client";

import { useState } from "react";

import { comparisonData } from "@/mocks/finance";
import type { ComparisonTab } from "@/types/finance";

import { ComparisonCategoriesSection } from "./sections/comparison-categories-section";
import { ComparisonCostChartSection } from "./sections/comparison-cost-chart-section";
import { ComparisonHeaderSection } from "./sections/comparison-header-section";
import { ComparisonIpvSection } from "./sections/comparison-ipv-section";
import { ComparisonProductsSection } from "./sections/comparison-products-section";
import { ComparisonSummarySection } from "./sections/comparison-summary-section";
import { ComparisonTabsSection } from "./sections/comparison-tabs-section";

export default function ComparisonContainer() {
  const [tab, setTab] = useState<ComparisonTab>("summary");
  const { summary, series, products, categories, ipvDetails } = comparisonData;

  return (
    <div className="flex flex-col gap-6">
      <ComparisonHeaderSection onViewCategories={() => setTab("category")} />

      <ComparisonTabsSection value={tab} onChange={setTab} />

      <ComparisonSummarySection summary={summary} />

      {tab === "summary" ? (
        <div className="flex flex-col gap-6">
          <ComparisonCostChartSection
            series={series}
            currency={summary.currency}
          />

          <ComparisonProductsSection
            products={products}
            currency={summary.currency}
            onViewAll={() => setTab("product")}
          />
        </div>
      ) : null}

      {tab === "product" ? (
        <ComparisonProductsSection
          products={products}
          currency={summary.currency}
          variant="full"
        />
      ) : null}

      {tab === "category" ? (
        <ComparisonCategoriesSection
          categories={categories}
          currency={summary.currency}
        />
      ) : null}

      {tab === "ipv" ? (
        <ComparisonIpvSection
          details={ipvDetails}
          currency={summary.currency}
        />
      ) : null}
    </div>
  );
}
