"use client";

import React, { useState } from "react";
import ReviewCardFull, { Reply } from "./ReviewCardFull";
import AddReviewModal from "./AddReviewModal";
import { useAuth } from "@/hooks/useAuth";
import { SendHorizontal } from "lucide-react";

interface ReviewsSectionProps {
  slug: string;
}

export default function ReviewsSection({ slug }: ReviewsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const [newCommentText, setNewCommentText] = useState("");

  const [reviews, setReviews] = useState([
    { 
      id: 1, 
      author: "Sofia Figueiredo", 
      avatar: "https://placehold.co/100x100/png?text=SF", 
      rating: 5, 
      text: "Adorei o produto. Funcionou muito na minha pele. Estou muito contente e com toda certeza irei comprar mais produtos da marca. Que orgulhooooooo! Arrasaram", 
      date: "1h", 
      replies: [] as Reply[]
    },
    { 
      id: 2, 
      author: "Maria Santos", 
      avatar: "https://placehold.co/100x100/png?text=MS", 
      rating: 5, 
      text: "Amei muito também!", 
      date: "1h",
      replies: [
        {
          id: 101,
          author: "Selena Gomez", 
          avatar: "https://placehold.co/100x100/png?text=SG", 
          text: "Muito obrigada pelo carinho! Nós da Rare Beauty ficamos felizes =)", 
          date: "1h",
          role: "owner"
        }
      ] as Reply[]
    },
  ]);

  const featuredReview = reviews[0];
  const otherReviews = reviews.slice(1);

  const handleAddReview = async () => {
    if (!newCommentText.trim()) return;
    const newReview = {
      id: Date.now(),
      author: "Você",
      avatar: "https://placehold.co/100x100/png?text=VC",
      rating: 5,
      text: newCommentText,
      date: "Agora",
      replies: []
    };
    setReviews([...reviews, newReview]);
    setNewCommentText("");
  };

  const handleReply = (reviewId: number | string, text: string) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? {
        ...r, replies: [...(r.replies || []), { id: Date.now(), author: "Você", avatar: "https://placehold.co/100x100", text, date: "Agora", role: "user" }]
    } : r));
  };

  return (
    <div className="flex flex-col w-full">
      
      {/*  PARTE: HERO (Fundo Preto) */}
      <section className="bg-black text-white py-12 px-6">
        <div className="max-w-3xl mx-auto">
            {featuredReview && (
                <ReviewCardFull 
                    {...featuredReview} 
                    isFeatured={true} 
                    onReply={handleReply}
                />
            )}
        </div>
      </section>

      {/*  PARTE: LISTA (Fundo Bege)*/}
      <section className="bg-[#F3F0E9] flex-1 py-10 px-6 min-h-[50vh]">
        <div className="max-w-3xl mx-auto">
            
            {/* Timeline Loop */}
            {otherReviews.map((r, index) => (
                <ReviewCardFull 
                    key={r.id} 
                    {...r}
                    isFeatured={false}
                    onReply={handleReply}
                    isLast={index === otherReviews.length - 1} 
                />
            ))}

            {/* Input Branco Flutuante */}
            <div className="mt-12 bg-white rounded-full shadow-sm p-2 flex items-center px-6">
                <input 
                    type="text"
                    placeholder="Adicionar comentário"
                    className="flex-1 outline-none text-gray-700 bg-transparent py-2"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddReview()}
                />
                <button 
                    onClick={handleAddReview} 
                    className="text-gray-400 hover:text-[#6c63ff]"
                >
                    <SendHorizontal size={20} />
                </button>
            </div>

        </div>
      </section>

      <AddReviewModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (val) => { setNewCommentText(val.text); handleAddReview(); }}
      />
    </div>
  );
}