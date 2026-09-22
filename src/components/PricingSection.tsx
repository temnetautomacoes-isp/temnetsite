import React, { useState } from 'react';
import { Check, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { RESIDENTIAL_PLANS, CORPORATE_PLANS } from '../data/plans';
import '../styles/Pricing.css';

interface PricingSectionProps {
  onOpenViability: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenViability }) => {
  const [planCategory, setPlanCategory] = useState<'residential' | 'corporate'>('residential');

  const currentPlans = planCategory === 'residential' ? RESIDENTIAL_PLANS : CORPORATE_PLANS;

  return (
    <section className="section" id="planos">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Zap size={14} />
            <span>Planos e Valores</span>
          </div>
          <h2 className="section-title">
            Conectividade sob medida para sua residência ou empresa
          </h2>
          <p className="section-subtitle">
            Sem pegadinhas, sem franquias de dados e com suporte técnico local prioritário. Escolha a sua categoria:
          </p>
        </div>

        {/* Switcher Toggle */}
        <div className="pricing-toggle-wrapper">
          <div className="pricing-toggle-box">
            <button
              type="button"
              className={`toggle-option-btn ${planCategory === 'residential' ? 'active' : ''}`}
              onClick={() => setPlanCategory('residential')}
            >
              Para Residências (Fibra Óptica)
            </button>
            <button
              type="button"
              className={`toggle-option-btn ${planCategory === 'corporate' ? 'active' : ''}`}
              onClick={() => setPlanCategory('corporate')}
            >
              Empresas & Link Dedicado
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="pricing-grid">
          {currentPlans.map((plan) => (
            <div 
              key={plan.id}
              className={`pricing-card card-glow-beam ${plan.popular ? 'popular-plan' : ''}`}
            >
              {plan.popular && (
                <div className="popular-badge-pill">
                  Mais Escolhido
                </div>
              )}

              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-desc">{plan.description}</p>

                <div className="plan-price-row">
                  {plan.price !== 'Sob Consulta' && plan.price !== 'Sob Medida' ? (
                    <>
                      <span className="plan-currency">R$</span>
                      <span className="plan-amount">{plan.price}</span>
                      <span className="plan-period">{plan.period}</span>
                    </>
                  ) : (
                    <>
                      <span className="plan-amount" style={{ fontSize: '2.1rem' }}>{plan.price}</span>
                      <span className="plan-period" style={{ marginLeft: '0.5rem' }}>{plan.period}</span>
                    </>
                  )}
                </div>

                <div className="plan-speed-badge">
                  <Zap size={14} />
                  <span>{plan.speed} {plan.unit}</span>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="plan-tech-specs">
                <div className="spec-line">
                  <span>Download:</span>
                  <span>{plan.specs.download}</span>
                </div>
                <div className="spec-line">
                  <span>Upload:</span>
                  <span>{plan.specs.upload}</span>
                </div>
                <div className="spec-line">
                  <span>Equipamento:</span>
                  <span>{plan.specs.wifi}</span>
                </div>
                <div className="spec-line">
                  <span>Suporte:</span>
                  <span>{plan.specs.support}</span>
                </div>
              </div>

              {/* Highlights */}
              <ul className="plan-features-list">
                {plan.highlights.map((highlight, idx) => (
                  <li key={idx} className="plan-feature-item">
                    <Check size={16} className="text-secondary" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={onOpenViability}
                className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%' }}
              >
                <span>{plan.ctaLabel}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Corporate Consultation Callout */}
        <div style={{ marginTop: '3.5rem', textAlign: 'center', padding: '1.75rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: '#ffffff', fontWeight: 600, fontSize: '0.95rem' }}>
            <ShieldCheck size={18} />
            <span>Precisa de um projeto especial com múltiplos IPs fixos, enlace de fibra ou SLA customizado?</span>
          </div>
          <div style={{ marginTop: '0.65rem' }}>
            <button 
              type="button" 
              onClick={onOpenViability}
              style={{ background: 'none', border: 'none', color: '#ffffff', textDecoration: 'underline', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Fale diretamente com nossa diretoria técnica &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
