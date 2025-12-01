"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import ReviewCard from './ReviewCard';
import AddReviewModal from './AddReviewModal';
import { useAuth } from '@/hooks/useAuth';

interface ReviewsSectionProps {
    storeId: string;
}

export default function ReviewsSection({ storeId }: ReviewsSectionProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isAuthenticated } = useAuth(); //hook real

    // Mock
    const reviews = [
        { id: 1, author: 'Sofia Figueiredo', avatar: 'https://placehold.co/100x100/png', rating: 5, text: 'Adorei o produto, funcionou muito na minha pele.', date: '04/10' },
        { id: 2, author: 'Maria Silva', avatar: 'https://placehold.co/100x100/png', rating: 5, text: 'Amei muito também! O atendimento foi excelente.', date: '05/10' },
        { id: 3, author: 'João Pedro', avatar: 'https://placehold.co/100x100/png', rating: 4, text: 'Entrega rápida e produto conforme o anúncio.', date: '06/10' },
    ];

    const handleAddReview = (rating: number, comment: string) => {
        console.log("Enviando review para API:", { rating, comment, storeId });
    };

    return (
        <section className="bg-black text-white py-16 px-4 md:px-8 border-t border-gray-900">
            <div className="max-w-7xl mx-auto">

                {/* Cabeçalho da Seção */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Reviews e Comentários</h2>
                    <div className="flex flex-col items-center">
                        <span className="text-6xl font-bold mb-2">4.75</span>
                        <div className="flex gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="fill-yellow-400 text-yellow-400" size={24} />
                            ))}
                        </div>
                        {/* Link para a página completa */}
                        <Link
                            href={`/lojas/${storeId}/reviews`}
                            className="text-[#6c63ff] text-sm hover:underline mt-1 font-medium transition-colors"
                        >
                            ver mais (120 reviews)
                        </Link>
                    </div>
                </div>

                {/* Lista Horizontal de Cards */}
                <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
                    {reviews.map((review) => (
                        <div key={review.id} className="snap-center">
                            <ReviewCard
                                id={review.id}
                                author={review.author}
                                avatar={review.avatar}
                                rating={review.rating}
                                text={review.text}
                                date={review.date}
                            />
                        </div>
                    ))}
                </div>

                {/* Botão Adicionar Review Condicional: Só aparece se Logado */}
                {isAuthenticated && (
                    <div className="flex justify-center mt-12">
                        <button
                            className="bg-[#6c63ff] hover:bg-[#5a52d5] text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Adicionar Review
                        </button>
                    </div>
                )}

                <AddReviewModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddReview}
                />

            </div>
        </section>
    );
}