"use client";

import { XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
  filterName: string;
  filterValue: string;
  handleDeleteFilter: () => void;
}

export default function FilterBadge({ filterName, filterValue, handleDeleteFilter }: Props) {
  return (
    <Badge variant="secondary" className="gap-1 pr-1">
      {filterName}: {filterValue}
      <button
        type="button"
        onClick={handleDeleteFilter}
        aria-label={`Quitar filtro ${filterName}`}
        className="cursor-pointer rounded-full p-0.5 hover:bg-destructive/20 hover:text-destructive"
      >
        <XIcon className="size-3" />
      </button>
    </Badge>
  );
}
