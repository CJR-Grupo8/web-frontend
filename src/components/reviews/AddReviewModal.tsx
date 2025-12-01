"use client";

import React, { useState } from "react";
import { X, Star } from "lucide-react";

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (review: { rating: number; text: string }) => Promise<void>;
}

export default function AddReviewModal({ isOpen, onClose, onSubmit }: AddReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!text.trim()) {
      setError("Por favor, escreva uma avaliação.");
      return;
    }

    if (text.trim().length < 10) {
      setError("A avaliação deve ter pelo menos 10 caracteres.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit?.({ rating, text: text.trim() });
      setText("");
      setRating(5);
      onClose();
    } catch (err) {
      setError("Erro ao enviar avaliação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white text-black w-full max-w-lg rounded-2xl p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Adicionar Avaliação</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Sua avaliação
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={32}
                    className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sua opinião
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Conte sua experiência com a loja..."
              className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6c63ff] resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {text.length} caracteres (mínimo 10)
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#6c63ff] text-white rounded-lg hover:bg-[#5a52d5] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
