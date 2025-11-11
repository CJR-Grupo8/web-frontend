"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import "@/styles/app-css/ver-mais.css";
import type { ProductSummary } from "@/data/product";

function normalize(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

type ProductCatalogProps = {
  baseProducts: ProductSummary[];
  placeholder?: string;
};

export default function ProductCatalog({
  baseProducts,
  placeholder = "Buscar por nome, categoria...",
}: ProductCatalogProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(baseProducts);
  const [loading, setLoading] = useState(false); // já deixa pronto pra futura API

  const productsPerPage = 15;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const visibleProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  function handleSearch(term: string) {
    const trimmed = term.trim();

    if (!trimmed) {
      setFilteredProducts(baseProducts);
      setCurrentPage(1);
      return;
    }

    const normalizedTerm = normalize(trimmed);

    const result = baseProducts.filter((p: any) => {
      const name = normalize(p.name);
      const categoryStr = normalize(p.category ?? "");
      const seal = normalize(p.seal ?? "");

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
        <SearchBar placeholder={placeholder} onSearch={handleSearch} />

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
