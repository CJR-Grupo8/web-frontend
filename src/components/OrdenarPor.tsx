"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "@/styles/components-css/ordenar-por.css";

export type SortMode = "padrao" | "preco" | "avaliacao" | "recente";

type OrdenarPorProps = {
  value: SortMode;
  onChange: (mode: SortMode) => void;
};

export default function OrdenarPor({ value, onChange }: OrdenarPorProps) {
  const [open, setOpen] = useState(false);

  function handleSelect(mode: SortMode) {
    onChange(mode);
    setOpen(false);
  }

  const currentLabel = (() => {
    switch (value) {
      case "preco":
        return "Preço";
      case "avaliacao":
        return "Avaliação";
      case "recente":
        return "Mais recente";
      default:
        return "Padrão";
    }
  })();

  return (
    <div className="sort-wrapper">
      <button
        type="button"
        className="sort-pill"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="sort-pill-label">
          ordenar por{" "}
          <span className="sort-pill-current">• {currentLabel}</span>
        </span>
        {open ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {open && (
        <div className="sort-dropdown">
          <button
            type="button"
            className={`sort-option ${value === "padrao" ? "is-active" : ""}`}
            onClick={() => handleSelect("padrao")}
          >
            Padrão
          </button>
          <button
            type="button"
            className={`sort-option ${value === "preco" ? "is-active" : ""}`}
            onClick={() => handleSelect("preco")}
          >
            Preço
          </button>
          <button
            type="button"
            className={`sort-option ${
              value === "avaliacao" ? "is-active" : ""
            }`}
            onClick={() => handleSelect("avaliacao")}
          >
            Avaliação
          </button>
          <button
            type="button"
            className={`sort-option ${value === "recente" ? "is-active" : ""}`}
            onClick={() => handleSelect("recente")}
          >
            Mais recente
          </button>
        </div>
      )}
    </div>
  );
}
