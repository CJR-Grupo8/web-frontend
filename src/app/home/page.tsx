import "../styles/home.css";
import NavBar from "@/components/NavBar";
import{
    FaShoppingCart, 
  FaClinicMedical, 
  FaSmile, 
  FaTshirt, 
  FaLaptop, 
  FaGamepad, 
  FaRobot,
  FaEllipsisH
} from "react-icons/fa";

export default function HomePage() {
  return (
    <main className="home-root">
      <NavBar logado={true} /> {/* está em hardcoding — mude para logged={true} para testar o front (precisa de requisição do back) */}

      <section className="home-hero">
        <div className="hero-content">
          <h2>Gerencie tudo com praticidade e estilo</h2>
          <p>Organize seu estoque, acompanhe os produtos e vizualize de forma intuitiva.</p>
          <a href="/cadastro" className="hero-button">
            Começar agora
          </a>
        </div>
        <div className="hero-image">
          <img src="/images/id-visual/garoto-celular.svg" alt="Personagem" />
        </div>
      </section>

      {/* CATEGORIAS*/}
       <section className="dashboard-categorias">
        <h3>Categorias</h3>
        <div className="categorias-grid">
          <button className="categoria-btn">
            <FaShoppingCart className="categoria-icon" />
            Mercado
          </button>
          <button className="categoria-btn">
            <FaClinicMedical className="categoria-icon" />
            Farmácia
          </button>
          <button className="categoria-btn">
            <FaSmile className="categoria-icon" />
            Beleza
          </button>
          <button className="categoria-btn">
            <FaTshirt className="categoria-icon" />
            Moda
          </button>
          <button className="categoria-btn">
            <FaLaptop className="categoria-icon" />
            Eletrônicos
          </button>
          <button className="categoria-btn">
            <FaGamepad className="categoria-icon" />
            Jogos
          </button>
          <button className="categoria-btn">
            <FaRobot className="categoria-icon" />
            Brinquedos
          </button>
          <button className="categoria-btn">
            <FaEllipsisH className="categoria-icon" />
            Outros
          </button>
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
