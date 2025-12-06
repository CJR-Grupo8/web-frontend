"use client";

import { useState, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import StoreCard from "@/components/StoreCard";
import StoreFilters from "@/components/StoreFilters";
import type { Store, StoreCategory } from "@/data/stores";

import "@/styles/components-css/stores-catalog.css";

type StoresCatalogProps = {
  stores: Store[];
  title?: string;
  itemsPerPage?: number;
};

export default function StoresCatalog({
  stores,
  title = "Lojas",
  itemsPerPage = 12,
}: StoresCatalogProps) {
  const [search, setSearch] = useState("");
  const [selectedCats, setSelectedCats] = useState<StoreCategory[]>([]);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // -------- FILTRO + BUSCA --------
  const filtered = useMemo(() => {
    let result = stores;

    if (selectedCats.length > 0) {
      result = result.filter((s) => selectedCats.includes(s.category));
    }

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((s) => s.name.toLowerCase().includes(term));
    }

    return result;
  }, [stores, search, selectedCats]);

  // -------- PAGINAÇÃO --------
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const visible = filtered.slice(start, start + itemsPerPage);

  return (
    <div className="stores-root" id="stores-anchor">
      
      {/* HEADER */}
      <div className="stores-header">
        <h1 className="stores-title">{title}</h1>

        <div className="stores-controls">

          <StoreFilters
            selected={selectedCats}
            onChange={(cats) => {
              setSelectedCats(cats);
              setPage(1);
            }}
            isOpen={filtersOpen}
            toggleOpen={() => setFiltersOpen((v) => !v)}
          />

          <SearchBar
            placeholder="Buscar loja..."
            value={search}
            onChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            onSearch={setSearch}
          />

        </div>
      </div>

      {/* GRID */}
      <section className="stores-grid">
        {visible.length > 0 ? (
          visible.map((store) => (
            <StoreCard key={store.id} store={store} variant="card" />
          ))
        ) : (
          <p className="no-results">Nenhuma loja encontrada.</p>
        )}
      </section>

      {/* PAGINAÇÃO */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => {
            setPage(p);
            document.getElementById("stores-anchor")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        />
      )}
    </div>
  );
}
