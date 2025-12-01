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
      
      // 3. Avisa a tela pai
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

  const avatarStyle: React.CSSProperties = {
    position: 'relative',
    width: '100px',
    height: '100px',
    margin: '0 auto 1.5rem auto',
  };

  const imgStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid #fff'
  };

  const cameraBtnStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    background: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
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
            <button style={cameraBtnStyle} onClick={triggerFileSelect}>
                <FaCamera size={14} color="#333" />
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

        <div style={{ marginTop: '1rem' }}>
            <button className="btn-danger" onClick={handleDelete}>
                Deletar conta
            </button>

            <button 
                className="btn-outline"
                onClick={() => {
                    onClose(); 
                    onOpenChangePassword();
                }}
            >
                Alterar senha
            </button>

            <button className="btn-primary" onClick={handleSave} disabled={loading}>
                {loading ? "Salvando..." : "Salvar"}
            </button>
        </div>
    </BaseModal>
  );
}