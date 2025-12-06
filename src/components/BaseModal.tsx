"use client";

import React, { ReactNode, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import "../styles/components-css/base-modal.css";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode; 
}

export default function BaseModal({ isOpen, onClose, title, children }: BaseModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button className="close-btn" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        
        {children}
      </div>
    </div>
  );
}