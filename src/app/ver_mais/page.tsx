import React from "react";
import "../styles/ver_mais.css";

export default function HomePage(){
    return(
      <main className="home-root">
            <header className="home-header"> 
            <a href="/home">
            <div className="logo">
                <img src="/images/logo_clara.svg" alt="Logo Stock.io" className="logo-img"/>
            </div>
            </a>
            <nav className="nav-links">
                <a href="/login" className="login-btn">Login</a>
                <a href="/cadastro" className="cadastro-btn">Cadastre-se</a>
            </nav>
            </header>
       </main>
    );
}
