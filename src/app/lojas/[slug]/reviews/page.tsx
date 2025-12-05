"use client";

import Navbar from "@/components/NavBar";
import ReviewCard from "@/components/reviews/ReviewCard";

export default function Reviews() {

  // Mock temporário
  const reviews = [
    {
      name: "João Pedro",
      avatar: "/avatars/user1.png",
      rating: 5,
      comment: "Entrega super rápida e qualidade excelente!",
      date: "20 Fev 2025"
    },
    {
      name: "Mariana Souza",
      avatar: "/avatars/user2.png",
      rating: 4,
      comment: "Gostei muito, mas acho que poderia ter mais opções de cores.",
      date: "14 Fev 2025"
    },
    {
      name: "Lucas Andrade",
      avatar: "/avatars/user3.png",
      rating: 5,
      comment: "Atendimento impecável e produto top!",
      date: "10 Fev 2025"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Avaliações dos Clientes
        </h1>

        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
}
