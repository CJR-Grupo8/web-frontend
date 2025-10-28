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
  seal: string;
  availability: Availability;
};

const products: Product[] = [
  { id: "1",  name: "Brownie Meio A.",      price: "R$4,70",               image: "nome", seal: "cjr", availability: "DISPONÍVEL" },
  { id: "2",  name: "Brownie Trad.",        price: "R$3,80",                image: "nome",  seal: "cjr", availability: "INDISPONÍVEL" },
  { id: "3",  name: "Nozes",                price: "R$29,99", unit: "/kg",  image: "nome", seal: "dcarts-&-baskets", availability: "DISPONÍVEL" },
  { id: "4",  name: "Banana",               price: "R$3,99",  unit: "/kg",  image: "nome", seal: "moumer", availability: "DISPONÍVEL" },
  { id: "5",  name: "Limão Siciliano",      price: "R$17,99", unit: "/kg",  image: "nome",  seal: "moumer", availability: "INDISPONÍVEL" },
  { id: "6",  name: "Leite",                price: "R$4,99",                image: "nome",  seal: "dcarts-&-baskets", availability: "DISPONÍVEL" },
  { id: "7",  name: "Manteiga",             price: "R$23,99",               image: "nome", seal: "dcarts-&-baskets", availability: "DISPONÍVEL" },
  { id: "8",  name: "Leite Cond.",          price: "R$7,99",                image: "nome", seal: "dcarts-&-baskets", availability: "DISPONÍVEL" },
  { id: "9",  name: "Coca Cola",            price: "R$3,99",                image: "nome",  seal: "dcarts-&-baskets", availability: "INDISPONÍVEL" },
  { id: "10", name: "Farinha de T.",        price: "R$6,99",                image: "nome", seal: "dcarts-&-baskets", availability: "DISPONÍVEL" },
  { id: "11", name: "Grand Theft Auto VI",  price: "499,99",                image: "nome", seal: "magic-chicken", availability: "INDISPONÍVEL"},
  { id: "12", name: "Luminária",            price: "R$9,99",                image: "nome", seal: "kuby",  availability: "DISPONÍVEL" },
  { id: "13", name: "Batom Liq.",           price: "R$149,99",              image: "batom-liq", seal: "rare-beauty",  availability: "DISPONÍVEL" },
  { id: "14", name: "Nike Dunk Ben&Jerry's",price: "R$10.000,00",           image: "nome", seal: "sneaker-store",  availability: "DISPONÍVEL" },
  { id: "14", name: "Mouse Logitech G403",  price: "R$399,99",              image: "nome", seal: "nako",  availability: "INDISPONÍVEL" },
];

const sealSrc = (seal: string) =>
  `/images/lojas/${encodeURIComponent(seal)}.svg`;

const imageSrc = (seal: string) =>
  `/images/produtos/${encodeURIComponent(seal)}.svg`;

export default function HomePage() {
    return (
        <main className="home-root">
            <header className="home-header">
                <a href="/home">
                    <div className="logo">
                        <img src="/images/id-visual/logo_clara.svg" alt="Logo Stock.io" className="logo-img" />
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
                            <img className="seal" src={sealSrc(p.seal)} alt={`Selo ${p.seal}`} />
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
