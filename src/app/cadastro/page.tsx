import React from "react";
import "../styles/cadastro.css";

const RegisterPage: React.FC = () => {
  return (
    <main className="signup-root">
      <section className="signup-card" aria-labelledby="signup-title">
        <form className="signup-form" aria-describedby="signup-desc">
          <header className="signup-header">
            <h1 id="signup-title" className="signup-title">CRIE SUA CONTA</h1>
          </header>

          <label htmlFor="name" className="signup-label">Nome Completo</label>
          <input id="name" type="text" placeholder="Nome Completo" className="signup-input" required />

          <label htmlFor="username" className="signup-label">Username</label>
          <input id="username" type="text" placeholder="Username" className="signup-input" required />

          <label htmlFor="email" className="signup-label">Email</label>
          <input id="email" type="email" placeholder="Email" className="signup-input" required />

          <label htmlFor="password" className="signup-label">Senha</label>
          <input id="password" type="password" placeholder="Senha" className="signup-input" required />

          <label htmlFor="confirm" className="signup-label">Confirmar Senha</label>
          <input id="confirm" type="password" placeholder="Confirmar Senha" className="signup-input" required />

          <button type="submit" className="signup-button">CRIAR CONTA</button>

          <p className="signup-login">
            Já possui uma conta? <a href="/login" className="signup-link-cta">Login</a>
          </p>
        </form>
      </section>

      <section className="signup-illustration">
        <img src="/images/logo.svg" alt="Stock.io" className="signup-logo" />
        <img src="/images/garota-kawaii.svg" alt="Ilustração personagem" className="signup-image" />
      </section>
    </main>
  );
};

export default RegisterPage;
