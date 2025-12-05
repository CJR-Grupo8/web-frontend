"use client";

import { useState, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import StoreFilters from "@/components/StoreFilters";
import StoreGrid from "@/components/StoreGrid";
import Pagination from "@/components/Pagination";
import Hero from "@/components/Hero";

import { STORES, type StoreCategory } from "@/data/stores";

export default function LojasPage() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<StoreCategory[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = STORES;

    if (search.trim() !== "") {
      result = result.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((s) => selectedCategories.includes(s.category));
    }

    return result;
  }, [search, selectedCategories]);

  return (
    <div>
      <Hero
              lines={["Do CAOS à organização", "em alguns cliques."]}
              imageSrc="/images/id-visual/garoto-celular.svg"
              imageAlt="Personagem com celular"
            />

      <div className="stores-page-header">
        <SearchBar value={search} onChange={setSearch} onSearch={setSearch} />

        <StoreFilters
          selected={selectedCategories}
          onChange={setSelectedCategories}
          isOpen={filterOpen}
          toggleOpen={() => setFilterOpen((o) => !o)}
        />
      </div>

      <h2 className="stores-title">Lojas</h2>

      <StoreGrid stores={filtered} />

      {/* Pagination opcional */}
    </div>
  );
}
