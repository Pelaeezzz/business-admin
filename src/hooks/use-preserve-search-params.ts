"use client";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function usePreserveSearchParams() {
  const searchParams = useSearchParams();

  return useCallback(
    (path: string) => {
      const query = searchParams.toString();
      return query ? `${path}?${query}` : path;
    },
    [searchParams],
  );
}
