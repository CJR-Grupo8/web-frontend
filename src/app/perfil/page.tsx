"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import NavBar from "@/components/NavBar";
import EditProfileModal from "@/components/EditProfileModal";
import ChangePasswordModal from "@/components/ChangePasswordModal";
import AddStoreModal from "@/components/AddStoreModal";
import AddProductModal from "@/components/AddProductModal";
import EditStoreModal from "@/components/EditStoreModal";
import Link from "next/link";
import { reviewService, produtoService, lojaService } from "@/services/api";
import useEmblaCarousel from "embla-carousel-react";
import "@/styles/app-css/perfil.css";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
  estoque?: number;
  lojaId: number;
  loja?: {
    id: number;
    nome: string;
  };
};

type Loja = {
  id: number;
  nome: string;
  descricao?: string;
  categoria?: string;
  donoId: number;
  createdAt: string;
};

type Review = {
  id: number;
  rating: number;
  comentario: string;
  createdAt: string;
  loja?: {
    id: number;
    nome: string;
    descricao: string;
  };
  produto?: {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
  };
};

export default function PerfilPage() {
  const API_URL = typeof window !== 'undefined' ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001') : 'http://localhost:3001';
  const router = useRouter();
  const { user, loading, isAuthenticated, updateUser } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAddStoreModal, setShowAddStoreModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditStoreModal, setShowEditStoreModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Loja | null>(null);
  const [userProducts, setUserProducts] = useState<Produto[]>([]);
  const [userStores, setUserStores] = useState<Loja[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const [emblaRefProducts] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });

  const [emblaRefStores] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });

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
        const storesResponse = await lojaService.getByDono(user.id);
        const lojas = storesResponse.data || [];
        setUserStores(lojas);

        let allProducts: Produto[] = [];
        for (const loja of lojas) {
          const productsResponse = await produtoService.getByLoja(loja.id);
          const produtos = productsResponse.data || [];
          allProducts = [...allProducts, ...produtos];
        }
        setUserProducts(allProducts);

        const reviewsResponse = await reviewService.getByAuthor(user.id);
        setReviews(reviewsResponse.data || []);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setUserProducts([]);
        setUserStores([]);
        setReviews([]);
      } finally {
        setLoadingData(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleSuccess = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      updateUser(JSON.parse(storedUser));
    }
  };

  const handleStoreSuccess = async () => {
    if (!user) return;
    try {
      const storesResponse = await lojaService.getByDono(user.id);
      setUserStores(storesResponse.data || []);
      
      let allProducts: Produto[] = [];
      for (const loja of storesResponse.data || []) {
        const productsResponse = await produtoService.getByLoja(loja.id);
        const produtos = productsResponse.data || [];
        allProducts = [...allProducts, ...produtos];
      }
      setUserProducts(allProducts);
    } catch (error) {
      console.error("Erro ao recarregar lojas:", error);
    }
  };

  const handleEditStore = (store: Loja) => {
    setSelectedStore(store);
    setShowEditStoreModal(true);
  };

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
          
          <div className={`perfil-avatar ${user.avatar ? '' : 'perfil-avatar-empty'}`}>
            {user.avatar ? (
              <img
                src={`${API_URL}/${user.avatar}`}
                alt="Avatar"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/150';
                }}
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            )}
          </div>

          <div className="perfil-info">
            <h1 className="perfil-name">{user.fullName}</h1>
            <p className="perfil-username">@ {user.username}</p>
            <p className="perfil-email">✉ {user.email}</p>
          </div>

          {isAuthenticated && (
            <button
              className="edit-perfil-btn"
              onClick={() => setShowEditModal(true)}
            >
              Editar Perfil
            </button>
          )}
        </div>
      </div>

      <div className="perfil-container">

        {/* Seção de Produtos */}
        <section className="perfil-section">
          {/* --- CORREÇÃO AQUI --- */}
          <div className="section-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 className="section-title">Produtos</h2>
              
              {/* Adicionei o botão de + aqui. Ele usa a mesma classe do botão de loja para manter o estilo roxo */}
              {isAuthenticated && (
                <button 
                  className="add-store-btn" 
                  title="Adicionar produto"
                  onClick={() => setShowAddProductModal(true)}
                >
                  +
                </button>
              )}
            </div>
            
            <Link href="/ver_mais" className="ver-mais-link">
              ver mais
            </Link>
          </div>
          {/* --------------------- */}

          <div className="carousel-wrapper">
            {userProducts.length > 0 ? (
              <div className="embla" ref={emblaRefProducts}>
                <div className="embla__container">
                  {userProducts.map((product) => (
                    <div key={product.id} className="embla__slide">
                      <Link
                        href={`/produtos/${product.id}`}
                        className="product-card-perfil"
                      >
                        <div className="product-image-wrapper">
                          <img
                            src={
                              product.id === 123 
                                ? "https://placehold.co/200x200?text=Celular" // Exemplo para seu teste
                                : `https://placehold.co/200x200/ccc/333?text=${encodeURIComponent(product.nome)}`
                            }
                            alt={product.nome}
                            onError={(e) => {
                              e.currentTarget.src = "https://placehold.co/200x200/ccc/333?text=Produto";
                            }}
                          />
                          <span className={`product-badge ${product.estoque && product.estoque > 0 ? "disponivel" : "indisponivel"}`}>
                            {product.estoque && product.estoque > 0 ? "DISPONÍVEL" : "ESGOTADO"}
                          </span>
                        </div>
                        <div className="product-info-perfil">
                          <h3>{product.nome}</h3>
                          <p className="product-price">R$ {product.preco.toFixed(2)}</p>
                          {product.loja && (
                            <p className="product-store">{product.loja.nome}</p>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                <p>Você ainda não cadastrou nenhum produto</p>
                <button 
                  className="empty-state-btn"
                  onClick={() => setShowAddProductModal(true)}
                >
                  Adicionar produto
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Seção de Lojas */}
        <section className="perfil-section">
          <div className="section-header">
            <h2 className="section-title">Lojas</h2>
            {isAuthenticated && (
              <button 
                className="add-store-btn" 
                title="Adicionar loja"
                onClick={() => setShowAddStoreModal(true)}
              >
                +
              </button>
            )}
          </div>

          <div className="carousel-wrapper">
            {userStores.length > 0 ? (
              <div className="embla" ref={emblaRefStores}>
                <div className="embla__container">
                  {userStores.map((store) => (
                    <div key={store.id} className="embla__slide">
                      <div 
                        className="store-item-carousel"
                        onClick={() => handleEditStore(store)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="store-logo">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                            <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/>
                          </svg>
                        </div>
                        <div className="store-details">
                          <h3 className="store-name">{store.nome}</h3>
                          {store.descricao && (
                            <p className="store-description">{store.descricao}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
                  <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/>
                </svg>
                <p>Crie sua primeira loja e comece a vender!</p>
                <button 
                  className="empty-state-btn"
                  onClick={() => setShowAddStoreModal(true)}
                >
                  Criar loja
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Seção de Avaliações */}
        <section className="perfil-section">
          <div className="section-header">
            <h2 className="section-title">Minhas Avaliações</h2>
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
                      <h4 className="review-user-name">
                        Avaliação para: {review.loja ? review.loja.nome : review.produto?.nome}
                      </h4>
                    </div>
                    <div className="review-rating">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? "star filled" : "star"}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="review-comment">{review.comentario}</p>
                  <div className="review-footer">
                    <small className="review-date">
                      {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                    </small>
                    {review.loja && (
                      <Link href={`/lojas/${review.loja.id}`} className="review-more">
                        Ver loja
                      </Link>
                    )}
                    {review.produto && (
                      <Link href={`/produtos/${review.produto.id}`} className="review-more">
                        Ver produto
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
                  <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
                </svg>
                <p>Você ainda não fez nenhuma avaliação</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={user}
        onSuccess={handleSuccess}
        onOpenChangePassword={() => {
          setShowEditModal(false);
          setShowPasswordModal(true);
        }}
      />

      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onBack={() => {
          setShowPasswordModal(false);
          setShowEditModal(true);
        }}
      />

      {user && (
        <AddStoreModal
          isOpen={showAddStoreModal}
          onClose={() => setShowAddStoreModal(false)}
          userId={user.id}
          onSuccess={handleStoreSuccess}
        />
      )}

      <AddProductModal
        isOpen={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        stores={userStores}
        onSuccess={handleStoreSuccess}
      />

      {selectedStore && (
        <EditStoreModal
          isOpen={showEditStoreModal}
          onClose={() => {
            setShowEditStoreModal(false);
            setSelectedStore(null);
          }}
          storeId={selectedStore.id}
          storeName={selectedStore.nome}
          storeDescription={selectedStore.descricao}
          storeCategoria={selectedStore.categoria}
          onSuccess={handleStoreSuccess}
        />
      )}
    </div>
  );
}