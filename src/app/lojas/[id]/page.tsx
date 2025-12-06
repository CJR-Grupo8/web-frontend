import { notFound } from 'next/navigation';
import NavBar from "@/components/NavBar";
import StoreEditButtons from '@/components/StoreEditButtons';
import ProductCatalog from '@/components/ProductCatalog';
import StoreComments from '@/components/StoreComments'; 
import ProductCard from '@/components/ProductCard'; 
import "@/styles/app-css/lojas.css";

const API_URL = "http://localhost:3001";

// --- Tipagem dos dados vindos do Backend ---
interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
  imageUrl?: string;
  categoria?: string;
  quantidade?: number;
}

interface Dono {
  id: number;
  fullName: string;
  username: string;
}

interface Loja {
  id: number;
  nome: string;
  descricao?: string;
  dono: Dono;
  produtos: Produto[];
}

// --- Função para buscar dados no Backend ---
async function getLojaData(id: string): Promise<Loja | null> {
  try {
    const res = await fetch(`${API_URL}/lojas/${id}`, { 
      cache: 'no-store' // Garante dados frescos ao recarregar
    });
    
    if (!res.ok) return null;
    
    return res.json();
  } catch (error) {
    console.error("Erro ao buscar loja:", error);
    return null;
  }
}

function StarDisplay({ count, size = '1rem' }: { count: number, size?: string }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
     stars.push(i <= Math.ceil(count) ? '★' : '☆');
  }
  return <div style={{ fontSize: size, color: '#FACC15' }}>{stars.join('')}</div>;
}

type PageProps = {
  params: Promise<{
    id: string; // Mudamos de 'slug' para 'id' pois o backend busca por ID numérico
  }>;
};

export default async function LojaPage({ params }: PageProps) {
  const { id } = await params; 
  
  // 1. Busca os dados reais
  const store = await getLojaData(id);

  if (!store) {
    notFound();
  }

  // 2. Prepara os produtos reais (tratando imagens)
  const produtosReais = store.produtos.map(produto => ({
    ...produto,
    // Adiciona o domínio do backend se for imagem local
    image: produto.imageUrl 
      ? (produto.imageUrl.startsWith('http') ? produto.imageUrl : `${API_URL}/${produto.imageUrl}`)
      : "https://via.placeholder.com/300",
    rating: 5, // Valor padrão (backend ainda não tem review por produto)
    reviews: 0
  }));

  const bestRatedProducts = produtosReais.slice(0, 6);

  // Comentários Fakes (placeholder)
  const fakeComments = [
    { 
      id: 1, 
      name: "Cliente Exemplo", 
      avatar: "https://placehold.co/50x50", 
      rating: 5,
      text: "Loja muito confiável, produtos chegaram certinho!"
    }
  ];

  return (
    <div className="store-page-container">
      <NavBar />

      <header 
        className="store-hero" 
        style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop')`,
            backgroundColor: '#333' 
        }} 
      >
      
        {/* --- CORREÇÃO AQUI: Passamos storeId E ownerId --- */}
        <StoreEditButtons storeId={store.id} ownerId={store.dono.id} />

        <div className="store-hero__content">
          <h1 className="store-hero__title">{store.nome}</h1>
          <p className="store-hero__category">{store.descricao || "Loja Oficial"}</p>
        </div>
        
        <div className="store-hero__owner">
            by <span style={{textDecoration: 'underline'}}>{store.dono.fullName}</span>
        </div>
      </header>

      <section className="store-rating-section">
        <h2 className="store-rating__title">Reviews e Comentários</h2>
        <div className="store-rating__score">5.0</div>
        <div className="store-rating__stars">
           <StarDisplay count={5} size="2.5rem" />
        </div>
        <a href="#" className="store-rating__link">
          ver mais (0 reviews)
        </a>

        <StoreComments comments={fakeComments} />
      </section>

      <div className="store-products-section">
        
        {bestRatedProducts.length > 0 ? (
          <div className="best-rated-container">
            <div className="best-rated-header">
              <h2 className="best-rated-title">
                Produtos <span>em destaque</span>
              </h2>
            </div>

            {/* Grid de Produtos */}
            <div className="best-rated-grid">
              {bestRatedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  id={product.id}
                  name={product.nome}
                  price={product.preco}
                  image={product.image}
                  category={product.categoria || "Geral"}
                  rating={product.rating}
                  reviews={product.reviews}
                />
              ))}
            </div>
          </div>
        ) : (
            <div style={{textAlign: 'center', padding: '4rem', color: '#666'}}>
                <h3>Esta loja ainda não tem produtos.</h3>
                <p>Use o botão "+" acima para adicionar o primeiro!</p>
            </div>
        )}

        {/* Catálogo Completo */}
        {produtosReais.length > 6 && (
            <div style={{ marginTop: '4rem' }}>
                <ProductCatalog initialProducts={produtosReais} itemsPerPage={8} />
            </div>
        )}

      </div>
    </div>
  );
}