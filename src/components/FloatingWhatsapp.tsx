import React from 'react';
import { MessageCircle } from 'lucide-react';
import '../styles/FloatingWhatsapp.css';

export const FloatingWhatsapp: React.FC = () => {
  return (
    <a 
      href="https://wa.me/5575999999999?text=Ol%C3%A1%2C%20gostaria%20de%20consultar%20a%20viabilidade%20e%20planos%20da%20TemNet"
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp-btn"
      aria-label="Atendimento via WhatsApp"
    >
      <div className="whatsapp-status-dot" />
      <MessageCircle size={18} />
      <span>Atendimento Rápido</span>
    </a>
  );
};
