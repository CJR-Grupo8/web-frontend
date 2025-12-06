"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { userService, lojaService, reviewService } from "@/services/api";

type User = {
  id: number;
  fullName: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
};

type Loja = {
  id: number;
  nome: string;
  descricao?: string;
  categoria?: string;
  createdAt: string;
};

type Review = {
  id: number;
  rating: number;
  comment?: string;
  createdAt: string;
  loja?: {
    id: number;
    nome: string;
  };
  produto?: {
    id: number;
    nome: string;
  };
};

const API_URL = "http://localhost:3001";

/**
 * Página Pública de Usuário
 * 
 * Esta página exibe informações públicas de um usuário específico.
 * Características:
 * - Somente visualização (read-only)
 * - Não permite edição por outros usuários
 * - Exibe perfil público, lojas e avaliações do usuário
 * - Acessível via URL: /usuario/[username]
 */
export default function UsuarioPublicoPage() {
  const params = useParams();
  const router = useRouter();
  const username = params?.slugs as string | undefined;

  const [user, setUser] = useState<User | null>(null);
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"lojas" | "avaliacoes">("lojas");

  useEffect(() => {
    const loadUserData = async () => {
      if (!username) return;

      try {
        setLoading(true);

        // Buscar dados do usuário por username
        const userResponse = await userService.findByUsername(username);
        setUser(userResponse.data);

        // Buscar lojas do usuário
        const lojasResponse = await lojaService.getByDono(userResponse.data.id);
        setLojas(lojasResponse.data);

        // Buscar reviews do usuário
        const reviewsResponse = await reviewService.getByAuthor(userResponse.data.id);
        setReviews(reviewsResponse.data);

      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [username, router]);

  if (loading) {
    return (
      <div>
        <NavBar />
        <div style={{ textAlign: "center", padding: "4rem", color: "#666" }}>
          Carregando perfil...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const avatarUrl = user.avatar 
    ? `${API_URL}/${user.avatar}` 
    : "https://via.placeholder.com/150/6c63ff/ffffff?text=" + user.fullName.substring(0, 2).toUpperCase();

  return (
    <div className="usuario-publico-page">
      <NavBar />

      {/* Hero Section com Avatar e Info */}
      <div className="usuario-hero">
        <div className="usuario-hero-content">
          <div className="usuario-avatar">
            <img src={avatarUrl} alt={user.fullName} />
          </div>
          <div className="usuario-info">
            <h1 className="usuario-name">{user.fullName}</h1>
            <p className="usuario-username">@{user.username}</p>
            <p className="usuario-member-since">
              Membro desde {new Date(user.createdAt).toLocaleDateString("pt-BR", {
                month: "long",
                year: "numeric"
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="usuario-tabs">
        <button
          className={`usuario-tab ${activeTab === "lojas" ? "active" : ""}`}
          onClick={() => setActiveTab("lojas")}
        >
          Lojas ({lojas.length})
        </button>
        <button
          className={`usuario-tab ${activeTab === "avaliacoes" ? "active" : ""}`}
          onClick={() => setActiveTab("avaliacoes")}
        >
          Avaliações ({reviews.length})
        </button>
      </div>

      {/* Container de Conteúdo */}
      <div className="usuario-container">

        {/* Conteúdo das Tabs */}
        <div className="usuario-content">
          {activeTab === "lojas" && (
            <div className="usuario-section">
              {lojas.length === 0 ? (
                <div className="empty-state">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
                    <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/>
                  </svg>
                  <p>Este usuário ainda não possui lojas.</p>
                </div>
              ) : (
                <div className="lojas-grid">
                  {lojas.map((loja) => {
                    const slug = loja.nome.toLowerCase()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/^-+|-+$/g, '');
                    
                    return (
                      <Link
                        href={`/lojas/usuario/${slug}`}
                        key={loja.id}
                        className="loja-card"
                      >
                      <div className="loja-card-header">
                        <div className="loja-placeholder">
                          {loja.nome.substring(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="loja-card-body">
                        <h3>{loja.nome}</h3>
                        {loja.categoria && (
                          <span className="loja-category">{loja.categoria}</span>
                        )}
                        {loja.descricao && (
                          <p className="loja-description">
                            {loja.descricao.length > 80
                              ? `${loja.descricao.substring(0, 80)}...`
                              : loja.descricao}
                          </p>
                        )}
                      </div>
                    </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "avaliacoes" && (
            <div className="usuario-section">
              {reviews.length === 0 ? (
                <div className="empty-state">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  <p>Este usuário ainda não fez avaliações.</p>
                </div>
              ) : (
                <div className="reviews-list">
                  {reviews.map((review) => (
                    <div key={review.id} className="review-card">
                      <div className="review-header">
                        <div className="review-stars">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </div>
                        <span className="review-date">
                          {new Date(review.createdAt).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      {review.comment && (
                        <p className="review-comment">{review.comment}</p>
                      )}
                      <div className="review-target">
                        {review.loja && (
                          <span>Avaliou a loja: <strong>{review.loja.nome}</strong></span>
                        )}
                        {review.produto && (
                          <span>Avaliou o produto: <strong>{review.produto.nome}</strong></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .usuario-publico-page {
          min-height: 100vh;
          background: #f5f5f0;
          font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
        }

        /* Hero Section - Só essa parte é preta */
        .usuario-hero {
          background: #000;
          padding: 3rem 2rem;
        }

        .usuario-hero-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .usuario-avatar {
          flex-shrink: 0;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          overflow: hidden;
          border: 5px solid #b4ff39;
          box-shadow: 0 8px 24px rgba(180, 255, 57, 0.3);
        }

        .usuario-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .usuario-info {
          flex: 1;
        }

        .usuario-name {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: #fff;
        }

        .usuario-username {
          font-size: 1.2rem;
          color: #b4ff39;
          margin: 0.25rem 0;
          font-weight: 500;
        }

        .usuario-member-since {
          font-size: 1rem;
          color: #999;
          margin: 0.5rem 0 0 0;
        }

        /* Tabs - Fundo claro */
        .usuario-tabs {
          background: #fff;
          display: flex;
          gap: 0;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          border-bottom: 2px solid #e5e5e5;
        }

        .usuario-tab {
          background: transparent;
          border: none;
          color: #666;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          border-bottom: 3px solid transparent;
          position: relative;
          bottom: -2px;
        }

        .usuario-tab:hover {
          color: #000;
        }

        .usuario-tab.active {
          color: #7C3AED;
          border-bottom-color: #7C3AED;
        }

        /* Container - Fundo claro */
        .usuario-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          background: #f5f5f0;
        }

        .usuario-content {
          min-height: 400px;
        }

        .usuario-section {
          padding: 2rem 0;
        }

        /* Lojas Grid - Cards brancos */
        .lojas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .loja-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .loja-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(124, 58, 237, 0.2);
        }

        .loja-card-header {
          height: 150px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loja-placeholder {
          font-size: 3rem;
          font-weight: 700;
          color: white;
        }

        .loja-card-body {
          padding: 1.5rem;
        }

        .loja-card-body h3 {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #1a1a1a;
        }

        .loja-category {
          display: inline-block;
          padding: 0.4rem 1rem;
          background: #f0f0f0;
          border-radius: 20px;
          font-size: 0.9rem;
          color: #7C3AED;
          margin-bottom: 0.75rem;
          font-weight: 500;
        }

        .loja-description {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.6;
          margin-top: 0.75rem;
        }

        /* Reviews List - Cards brancos */
        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .review-card {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .review-stars {
          font-size: 1.3rem;
          color: #facc15;
        }

        .review-date {
          font-size: 0.9rem;
          color: #999;
        }

        .review-comment {
          font-size: 1rem;
          color: #333;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .review-target {
          font-size: 0.95rem;
          color: #666;
        }

        .review-target strong {
          color: #7C3AED;
          font-weight: 600;
        }

        /* Empty State */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
          color: #999;
        }

        .empty-state svg {
          margin-bottom: 1.5rem;
          opacity: 0.3;
        }

        .empty-state p {
          font-size: 1.1rem;
          color: #999;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .usuario-hero-content {
            flex-direction: column;
            text-align: center;
            padding: 2rem 1rem;
          }

          .usuario-avatar {
            width: 140px;
            height: 140px;
          }

          .usuario-name {
            font-size: 2rem;
          }

          .usuario-tabs {
            padding: 0 1rem;
          }

          .usuario-tab {
            padding: 0.75rem 1rem;
            font-size: 1rem;
          }

          .lojas-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .usuario-container {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}
