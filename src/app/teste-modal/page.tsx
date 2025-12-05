"use client";

import React, { useState, useEffect } from "react";
import EditProfileModal from "../../components/EditProfileModal";
import { User } from "../../types/auth";

export default function TesteModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      alert("Você precisa fazer Login antes de testar essa página!");
      window.location.href = "/login";
    }
  }, []);

  const handleSuccess = () => {
    console.log("Sucesso! Recarregando dados...");
    // Aqui simulamos uma atualização dos dados
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
      color: "#fff"
    }}>
      <h1>Página de Teste do Modal</h1>
      
      {user && (
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <p>Usuário Logado: <strong>{user.fullName}</strong></p>
          <p>Email: {user.email}</p>
        </div>
      )}

      <button 
        onClick={() => setIsModalOpen(true)}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          background: "#6c63ff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Abrir Modal de Perfil
      </button>

      <EditProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        user={user}
        onSuccess={handleSuccess}
      />
    </div>
  );
}