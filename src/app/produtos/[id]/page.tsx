import { notFound } from 'next/navigation';
import ProductCarousel from '@/components/ProductCarousel';
import NavBar from "@/components/NavBar";
import ProductGallery from '@/components/ProductGallery';
import "@/styles/app-css/produtos.css";

const API_URL = "http://localhost:3001";

// Tipagem dos dados do Banco de Dados
interface ProdutoDB {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
  imageUrl?: string;
  categoria?: string;
  quantidade?: number;
  lojaId: number;
  loja: {
    id: number;
    nome: string;
  };
}

// Função para buscar o produto principal
async function getProdutoData(id: string): Promise<ProdutoDB | null> {
  try {
    const res = await fetch(`${API_URL}/produtos/${id}`, { 
      cache: 'no-store' 
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }
}

// Função para buscar produtos relacionados (mesma loja)
async function getRelatedProducts(lojaId: number, currentProductId: number) {
  try {
    const res = await fetch(`${API_URL}/produtos?lojaId=${lojaId}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const products: ProdutoDB[] = await res.json();
    
    // Filtra o produto atual e mapeia para o formato do Carrossel
    return products
      .filter(p => p.id !== currentProductId)
      .map(p => ({
        id: p.id,
        name: p.nome, // O carrossel espera 'name'
        price: p.preco,
        image: p.imageUrl 
          ? (p.imageUrl.startsWith('http') ? p.imageUrl : `${API_URL}/${p.imageUrl}`)
          : "https://via.placeholder.com/300",
        seal: p.categoria || "Geral" // Usando categoria como "selo" já que não temos logo no produto
      }));
  } catch (error) {
    return [];
  }
}

function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function RatingStars({ rating, reviews }: { rating: number; reviews: number }) {
  const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  return (
    <div className="prod-rating">
      <div className="prod-rating__stars" style={{ color: '#facc15' }}>
        {stars}
      </div>
      <span className="prod-rating__text">
        {rating.toFixed(1)} | {reviews} reviews
      </span>
    </div>
  );
}

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProdutoPage({ params }: PageProps) {
  const { id } = await params;
  
  // 1. Busca os dados reais
  const product = await getProdutoData(id);

  if (!product) {
    notFound();
  }

  // 2. Busca produtos relacionados da mesma loja
  const relatedProducts = await getRelatedProducts(product.lojaId, product.id);

  // 3. Trata a imagem (adiciona localhost se necessário)
  const mainImage = product.imageUrl 
    ? (product.imageUrl.startsWith('http') ? product.imageUrl : `${API_URL}/${product.imageUrl}`)
    : "https://via.placeholder.com/500";

  return (
    <>
      <NavBar /> 

      <div className="prod-page-container">
        <main className="prod-page-main-content">

          {/* Adaptação para o ProductGallery aceitar a imagem única do DB */}
          <ProductGallery 
            images={[mainImage, mainImage]} // Passando array pois a galeria deve esperar array
            seal={product.categoria || "Produto"} 
            productName={product.nome} 
          />

          <section className="prod-info">
            <div className="prod-info__header">
              <h1 className="prod-info__title">{product.nome}</h1>
              <p style={{fontSize: '0.9rem', color: '#666', marginTop: '0.5rem'}}>
                Vendido por: <strong>{product.loja.nome}</strong>
              </p>
            </div>

            <div className="prod-info__meta">
              {/* Reviews mockados pois o back ainda não retorna média calculada */}
              <RatingStars rating={5} reviews={0} />
              
              <span className="prod-info__divider"></span>
              <span className="prod-info__tag">
                {(product.quantidade ?? 0) > 0 ? "Em Estoque" : "Esgotado"}
              </span>
              <span className="prod-info__divider"></span>
              <span className="prod-info__stock">{product.quantidade ?? 0} disponíveis</span>
            </div>

            <div className="prod-info__price">
              {formatPrice(product.preco)}
            </div>

            <div className="prod-info__description">
              <h3>Descrição</h3>
              <p>{product.descricao || "Sem descrição informada."}</p>
            </div>

            <div className="prod-info__actions">
                <button 
                  style={{
                    width: '100%',
                    padding: '15px',
                    backgroundColor: '#111',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Adicionar ao Carrinho
                </button>
            </div>
          </section>
        </main>

        {relatedProducts.length > 0 && (
          <ProductCarousel
            title="Mais desta loja"
            items={relatedProducts}
          />
        )}
      </div>
    </>
  );
}