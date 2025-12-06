"use client";

import React, { useState, useEffect } from "react";
import EditProfileModal from "../../components/EditProfileModal";
import ChangePasswordModal from "../../components/ChangePasswordModal"; 
// 1. Importe o novo modal
import AddProductModal from "../../components/AddProductModal";
import { User } from "../../types/auth";

export default function TesteModalPage() {

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  // 2. Novo estado para o modal de adicionar produto
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // alert("Você precisa fazer Login antes de testar essa página!");
    }
  }, []);

  const handleSuccess = () => {
    console.log("Sucesso! Recarregando dados...");
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  };

  return (
    <div style={{ 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      background: "#333", 
      color: "#fff",
      gap: "20px" // Adicionei gap para separar os botões
    }}>
      <h1>Página de Teste do Modal</h1>
      
      {user && (
        <div style={{ textAlign: "center" }}>
          <p>Usuário Logado: <strong>{user.fullName}</strong></p>
          <p>Email: {user.email}</p>
        </div>
      )}

      {/* Botão 1: Editar Perfil */}
      <button 
        onClick={() => setIsProfileOpen(true)}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          background: "#6c63ff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          minWidth: "300px"
        }}
      >
        Abrir Modal de Perfil
      </button>

      {/* Botão 2: Adicionar Produto (NOVO) */}
      <button 
        onClick={() => setIsAddProductOpen(true)}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          background: "#8B5CF6", // Roxo do design do modal
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          minWidth: "300px"
        }}
      >
        Abrir Adicionar Produto
      </button>

      {/* --- MODAIS --- */}

      <EditProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onSuccess={handleSuccess}
        onOpenChangePassword={() => {
            setIsProfileOpen(false); 
            setIsPasswordOpen(true); 
        }}
      />

      <ChangePasswordModal
        isOpen={isPasswordOpen}
        onClose={() => setIsPasswordOpen(false)}
        onBack={() => {
            setIsPasswordOpen(false); 
            setIsProfileOpen(true);   
        }}
      />

      {/* 3. Renderiza o novo modal */}
      <AddProductModal 
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
      />

    </div>
  );
}