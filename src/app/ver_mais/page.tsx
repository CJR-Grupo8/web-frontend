import React from "react";
import "../styles/ver_mais.css";

type StoreSeal = "cjr" | "darts" | "makemercado";
type Availability = "DISPONÍVEL" | "INDISPONÍVEL";

type Product = {
    id: string;
    name: string;
    price: string;
    unit?: string;
    image: string;
    seal: StoreSeal;
    availability: Availability;
};

const products: Product[] = [
    { id: "1", name: "Brownie Meio A.", price: "R$4,70", image: "/images/produtos/brownie-roxo.png", seal: "cjr", availability: "DISPONÍVEL" },
    { id: "2", name: "Brownie Trad.", price: "R$3,80", image: "/images/produtos/brownie-azul.png", seal: "cjr", availability: "INDISPONÍVEL" },
    { id: "3", name: "Nozes", price: "R$29,99", unit: "/kg", image: "/images/produtos/nozes.png", seal: "darts", availability: "DISPONÍVEL" },
    { id: "4", name: "Banana", price: "R$3,99", unit: "/kg", image: "/images/produtos/banana.png", seal: "makemercado", availability: "DISPONÍVEL" },
    { id: "5", name: "Limão Siciliano", price: "R$17,99", unit: "/kg", image: "/images/produtos/limao.png", seal: "makemercado", availability: "INDISPONÍVEL" },
    { id: "6", name: "Leite", price: "R$4,99", image: "/images/produtos/leite.png", seal: "darts", availability: "DISPONÍVEL" },
    { id: "7", name: "Manteiga", price: "R$23,99", image: "/images/produtos/manteiga.png", seal: "darts", availability: "DISPONÍVEL" },
    { id: "8", name: "Leite Cond.", price: "R$7,99", image: "/images/produtos/leite-cond.png", seal: "darts", availability: "DISPONÍVEL" },
    { id: "9", name: "Coca Cola", price: "R$3,99", image: "/images/produtos/coca.png", seal: "darts", availability: "DISPONÍVEL" },
    { id: "10", name: "Farinha de T.", price: "R$6,99", image: "/images/produtos/farinha.png", seal: "darts", availability: "DISPONÍVEL" },
    { id: "11", name: "Redbull", price: "R$9,99", image: "/images/produtos/redbull.png", seal: "cjr", availability: "DISPONÍVEL" },
];

const sealSrc: Record<StoreSeal, string> = {
    cjr: "/images/selos/cjr.png",
    darts: "/images/selos/darts.png",
    makemercado: "/images/selos/make-mercado.png",
};

export default function HomePage() {
    return (
        <main className="home-root">
            <header className="home-header">
                <a href="/home">
                    <div className="logo">
                        <img src="/images/logo_clara.svg" alt="Logo Stock.io" className="logo-img" />
                    </div>
                </a>
                <nav className="nav-links">
                    <a href="/login" className="login-btn">Login</a>
                    <a href="/cadastro" className="cadastro-btn">Cadastre-se</a>
                </nav>
            </header>
            <section className="catalog">
                {products.map(p => (
                    <article className="card" key={p.id}>
                        <div className="thumb">
                            <img src={p.image} alt={p.name} />
                            <img className="seal" src={sealSrc[p.seal]} alt={`Selo ${p.seal}`} />
                        </div>
                        <h3 className="title">{p.name}</h3>
                        <div className="price-line">
                            <span className="price">{p.price}</span>
                            {p.unit && <span className="unit">{p.unit}</span>}
                        </div>
                        <span className={`availability ${p.availability === "DISPONÍVEL" ? "ok" : "off"}`}>
                            {p.availability}
                        </span>
                    </article>
                ))}
            </section>
        </main>
    );
}
