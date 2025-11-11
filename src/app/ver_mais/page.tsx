"use client";

import ProductCatalog from "@/components/ProductCatalog";
import { allProductSummaries } from "@/data/product";

export default function VerMaisPage() {
  return (
    <ProductCatalog
      baseProducts={allProductSummaries}
      placeholder="Buscar por nome, categoria..."
    />
  );
}
