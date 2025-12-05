"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import OrdenarPor, { SortMode } from "@/components/OrdenarPor";

import "@/styles/components-css/product-catalog.css";

import type { ProductSummary } from "@/data/product";

function normalize(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

type ProductCatalogProps = {
  baseProducts?: ProductSummary[];
  initialProducts?: ProductSummary[];
  placeholder?: string;
  title?: string;
  itemsPerPage?: number;
  hideHeader?: boolean;
};

export default function ProductCatalog({
  baseProducts,
  initialProducts,
  placeholder = "Buscar por nome, categoria...",
  title,
  itemsPerPage = 15,
  hideHeader = false,
}: ProductCatalogProps) {
  const sourceData = initialProducts || baseProducts || [];

  const isCompactMode = hideHeader || !title;

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<ProductSummary[]>(sourceData);
  const [loading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("padrao");

  useEffect(() => {
    let result = [...sourceData];

    const trimmed = searchTerm.trim();
    if (trimmed) {
      const normalizedTerm = normalize(trimmed);

      result = result.filter((p: any) => {
        const name = normalize(p.name);
        const categoryStr = normalize(p.category ?? "");
        const seal = normalize(p.seal ?? "");

        return (
          name.includes(normalizedTerm) ||
          categoryStr.includes(normalizedTerm) ||
          seal.includes(normalizedTerm)
        );
      });
    }

    result = sortProducts(result, sortMode);

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [sourceData, searchTerm, sortMode]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  function scrollToTop() {
    const catalogTop = document.getElementById("catalog-anchor");
    if (catalogTop) {
      catalogTop.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
    scrollToTop();
  }

  return (
    <div
      className={isCompactMode ? "catalog-root-compact" : "catalog-root"}
      id="catalog-anchor"
    >
      {!isCompactMode && (
        <>
          {/* 🔹 Header com SearchBar + OrdenarPor */}
          <div className="catalog-header">

            <div className="catalog-header-row">
              <SearchBar
                placeholder={placeholder}
                value={searchTerm}
                onChange={setSearchTerm}
                onSearch={setSearchTerm}
              />

              <OrdenarPor value={sortMode} onChange={setSortMode} />
            </div>

            <h1 className="catalog-title">{title}</h1>
          </div>
        </>
      )}

      <main style={isCompactMode ? { padding: 0 } : {}}>
        {loading && <p style={{ textAlign: "center" }}>Carregando...</p>}

        <section className="catalog">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "2rem", width: "100%" }}>
              Nenhum produto encontrado.
            </p>
          )}
        </section>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
}

/* ------------------------------------------
   🔹 Função de Ordenação
------------------------------------------- */
function sortProducts(list: ProductSummary[], mode: SortMode): ProductSummary[] {
  const arr = [...list];

  if (mode === "preco") {
    arr.sort((a, b) => ((a as any).price ?? 0) - ((b as any).price ?? 0));
  } else if (mode === "avaliacao") {
    arr.sort((a, b) => ((b as any).rating ?? 0) - ((a as any).rating ?? 0));
  } else if (mode === "recente") {
    arr.sort((a, b) => {
      const da = new Date((a as any).createdAt ?? 0).getTime();
      const db = new Date((b as any).createdAt ?? 0).getTime();
      return db - da;
    });
  }

  return arr;
}
