import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/logo.png';
import '../styles/ViabilityModal.css';

interface ViabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ViabilityModal: React.FC<ViabilityModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('Alagoinhas');
  const [neighborhood, setNeighborhood] = useState('');
  const [phone, setPhone] = useState('');
  const [interestType, setInterestType] = useState('residencial');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsappRedirect = () => {
    const text = encodeURIComponent(
      `Olá, TemNet! Meu nome é ${name}. Gostaria de verificar a viabilidade técnica e contratar um plano ${interestType} em ${city} (Bairro/Endereço: ${neighborhood}). Meu contato: ${phone}.`
    );
    window.open(`https://wa.me/5575999999999?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card card-glow-beam" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Fechar"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{ width: '38px', height: '38px', background: '#ffffff', borderRadius: '10px', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(255,255,255,0.15)' }}>
                <img src={logoImg} alt="TemNet Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>TemNet</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>A sua conexão completa</div>
              </div>
            </div>

            <h3 className="modal-title">Consultar Viabilidade Técnica</h3>
            <p className="modal-subtitle">
              Verificamos a disponibilidade de porta óptica e infraestrutura na sua rua em tempo recorde.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Seu Nome ou Nome da Empresa</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: João da Silva / Silva Tech" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Cidade</label>
                <select 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="form-select"
                >
                  <option value="Alagoinhas">Alagoinhas (Polo Principal)</option>
                  <option value="Aramari">Aramari</option>
                  <option value="Ouriçangas">Ouriçangas</option>
                  <option value="Outra cidade na Bahia">Outra cidade na Bahia (Link Dedicado / T.I)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Bairro e Endereço</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Centro, Rua Direita, nº 120" 
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">WhatsApp para Retorno</label>
                <input 
                  type="tel" 
                  required
                  placeholder="(75) 99999-9999" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tipo de Conexão Desejada</label>
                <select 
                  value={interestType}
                  onChange={(e) => setInterestType(e.target.value)}
                  className="form-select"
                >
                  <option value="Banda Larga Residencial Fibra">Banda Larga Residencial (Fibra)</option>
                  <option value="Banda Larga Comercial">Banda Larga Comercial / Escritório</option>
                  <option value="Link Dedicado 100% Simétrico">Link Dedicado Corporativo (SLA 4h + IP Fixo)</option>
                  <option value="Infraestrutura de Redes e T.I">Cabeamento Estruturado & Manutenção de T.I</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1rem' }}
              >
                <span>Checar Disponibilidade & Continuar</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                <ShieldCheck size={14} />
                <span>Seus dados estão protegidos pela LGPD.</span>
              </div>
            </form>
          </>
        ) : (
          <div className="modal-feedback-success">
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <CheckCircle size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
              Porta de Fibra Disponível!
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
              Constatamos cobertura da rede TemNet para a localidade <strong>{neighborhood} ({city})</strong>. Para agilizar o agendamento da sua instalação, continue para o WhatsApp comercial:
            </p>

            <button 
              type="button" 
              onClick={handleWhatsappRedirect}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              <span>Concluir Agendamento no WhatsApp</span>
              <ArrowRight size={18} />
            </button>

            <button 
              type="button" 
              onClick={() => setSubmitted(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              Voltar e alterar dados
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
