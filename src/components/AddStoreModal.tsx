"use client";

import React, { useState, useRef } from "react";
import { FaImage } from "react-icons/fa";
import BaseModal from "./BaseModal";
import { lojaService } from "../services/api";

interface AddStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  onSuccess?: () => void;
}

const CATEGORIES = [
  { value: "mercado", label: "Mercado" },
  { value: "farmacia", label: "Farmácia" },
  { value: "beleza", label: "Beleza" },
  { value: "moda", label: "Moda" },
  { value: "eletronicos", label: "Eletrônicos" },
  { value: "jogos", label: "Jogos" },
  { value: "brinquedos", label: "Brinquedos" },
  { value: "casa", label: "Casa" },
  { value: "outros", label: "Outros" },
];

export default function AddStoreModal({
  isOpen,
  onClose,
  userId,
  onSuccess,
}: AddStoreModalProps) {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  // Estados para uploads
  const [profileImage, setProfileImage] = useState<string>("");
  const [logoImage, setLogoImage] = useState<string>("");
  const [bannerImage, setBannerImage] = useState<string>("");

  const profileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!nome.trim()) {
      alert("Por favor, preencha o nome da loja");
      return;
    }

    if (!categoria) {
      alert("Por favor, selecione uma categoria");
      return;
    }

    setLoading(true);
    try {
      await lojaService.create({
        nome: nome.trim(),
        descricao: descricao.trim() || undefined,
        categoria: categoria || undefined,
        donoId: userId,
      });

      alert("Loja criada com sucesso!");
      
      // Limpar formulário
      setNome("");
      setCategoria("");
      setDescricao("");
      setProfileImage("");
      setLogoImage("");
      setBannerImage("");

      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Erro ao criar loja.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    // Limpar formulário ao fechar
    setNome("");
    setCategoria("");
    setDescricao("");
    setProfileImage("");
    setLogoImage("");
    setBannerImage("");
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleCloseModal} title="Adicionar loja">
      <input
        type="file"
        ref={profileInputRef}
        onChange={(e) => handleFileChange(e, setProfileImage)}
        accept="image/*"
        style={{ display: "none" }}
      />
      <input
        type="file"
        ref={logoInputRef}
        onChange={(e) => handleFileChange(e, setLogoImage)}
        accept="image/svg+xml"
        style={{ display: "none" }}
      />
      <input
        type="file"
        ref={bannerInputRef}
        onChange={(e) => handleFileChange(e, setBannerImage)}
        accept="image/*"
        style={{ display: "none" }}
      />

      <div className="modal-store-content">
        <div className="modal-store-left">
          {/* Nome da loja */}
          <input
            className="modal-input"
            placeholder="Nome da loja"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            disabled={loading}
          />

          {/* Categoria */}
          <select
            className="modal-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            disabled={loading}
          >
            <option value="">Categoria</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          {/* Descrição (opcional) */}
          <textarea
            className="modal-textarea"
            placeholder="Descrição da loja (opcional)"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            disabled={loading}
            rows={3}
          />
        </div>

        <div className="modal-store-right">
          {/* Upload de foto de perfil */}
          <button
            className="modal-upload-btn"
            onClick={() => profileInputRef.current?.click()}
            disabled={loading}
          >
            <FaImage size={20} />
            <span>
              {profileImage ? "Foto de perfil anexada" : "Anexe a foto de perfil da sua loja"}
            </span>
          </button>

          {/* Upload de logo SVG */}
          <button
            className="modal-upload-btn"
            onClick={() => logoInputRef.current?.click()}
            disabled={loading}
          >
            <FaImage size={20} />
            <span>
              {logoImage ? "Logo anexado" : "Anexe a logo em SVG da sua loja"}
            </span>
          </button>

          {/* Upload de banner */}
          <button
            className="modal-upload-btn"
            onClick={() => bannerInputRef.current?.click()}
            disabled={loading}
          >
            <FaImage size={20} />
            <span>
              {bannerImage ? "Banner anexado" : "Anexe o banner de sua loja"}
            </span>
          </button>
        </div>
      </div>

      {/* Botão Adicionar */}
      <div style={{ marginTop: "1.5rem" }}>
        <button
          className="modal-btn-base btn-primary"
          onClick={handleSave}
          disabled={loading}
          style={{ borderRadius: "25px", padding: "14px" }}
        >
          {loading ? "Adicionando..." : "Adicionar"}
        </button>
      </div>
    </BaseModal>
  );
}
