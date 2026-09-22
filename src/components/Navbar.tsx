import React, { useState } from 'react';
import { Menu, X, Radio, MapPin, ArrowRight } from 'lucide-react';
import '../styles/Navbar.css';

interface NavbarProps {
  onOpenViability: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenViability }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="navbar-wrapper">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a href="#" className="navbar-brand" aria-label="TemNet Início">
          <div className="brand-icon">
            <Radio size={20} strokeWidth={2.5} />
          </div>
          <div className="brand-text">
            <span className="brand-name">TemNet</span>
            <span className="brand-tagline">A sua conexão completa</span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav aria-label="Navegação Principal">
          <ul className="navbar-links">
            <li><a href="#beneficios" className="nav-link">Benefícios</a></li>
            <li><a href="#como-funciona" className="nav-link">Como Funciona</a></li>
            <li><a href="#servicos" className="nav-link">Serviços & T.I</a></li>
            <li><a href="#cobertura" className="nav-link">Cidades</a></li>
            <li><a href="#planos" className="nav-link">Planos</a></li>
            <li><a href="#depoimentos" className="nav-link">Depoimentos</a></li>
            <li><a href="#faq" className="nav-link">FAQ</a></li>
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          <div className="city-badge-nav" title="Cidades polo com rede prioritária">
            <MapPin size={13} />
            <span>Alagoinhas • Aramari • Ouriçangas</span>
          </div>

          <button 
            type="button" 
            onClick={onOpenViability}
            className="btn btn-primary btn-sm"
          >
            <span>Consultar Viabilidade</span>
            <ArrowRight size={14} />
          </button>

          <button
            type="button"
            className="mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu">
          <a href="#beneficios" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Benefícios</a>
          <a href="#como-funciona" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Como Funciona</a>
          <a href="#servicos" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Serviços & Infraestrutura de T.I</a>
          <a href="#cobertura" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Cidades Atendidas (Bahia)</a>
          <a href="#planos" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Planos e Preços</a>
          <a href="#depoimentos" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Depoimentos</a>
          <a href="#faq" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Perguntas Frequentes</a>
          <button 
            type="button" 
            onClick={() => { setMobileMenuOpen(false); onOpenViability(); }}
            className="btn btn-primary"
            style={{ marginTop: '0.5rem', width: '100%' }}
          >
            <span>Verificar Viabilidade na Minha Rua</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </header>
  );
};
