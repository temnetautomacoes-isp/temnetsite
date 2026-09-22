import React from 'react';
import { Check, Search, Sliders, Rocket } from 'lucide-react';
import '../styles/HowItWorks.css';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: <Search size={20} />,
      title: 'Consulta de Viabilidade & Diagnóstico',
      description: 'Informe seu endereço em Alagoinhas, Aramari, Ouriçangas ou sua demanda empresarial em qualquer cidade da Bahia. Nosso sistema avalia a porta óptica e a infraestrutura local em minutos.',
      items: [
        'Checagem instantânea de porta óptica',
        'Avaliação prévia do local de instalação',
        'Diagnóstico de necessidades para empresas'
      ]
    },
    {
      number: '02',
      icon: <Sliders size={20} />,
      title: 'Definição do Plano ou Projeto de T.I',
      description: 'Seja um plano de fibra residencial com Wi-Fi 6 de alta cobertura ou um projeto de Link Dedicado e cabeamento estruturado para a sua empresa, alinhamos as especificações técnicas ideais.',
      items: [
        'Planos residenciais de 400M a 1 Giga',
        'Links simétricos com IP fixo sob medida',
        'Orçamento transparente sem letras miúdas'
      ]
    },
    {
      number: '03',
      icon: <Rocket size={20} />,
      title: 'Ativação Rápida & Conexão Completa',
      description: 'Nossa equipe técnica própria realiza a instalação física com materiais homologados pela Anatel, configurando sua rede e garantindo estabilidade total desde o primeiro minuto.',
      items: [
        'Instalação ágil em 24h a 48h úteis',
        'Roteadores e equipamentos testados no local',
        'Acesso imediato ao suporte técnico e NOC'
      ]
    }
  ];

  return (
    <section className="section" id="como-funciona" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span>Processo Simplificado</span>
          </div>
          <h2 className="section-title">
            Como funciona em 3 etapas simples
          </h2>
          <p className="section-subtitle">
            Da consulta de viabilidade à ativação técnica: conectividade de alto padrão de forma transparente, rápida e sem burocracia.
          </p>
        </div>

        <div className="how-it-works-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="step-card card-glow-beam">
              <div className="step-number-badge">
                {step.number}
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              
              <ul className="step-features-list">
                {step.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="step-feature-item">
                    <Check size={15} className="text-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
