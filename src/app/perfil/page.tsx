"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import NavBar from "@/components/NavBar";
import { ProductSummary } from "@/data/product";
import { Store } from "@/data/stores";
import Link from "next/link";
import apiClient from "@/services/api";
import "@/styles/app-css/perfil.css";

type Review = {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
};

export default function PerfilPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userProducts, setUserProducts] = useState<ProductSummary[]>([]);
  const [userStores, setUserStores] = useState<Store[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      setLoadingData(true);
      try {
        // TODO: Implementar endpoints no backend
        // Quando os endpoints estiverem disponíveis, descomentar:
        
        // Buscar produtos do usuário
        // const productsResponse = await apiClient.get(`/products/user/${user.id}`);
        // setUserProducts(productsResponse.data || []);

        // Buscar lojas do usuário
        // const storesResponse = await apiClient.get(`/stores/user/${user.id}`);
        // setUserStores(storesResponse.data || []);

        // Buscar avaliações do usuário
        // const reviewsResponse = await apiClient.get(`/reviews/user/${user.id}`);
        // setReviews(reviewsResponse.data || []);

        // Por enquanto, deixa vazio até os endpoints serem criados
        setUserProducts([]);
        setUserStores([]);
        setReviews([]);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        // Em caso de erro, mantém arrays vazios
        setUserProducts([]);
        setUserStores([]);
        setReviews([]);
      } finally {
        setLoadingData(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading || loadingData) {
    return (
      <div className="loading-container">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="perfil-page">
      <NavBar />

      <div className="perfil-hero">
        <div className="perfil-hero-content">
          <button className="back-button" onClick={() => router.back()}>
            ←
          </button>
          
          <div className="perfil-avatar perfil-avatar-empty">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>

          <div className="perfil-info">
            <h1 className="perfil-name">{user.fullName}</h1>
            <p className="perfil-username">@ {user.username}</p>
            <p className="perfil-email">✉ {user.email}</p>
          </div>

          {isAuthenticated && (
            <button
              className="edit-perfil-btn"
              onClick={() => setIsEditing(!isEditing)}
            >
              Editar Perfil
            </button>
          )}
        </div>
      </div>

      <div className="perfil-container">

        {/* Seção de Produtos */}
        <section className="perfil-section">
          <div className="section-header">
            <h2 className="section-title">Produtos</h2>
            <Link href="/ver_mais" className="ver-mais-link">
              ver mais
            </Link>
          </div>

          <div className="products-grid">
            {userProducts.length > 0 ? (
              userProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/produtos/${product.id}`}
                  className="product-card-perfil"
                >
                  <div className="product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/200x200/ccc/333?text=Produto";
                      }}
                    />
                    <span className={`product-badge ${product.availability === "DISPONÍVEL" ? "disponivel" : "indisponivel"}`}>
                      {product.availability}
                    </span>
                  </div>
                  <div className="product-info-perfil">
                    <h3>{product.name}</h3>
                    <p className="product-price">{product.price}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                <p>Você ainda não cadastrou nenhum produto</p>
                <Link href="/ver_mais" className="empty-state-btn">
                  Adicionar produto
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Seção de Lojas */}
        <section className="perfil-section">
          <div className="section-header">
            <h2 className="section-title">Lojas</h2>
            {isAuthenticated && (
              <button className="add-store-btn" title="Adicionar loja">
                +
              </button>
            )}
          </div>

          <div className="stores-list">
            {userStores.length > 0 ? (
              userStores.map((store) => (
                <div key={store.id} className="store-item">
                  <div className="store-logo">
                    <img src={store.logo} alt={store.name} />
                  </div>
                  <div className="store-details">
                    <h3 className="store-name">
                      {store.name}
                      <span className="store-category">{store.categoryLabel}</span>
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
                  <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/>
                </svg>
                <p>Crie sua primeira loja e comece a vender!</p>
                <button className="empty-state-btn">
                  Criar loja
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Seção de Avaliações */}
        <section className="perfil-section">
          <div className="section-header">
            <h2 className="section-title">Avaliações</h2>
            <Link href="#" className="ver-mais-link">
              ver mais
            </Link>
          </div>

          <div className="reviews-list">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="review-user">
                      <img
                        className="review-avatar"
                        src={review.userImage}
                        alt={review.userName}
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/60x60/ccc/333?text=" + review.userName.charAt(0);
                        }}
                      />
                      <h4 className="review-user-name">{review.userName}</h4>
                    </div>
                    <div className="review-rating">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? "star filled" : "star"}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <Link href="#" className="review-more">
                    ver mais
                  </Link>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
                  <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
                </svg>
                <p>Você ainda não recebeu avaliações</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
