import { notFound } from "next/navigation";
import NavBar from "@/components/NavBar";
import ProductGallery from "@/components/ProductGallery";
import ProductCarousel from "@/components/ProductCarousel";
import {
  allProductDetails,
  allProductSummaries,
} from "@/data/product";
import type { ProductSummary } from "@/data/product";
import "@/styles/app-css/produtos.css";

type PageProps = {
  params: {
    id: string;
  };
};

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatStoreName(slug: string) {
  if (!slug) return "Loja Parceira";

  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((piece) => {
      if (piece === "&") return "&";
      return piece.charAt(0).toUpperCase() + piece.slice(1);
    })
    .join(" ")
    .replace(/\s&\s/g, " & ");
}

function RatingStars({ rating, reviews }: { rating: number; reviews: number }) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)));
  const stars = "★".repeat(rounded) + "☆".repeat(5 - rounded);

  return (
    <div className="prod-rating">
      <div className="prod-rating__stars" style={{ color: "#facc15" }}>
        {stars}
      </div>
      <span className="prod-rating__text">
        {rating.toFixed(1)} | {reviews} reviews
      </span>
    </div>
  );
}

function getRelatedProducts(current: ProductSummary, max = 10) {
  return allProductSummaries
    .filter((item) => item.category === current.category && item.id !== current.id)
    .slice(0, max);
}

export default function ProdutoFakePage({ params }: PageProps) {
  const productDetail = allProductDetails.find((item) => item.id === params.id);
  const productSummary = allProductSummaries.find((item) => item.id === params.id);

  if (!productDetail || !productSummary) {
    notFound();
  }

  const galleryImages = productDetail.images.length
    ? productDetail.images
    : [productSummary.image];
  const storeName = formatStoreName(productSummary.seal);
  const stock = productDetail.stockCount;
  const related = getRelatedProducts(productSummary);

  return (
    <>
      <NavBar />

      <div className="prod-page-container">
        <main className="prod-page-main-content">
          <ProductGallery
            images={galleryImages}
            seal={productSummary.seal}
            productName={productDetail.name}
          />

          <section className="prod-info">
            <div className="prod-info__header">
              <h1 className="prod-info__title">{productDetail.name}</h1>
              <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem" }}>
                Vendido por: <strong>{storeName}</strong>
              </p>
            </div>

            <div className="prod-info__meta">
              <RatingStars rating={productDetail.rating} reviews={productDetail.reviews} />
              <span className="prod-info__divider"></span>
              <span className="prod-info__tag">{productDetail.availability}</span>
              <span className="prod-info__divider"></span>
              <span className="prod-info__stock">{stock} disponíveis</span>
            </div>

            <div className="prod-info__price">{formatPrice(productDetail.price)}</div>

            <div className="prod-info__description">
              <h3>Descrição</h3>
              <p style={{ whiteSpace: "pre-line" }}>{productDetail.description}</p>
            </div>

            <div className="prod-info__actions">
              <button
                style={{
                  width: "100%",
                  padding: "15px",
                  backgroundColor: "#111",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </section>
        </main>

        {related.length > 0 && (
          <ProductCarousel
            title="Mais desta categoria"
            category={productSummary.category}
            items={related}
            hrefBase="/produtos-fake"
          />
        )}
      </div>
    </>
  );
}
