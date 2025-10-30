"use client";

import React, { useState } from "react";
import Link from "next/link";
import "../styles/login.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  function validate() {
    const newErrors = { email: "", password: "" };
    let valid = true;

    if (!email) {
      newErrors.email = "Informe o e-mail.";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "E-mail inválido.";
        valid = false;
      }
    }

    if (!password) {
      newErrors.password = "Informe a senha.";
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = "Informe uma senha válida.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    setSuccess("");

    if (!validate()) return;

    // AQUi ENTRA REQUISICAO DO BACK

    // ABAIXO ESTA SOMENTE TESTE MOCKADO PRO FRONT
    setSuccess("Login realizado!");
  }

  return (
    <main className="login-root">
      <section className="login-illustration">
        <div className="login-figure">
          <a href="/home">
            <img
              src="images/id-visual/logo_escura.svg"
              alt="Stock.io"
              className="login-logo"
            />
          </a>
          <img
            src="/images/id-visual/garoto-caixa.svg"
            alt="Personagem segurando uma caixa"
            className="login-image"
          />
        </div>
      </section>

      <section className="login-card" aria-labelledby="login-title">
        <form
          className="login-form"
          aria-describedby="login-description"
          onSubmit={handleSubmit}
          noValidate
        >
          <header className="login-header">
            <h1 id="login-title" className="login-title">
              BEM VINDO DE VOLTA!
            </h1>
            <p id="login-description" className="login-subtitle">
              Entre com seu email e senha para continuar
            </p>
          </header>

          {serverError && <p className="form-error">{serverError}</p>}
          {success && <p className="form-success">{success}</p>}

          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email"
            autoComplete="email"
            className={`login-input ${errors.email ? "input-error" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <span className="input-hint error">{errors.email}</span>
          )}

          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Senha"
            autoComplete="current-password"
            className={`login-input ${errors.password ? "input-error" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="input-hint error">{errors.password}</span>
          )}

          <div className="login-forgot">
            <a href="#" className="login-link">
              Esqueceu sua senha?
            </a>
          </div>

          <button type="submit" className="login-button">
            ENTRAR
          </button>

          <p className="login-register">
            Não possui uma conta?{" "}
            <Link href="/cadastro" className="login-link-cta">
              Cadastre-se
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
