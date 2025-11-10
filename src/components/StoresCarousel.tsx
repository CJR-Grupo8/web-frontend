"use client";

import { useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { STORES, type StoreCategory } from "@/data/stores";
import StoreCard from "./StoreCard";
import "@/styles/components-css/store-carousel.css";

const CATEGORIES: { value: StoreCategory; label: string; icon?: string }[] = [
  { value: "mercado", label: "Mercado", icon: "🛒" },
  { value: "farmacia", label: "Farmácia", icon: "💊" },
  { value: "beleza", label: "Beleza", icon: "💄" },
  { value: "moda", label: "Moda", icon: "👗" },
  { value: "eletronicos", label: "Eletrônicos", icon: "💻" },
  { value: "jogos", label: "Jogos", icon: "🎮" },
  { value: "brinquedos", label: "Brinquedos", icon: "🧸" },
  { value: "casa", label: "Casa", icon: "🏠" },
];

export default function StoresCarousel() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<StoreCategory[]>([]);
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });

  const filteredStores = useMemo(() => {
    if (selectedCategories.length === 0) return STORES;
    return STORES.filter((store) => selectedCategories.includes(store.category));
  }, [selectedCategories]);

  function toggleCategory(category: StoreCategory) {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }

  return (
    <section className="stores">
      <div className="stores-header">
        <h2 className="stores-title">Lojas</h2>

        <div className={`stores-filter ${isFilterOpen ? "is-open" : ""}`}>
          <button
            type="button"
            className="stores-filter-toggle"
            onClick={() => setIsFilterOpen((open) => !open)}
          >
            <span>filtros</span>
            <span className="stores-filter-chevron">
              {isFilterOpen ? "▲" : "▼"}
            </span>
          </button>

          {isFilterOpen && (
            <div className="stores-filter-panel">
              <div className="stores-filter-panel-header">
                <span>filtros</span>
                <button
                  type="button"
                  className="stores-filter-close"
                  onClick={() => setIsFilterOpen(false)}
                >
                  ✕
                </button>
              </div>

              <ul className="stores-filter-list">
                {CATEGORIES.map((cat) => {
                  const checked = selectedCategories.includes(cat.value);
                  return (
                    <li key={cat.value} className="stores-filter-item">
                      <button
                        type="button"
                        className={`stores-filter-chip ${checked ? "is-checked" : ""}`}
                        onClick={() => toggleCategory(cat.value)}
                      >
                        <span className="stores-filter-checkbox">
                          {checked && "✔"}
                        </span>
                        <span className="stores-filter-label">
                          {cat.label}{" "}
                          {cat.icon && (
                            <span className="stores-filter-icon">{cat.icon}</span>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* VIEWPORT embla */}
      <div className="stores-carousel__viewport" ref={emblaRef}>
        <div className="stores-carousel__container">
          {filteredStores.map((store) => (
            <div key={store.id} className="stores-carousel__slide">
              <StoreCard store={store} variant="carousel" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
