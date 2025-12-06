// src/components/Hero.tsx
"use client";

import React from "react";

type HeroProps = {
  lines: string[];
  imageSrc: string;
  imageAlt?: string;
  background?: string; // ← NOVO
  className?: string;
};

export default function Hero({
  lines,
  imageSrc,
  imageAlt = "Personagem",
  background = "#000",            // ← fundo padrão igual ao antigo
  className = "",
}: HeroProps) {
  return (
    <section
      className={`home-hero ${className}`}
      style={{ background }}      // ← agora aceita tema dinâmico, mas não quebra o CSS
    >
      <div className="hero-content">
        {lines.map((text, index) => (
          <h2 key={index}>{text}</h2>
        ))}
      </div>

      <div className="hero-image">
        <img src={imageSrc} alt={imageAlt} />
      </div>
    </section>
  );
}
