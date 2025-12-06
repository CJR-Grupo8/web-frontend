"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddProductModal from "./AddProductModal"; 

interface StoreEditButtonsProps {
  storeId: number;
  ownerId?: number;
}

export default function StoreEditButtons({ storeId, ownerId }: StoreEditButtonsProps) {
  const router = useRouter();
  const [canEdit, setCanEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkPermission = () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      try {
        const user = JSON.parse(storedUser);
        
        // Logs para ajudar a entender o que está acontecendo (pode remover depois)
        console.log("Verificando permissão:", {
           userId: user.id,
           ownerId: ownerId,
           match: Number(user.id) === Number(ownerId)
        });

        if (ownerId) {
          if (Number(user.id) === Number(ownerId)) {
            setCanEdit(true);
          }
        } else {
          // Se não passar ownerId, assume que é teste e libera (ou bloqueia, conforme sua regra)
          setCanEdit(true); 
        }
      } catch (error) {
        console.error("Erro ao verificar permissão:", error);
      }
    };

    checkPermission();
  }, [ownerId]);

  const handleProductAdded = () => {
    setIsModalOpen(false);
    router.refresh();
  };

  // --- MUDANÇA PRINCIPAL AQUI ---
  // Removemos o "if (!canEdit) return null" que matava o componente.
  // Agora renderizamos o fragmento vazio ou o modal, mantendo o componente vivo.
  
  return (
    <>
      {/* Só mostra os botões se tiver permissão */}
      {canEdit && (
        <div className="store-edit-buttons">
          <button className="edit-btn" title="Editar Loja">✎</button>
          
          <button 
            className="add-btn" 
            title="Adicionar Produto"
            onClick={() => setIsModalOpen(true)}
          >
            +
          </button>
        </div>
      )}

      {/* O Modal fica aqui fora, sempre pronto para ser chamado */}
      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        storeId={storeId}
        onSuccess={handleProductAdded}
      />
    </>
  );
}