import React, { useState } from 'react';
import { MapPin, CheckCircle2, Globe2, ArrowRight } from 'lucide-react';
import { CITIES_DATA, BAHIA_EXPANSION } from '../data/cities';
import '../styles/Coverage.css';

interface CoverageSectionProps {
  onOpenViability: () => void;
}

export const CoverageSection: React.FC<CoverageSectionProps> = ({ onOpenViability }) => {
  const [selectedCity, setSelectedCity] = useState('alagoinhas');
  const [typedNeighborhood, setTypedNeighborhood] = useState('');
  const [checkResult, setCheckResult] = useState<string | null>(null);

  const handleQuickCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedNeighborhood.trim()) {
      setCheckResult('Por favor, informe o seu bairro ou endereço.');
      return;
    }
    setCheckResult(`Excelente! Temos infraestrutura de alta velocidade em ${typedNeighborhood}. Clique abaixo para agendar sua instalação.`);
  };

  return (
    <section className="section" id="cobertura" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <MapPin size={14} />
            <span>Presença Regional & Estadual</span>
          </div>
          <h2 className="section-title">
            Cidades de atuação com suporte técnico prioritário
          </h2>
          <p className="section-subtitle">
            Estrutura hierárquica planejada para garantir resposta rápida, anel redundante e presença física local.
          </p>
        </div>

        {/* 3 Main Cities Hierarchy */}
        <div className="cities-hierarchy-grid">
          {CITIES_DATA.map((city) => (
            <div 
              key={city.id} 
              className={`city-hierarchy-card card-glow-beam ${city.id === 'alagoinhas' ? 'polo-card' : ''}`}
            >
              <div className="city-badge-tag">
                <MapPin size={12} />
                <span>{city.badge}</span>
              </div>

              <h3 className="city-name">{city.name}</h3>
              <div className="city-role">{city.role}</div>

              <p className="city-highlight">{city.highlight}</p>

              <div className="city-status-row">
                <span style={{ color: 'var(--text-muted)' }}>Status de Rede:</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#22c55e', fontWeight: 600 }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                  {city.coverageStatus}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bahia Corporate Expansion Banner */}
        <div className="bahia-expansion-banner card-glow-beam">
          <div className="bahia-expansion-content">
            <div className="bahia-text-left">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                <Globe2 size={16} />
                <span>Conectividade Corporativa B2B</span>
              </div>
              <h3 className="bahia-title">{BAHIA_EXPANSION.title}</h3>
              <p className="bahia-desc">{BAHIA_EXPANSION.description}</p>
              
              <div className="bahia-chips-list">
                {BAHIA_EXPANSION.citiesAvailable.map((city, idx) => (
                  <span key={idx} className="bahia-chip">{city}</span>
                ))}
              </div>
            </div>

            <div>
              <button 
                type="button" 
                onClick={onOpenViability}
                className="btn btn-primary"
              >
                <span>Consultar Projeto Corporativo</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Neighborhood Fast Check */}
        <div className="neighborhood-checker-box">
          <div style={{ maxWidth: '360px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>
              Consulte a viabilidade na sua rua
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Verifique a disponibilidade imediata de portas de fibra na sua região.
            </p>
          </div>

          <form onSubmit={handleQuickCheck} className="checker-inputs">
            <select 
              value={selectedCity} 
              onChange={(e) => setSelectedCity(e.target.value)}
              className="checker-select"
            >
              <option value="alagoinhas">Alagoinhas (Polo)</option>
              <option value="aramari">Aramari</option>
              <option value="ouricangas">Ouriçangas</option>
              <option value="outra">Outra cidade na Bahia</option>
            </select>

            <input 
              type="text" 
              placeholder="Digite seu bairro ou CEP..." 
              value={typedNeighborhood}
              onChange={(e) => setTypedNeighborhood(e.target.value)}
              className="checker-input"
              style={{ flexGrow: 1 }}
            />

            <button type="submit" className="btn btn-secondary btn-sm">
              <span>Verificar</span>
            </button>
          </form>
        </div>

        {checkResult && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: 'var(--radius-md)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <CheckCircle2 size={18} style={{ color: '#22c55e' }} />
              <span style={{ fontSize: '0.9rem' }}>{checkResult}</span>
            </div>
            <button 
              type="button" 
              onClick={onOpenViability}
              className="btn btn-primary btn-sm"
            >
              Solicitar Contratação
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
