import type { Pagination } from "@/types/pagination";

/** Paginación inicial de los listados */
export const DEFAULT_PAGINATION: Pagination = { page: 1, limit: 10 };

/** Para selects que necesitan todos los registros, no una página de la tabla */
export const SELECT_OPTIONS_PAGINATION: Pagination = { page: 1, limit: 100 };
