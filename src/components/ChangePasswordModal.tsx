"use client";

import React, { useState } from "react";
import { FaKey } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import BaseModal from "./BaseModal";
import { userService } from "../services/api";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
  onBack,
}: ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    // 1. Validações básicas
    if (!oldPassword || !newPassword) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      alert("A nova senha e a confirmação não coincidem.");
      return;
    }
    
    // 2. Validação de força da senha
    if (newPassword.length < 8) {
      alert("A senha deve ter pelo menos 8 caracteres.");
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      alert("A senha deve conter pelo menos uma letra maiúscula.");
      return;
    }
    if (!/[a-z]/.test(newPassword)) {
      alert("A senha deve conter pelo menos uma letra minúscula.");
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      alert("A senha deve conter pelo menos um número.");
      return;
    }
    if (!/[^A-Za-z0-9]/.test(newPassword)) {
      alert("A senha deve conter pelo menos um caractere especial.");
      return;
    }

    setLoading(true);

    try {
      // 2. Recupera o usuário do localStorage para pegar o ID
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        alert("Erro: Sessão não encontrada. Faça login novamente.");
        return;
      }
      
      const user = JSON.parse(storedUser);

      // Envia o ID na URL e as senhas no corpo da requisição
      await userService.changePassword(user.id, {
        oldPassword: oldPassword,
        newPassword: newPassword
      });
      
      alert("Senha alterada com sucesso!");
      
      // Limpa os campos
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      // Fecha o modal
      onClose();
      
    } catch (error: any) {
      console.error("Erro ao mudar senha:", error);
      
      // Tenta pegar a mensagem de erro específica do backend (ex: "Senha antiga incorreta")
      const errorMessage = error.response?.data?.message || "Erro ao alterar a senha. Verifique se a senha antiga está correta.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // --- Estilos ---
  const iconContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
    position: "relative",
  };

  const keyIconStyle: React.CSSProperties = {
    fontSize: "4rem",
    color: "#8B5CF6",
    transform: "rotate(-45deg)",
  };

  const backButtonStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    top: "-3.5rem",
    background: "transparent",
    border: "none",
    fontSize: "1.8rem",
    cursor: "pointer",
    color: "#333",
    display: "flex",
    alignItems: "center",
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="">
      
      {/* Botão Voltar */}
      <div style={{ position: 'relative' }}>
        <button style={backButtonStyle} onClick={onBack}>
          <IoIosArrowBack />
        </button>
      </div>

      {/* Ícone Chave */}
      <div style={iconContainerStyle}>
        <div style={{
            position: 'relative',
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
             <FaKey style={keyIconStyle} />
        </div>
      </div>

      {/* Inputs */}
      <input
        type="password"
        className="modal-input"
        placeholder="Senha Antiga"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      
      <input
        type="password"
        className="modal-input"
        placeholder="Nova Senha"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      
      <input
        type="password"
        className="modal-input"
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {/* Botão Salvar */}
      <div style={{ marginTop: "1.5rem" }}>
        <button 
            className="modal-btn-base btn-primary" 
            onClick={handleSave} 
            disabled={loading}
            style={{ borderRadius: '25px', padding: '14px' }}
        >
          {loading ? "Salvando..." : "Salvar Senha"}
        </button>
      </div>

    </BaseModal>
  );
}