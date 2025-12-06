"use client";

import { FiSearch } from "react-icons/fi";
import "@/styles/components-css/search-bar.css";

type SearchBarProps = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: (term: string) => void;
};

export default function SearchBar({
  placeholder = "Procurar por...",
  value,
  onChange,
  onSearch,
}: SearchBarProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch?.(value.trim());
    }
  }

  return (
    <section className="search-section">
      <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
        <input
          className="search-bar__input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <button
          type="button"
          className="search-bar__icon-btn"
          onClick={() => onSearch?.(value.trim())}
        >
          <FiSearch className="search-bar__icon" />
        </button>
      </form>
    </section>
  );
}
