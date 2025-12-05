"use client";

import StoreCard from "./StoreCard";
import type { Store } from "@/data/stores";
import "@/styles/app-css/store-grid.css";

type Props = {
  stores: Store[];
};

export default function StoreGrid({ stores }: Props) {
  return (
    <div className="store-grid">
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} variant="grid" />
      ))}
    </div>
  );
}
