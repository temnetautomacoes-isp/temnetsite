import React from 'react';
import { Wifi, ShieldAlert, Cpu, Users2, ArrowUpRight } from 'lucide-react';
import '../styles/Benefits.css';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <Wifi size={24} />,
      title: 'Fibra Óptica 100% Pura',
      description: 'Conexão direta até o modem sem cabos metálicos intermediários. Alta velocidade com simetria e estabilidade contra intempéries.',
      tag: 'Latência ultrabaixa para jogos e streaming'
    },
    {
      icon: <ShieldAlert size={24} />,
      title: 'Link Dedicado & SLA 99.9%',
      description: 'Circuito corporativo exclusivo com garantia total de banda contratada, IP fixo válido e atendimento prioritário com engenharia de rede.',
      tag: 'Tempo de restauração de até 4h'
    },
    {
      icon: <Cpu size={24} />,
      title: 'Infraestrutura Completa de T.I',
      description: 'Muito além da internet: cabeamento estruturado Cat6/Cat6A, fusão de fibra, montagem de racks e manutenção de computadores/servidores.',
      tag: 'Engenharia de rede física e lógica'
    },
    {
      icon: <Users2 size={24} />,
      title: 'Suporte Técnico Local e Ágil',
      description: 'Diga adeus a call centers distantes e robôs engessados. Nossa equipe técnica é baseada na sua cidade com atendimento ágil e humanizado.',
      tag: 'Equipe própria em Alagoinhas e região'
    }
  ];

  return (
    <section className="section" id="beneficios">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span>Diferenciais TemNet</span>
          </div>
          <h2 className="section-title">
            Por que empresas e residências escolhem a TemNet?
          </h2>
          <p className="section-subtitle">
            Unimos telecomunicações de ponta e engenharia de T.I para entregar uma infraestrutura robusta, 
            sem gargalos e com suporte presencial em quem você pode confiar.
          </p>
        </div>

        <div className="benefits-grid">
          {benefits.map((item, idx) => (
            <div key={idx} className="benefit-card card-glow-beam">
              <div className="benefit-icon-wrapper">
                {item.icon}
              </div>
              <h3 className="benefit-title">{item.title}</h3>
              <p className="benefit-description">{item.description}</p>
              <div className="benefit-tag">
                <ArrowUpRight size={14} />
                <span>{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
