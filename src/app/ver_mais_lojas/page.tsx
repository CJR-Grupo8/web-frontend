"use client";

import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import StoresCatalog from "@/components/StoresCatalog";
import { STORES } from "@/data/stores";

import "@/styles/app-css/home.css"; // importa padrão visual da home
import "@/styles/components-css/stores-catalog.css";

export default function VerMaisLojasPage() {
  return (
    <main className="home-root">
      {/* NAVBAR */}
      <NavBar />

      {/* HERO NO MESMO PADRÃO DA HOME */}
      <Hero
        lines={["Todas as lojas", "em um só lugar."]}
        imageSrc="/images/id-visual/garoto-celular.svg"
        imageAlt="Personagem com celular"
      />

      {/* CATÁLOGO DE LOJAS */}
      <section style={{ padding: "3rem 8%" }}>
        <StoresCatalog stores={STORES} title="Lojas" hrefBase="/lojas-fake" />
      </section>
    </main>
  );
}
