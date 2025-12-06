'use client';

import { useState } from "react";

export default function AddReviewModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) {
  if (!open) return null;

  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Nova avaliação</h2>

        <label className="text-sm font-medium">Nota:</label>
        <input
          type="number"
          min="1"
          max="5"
          className="border p-2 rounded w-full mb-4"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />

        <label className="text-sm font-medium">Comentário:</label>
        <textarea
          className="border p-2 rounded w-full h-24"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="px-3 py-2">Cancelar</button>
          <button
            onClick={() => {
              onSubmit({ rating, message });
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
