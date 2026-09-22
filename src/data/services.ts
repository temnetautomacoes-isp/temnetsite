import { ServiceDetail } from '../types';

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'broadband',
    title: 'Banda Larga Fibra Óptica',
    tagline: 'Velocidade extrema e estabilidade sem limites para residências e pequenos negócios',
    description: 'Conexão por fibra óptica pura até dentro do seu imóvel (FTTH), garantindo downloads instantâneos, transmissões em 4K/8K, games online com latência mínima e roteador Wi-Fi 6 de alta performance.',
    metrics: [
      { label: 'Tecnologia', value: '100% Fibra Pura' },
      { label: 'Uptime Médio', value: '99.9%' },
      { label: 'Wi-Fi 6 Mesh', value: 'Disponível' },
      { label: 'Instalação', value: 'Express 24h-48h' }
    ],
    features: [
      'Download e upload de alto rendimento sem redução de velocidade',
      'Roteador Wi-Fi Gigabit dual-band ou Wi-Fi 6 de última geração',
      'Zero franquia de consumo mensal: use o quanto quiser',
      'Suporte técnico humanizado com especialistas locais'
    ],
    idealFor: 'Famílias conectadas, streamers, gamers competitivos e profissionais em regime de Home Office.'
  },
  {
    id: 'dedicated',
    title: 'Link Dedicado Corporativo',
    tagline: 'Conectividade crítica com 100% de garantia de banda e SLA de 4 horas',
    description: 'Circuito IP exclusivo e ponto a ponto para operações corporativas que não podem parar nem por um segundo. Simetria 1:1 rigorosa, bloco de IP fixo válido mundialmente e rota monitorada diretamente pelo nosso NOC.',
    metrics: [
      { label: 'Garantia de Banda', value: '100% Simétrica' },
      { label: 'SLA de Restauração', value: '≤ 4 horas' },
      { label: 'Disponibilidade', value: '99.95%' },
      { label: 'IP Fixo Público', value: 'Blocos IPv4 / IPv6' }
    ],
    features: [
      'Velocidade garantida em contrato de ponta a ponta sem compartilhamento',
      'Atendimento VIP com canal direto com os engenheiros de rede da TemNet',
      'Relatórios em tempo real de latência, jitter, perda de pacotes e consumo',
      'Projetos sob medida de redundância com dupla abordagem de fibra óptica'
    ],
    idealFor: 'Indústrias, hospitais, operadoras de cartão, instituições financeiras, cooperativas e médias/grandes empresas na Bahia.'
  },
  {
    id: 'infra',
    title: 'Infraestrutura de Redes e Cabeamento Estruturado',
    tagline: 'Engenharia de redes corporativas organizada, certificada e escalável',
    description: 'Planejamento e execução completa de cabeamento de dados e voz (Cat6, Cat6A e Fibra Óptica), conectorização, montagem e organização de racks, patch panels, switches gerenciáveis e servidores.',
    metrics: [
      { label: 'Normas', value: 'TIA/EIA-568 e ABNT' },
      { label: 'Certificação', value: 'Testes Fluke Networks' },
      { label: 'Padrão', value: 'Cat6, Cat6A & Fibra' },
      { label: 'Garantia', value: 'Até 5 Anos em Projetos' }
    ],
    features: [
      'Mapeamento, identificação visual e rotulagem padronizada de todos os pontos de rede',
      'Organização e retrofit de racks desorganizados ("ninho de cabos")',
      'Fusão óptica e implantação de backbones internos em edifícios e galpões',
      'Projetos de contingência, VLANs isoladas e segurança física de rede'
    ],
    idealFor: 'Escritórios corporativos, indústrias, escolas, clínicas e centros de distribuição que necessitam de organização impecável e desempenho contínuo.'
  },
  {
    id: 'maintenance',
    title: 'Manutenção de Hardware e Suporte de T.I',
    tagline: 'Diagnóstico rápido, prevenção de falhas e manutenção especializada para seu parque de T.I',
    description: 'Suporte técnico focado em solucionar gargalos de computadores, servidores, roteadores e estações de trabalho. Atendemos problemas complexos de hardware e software para que sua equipe nunca perca tempo de trabalho.',
    metrics: [
      { label: 'Tempo Médio de Atendimento', value: '< 2 horas' },
      { label: 'Prevenção', value: 'Rotinas Preventivas' },
      { label: 'Hardware', value: 'Desktop, Servidores & Racks' },
      { label: 'Diagnóstico', value: 'Laboratório Técnico Próprio' }
    ],
    features: [
      'Manutenção preventiva e corretiva de computadores corporativos e estações de trabalho',
      'Solução e análise de gargalos em switches, roteadores e access points Wi-Fi',
      'Substituição e upgrade de componentes (SSDs, memórias, fontes industriais)',
      'Contratos mensais de suporte corporativo com visitas periódicas preventivas'
    ],
    idealFor: 'Empresas que não possuem equipe interna de T.I ou necessitam de apoio de campo especializado e ágil.'
  }
];
