"use client";

import React, { useState } from "react";
import Link from "next/link";
import "../styles/cadastro.css";

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  function validate() {
    const newErrors = { name: "", username: "", email: "", password: "", confirm: "" };
    let valid = true;

    if (!form.name) {
      newErrors.name = "Informe o Nome Completo.";
      valid = false;
    }

    if (!form.username) {
      newErrors.username = "Informe um Username.";
      valid = false;
    }

    if (!form.email) {
      newErrors.email = "Informe o e-mail.";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = "E-mail inválido.";
        valid = false;
      }
    }

    if (!form.password) {
      newErrors.password = "Informe a senha.";
      valid = false;
    } else if (form.password.length < 8) {
      newErrors.password = "A senha deve ter pelo menos 8 caracteres.";
      valid = false;
    }

    if (form.confirm !== form.password) {
      newErrors.confirm = "As senhas não conferem.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess("");
    setServerError("");

    if (!validate()) return;

    //BACK ENTRA AQUI PARA FETCH DE DADOS 

    // AQUI ABAIXO É SÓ SIMULAÇÃO MOCKADA PRO FRONT
    setSuccess("Conta criada com sucesso!");
    setForm({
      name: "",
      username: "",
      email: "",
      password: "",
      confirm: "",
    });
  }

  return (
    <main className="signup-root">
      <section className="signup-left">
        <form
          className="signup-panel"
          aria-describedby="signup-desc"
          onSubmit={handleSubmit}
          noValidate
        >
          <header className="signup-header">
            <h1 id="signup-title" className="signup-title">
              CRIE SUA CONTA
            </h1>
          </header>

          {serverError && <p className="form-error">{serverError}</p>}
          {success && <p className="form-success">{success}</p>}

          <label htmlFor="name" className="sr-only">
            Nome Completo
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nome Completo"
            className={`signup-input ${errors.name ? "input-error" : ""}`}
            required
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && (
            <span className="input-hint error">{errors.name}</span>
          )}

          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className={`signup-input ${errors.username ? "input-error" : ""}`}
            required
            value={form.username}
            onChange={handleChange}
          />
          {errors.username && (
            <span className="input-hint error">{errors.username}</span>
          )}

          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className={`signup-input ${errors.email ? "input-error" : ""}`}
            required
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="input-hint error">{errors.email}</span>
          )}

          <label htmlFor="password" className="sr-only">
            Senha
          </label>
          <input
            id="password"
            type="password"
            placeholder="Senha"
            className={`signup-input ${errors.password ? "input-error" : ""}`}
            required
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="input-hint error">{errors.password}</span>
          )}

          <label htmlFor="confirm" className="sr-only">
            Confirmar Senha
          </label>
          <input
            id="confirm"
            type="password"
            placeholder="Confirmar Senha"
            className={`signup-input ${errors.confirm ? "input-error" : ""}`}
            required
            value={form.confirm}
            onChange={handleChange}
          />
          {errors.confirm && (
            <span className="input-hint error">{errors.confirm}</span>
          )}

          <button type="submit" className="signup-button">
            CRIAR CONTA
          </button>

          <p className="signup-login">
            Já possui uma conta?{" "}
            <Link href="/login" className="signup-link-cta">
              Login
            </Link>
          </p>
        </form>
      </section>

      <section className="signup-right">
        <div className="signup-figure">
          <a href="/home">
            <img
              src="/images/id-visual/logo_escura.svg"
              alt="Stock.io"
              className="signup-logo"
            />
          </a>
          <img
            src="/images/id-visual/garoto-controle.svg"
            alt="Ilustração personagem"
            className="signup-image"
          />
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
