"use client";

import { useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import StoreCard from "./StoreCard";
import StoreFilters from "./StoreFilters";
import { STORES, type Store, type StoreCategory } from "@/data/stores";

type StoresCarouselProps = {
  storesOverride?: Store[];
  hrefBase?: string;
  moreHref?: string;
};

export default function StoresCarousel({
  storesOverride,
  hrefBase = "/lojas",
  moreHref,
}: StoresCarouselProps) {
  const stores = storesOverride ?? STORES;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<StoreCategory[]>([]);

  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });

  // FILTRAR usando APENAS store.category (pois seu data não tem "categories")
  const filteredStores = useMemo(() => {
    if (selectedCategories.length === 0) return stores;
    return stores.filter((s) => selectedCategories.includes(s.category));
  }, [stores, selectedCategories]);

  return (
    <section className="stores">
      <div className="stores-header">
        <h2 className="stores-title">Lojas</h2>

        <div className="stores-header-actions">
          <StoreFilters
            selected={selectedCategories}
            onChange={setSelectedCategories}
            isOpen={isFilterOpen}
            toggleOpen={() => setIsFilterOpen((v) => !v)}
          />

          <Link href={moreHref ?? "/lojas"} className="home-block__action">
            ver mais
          </Link>
        </div>
      </div>

      <div className="stores-carousel__viewport" ref={emblaRef}>
        <div className="stores-carousel__container">
          {filteredStores.map((store) => (
            <div key={store.id} className="stores-carousel__slide">
              <StoreCard store={store} variant="carousel" hrefBase={hrefBase} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
