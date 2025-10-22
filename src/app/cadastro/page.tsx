import React from "react";
import Link from "next/link";
import "../styles/cadastro.css";

const RegisterPage: React.FC = () => {
  return (
    <main className="signup-root">
      <section className="signup-left">
        <form className="signup-panel" aria-describedby="signup-desc">
          <header className="signup-header">
            <h1 id="signup-title" className="signup-title">CRIE SUA CONTA</h1>
          </header>

          <label htmlFor="name" className="sr-only">Nome Completo</label>
          <input id="name" type="text" placeholder="Nome Completo" className="signup-input" required />

          <label htmlFor="username" className="sr-only">Username</label>
          <input id="username" type="text" placeholder="Username" className="signup-input" required />

          <label htmlFor="email" className="sr-only">Email</label>
          <input id="email" type="email" placeholder="Email" className="signup-input" required />

          <label htmlFor="password" className="sr-only">Senha</label>
          <input id="password" type="password" placeholder="Senha" className="signup-input" required />

          <label htmlFor="confirm" className="sr-only">Confirmar Senha</label>
          <input id="confirm" type="password" placeholder="Confirmar Senha" className="signup-input" required />

          <button type="submit" className="signup-button">CRIAR CONTA</button>

          <p className="signup-login">
            Já possui uma conta? <Link href="/login" className="signup-link-cta">Login</Link>
          </p>
        </form>
      </section>

      <section className="signup-right">
        <div className="signup-figure">
          <img src="/images/logo.svg" alt="Stock.io" className="signup-logo" />
          <img src="/images/garota-kawaii.svg" alt="Ilustração personagem" className="signup-image" />
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
