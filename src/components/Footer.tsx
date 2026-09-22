import React from 'react';
import { Phone, Mail, MapPin, Shield, CheckCircle2 } from 'lucide-react';
import logoImg from '../assets/logo.png';
import '../styles/Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand-column">
            <div className="footer-brand-logo">
              <div className="brand-icon">
                <img src={logoImg} alt="TemNet Logo" className="brand-logo-img" />
              </div>
              <div className="brand-text">
                <span className="brand-name">TemNet</span>
                <span className="brand-tagline">A sua conexão completa</span>
              </div>
            </div>

            <p className="footer-desc">
              Provedor de ultravelocidade em fibra óptica, Link Dedicado corporativo e infraestrutura completa 
              de redes e T.I para Alagoinhas, Aramari, Ouriçangas e empresas em toda a Bahia.
            </p>

            <div className="footer-contact-info">
              <div className="contact-line">
                <Phone size={15} />
                <span>(75) 3000-0000 / (75) 99999-9999</span>
              </div>
              <div className="contact-line">
                <Mail size={15} />
                <span>contato@temnet.com.br</span>
              </div>
              <div className="contact-line">
                <MapPin size={15} />
                <span>Sede: Alagoinhas - Bahia</span>
              </div>
            </div>
          </div>

          {/* Links: Serviços */}
          <div>
            <h4 className="footer-column-title">Serviços & T.I</h4>
            <ul className="footer-links-list">
              <li><a href="#servicos" className="footer-link">Banda Larga Residencial</a></li>
              <li><a href="#servicos" className="footer-link">Link Dedicado Empresarial</a></li>
              <li><a href="#servicos" className="footer-link">Cabeamento Estruturado</a></li>
              <li><a href="#servicos" className="footer-link">Manutenção de Hardware</a></li>
              <li><a href="#servicos" className="footer-link">Solução de Redes & Servidores</a></li>
              <li><a href="#planos" className="footer-link">Consultoria Corporativa</a></li>
            </ul>
          </div>

          {/* Links: Cidades */}
          <div>
            <h4 className="footer-column-title">Cidades Atendidas</h4>
            <ul className="footer-links-list">
              <li><a href="#cobertura" className="footer-link"><strong>1º Alagoinhas (Polo)</strong></a></li>
              <li><a href="#cobertura" className="footer-link">2º Aramari</a></li>
              <li><a href="#cobertura" className="footer-link">3º Ouriçangas</a></li>
              <li><a href="#cobertura" className="footer-link">Projetos Especiais na Bahia</a></li>
              <li><a href="#cobertura" className="footer-link">Consulta de Viabilidade</a></li>
            </ul>
          </div>

          {/* Institutional / Support */}
          <div>
            <h4 className="footer-column-title">Institucional & Suporte</h4>
            <ul className="footer-links-list">
              <li><a href="#como-funciona" className="footer-link">Como Funciona</a></li>
              <li><a href="#depoimentos" className="footer-link">Casos de Sucesso</a></li>
              <li><a href="#faq" className="footer-link">Central de Ajuda / FAQ</a></li>
              <li><a href="#hero" className="footer-link">Teste de Velocidade & Ping</a></li>
              <li><a href="#" className="footer-link">Área do Assinante</a></li>
              <li><a href="#" className="footer-link">Políticas de Privacidade</a></li>
            </ul>

            <div style={{ marginTop: '1.5rem' }}>
              <div className="anatel-badge">
                <Shield size={14} />
                <span>Outorga SCM Homologada Anatel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            &copy; {new Date().getFullYear()} TemNet Telecomunicações e Tecnologia. Todos os direitos reservados.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>CNPJ: 00.000.000/0001-00</span>
            <span>Feito com excelência para a Bahia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
