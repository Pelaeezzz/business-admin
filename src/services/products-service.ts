import { getProductStockStatus } from "@/constants/product-stock-status";
import { productCatalog } from "@/mocks/products";
import type { CurrencyCode } from "@/types/finance";
import type { PaginatedResponse, Pagination } from "@/types/pagination";
import type {
  CreateProductDto,
  Product,
  ProductsFilters,
  UpdateProductDto,
} from "@/types/product";

/** Imagen por defecto mientras no haya subida de archivos. */
const DEFAULT_PRODUCT_IMAGE = "/file.svg";

/** Moneda del catálogo. */
export const productCurrency: CurrencyCode = productCatalog.currency;

/** Opciones del select de categorías. */
export interface ProductCategoryOption {
  value: string;
  label: string;
}

/**
 * Datos en memoria a partir de `src/mocks/products.ts`: los cambios se ven al
 * instante pero se reinician al recargar. Cuando exista backend, este servicio
 * pasa a llamar a la API igual que el resto de módulos.
 */
let products: Product[] = productCatalog.products.map((product) => ({ ...product }));

/** Normaliza texto para buscar sin distinguir mayúsculas ni acentos. */
function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function matchesFilters(product: Product, filters: ProductsFilters) {
  const term = filters.search?.trim();

  if (term) {
    const normalizedTerm = normalize(term);
    const haystack = [product.name, product.id, product.category, product.unit];

    if (!haystack.some((value) => normalize(value).includes(normalizedTerm))) {
      return false;
    }
  }

  if (filters.category && product.category !== filters.category) {
    return false;
  }

  if (filters.status && getProductStockStatus(product) !== filters.status) {
    return false;
  }

  return true;
}

export const productsService = {
  async getPage(
    filters: ProductsFilters,
    pagination: Pagination,
  ): Promise<PaginatedResponse<Product>> {
    const rows = products.filter((product) => matchesFilters(product, filters));
    const total = rows.length;
    const totalPages = Math.max(1, Math.ceil(total / pagination.limit));
    const page = Math.min(Math.max(1, pagination.page), totalPages);
    const start = (page - 1) * pagination.limit;

    return {
      rows: rows.slice(start, start + pagination.limit),
      meta: { page, limit: pagination.limit, total, totalPages },
    };
  },

  async getById(id: string): Promise<Product> {
    const product = products.find((item) => item.id === id);

    if (!product) {
      throw new Error(`No se encontró el producto ${id}.`);
    }

    return product;
  },

  async create(data: CreateProductDto): Promise<Product> {
    if (products.some((product) => product.id === data.id)) {
      throw new Error(`Ya existe un producto con el código ${data.id}.`);
    }

    const product: Product = { ...data, image: DEFAULT_PRODUCT_IMAGE };
    products = [product, ...products];

    return product;
  },

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new Error(`No se encontró el producto ${id}.`);
    }

    const updated: Product = { ...products[index], ...data };
    products = products.map((product, position) => (position === index ? updated : product));

    return updated;
  },

  async remove(id: string): Promise<void> {
    products = products.filter((product) => product.id !== id);
  },

  /** Categorías existentes, para el filtro y el formulario. */
  getCategoryOptions(): ProductCategoryOption[] {
    const categories = [...new Set(products.map((product) => product.category))].sort((a, b) =>
      a.localeCompare(b, "es"),
    );

    return categories.map((category) => ({ value: category, label: category }));
  },
};
