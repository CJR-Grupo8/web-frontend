"use client";

import { use } from "react";
import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import ProductCatalog from "@/components/ProductCatalog";
import CategoryCarousel from "@/components/CategoryCarousel";
import StoresCarousel from "@/components/StoresCarousel";

import {
  SLUG_TO_CATEGORY,
  allProductSummaries,
  type ProductSummary,
} from "@/data/product";

import { STORES } from "@/data/stores";
import { CATEGORY_HERO } from "@/data/category-hero";

type Props = {
  params: Promise<{ category: string }>;
};

export default function VerMaisCategoryPage({ params }: Props) {
  const { category } = use(params);

  const slug = category.toLowerCase();
  const categoria = SLUG_TO_CATEGORY[slug];

  // hero dinâmico
  const heroInfo = CATEGORY_HERO[slug] ?? CATEGORY_HERO["outros"];

  // produtos da categoria
  const produtosDaCategoria = allProductSummaries.filter(
    (p) => p.category === categoria
  );

  // -----------------------------
  // 🔥 1. MAIS AVALIADOS
  // -----------------------------
  const maisAvaliados = [...produtosDaCategoria]
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 10);

  // -----------------------------
  // 🔥 2. MAIS RECENTES
  // -----------------------------
  const maisRecentes = [...produtosDaCategoria]
    .sort((a, b) => {
      const da = new Date(a.createdAt ?? 0).getTime();
      const db = new Date(b.createdAt ?? 0).getTime();
      return db - da;
    })
    .slice(0, 10);

  // -----------------------------
  // 🔥 3. LOJAS DA CATEGORIA
  // -----------------------------
  const lojasDaCategoria = STORES.filter(
    (store) => store.category.toLowerCase() === slug
  );

  return (
    <>
      {/* HERO */}
      <Hero
        lines={heroInfo.lines}
        imageSrc={heroInfo.imageSrc}
        imageAlt={heroInfo.imageAlt}
      />

      {/* CATEGORIAS */}
      <CategoryCarousel />

      {/* 🔥 CARROSSEL MAIS AVALIADOS */}
      {maisAvaliados.length > 0 && (
        <ProductCarousel
          title="Mais avaliados"
          category={categoria}
          items={maisAvaliados}
          hrefBase="/produtos-fake"
        />
      )}

      {/* 🔥 CARROSSEL MAIS RECENTES */}
      {maisRecentes.length > 0 && (
        <ProductCarousel
          title="Mais recentes"
          category={categoria}
          items={maisRecentes}
          hrefBase="/produtos-fake"
        />
      )}

      {/* 🔥 CATÁLOGO COMPLETO */}
      <ProductCatalog
        baseProducts={produtosDaCategoria}
        title={`Produtos de ${categoria}`}
        placeholder={`Buscar em ${categoria}...`}
        hrefBase="/produtos-fake"
      />

      {/* 🔥 CARROSSEL DE LOJAS RELACIONADAS */}
      {lojasDaCategoria.length > 0 && (
        <StoresCarousel
          storesOverride={lojasDaCategoria}
          hrefBase="/lojas-fake"
          moreHref="/ver_mais_lojas"
        />
      )}
    </>
  );
}
