import React from "react";
import{
    FaShoppingCart, 
  FaClinicMedical, 
  FaSmile, 
  FaTshirt, 
  FaLaptop, 
  FaGamepad, 
  FaRobot,
  FaEllipsisH, 
  FaStore
} from "react-icons/fa";
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
          <a href ="/ver_mais" className="store-icon" title="ver mais produtos"><FaStore /> </a>
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
          <a href="/ver_mais" className="hero-button">Ver mais produtos</a>
        </div>
        <div className="hero-image">
          <img src="/images/id-visual/garoto-celular.svg" alt="Personagem" />
        </div>
      </section>

      {/* CATEGORIAS*/}
       <section className="dashboard-categorias">
        <h3>Categorias</h3>
        <div className="categorias-grid">
          <button className="categoria-btn">
            <FaShoppingCart className="categoria-icon" />
            Mercado
          </button>
          <button className="categoria-btn">
            <FaClinicMedical className="categoria-icon" />
            Farmácia
          </button>
          <button className="categoria-btn">
            <FaSmile className="categoria-icon" />
            Beleza
          </button>
          <button className="categoria-btn">
            <FaTshirt className="categoria-icon" />
            Moda
          </button>
          <button className="categoria-btn">
            <FaLaptop className="categoria-icon" />
            Eletrônicos
          </button>
          <button className="categoria-btn">
            <FaGamepad className="categoria-icon" />
            Jogos
          </button>
          <button className="categoria-btn">
            <FaRobot className="categoria-icon" />
            Brinquedos
          </button>
          <button className="categoria-btn">
            <FaEllipsisH className="categoria-icon" />
            Outros
          </button>
        </div>
      </section>


      {/* produtos em destaque*/}
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
