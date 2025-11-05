import { notFound } from 'next/navigation';
// Importa nossos dados mocados (VAMOS CRIAR ESTE ARQUIVO)
import { allProductDetails, allProductSummaries } from '@/data/mock';
import ProductCarousel from '@/components/ProductCarousel';
import NavBar from "@/components/NavBar";


function imageSrc(image: string) {
  if (image.startsWith('http')) return image; 
  return `/images/produtos/${image}.svg`;
}
function sealSrc(seal: string) {
  return `/images/lojas/${seal}.svg`;
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
  params: {
    id: string;
  };
};


export default async function ProdutoPage({ params }: PageProps) {
  const product = allProductDetails.find(p => p.id === params.id);


  if (!product) {
    notFound();
  }


  const relatedProducts = allProductSummaries.filter(
    p => p.seal === product.seal && p.id !== product.id
  );


  const mainImage = imageSrc(product.images[0] || 'https://placehold.co/600x600/f8f8f8/ccc?text=Produto');
  const thumbnails = product.images.slice(0, 4); 

  return (
    <>
      <NavBar /> 

      <div className="prod-page-container">
        <main className="prod-page-main-content">
          <section className="prod-gallery">
            <div className="prod-gallery__thumbnails">
              {thumbnails.map((imgSlug, index) => (
                <button key={index} className={`thumbnail-btn ${index === 0 ? 'active' : ''}`}>
                  <img 
                    src={imageSrc(imgSlug)} 
                    alt={`Thumbnail ${index + 1}`} 
                  />
                </button>
              ))}
            </div>
            <div className="prod-gallery__main-image">
            <img 
              className="prod-gallery__seal"
              src={sealSrc(product.seal)} 
              alt={`Selo ${product.seal}`} 
            />
           
            <img 
              className="prod-gallery__product-image" 
              src={mainImage} 
              alt={product.name} 
            />
          </div>
          </section>

          <section className="prod-info">
            <div className="prod-info__header">
              <h1 className="prod-info__title">{product.name}</h1>
    
            </div>

            <div className="prod-info__meta">
              <RatingStars rating={product.rating} reviews={product.reviews} />
              <span className="prod-info__divider"></span>
              <span className="prod-info__tag">{product.availability}</span>
              <span className="prod-info__divider"></span>
              <span className="prod-info__stock">{product.stockCount} disponíveis</span>
            </div>

            <div className="prod-info__price">
              {formatPrice(product.price)}
            </div>

            <div className="prod-info__description">
              <h3>Descrição</h3>
              <p>{product.description}</p>
            </div>

            <div className="prod-info__actions">
            </div>
          </section>
        </main>

        {relatedProducts.length > 0 && (
          <ProductCarousel
            title="Da mesma loja"
            items={relatedProducts}
          />
        )}
      </div>
    </>
  );
}