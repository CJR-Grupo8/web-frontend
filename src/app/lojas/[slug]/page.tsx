import { notFound } from 'next/navigation';
import { allProductDetails, allProductSummaries } from '@/data/product';
import { Store, STORES } from '@/data/stores';
import ProductCarousel from '@/components/ProductCarousel';
import NavBar from "@/components/NavBar";
import ProductGallery from '@/components/ProductGallery';
import "@/styles/app-css/produtos.css";

function RatingStars({ rating, reviews }: { rating: number; reviews: number }) {
  const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  return (
    <div className="store-rating">
      <div className="store-rating__stars" style={{ color: '#facc15' }}>
        {stars}
      </div>
      <span className="store-rating__text">
        {rating.toFixed(1)} | {reviews} reviews
      </span>
    </div>
  );
}

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function LojaPage({ params }: PageProps) {
  const { slug } = await params;
  const store = STORES.find(s => s.slug === slug);

  if (!store) {
    notFound();
  }

  return (
     
        <NavBar /> 
  
    );

}