"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { lojaService } from "@/services/api";
import "@/styles/app-css/lojas.css";

type Loja = {
  id: number;
  nome: string;
  descricao?: string;
  categoria?: string;
  createdAt: string;
  dono?: {
    id: number;
    fullName: string;
    username: string;
  };
};

export default function LojasPage() {
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("todas");

  useEffect(() => {
    loadLojas();
  }, []);

  const loadLojas = async () => {
    try {
      setLoading(true);
      const response = await lojaService.getAll();
      setLojas(response.data);
    } catch (error) {
      console.error("Erro ao carregar lojas:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLojas = filter === "todas" 
    ? lojas 
    : lojas.filter(loja => loja.categoria === filter);

  const categories = [
    { value: "todas", label: "Todas" },
    { value: "mercado", label: "Mercado" },
    { value: "farmacia", label: "Farmácia" },
    { value: "beleza", label: "Beleza" },
    { value: "moda", label: "Moda" },
    { value: "eletronicos", label: "Eletrônicos" },
    { value: "jogos", label: "Jogos" },
    { value: "brinquedos", label: "Brinquedos" },
    { value: "casa", label: "Casa" },
    { value: "outros", label: "Outros" },
  ];

  return (
    <div>
      <NavBar />
      
      <div className="lojas-container">
        <div className="lojas-header">
          <h1>Lojas</h1>
          <p>Explore todas as lojas disponíveis</p>
        </div>

        {/* Filtros */}
        <div className="lojas-filters">
          {categories.map(cat => (
            <button
              key={cat.value}
              className={`filter-btn ${filter === cat.value ? "active" : ""}`}
              onClick={() => setFilter(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de Lojas */}
        {loading ? (
          <div className="loading-state">
            <p>Carregando lojas...</p>
          </div>
        ) : filteredLojas.length === 0 ? (
          <div className="empty-state">
            <p>Nenhuma loja encontrada nesta categoria.</p>
          </div>
        ) : (
          <div className="lojas-grid">
            {filteredLojas.map(loja => {
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
                <div className="loja-card-image">
                  <div className="loja-placeholder">
                    {loja.nome.substring(0, 2).toUpperCase()}
                  </div>
                </div>
                <div className="loja-card-content">
                  <h3>{loja.nome}</h3>
                  {loja.categoria && (
                    <span className="loja-category">
                      {loja.categoria}
                    </span>
                  )}
                  {loja.descricao && (
                    <p className="loja-description">
                      {loja.descricao.length > 100 
                        ? `${loja.descricao.substring(0, 100)}...` 
                        : loja.descricao}
                    </p>
                  )}
                  {loja.dono && (
                    <p className="loja-owner">
                      por {loja.dono.fullName}
                    </p>
                  )}
                </div>
              </Link>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        .lojas-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 2rem;
        }

        .lojas-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .lojas-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .lojas-header p {
          font-size: 1.1rem;
          color: #666;
        }

        .lojas-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .filter-btn {
          padding: 0.6rem 1.5rem;
          border-radius: 25px;
          border: 2px solid #e0e0e0;
          background: white;
          color: #666;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          border-color: #6c63ff;
          color: #6c63ff;
        }

        .filter-btn.active {
          background: #6c63ff;
          color: white;
          border-color: #6c63ff;
        }

        .lojas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .loja-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
          color: inherit;
        }

        .loja-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }

        .loja-card-image {
          height: 180px;
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

        .loja-card-content {
          padding: 1.5rem;
        }

        .loja-card-content h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #1a1a1a;
        }

        .loja-category {
          display: inline-block;
          padding: 0.3rem 0.8rem;
          background: #f0f0f0;
          border-radius: 12px;
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 0.75rem;
        }

        .loja-description {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.5;
          margin: 0.75rem 0;
        }

        .loja-owner {
          font-size: 0.9rem;
          color: #999;
          margin-top: 0.75rem;
        }

        .loading-state,
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: #666;
        }

        @media (max-width: 768px) {
          .lojas-grid {
            grid-template-columns: 1fr;
          }

          .lojas-header h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
