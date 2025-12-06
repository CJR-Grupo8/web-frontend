"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaImage } from "react-icons/fa";
import BaseModal from "./BaseModal";
import ConfirmModal from "./ConfirmModal";
import { lojaService } from "../services/api";

interface EditStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeId: number;
  storeName: string;
  storeDescription?: string;
  storeCategoria?: string;
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

export default function EditStoreModal({
  isOpen,
  onClose,
  storeId,
  storeName,
  storeDescription,
  storeCategoria,
  onSuccess,
}: EditStoreModalProps) {
  const [nome, setNome] = useState(storeName);
  const [categoria, setCategoria] = useState(storeCategoria || "beleza");
  const [descricao, setDescricao] = useState(storeDescription || "");
  const [loading, setLoading] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Estados para uploads
  const [profileImage, setProfileImage] = useState<string>("");
  const [logoImage, setLogoImage] = useState<string>("");
  const [bannerImage, setBannerImage] = useState<string>("");

  const profileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setNome(storeName);
      setCategoria(storeCategoria || "beleza");
      setDescricao(storeDescription || "");
      setProfileImage("");
      setLogoImage("");
      setBannerImage("");
    }
  }, [isOpen, storeName, storeDescription, storeCategoria]);

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

    setLoading(true);
    try {
      await lojaService.update(storeId, {
        nome: nome.trim(),
        descricao: descricao.trim() || undefined,
        categoria: categoria || undefined,
      });

      alert("Loja atualizada com sucesso!");

      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Erro ao atualizar loja.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await lojaService.delete(storeId);
      alert("Loja deletada com sucesso!");
      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Erro ao deletar loja.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Editar loja">
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

      {/* Botões de ação */}
      <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "8px" }}>
        <button
          className="modal-btn-base btn-danger"
          onClick={handleDeleteClick}
          disabled={loading}
        >
          DELETAR
        </button>

        <button
          className="modal-btn-base btn-primary"
          onClick={handleSave}
          disabled={loading}
          style={{ borderRadius: "25px", padding: "14px" }}
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </div>

      {/* Modal de Confirmação de Delete */}
      <ConfirmModal
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={handleDeleteConfirm}
        title="Deletar Loja"
        message="Tem certeza que deseja deletar esta loja? Esta ação não pode ser desfeita e todos os produtos associados serão removidos."
        confirmText="Deletar"
        cancelText="Cancelar"
        isDanger={true}
      />
    </BaseModal>
  );
}
