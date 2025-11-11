"use client";

import { useState } from "react";
import "@/styles/app-css/ver-mais.css";
import ProductCard from "@/components/ProductCard";
import NavBar from "@/components/NavBar";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { allProductSummaries } from "@/data/product";

export default function VerMaisPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const products = allProductSummaries;
  const productsPerPage = 15;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const visibleProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="home-root">
      <NavBar />

      <main>
        <SearchBar />

        <section className="catalog">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
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
