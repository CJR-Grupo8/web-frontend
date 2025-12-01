"use client";

import { Star, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface ReviewCardFullProps {
  id: number | string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  isAuthor?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ReviewCardFull({ 
  id,
  author, 
  avatar, 
  rating, 
  date, 
  text,
  isAuthor = false,
  onEdit,
  onDelete
}: ReviewCardFullProps) {
  const { isAuthenticated } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja deletar esta avaliação?")) {
      setIsDeleting(true);
      await new Promise(r => setTimeout(r, 300));
      onDelete?.();
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex gap-4">
      <img
        src={avatar}
        alt={author}
        className="w-14 h-14 rounded-full object-cover border border-zinc-700"
      />

      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-white">{author}</h3>
          <span className="text-sm text-zinc-500">{date}</span>
        </div>

        <div className="flex mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={18}
              className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}
            />
          ))}
        </div>

        <p className="text-zinc-300 leading-relaxed mb-4">{text}</p>

        {isAuthor && isAuthenticated && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={onEdit}
              className="flex items-center gap-2 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition-colors"
            >
              <Edit size={14} />
              Editar
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-2 text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors disabled:opacity-50"
            >
              <Trash2 size={14} />
              {isDeleting ? "Deletando..." : "Deletar"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
