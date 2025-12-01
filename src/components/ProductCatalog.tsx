"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import "@/styles/components-css/product-catalog.css";
import type { ProductSummary } from "@/data/product";
import type { CategoryNavItem } from "@/data/categoryNav";
import { FiHome } from "react-icons/fi";

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
  categoryNavItems?: CategoryNavItem[];
  activeCategorySlug?: string;
  
  itemsPerPage?: number; 
  hideHeader?: boolean;  
};

export default function ProductCatalog({
  baseProducts,
  initialProducts,
  placeholder = "Buscar por nome, categoria...",
  title,
  categoryNavItems,
  activeCategorySlug,
  itemsPerPage = 15,
  hideHeader = false, 
}: ProductCatalogProps) {
  

  const sourceData = initialProducts || baseProducts || [];

  const isCompactMode = hideHeader || (!title && !categoryNavItems);

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(sourceData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFilteredProducts(sourceData);
    setCurrentPage(1);
  }, [initialProducts, baseProducts]); 

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  const visibleProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Função de rolagem suave para o topo do catálogo
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

  function handleSearch(term: string) {
    const trimmed = term.trim();

    if (!trimmed) {
      setFilteredProducts(sourceData);
      setCurrentPage(1);
      return;
    }

    const normalizedTerm = normalize(trimmed);

    const result = sourceData.filter((p: any) => {
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

    <div className={isCompactMode ? "catalog-root-compact" : "home-root"} id="catalog-anchor">
      
      {!isCompactMode && (
        <>
          <NavBar />
          <div className="catalog-header">
            <div className="catalog-header-left">
              <Link href="/" className="catalog-home-btn">
                <FiHome className="catalog-home-icon" />
                <span>Home</span>
              </Link>

              {title && <h1 className="catalog-title">{title}</h1>}

              {categoryNavItems && categoryNavItems.length > 0 && (
                <nav className="catalog-cats">
                  {categoryNavItems.map((item) => (
                    <Link
                      key={item.slug}
                      href={item.href}
                      className={
                        "catalog-cat-chip" +
                        (item.slug === activeCategorySlug ? " active" : "")
                      }
                    >
                      {item.icon && (
                        <span className="catalog-cat-icon">{item.icon}</span>
                      )}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              )}
            </div>

            <SearchBar placeholder={placeholder} onSearch={handleSearch} />
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