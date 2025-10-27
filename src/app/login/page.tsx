import React from "react";
import Link from "next/link";
import "../styles/login.css";

const LoginPage: React.FC = () => {
  return (
    <main className="login-root">
      <section className="login-illustration">
        <div className="login-figure">
          <img src="images/logo.svg" alt="Stock.io" className="login-logo" />
          <img
            src="/images/garoto-caixa.svg"
            alt="Personagem segurando uma caixa"
            className="login-image"
          />
        </div>
      </section>

      <section className="login-card" aria-labelledby="login-title">
        <form className="login-form" aria-describedby="login-description">
          <header className="login-header">
            <h1 id="login-title" className="login-title">
              BEM VINDO DE VOLTA!
            </h1>
            <p id="login-description" className="login-subtitle">
              Entre com seu email e senha para continuar
            </p>
          </header>

          <label htmlFor="email" className="login-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email"
            autoComplete="email"
            className="login-input"
          />

          <label htmlFor="password" className="login-label">
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Senha"
            autoComplete="current-password"
            className="login-input"
          />

          <div className="login-forgot">
            <a href="#" className="login-link">
              Esqueceu sua senha?
            </a>
          </div>

          <button type="submit" className="login-button">
            ENTRAR
          </button>

          <p className="login-register">
            Não possui uma conta? <Link href="/cadastro" className="login-link-cta">Cadastre-se</Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
