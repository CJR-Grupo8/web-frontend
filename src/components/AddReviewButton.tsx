"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AddReviewModal from "./reviews/AddReviewModal";

export default function AddReviewButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleAddReview = async (review: { rating: number; text: string }) => {
    // Aqui você pode fazer a chamada à API para salvar a review
    console.log("Review adicionada:", review);
    // setReviews([...reviews, newReview]);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#6c63ff] hover:bg-[#5a52d5] text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
        >
          + Adicionar Review
        </button>
      </div>

      <AddReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddReview}
      />
    </>
  );
}
