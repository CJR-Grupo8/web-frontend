"use client";

import React from 'react';
import { X } from 'lucide-react';

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

export default function AddReviewModal({ isOpen, onClose }: AddReviewModalProps) {
  // Se não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white text-black w-full max-w-sm rounded-2xl p-6 relative shadow-2xl">
        
        {/* Botão Fechar */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-2">Em Breve!</h2>
          <p className="text-gray-500">
            A funcionalidade de adicionar avaliações estará disponível em breve.
          </p>
          
          <button 
            onClick={onClose}
            className="mt-6 bg-[#6c63ff] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#5a52d5]"
          >
            Entendi
          </button>
        </div>

      </div>
    </div>
  );
}