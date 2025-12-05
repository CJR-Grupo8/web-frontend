"use client";

import "@/styles/components-css/filtros.css";
import { CATEGORY_FILTERS } from "@/data/categoryFilters";

export default function CategoryFilters({ category }: { category: string }) {
  const filtros = CATEGORY_FILTERS[category] || [];

  return (
    <div className="filtros-container">
      <h3 className="filtros-title">filtros</h3>

      {filtros.length === 0 && (
        <p className="filtros-empty">Nenhum filtro disponível.</p>
      )}

      {filtros.map((item) => (
        <label key={item} className="filtro-item">
          <input type="checkbox" />
          <span>{item}</span>
        </label>
      ))}
    </div>
  );
}
