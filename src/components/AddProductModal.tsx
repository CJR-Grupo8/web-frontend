"use client";

import React, { useState, useRef } from "react";
import { FaCamera } from "react-icons/fa"; // Ícone de câmera
import BaseModal from "./BaseModal";
import "../styles/components-css/add-product-modal.css"; // Importa o CSS novo

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  // Estados do Formulário
  const [name, setName] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Estado para as Imagens (Array de 4 posições: 0 é a principal, 1-3 são as pequenas)
  const [images, setImages] = useState<(string | null)[]>([null, null, null, null]);
  
  // Refs para os inputs de arquivo (um para cada box)
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Função para abrir o seletor de arquivo específico
  const triggerFileSelect = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  // Função ao selecionar arquivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file); // Preview temporário
      setImages(newImages);
    }
  };

  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    if (type === "inc") setQuantity(quantity + 1);
  };

  const handleSubmit = () => {
    console.log({ name, subcategory, description, price, quantity, images });
    alert("Produto adicionado (simulação)!");
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Adicionar Produto">
      
      {/* --- SEÇÃO DE FOTOS --- */}
      <div className="photos-container">
        
        {/* Foto Principal (Grande) */}
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

        {/* Fotos Menores (Grid) */}
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
      <input 
        className="modal-input" 
        placeholder="Nome do produto" 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select 
        className="modal-input" // Reusando a classe do input para ficar igual
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
        style={{ color: subcategory ? '#000' : '#888' }} // Placeholder visual
      >
        <option value="" disabled>Subcategoria</option>
        <option value="beleza">Beleza</option>
        <option value="eletronicos">Eletrônicos</option>
        <option value="moda">Moda</option>
      </select>

      <textarea 
        className="modal-textarea" // Precisa adicionar essa classe no BaseModal.css ou aqui
        placeholder="Descrição do produto"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        style={{ resize: 'none' }} // Impede redimensionar e quebrar layout
      />

      <input 
        className="modal-input" 
        placeholder="Preço do produto" 
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* --- CONTADOR --- */}
      <div className="quantity-control">
        <button className="qty-btn" onClick={() => handleQuantity("dec")}>−</button>
        <span className="qty-value">{quantity}</span>
        <button className="qty-btn" onClick={() => handleQuantity("inc")}>+</button>
      </div>

      {/* --- BOTÃO ADICIONAR --- */}
      <button 
        className="modal-btn-base btn-primary"
        onClick={handleSubmit}
        style={{ marginTop: '0' }}
      >
        Adicionar
      </button>

    </BaseModal>
  );
}