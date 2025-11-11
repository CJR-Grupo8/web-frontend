"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import "@/styles/components-css/product-catalog.css";
import type { ProductSummary } from "@/data/product";

type ProductCatalogProps = {
  baseProducts: ProductSummary[];
  placeholder?: string;
  title?: string;
};

export default function ProductCatalog({
  baseProducts,
  placeholder = "Buscar por nome, categoria...",
  title,
}: ProductCatalogProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(baseProducts);
  const [loading, setLoading] = useState(false);

  const productsPerPage = 15;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const visibleProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  function normalize(str: string) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function handleSearch(term: string) {
    const trimmed = term.trim();

    if (!trimmed) {
      setFilteredProducts(baseProducts);
      setCurrentPage(1);
      return;
    }

    const normalizedTerm = term
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const result = baseProducts.filter((p: any) => {
      const name = p.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const categoryStr = (p.category ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      const seal = (p.seal ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      return (
        name.includes(normalizedTerm) ||
        categoryStr.includes(normalizedTerm) ||
        seal.includes(normalizedTerm)
      );
    });

    setFilteredProducts(result);
    setCurrentPage(1);
  }

  return (
    <div className="home-root">
      <NavBar />
      <main>
        <div className="catalog-header">
          {title && <h1 className="catalog-title">{title}</h1>}
          <SearchBar placeholder={placeholder} onSearch={handleSearch} />
        </div>

        {loading && <p style={{ textAlign: "center" }}>Carregando...</p>}

        <section className="catalog">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "2rem" }}>
              Nenhum produto encontrado.
            </p>
          )}
        </section>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>

    </div>
  );
}
