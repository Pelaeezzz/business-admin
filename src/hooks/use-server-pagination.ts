"use client";

import { useSearchParams } from "next/navigation";
import type { Pagination } from "@/types/pagination";
import useUrlFilters from "./use-url-filters";

interface Props {
  defaultPagination: Pagination;
}

function parsePositiveInt(value: string | null, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export default function useServerPagination({ defaultPagination }: Props) {
  const searchParams = useSearchParams();
  const { updateFiltersInUrl } = useUrlFilters();

  const pagination: Pagination = {
    page: parsePositiveInt(searchParams.get("page"), defaultPagination.page),
    limit: parsePositiveInt(searchParams.get("limit"), defaultPagination.limit),
  };

  const serverHandleChangePage = (page: number) => {
    updateFiltersInUrl({ page: page === defaultPagination.page ? undefined : page });
  };

  const serverHandlePageSizeChange = (limit: number) => {
    updateFiltersInUrl({
      limit: limit === defaultPagination.limit ? undefined : limit,
      page: undefined,
    });
  };

  return { pagination, serverHandleChangePage, serverHandlePageSizeChange };
}
