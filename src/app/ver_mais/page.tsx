"use client";

import { useState } from "react";
import "@/styles/app-css/ver-mais.css";
import ProductCard, { Product } from "@/components/ProductCard";
import NavBar from "@/components/NavBar";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";

const products: Product[] = [
  { id: "1", name: "Brownie Meio A.", price: "R$4,70", image: "brownie-meio-amargo", seal: "cjr", availability: "DISPONÍVEL" },
  { id: "2", name: "Brownie Trad.", price: "R$3,80", image: "brownie-tradicional", seal: "cjr", availability: "INDISPONÍVEL" },
  { id: "3", name: "Nozes", price: "R$29,99", unit: "/kg", image: "nozes", seal: "dcarts-&-baskets", availability: "DISPONÍVEL" },
  { id: "4", name: "Banana", price: "R$3,99", unit: "/kg", image: "banana", seal: "moumer", availability: "DISPONÍVEL" },
  { id: "5", name: "Limão Siciliano", price: "R$17,99", unit: "/kg", image: "limao-siciliano", seal: "moumer", availability: "INDISPONÍVEL" },
  { id: "6", name: "Leite", price: "R$4,99", image: "leite-integral", seal: "dcarts-&-baskets", availability: "DISPONÍVEL" },
  { id: "7", name: "Manteiga", price: "R$23,99", image: "manteiga", seal: "dcarts-&-baskets", availability: "DISPONÍVEL" },
  { id: "8", name: "Leite Cond.", price: "R$7,99", image: "leite-condensado", seal: "dcarts-&-baskets", availability: "DISPONÍVEL" },
  { id: "9", name: "Coca Cola", price: "R$3,99", image: "coca-zero", seal: "dcarts-&-baskets", availability: "INDISPONÍVEL" },
  { id: "10", name: "Farinha de T.", price: "R$6,99", image: "farinha-de-trigo", seal: "dcarts-&-baskets", availability: "DISPONÍVEL" },
  { id: "11", name: "Grand Theft Auto VI", price: "499,99", image: "nome", seal: "magic-chicken", availability: "INDISPONÍVEL" },
  { id: "12", name: "Redbull", price: "R$5,60", image: "redbull", seal: "cjr", availability: "DISPONÍVEL" },
  { id: "13", name: "Batom Liq.", price: "R$149,99", image: "batom-liq", seal: "rare-beauty", availability: "DISPONÍVEL" },
  { id: "14", name: "Nike Dunk Ben&Jerry's", price: "R$10.000,00", image: "nome", seal: "sneaker-store", availability: "DISPONÍVEL" },
  { id: "15", name: "Mouse Logitech G403", price: "R$399,99", image: "nome", seal: "nako", availability: "INDISPONÍVEL" },
];

export default function VerMaisPage() {
  const [currentPage, setCurrentPage] = useState(1);

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
        {/* usa o mesmo grid da home */}
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
