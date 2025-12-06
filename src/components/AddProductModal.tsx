"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaCamera } from "react-icons/fa"; 
import BaseModal from "./BaseModal";
import { produtoService } from "@/services/api";
import "../styles/components-css/add-product-modal.css"; 

interface Store {
  id: number;
  nome: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  stores?: Store[];       // Lista de lojas (para o modo teste/admin)
  storeId?: number;       // ID fixo (para quando aberto dentro de uma loja)
  onSuccess?: () => void;
}

export default function AddProductModal({ 
  isOpen, 
  onClose, 
  stores = [], 
  storeId, // Recebe o ID fixo se estiver na página da loja
  onSuccess 
}: AddProductModalProps) {
  
  // Estados do Formulário
  const [name, setName] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedStoreId, setSelectedStoreId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Estados de Imagem
  const [images, setImages] = useState<(string | null)[]>([null, null, null, null]);
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null, null, null]);
  
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Limpa o form quando fecha ou abre
  useEffect(() => {
    if (isOpen) {
        // Se veio um storeId fixo via props, usa ele. Se não, reseta o seletor.
        if (storeId) {
            setSelectedStoreId(storeId.toString());
        }
    }
  }, [isOpen, storeId]);

  const triggerFileSelect = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);

      const newImageFiles = [...imageFiles];
      newImageFiles[index] = file;
      setImageFiles(newImageFiles);
    }
  };

  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    if (type === "inc") setQuantity(quantity + 1);
  };

  const handleSubmit = async () => {
    // Determina qual ID usar: o da prop (fixo) ou o do state (selecionado)
    const finalStoreId = storeId ? storeId.toString() : selectedStoreId;

    if (!name || !price || !finalStoreId || !imageFiles[0]) {
      alert("Preencha os campos obrigatórios (Nome, Preço, Loja e Imagem Principal).");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("nome", name);
      formData.append("descricao", description);
      formData.append("categoria", subcategory || "Outros");
      formData.append("preco", price);
      formData.append("quantidade", quantity.toString());
      // O backend espera o lojaId na URL (via service), mas enviar no body não faz mal
      formData.append("lojaId", finalStoreId); 

      // Envia apenas a imagem principal
      if (imageFiles[0]) {
        formData.append("file", imageFiles[0]);
      }

      // --- AQUI ESTÁ A CORREÇÃO PRINCIPAL ---
      // Passamos o finalStoreId para o serviço, que coloca na URL (?lojaId=...)
      await produtoService.create(formData, Number(finalStoreId));
      
      alert("Produto adicionado com sucesso!");
      
      if (onSuccess) onSuccess();
      onClose();
      
      // Reset form
      setName("");
      setSubcategory("");
      setDescription("");
      setPrice("");
      setQuantity(1);
      setImages([null, null, null, null]);
      setImageFiles([null, null, null, null]);
      if (!storeId) setSelectedStoreId(""); // Só limpa se for seleção manual

    } catch (error: any) {
      console.error("Erro ao criar produto:", error);
      const msg = error.response?.data?.message || "Erro ao criar produto.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Adicionar Produto">
      
      <div className="photos-container">
        {/* Foto Principal */}
        <div className="photo-upload-main" onClick={() => triggerFileSelect(0)}>
          <input 
            type="file" hidden accept="image/*"
            ref={(el) => { fileInputRefs.current[0] = el }}
            onChange={(e) => handleFileChange(e, 0)}
          />
          {images[0] ? (
            <img src={images[0]!} alt="Preview" className="preview-img" />
          ) : (
            <>
              <FaCamera size={32} />
              <span className="photo-text">Anexe as fotos do seu produto</span>
              <div className="add-icon-overlay">+</div>
            </>
          )}
        </div>

        {/* Fotos Menores */}
        <div className="photos-grid-small">
          {[1, 2, 3].map((index) => (
            <div key={index} className="photo-upload-small" onClick={() => triggerFileSelect(index)}>
              <input 
                type="file" hidden accept="image/*"
                ref={(el) => { fileInputRefs.current[index] = el }}
                onChange={(e) => handleFileChange(e, index)}
              />
              {images[index] ? (
                <img src={images[index]!} alt="Preview" className="preview-img" />
              ) : (
                <>
                  <FaCamera size={24} />
                  <div className="add-icon-overlay" style={{ right: '35%', bottom: '20%' }}>+</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- FORMULÁRIO --- */}
      
      {/* SÓ MOSTRA O SELECT SE NÃO TIVER ID FIXO (storeId) */}
      {!storeId && (
        <select 
            className="modal-input"
            value={selectedStoreId}
            onChange={(e) => setSelectedStoreId(e.target.value)}
            style={{ color: selectedStoreId ? '#000' : '#888' }}
        >
            <option value="" disabled>Selecione a Loja</option>
            {stores.map((store) => (
            <option key={store.id} value={store.id}>
                {store.nome}
            </option>
            ))}
        </select>
      )}

      <input 
        className="modal-input" 
        placeholder="Nome do produto" 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select 
        className="modal-input"
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
        style={{ color: subcategory ? '#000' : '#888' }}
      >
        <option value="" disabled>Subcategoria</option>
        <option value="beleza">Beleza</option>
        <option value="eletronicos">Eletrônicos</option>
        <option value="moda">Moda</option>
      </select>

      <textarea 
        className="modal-textarea"
        placeholder="Descrição do produto"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        style={{ resize: 'none' }}
      />

      <input 
        className="modal-input" 
        placeholder="Preço do produto" 
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <div className="quantity-control">
        <button className="qty-btn" onClick={() => handleQuantity("dec")}>−</button>
        <span className="qty-value">{quantity}</span>
        <button className="qty-btn" onClick={() => handleQuantity("inc")}>+</button>
      </div>

      <button 
        className="modal-btn-base btn-primary"
        onClick={handleSubmit}
        disabled={loading}
        style={{ marginTop: '0', opacity: loading ? 0.7 : 1 }}
      >
        {loading ? "Adicionando..." : "Adicionar"}
      </button>

    </BaseModal>
  );
}