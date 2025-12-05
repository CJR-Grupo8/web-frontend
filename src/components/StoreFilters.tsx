"use client";

import { CATEGORIES } from "@/data/store-categories";
import type { StoreCategory } from "@/data/stores";

type Props = {
  selected: StoreCategory[];
  onChange: (next: StoreCategory[]) => void;
  isOpen: boolean;
  toggleOpen: () => void;
};

export default function StoreFilters({
  selected,
  onChange,
  isOpen,
  toggleOpen,
}: Props) {
  function toggleCategory(category: StoreCategory) {
    if (selected.includes(category)) {
      onChange(selected.filter((c) => c !== category));
    } else {
      onChange([...selected, category]);
    }
  }

  return (
    <div className={`stores-filter ${isOpen ? "is-open" : ""}`}>
      <button type="button" className="stores-filter-toggle" onClick={toggleOpen}>
        <span>filtros</span>
        <span className="stores-filter-chevron">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="stores-filter-panel">
          <div className="stores-filter-panel-header">
            <span>filtros</span>
            <button type="button" className="stores-filter-close" onClick={toggleOpen}>
              ✕
            </button>
          </div>

          <ul className="stores-filter-list">
            {CATEGORIES.map((cat) => {
              const checked = selected.includes(cat.value);

              return (
                <li key={cat.value} className="stores-filter-item">
                  <button
                    type="button"
                    className={`stores-filter-chip ${checked ? "is-checked" : ""}`}
                    onClick={() => toggleCategory(cat.value)}
                  >
                    <span className="stores-filter-checkbox">{checked ? "✔" : ""}</span>

                    <span className="stores-filter-label">
                      {cat.label}
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
  );
}
