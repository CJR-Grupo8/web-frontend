import { notFound } from 'next/navigation';
import { STORES } from '@/data/stores';
import { allProductSummaries } from '@/data/product'; 
import NavBar from "@/components/NavBar";
import StoreEditButtons from '@/components/StoreEditButtons';
import ProductCarousel from '@/components/ProductCarousel';
import ProductCatalog from '@/components/ProductCatalog';
import StoreComments from '@/components/StoreComments'; 

import "@/styles/app-css/lojas.css";

function StarDisplay({ count, size = '1rem' }: { count: number, size?: string }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
     stars.push(i <= Math.ceil(count) ? '★' : '☆');
  }
  return <div style={{ fontSize: size, color: '#FACC15' }}>{stars.join('')}</div>;
}

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LojaPage({ params }: PageProps) {
  const { slug } = await params; 
  
  const store = STORES.find(s => s.slug === slug);

  if (!store) {
    notFound();
  }

  const storeProducts = allProductSummaries.filter(p => p.seal === slug);
  const bestRatedProducts = storeProducts.slice(0, 6);

  const comments = [
    { 
      id: 1, 
      name: "Sofia Figueiredo", 
      avatar: "https://placehold.co/50x50/E2D9C8/A4907C?text=SF", 
      rating: 5,
      text: "Adorei o produto. Funcionou muito na minha pele. Estou muito contente e com toda certeza irei comprar mais produtos da marca. Que orgulhooooooo! Arrasaram"
    },
    { 
      id: 2, 
      name: "Selena Gomez", 
      avatar: "https://placehold.co/50x50/E2D9C8/A4907C?text=SG", 
      rating: 5,
      text: "Não é porque é minha marca, mas eu amo!"
    },
    { 
      id: 3, 
      name: "Julia Santos", 
      avatar: "https://placehold.co/50x50/E2D9C8/A4907C?text=JS", 
      rating: 4,
      text: "Gostei bastante, a qualidade é impecável."
    },
    { 
      id: 4, 
      name: "Ana Clara", 
      avatar: "https://placehold.co/50x50/E2D9C8/A4907C?text=AC", 
      rating: 5,
      text: "Chegou super rápido e a embalagem é linda."
    },
    { 
      id: 5, 
      name: "Beatriz Lima", 
      avatar: "https://placehold.co/50x50/E2D9C8/A4907C?text=BL", 
      rating: 4,
      text: "Muito bom, recomendo para todo mundo."
    },
  ];

  return (
    <div className="store-page-container">
      <NavBar />

      <header 
        className="store-hero" 
        style={{ backgroundImage: `url(${store.image})` }} >
      
        <StoreEditButtons />

        <div className="store-hero__content">
          <h1 className="store-hero__title">{store.name}</h1>
          <p className="store-hero__category">{store.categoryLabel}</p>
        </div>
        
        {store.owner && (
          <div className="store-hero__owner">
            by <span style={{textDecoration: 'underline'}}>{store.owner}</span>
          </div>
        )}
      </header>

      <section className="store-rating-section">
        <h2 className="store-rating__title">Reviews e Comentários</h2>
        <div className="store-rating__score">{store.rating}</div>
        <div className="store-rating__stars">
           <StarDisplay count={store.rating} size="2.5rem" />
        </div>
        <a href="#" className="store-rating__link">
          ver mais ({store.reviewsCount} reviews)
        </a>

        <StoreComments comments={comments} />

      </section>

      <div className="store-products-section">
        
        {bestRatedProducts.length > 0 ? (
             <ProductCarousel 
                title="Produtos melhor avaliados" 
                items={bestRatedProducts} 
            />
        ) : (
            <p style={{textAlign: 'center', padding: '2rem'}}>Nenhum produto encontrado para esta loja.</p>
        )}

        <div style={{ marginTop: '2rem' }}>
             <ProductCatalog initialProducts={storeProducts} itemsPerPage={8} />
        </div>

      </div>
    </div>
  );
}