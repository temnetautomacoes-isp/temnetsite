import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Activity, 
  ArrowRight, 
  Server, 
  Network, 
  Building2, 
  CheckCircle2, 
  Layers,
  ChevronRight
} from 'lucide-react';
import logoImg from '../assets/logo.png';
import '../styles/Hero.css';

interface HeroProps {
  onOpenViability: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenViability }) => {
  // Simulação de telemetria de latência ao vivo para conferir dinamismo SaaS
  const [currentPing, setCurrentPing] = useState(3.4);

  useEffect(() => {
    const interval = setInterval(() => {
      // Flutuação realista de 2.8ms a 4.2ms
      const randomPing = (2.8 + Math.random() * 1.4).toFixed(1);
      setCurrentPing(parseFloat(randomPing));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section" id="hero">
      <div className="hero-glow-radial" />

      <div className="container hero-content">
        {/* Top Tagline Badge */}
        <div className="hero-badge-container">
          <div style={{ width: '20px', height: '20px', background: '#ffffff', borderRadius: '5px', padding: '2px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={logoImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <span className="hero-badge-tag">TemNet Bahia</span>
          <span>A sua conexão completa</span>
          <ChevronRight size={14} className="text-dim" />
        </div>

        {/* Headline Principal */}
        <h1 className="hero-headline">
          Infraestrutura de Fibra, Link Dedicado e <span className="hero-headline-highlight">T.I de Alto Nível.</span>
        </h1>

        {/* Subtítulo Persuasivo */}
        <p className="hero-subtitle">
          Provedor de ultravelocidade e engenharia de redes para quem não aceita instabilidade. Conectividade simétrica, 
          cabeamento estruturado e suporte especializado presencial em <strong>Alagoinhas</strong>, <strong>Aramari</strong>, <strong>Ouriçangas</strong> e empresas em toda a <strong>Bahia</strong>.
        </p>

        {/* Grupo de CTAs */}
        <div className="hero-cta-group">
          <button 
            type="button" 
            onClick={onOpenViability}
            className="btn btn-primary btn-lg"
          >
            <span>Consultar Viabilidade na Minha Região</span>
            <ArrowRight size={18} />
          </button>

          <a href="#servicos" className="btn btn-secondary btn-lg">
            <span>Soluções Corporativas & T.I</span>
          </a>
        </div>

        {/* Telemetry Status Board (SaaS Live Network Card) */}
        <div className="hero-telemetry-card card-glow-beam">
          <div className="hero-telemetry-header">
            <div className="telemetry-status-pill">
              <div className="ping-dot-wrapper">
                <span className="ping-pulse" />
                <span className="ping-dot" />
              </div>
              <span>Rede Backbone TemNet: Operação Normal 100% Ativa</span>
            </div>

            <div className="telemetry-region-tags">
              <span>Nós de Conexão:</span>
              <span className="region-chip">Alagoinhas (Polo)</span>
              <span className="region-chip">Aramari</span>
              <span className="region-chip">Ouriçangas</span>
              <span className="region-chip">+ Bahia Corp</span>
            </div>
          </div>

          <div className="telemetry-stats-grid">
            <div className="telemetry-stat-item">
              <div className="stat-header">
                <Activity size={14} />
                <span>Latência Média</span>
              </div>
              <div className="stat-value">{currentPing} ms</div>
              <div className="stat-extra">Tempo de resposta local</div>
            </div>

            <div className="telemetry-stat-item">
              <div className="stat-header">
                <ShieldCheck size={14} />
                <span>Uptime da Rede</span>
              </div>
              <div className="stat-value">99.98%</div>
              <div className="stat-extra">Alta disponibilidade contínua</div>
            </div>

            <div className="telemetry-stat-item">
              <div className="stat-header">
                <Zap size={14} />
                <span>Garantia de Banda</span>
              </div>
              <div className="stat-value">100%</div>
              <div className="stat-extra">Nos planos de Link Dedicado</div>
            </div>

            <div className="telemetry-stat-item">
              <div className="stat-header">
                <Server size={14} />
                <span>Monitoramento NOC</span>
              </div>
              <div className="stat-value">24/7/365</div>
              <div className="stat-extra">Engenharia de rede ativa</div>
            </div>
          </div>
        </div>

        {/* Social Proof Trust Bar */}
        <div className="hero-social-proof">
          <div className="social-proof-label">
            Conexão confiada por empresas, indústrias e milhares de residências na Bahia
          </div>
          <div className="social-proof-logos">
            <div className="social-logo-item">
              <Building2 size={18} />
              <span>GRUPO BAHIA LOG</span>
            </div>
            <div className="social-logo-item">
              <Network size={18} />
              <span>ALAGOINHAS TELECOM</span>
            </div>
            <div className="social-logo-item">
              <Layers size={18} />
              <span>CLÍNICA INTEGRADA</span>
            </div>
            <div className="social-logo-item">
              <Server size={18} />
              <span>INDÚSTRIAS DO NORDESTE</span>
            </div>
            <div className="social-logo-item">
              <CheckCircle2 size={18} />
              <span>+15.000 USUÁRIOS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
