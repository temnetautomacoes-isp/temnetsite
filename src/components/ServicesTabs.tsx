import React, { useState } from 'react';
import { 
  Wifi, 
  ShieldCheck, 
  Network, 
  Wrench, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import { ServiceCategory } from '../types';
import '../styles/ServicesTabs.css';

interface ServicesTabsProps {
  onOpenViability: () => void;
}

export const ServicesTabs: React.FC<ServicesTabsProps> = ({ onOpenViability }) => {
  const [activeTab, setActiveTab] = useState<ServiceCategory>('broadband');

  const currentService = SERVICES_DATA.find(s => s.id === activeTab) || SERVICES_DATA[0];

  const getTabIcon = (id: ServiceCategory) => {
    switch (id) {
      case 'broadband': return <Wifi size={17} />;
      case 'dedicated': return <ShieldCheck size={17} />;
      case 'infra': return <Network size={17} />;
      case 'maintenance': return <Wrench size={17} />;
    }
  };

  return (
    <section className="section" id="servicos">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} />
            <span>Soluções Completas</span>
          </div>
          <h2 className="section-title">
            Do acesso ultrarrápido à infraestrutura de T.I
          </h2>
          <p className="section-subtitle">
            Conectamos você com fibra óptica e resolvemos todas as demandas de hardware, cabeamento estruturado e rede da sua empresa.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="services-nav-tabs">
          {SERVICES_DATA.map((service) => (
            <button
              key={service.id}
              type="button"
              className={`service-tab-btn ${activeTab === service.id ? 'active' : ''}`}
              onClick={() => setActiveTab(service.id)}
            >
              {getTabIcon(service.id)}
              <span>{service.title.split(' ')[0]} {service.title.split(' ')[1]}</span>
            </button>
          ))}
        </div>

        {/* Active Tab Showcase */}
        <div className="service-showcase-card card-glow-beam">
          <div className="service-showcase-grid">
            <div className="service-content-left">
              <span className="service-tagline">{currentService.tagline}</span>
              <h3 className="service-title">{currentService.title}</h3>
              <p className="service-description">{currentService.description}</p>

              <div className="service-features-grid">
                {currentService.features.map((feature, idx) => (
                  <div key={idx} className="service-feature-row">
                    <CheckCircle2 size={18} className="text-secondary" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="service-ideal-for">
                <strong>Ideal para: </strong> {currentService.idealFor}
              </div>

              <div>
                <button 
                  type="button" 
                  onClick={onOpenViability}
                  className="btn btn-primary"
                >
                  <span>Solicitar Orçamento / Ativação</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Metric Card */}
            <div className="service-metrics-box">
              <div className="metrics-box-title">
                Especificações Técnicas
              </div>

              <div className="metrics-list">
                {currentService.metrics.map((metric, idx) => (
                  <div key={idx} className="metric-item">
                    <span className="metric-label">{metric.label}</span>
                    <span className="metric-value">{metric.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Suporte Local Presencial
                </div>
                <div style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 600 }}>
                  Alagoinhas • Aramari • Ouriçangas e Bahia
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
