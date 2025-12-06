import { notFound } from 'next/navigation';
import NavBar from '@/components/NavBar';
import ProductCarousel from '@/components/ProductCarousel';
import StoreComments from '@/components/StoreComments';
import { STORES } from '@/data/stores';
import { allProductSummaries } from '@/data/product';
import '@/styles/app-css/lojas.css';

function toSlug(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function resolveImage(path?: string) {
  if (!path) {
    return 'https://placehold.co/1200x400/0f172a/ffffff?text=Loja';
  }
  if (path.startsWith('http')) {
    return path;
  }
  return path;
}

function StarDisplay({ count, size = '1rem' }: { count: number; size?: string }) {
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    stars.push(i <= Math.round(count) ? '★' : '☆');
  }
  return (
    <div style={{ fontSize: size, color: '#FACC15' }}>
      {stars.join('')}
    </div>
  );
}

type PageProps = {
  params: {
    slug: string;
  };
};

export default function LojaFakePage({ params }: PageProps) {
  const slug = params.slug.toLowerCase();
  const store = STORES.find((s) => toSlug(s.slug ?? s.name) === slug);

  if (!store) {
    notFound();
  }

  const relatedProducts = allProductSummaries.filter(
    (product) => toSlug(product.seal) === toSlug(store.slug ?? store.name),
  );

  const showcaseProducts = relatedProducts.length > 0
    ? relatedProducts
    : allProductSummaries.filter((product) => toSlug(product.category) === store.category).slice(0, 12);

  const comments = [
    {
      id: 1,
      name: 'Cliente apaixonado',
      avatar: 'https://placehold.co/50x50/E2D9C8/A4907C?text=CA',
      rating: store.rating ?? 4.5,
      text: `Comprei na ${store.name} e chegou rapidinho!`,
    },
    {
      id: 2,
      name: 'Marcos Andrade',
      avatar: 'https://placehold.co/50x50/1D4ED8/F1F5F9?text=MA',
      rating: Math.min(5, (store.rating ?? 4.3) + 0.2),
      text: 'Produtos incríveis e suporte atencioso.',
    },
    {
      id: 3,
      name: 'Stella Duarte',
      avatar: 'https://placehold.co/50x50/FB923C/0F172A?text=SD',
      rating: Math.max(4, (store.rating ?? 4.4) - 0.3),
      text: 'Voltarei a comprar mais vezes! ❤️',
    },
  ];

  return (
    <div className="store-page-container">
      <NavBar />

      <header
        className="store-hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.6)), url(${resolveImage(store.image)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="store-hero__content">
          <h1 className="store-hero__title">{store.name}</h1>
          <p className="store-hero__category">{store.categoryLabel}</p>
        </div>
        {store.owner && (
          <div className="store-hero__owner">
            by <span style={{ textDecoration: 'underline' }}>{store.owner}</span>
          </div>
        )}
      </header>

      <section className="store-rating-section">
        <h2 className="store-rating__title">Avaliações principais</h2>
        <div className="store-rating__score">{(store.rating ?? 4.5).toFixed(1)}</div>
        <div className="store-rating__stars">
          <StarDisplay count={store.rating ?? 4.5} size="2.5rem" />
        </div>
        <a href="#" className="store-rating__link">
          ver mais ({store.reviewsCount ?? 0} reviews)
        </a>

        <StoreComments comments={comments} />
      </section>

      <div className="store-products-section">
        {showcaseProducts.length > 0 ? (
          <ProductCarousel
            title="Produtos em destaque"
            items={showcaseProducts}
            hrefBase="/produtos-fake"
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
            <h3>Esta loja ainda não tem produtos.</h3>
            <p>Volte em breve para ver as novidades!</p>
          </div>
        )}
      </div>
    </div>
  );
}
