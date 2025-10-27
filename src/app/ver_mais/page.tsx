import React from "react";
import "../styles/ver_mais.css";

export default function HomePage(){
    return(
      <main className="home-root">
            <header className="home-header"> 
            <div className="logo">
                <img src="/images/logo.svg" alt="Logo Stock.io" className="logo-img"/>
            </div>
            <nav className="nav-links">
                <a href="/login">Login</a>
                <a href="/cadastro" className="cadastro-btn">Cadastre-se</a>
            </nav>
            </header>

            <section className="home-hero">
                <div className="hero-content">
                    <h2>Gerencie tudo com praticidade e estilo</h2>
                    <p>
                        Organize seu estoque, acompanhe os produtos e vizualize de forma intuitiva.
                    </p>
                    <a href="/cadastro" className="hero-button">Começar agora</a>
                </div>
                <div className="hero-image">
                    <img src="/images/garoto-celular.svg" alt="Personagem"/>
                </div>
            </section>

    <section className="home-produtos">
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
