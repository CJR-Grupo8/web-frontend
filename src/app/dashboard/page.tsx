import React from "react";
import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <main className="dashboard-root">
      {/* Header */}
      <header className="dashboard-header">
        <div className="logo">
          <img src="/images/id-visual/logo_escura.svg" alt="Logo Stock.io" className="logo-img" />
        </div>
        <nav className="nav-links">
          <a href="/perfil">Perfil</a>
          <a href="/logout" className="logout-btn">Sair</a>
        </nav>
      </header>

      {/* Hero section */}
      <section className="dashboard-hero">
        <div className="hero-content">
          <h2>Gerencie tudo com praticidade e estilo</h2>
          <p>
            Organize seu estoque, acompanhe os produtos e visualize de forma intuitiva.
          </p>
          <a href="/produtos" className="hero-button">Ver mais produtos</a>
        </div>
        <div className="hero-image">
          <img src="/images/id-visual/garoto-celular.svg" alt="Personagem" />
        </div>
      </section>

      {/* categorias*/}
      <section className="dashboard-destaques">
        <h3>Produtos em destaque</h3>
        <div className="produto-grid">
          <div className="produto-card">Produto 1</div>
          <div className="produto-card">Produto 2</div>
          <div className="produto-card">Produto 3</div>
          <div className="produto-card">Produto 4</div>
        </div>
      </section>
    </main>
  );
}
