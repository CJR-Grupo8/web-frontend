"use client";

import Link from "next/link";
import { FaStore } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { RiLogoutBoxRLine } from "react-icons/ri";
import "./styles/nav-bar.css";

type NavBarProps = {
  logado?: boolean;
};

export default function NavBar({ logado = false }: NavBarProps) {
  return (
    <header className={logado ? "header logged" : "header"}>
      <Link href="/home" aria-label="Ir para a Home">
        <div className="logo">
          <img
            src="/images/id-visual/logo_clara.svg"
            alt="Logo Stock.io"
            className="logo-img"
          />
        </div>
      </Link>

      <nav className="nav-links">
        {logado ? (
          <>
            <Link href="/ver_mais" className="store-icon" title="ver mais produtos">
              <FaStore />
            </Link>
            <Link href="/perfil" className="perfil-icon" title="ver perfil">
              <RiAccountCircleFill />
            </Link>
            <Link href="/home" className="logout-btn" title="deslogar">
              <RiLogoutBoxRLine />
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" className="login-btn">
              Login
            </Link>
            <Link href="/cadastro" className="cadastro-btn">
              Cadastre-se
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
