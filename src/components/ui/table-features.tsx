import {
  tableFeatures,
  rowPaginationFeature,
  rowSelectionFeature,
  columnVisibilityFeature,
  createPaginatedRowModel,
} from "@tanstack/react-table";

export const tableFeaturesConfig = tableFeatures({
  rowPaginationFeature,
  rowSelectionFeature,
  columnVisibilityFeature,
  paginatedRowModel: createPaginatedRowModel(),
});
export type TableFeaturesConfig = typeof tableFeaturesConfig;
