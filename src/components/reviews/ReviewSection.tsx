"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import ReviewCardFull from "./ReviewCardFull";
import AddReviewModal from "./AddReviewModal";
import { useAuth } from "@/hooks/useAuth";

interface ReviewsSectionProps {
  slug: string;
}

export default function ReviewsSection({ slug }: ReviewsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([
    { 
      id: 1, 
      author: "Sofia Figueiredo", 
      avatar: "https://placehold.co/100x100/png", 
      rating: 5, 
      text: "Adorei o produto! Chegou rápido e funcionou muito bem.", 
      date: "04/10/2025",
      isAuthor: false
    },
    { 
      id: 2, 
      author: "Maria Silva", 
      avatar: "https://placehold.co/100x100/png", 
      rating: 5, 
      text: "Excelente atendimento! A loja é muito organizada e atenciosa.", 
      date: "05/10/2025",
      isAuthor: false
    },
    { 
      id: 3, 
      author: "João Pedro", 
      avatar: "https://placehold.co/100x100/png", 
      rating: 4, 
      text: "Produto muito bom! Recomendo para todos os meus amigos.", 
      date: "06/10/2025",
      isAuthor: false
    },
  ]);

  const handleAddReview = async (review: { rating: number; text: string }) => {
    const newReview = {
      id: reviews.length + 1,
      author: "Você",
      avatar: "https://placehold.co/100x100/png",
      rating: review.rating,
      text: review.text,
      date: new Date().toLocaleDateString("pt-BR"),
      isAuthor: true
    };
    setReviews([newReview, ...reviews]);
  };

  const handleDeleteReview = (id: number | string) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2);

  return (
    <section className="bg-black text-white py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Cabeçalho com score */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-8">Avaliações da Loja</h1>

          <div className="bg-zinc-900 rounded-2xl p-12 border border-zinc-800 inline-block">
            <div className="text-6xl font-bold mb-4">{averageRating}</div>

            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map(i => (
                <Star 
                  key={i} 
                  size={32}
                  className={i <= Math.round(Number(averageRating)) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}
                />
              ))}
            </div>

            <p className="text-zinc-400">
              Baseado em {reviews.length} {reviews.length === 1 ? "avaliação" : "avaliações"}
            </p>
          </div>
        </div>

        {/* Botão adicionar review */}
        {isAuthenticated && (
          <div className="flex justify-center mb-12">
            <button
              className="bg-[#6c63ff] hover:bg-[#5a52d5] text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
              onClick={() => setIsModalOpen(true)}
            >
              + Adicionar Avaliação
            </button>
          </div>
        )}

        {!isAuthenticated && (
          <div className="text-center mb-12 text-zinc-400">
            <p>Faça login para adicionar sua avaliação</p>
          </div>
        )}

        {/* Lista de avaliações */}
        <div className="space-y-6">
          {reviews.length > 0 ? (
            reviews.map((r) => (
              <ReviewCardFull 
                key={r.id} 
                {...r}
                onDelete={() => handleDeleteReview(r.id)}
              />
            ))
          ) : (
            <div className="text-center py-12 text-zinc-400">
              <p>Ainda não há avaliações. Seja o primeiro a avaliar!</p>
            </div>
          )}
        </div>

        <AddReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddReview}
        />

      </div>
    </section>
  );
}