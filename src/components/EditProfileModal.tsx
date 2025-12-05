"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import BaseModal from "./BaseModal"; 
import { userService } from "../services/api"; 
import { User } from "../types/auth";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSuccess?: () => void;
  onOpenChangePassword: () => void; 
}

export default function EditProfileModal({ 
  isOpen, 
  onClose, 
  user,
  onSuccess,
  onOpenChangePassword
}: EditProfileModalProps) {
  
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  
  const [preview, setPreview] = useState<string>("https://via.placeholder.com/150");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); 

  const [loading, setLoading] = useState(false);

  // Preenche o formulário ao abrir
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setUsername(user.username || "");
      setEmail(user.email || "");
      // Se tiver avatar vindo do banco, setar o preview aqui
    }
  }, [user, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Cria preview instantâneo
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await userService.updateProfile(user.id, { fullName, username, email });
      
      const userAtualizado = {
        ...user,
        fullName,
        username,
        email
      };
      
      localStorage.setItem("user", JSON.stringify(userAtualizado));

      alert("Perfil atualizado!");
      
      if (onSuccess) onSuccess();
      onClose();

    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    if (confirm("Tem certeza que deseja deletar sua conta?")) {
      try {
        await userService.deleteAccount(user.id);
        localStorage.clear();
        window.location.href = "/";
      } catch (error) {
        console.error(error);
        alert("Erro ao deletar conta.");
      }
    }
  };

  // --- Estilos Específicos (Pixel Perfect conforme imagem) ---
  
  const avatarStyle: React.CSSProperties = {
    position: 'relative',
    width: '110px',  
    height: '110px',
    margin: '0 auto 2rem auto', 
  };

  const imgStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid #fff', 
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)' 
  };

  const cameraBtnStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0, 
    right: '50%',
    transform: 'translateX(50%) translateY(30%)', 
    background: '#1a1a1a', 
    border: '3px solid #fff', 
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#fff',
    zIndex: 2,
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="">
        
        <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
        />

        <div style={avatarStyle}>
            <img 
                src={preview} 
                alt="Avatar" 
                style={imgStyle}
            />
            {/* Ícone da câmera ajustado */}
            <button style={cameraBtnStyle} onClick={triggerFileSelect}>
                <FaCamera size={15} />
            </button>
        </div>

        {/* Formulário */}
        <input 
            className="modal-input"
            placeholder="Nome"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
        />
        <input 
            className="modal-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <input 
            className="modal-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        {/* Botões empilhados */}
        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button className="modal-btn-base btn-danger" onClick={handleDelete}>
                Deletar conta
            </button>

            <button 
                className="modal-btn-base btn-outline"
                onClick={() => {
                    onClose(); 
                    onOpenChangePassword();
                }}
            >
                Alterar senha
            </button>

            <button className="modal-btn-base btn-primary" onClick={handleSave} disabled={loading}>
                {loading ? "Salvando..." : "Salvar"}
            </button>
        </div>
    </BaseModal>
  );
}