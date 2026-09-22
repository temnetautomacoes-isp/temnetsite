import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Zap, Clock } from 'lucide-react';
import '../styles/CtaBanner.css';

interface CtaBannerProps {
  onOpenViability: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenViability }) => {
  return (
    <section className="section" style={{ paddingTop: '2rem' }}>
      <div className="container">
        <div className="cta-banner-wrapper card-glow-beam">
          <div className="cta-banner-radial-glow" />

          <div className="cta-banner-content">
            <h2 className="cta-banner-title">
              Pronto para transformar a conectividade da sua casa ou empresa?
            </h2>
            <p className="cta-banner-subtitle">
              Chega de sofrer com oscilações, lentidão e suporte robótico. Tenha a fibra de ultravelocidade 
              e a engenharia de T.I que você realmente merece com a <strong>TemNet</strong>.
            </p>

            <div className="cta-banner-buttons">
              <button 
                type="button" 
                onClick={onOpenViability}
                className="btn btn-primary btn-lg"
              >
                <span>Consultar Viabilidade Agora</span>
                <ArrowRight size={18} />
              </button>

              <a 
                href="https://wa.me/5575999999999?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20planos%20e%20soluções%20da%20TemNet" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                <MessageCircle size={18} />
                <span>Atendimento WhatsApp Direto</span>
              </a>
            </div>

            <div className="cta-banner-guarantees">
              <div className="guarantee-item">
                <ShieldCheck size={16} />
                <span>Instalação Homologada Anatel</span>
              </div>
              <div className="guarantee-item">
                <Zap size={16} />
                <span>Ativação Rápida em até 48h</span>
              </div>
              <div className="guarantee-item">
                <Clock size={16} />
                <span>Suporte Técnico Local</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
