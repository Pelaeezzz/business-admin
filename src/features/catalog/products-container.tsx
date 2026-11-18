import { productCatalog } from "@/mocks/products";

import { ProductsTableSection } from "./sections/products-table-section";

export default function ProductsContainer() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Productos</h1>
        <p className="text-sm text-muted-foreground">
          Catálogo de productos, precios de venta y existencias.
        </p>
      </header>

      <ProductsTableSection
        products={productCatalog.products}
        currency={productCatalog.currency}
      />
    </div>
  );
}
