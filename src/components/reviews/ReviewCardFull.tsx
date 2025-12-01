"use client";

import { Star, Send } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export interface Reply {
  id: number | string;
  author: string;
  avatar: string;
  text: string;
  date: string;
  role?: "owner" | "user";
}

interface ReviewCardFullProps {
  id: number | string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  replies?: Reply[];
  isFeatured?: boolean;
  onReply?: (id: number | string, text: string) => void;
  isLast?: boolean;
}

export default function ReviewCardFull({ 
  id,
  author, 
  avatar, 
  rating, 
  date, 
  text,
  replies = [],
  isFeatured = false,
  onReply,
  isLast = false
}: ReviewCardFullProps) {
  const { isAuthenticated } = useAuth();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim() && onReply) {
      onReply(id, replyText);
      setReplyText("");
      setShowReplyInput(false);
    }
  };

  // MODO HERO (PRETO) 
  if (isFeatured) {
    return (
      <div className="flex gap-4 items-start w-full">
         <img src={avatar} alt={author} className="w-16 h-16 rounded-full object-cover border-2 border-zinc-800" />
         
         <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-white">{author}</h3>
                    <span className="text-sm text-zinc-500">{date}</span>
                </div>
                {/* Estrelas alinhadas a direita ou junto ao nome */}
                <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={18} fill="#FACC15" className={i < rating ? "text-yellow-400" : "text-zinc-700"} />
                    ))}
                </div>
            </div>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
                {text}
            </p>
         </div>
      </div>
    );
  }

  //MODO LISTA 
  return (
    <div className="relative w-full mb-6">
      <div className="flex gap-5 relative">
        
        {/* Coluna da Esquerda: Avatar + Linha */}
        <div className="flex flex-col items-center relative">
            <img 
              src={avatar} 
              alt={author} 
              className="w-12 h-12 rounded-full object-cover z-10 border-2 border-[#F3F0E9] shadow-sm" 
            />
            {/* LINHA VERTICAL CINZA (Timeline) */}
            {!isLast && (
              <div className="absolute top-12 bottom-[-40px] w-[1px] bg-zinc-400 left-[1.5rem] -translate-x-1/2"></div>
            )}
        </div>

        {/* Coluna da Direita: Conteúdo */}
        <div className="flex-1 pb-4">
            <div className="flex flex-col items-start">
                <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="font-bold text-lg text-black">{author}</h3>
                    <span className="text-xs text-zinc-500 font-medium">{date}</span>
                </div>
                
                <p className="text-zinc-800 leading-relaxed mb-2 text-base">{text}</p>

                {/* Botão Responder */}
                {isAuthenticated && (
                   <button 
                     onClick={() => setShowReplyInput(!showReplyInput)}
                     className="text-xs font-semibold text-zinc-500 hover:text-black mb-4"
                   >
                     Responder
                   </button>
                )}
            </div>

            {/* Input Responder */}
            {showReplyInput && (
                <form onSubmit={handleSubmitReply} className="flex gap-2 mb-4">
                    <input 
                        className="flex-1 bg-white px-4 py-2 rounded-full text-sm outline-none border border-gray-200"
                        placeholder="Sua resposta..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        autoFocus
                    />
                    <button type="submit" className="text-[#6c63ff]"><Send size={18}/></button>
                </form>
            )}

            {/* RESPOSTAS (Indentadas) */}
            {replies.length > 0 && (
                <div className="mt-2 space-y-4">
                    {replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3 items-start">
                             <img 
                                src={reply.avatar} 
                                alt={reply.author} 
                                className="w-10 h-10 rounded-full object-cover" 
                             />
                             <div>
                                <div className="flex items-baseline gap-2">
                                    <h4 className="font-bold text-sm text-black">{reply.author}</h4>
                                    
                                    {/* Tag Dona da Loja (Roxo) */}
                                    {reply.role === "owner" && (
                                        <span className="text-[11px] font-bold text-[#6c63ff]">
                                            dona da loja
                                        </span>
                                    )}
                                    
                                    <span className="text-[10px] text-zinc-400">{reply.date}</span>
                                </div>
                                <p className="text-sm text-zinc-600 mt-1">{reply.text}</p>
                             </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}