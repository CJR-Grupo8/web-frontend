"use client";

import React from "react";
import BaseModal from "./BaseModal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isDanger = false,
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
      <p style={{ 
        fontSize: "1rem", 
        color: "#555", 
        textAlign: "center", 
        marginBottom: "2rem",
        lineHeight: "1.6"
      }}>
        {message}
      </p>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          className="modal-btn-base btn-outline"
          onClick={onClose}
          style={{ flex: 1 }}
        >
          {cancelText}
        </button>
        <button
          className={`modal-btn-base ${isDanger ? "btn-danger" : "btn-primary"}`}
          onClick={handleConfirm}
          style={{ flex: 1 }}
        >
          {confirmText}
        </button>
      </div>
    </BaseModal>
  );
}
