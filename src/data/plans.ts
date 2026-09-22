import { PricingPlan } from '../types';

export const RESIDENTIAL_PLANS: PricingPlan[] = [
  {
    id: 'res-400',
    name: 'Essencial Fibra',
    category: 'residential',
    speed: '400',
    unit: 'Mega',
    price: '89,90',
    period: '/mês',
    description: 'Ideal para apartamentos, navegação diária, redes sociais e streaming simultâneo em HD.',
    highlights: [
      '100% Fibra Óptica até o modem',
      'Roteador Dual-Band 2.4GHz / 5.8GHz incluso',
      'Download e upload de alto rendimento',
      'Sem fidelidade abusiva ou pegadinhas',
      'Suporte técnico ágil em Alagoinhas e região'
    ],
    specs: {
      download: '400 Mbps',
      upload: '200 Mbps',
      wifi: 'Dual-Band Gigabit',
      ip: 'Dinâmico Seguro',
      support: 'Atendimento Local 7 dias/semana'
    },
    ctaLabel: 'Assinar 400 Mega'
  },
  {
    id: 'res-600',
    name: 'Ultra Conexão',
    category: 'residential',
    speed: '600',
    unit: 'Mega',
    price: '109,90',
    period: '/mês',
    popular: true,
    description: 'O plano mais escolhido pelas famílias. Perfeito para múltiplos dispositivos, Home Office e jogos sem lag.',
    highlights: [
      'Roteador Wi-Fi 6 de última geração incluso',
      'Ultra-baixa latência para reuniões em vídeo e jogos',
      'Instalação prioritária em até 24 horas',
      'Download 600 Mbps com alta taxa de upload',
      'Suporte prioritário com atendimento VIP'
    ],
    specs: {
      download: '600 Mbps',
      upload: '300 Mbps',
      wifi: 'Wi-Fi 6 Mesh Ready',
      ip: 'Dinâmico Otimizado',
      support: 'Prioritário com canal direto'
    },
    ctaLabel: 'Assinar Plano Campeão'
  },
  {
    id: 'res-800',
    name: 'Giga Max Pro',
    category: 'residential',
    speed: '800',
    unit: 'Mega',
    price: '139,90',
    period: '/mês',
    description: 'Poder absoluto para criadores de conteúdo, casas inteligentes e quem exige o máximo em velocidade.',
    highlights: [
      'Velocidade insana de 800 Mbps reais',
      '2 Pontos Wi-Fi Mesh para cobertura total da casa',
      'Prioridade máxima no roteamento de pacotes',
      'Download de arquivos pesados em segundos',
      'Manutenção técnica com visita prioritária grátis'
    ],
    specs: {
      download: '800 Mbps',
      upload: '400 Mbps',
      wifi: '2 Roteadores Wi-Fi 6 Mesh',
      ip: 'Dinâmico Premium',
      support: 'Plantão VIP Exclusivo'
    },
    ctaLabel: 'Assinar 800 Mega'
  }
];

export const CORPORATE_PLANS: PricingPlan[] = [
  {
    id: 'corp-pme',
    name: 'Empresarial Smart',
    category: 'corporate',
    speed: '500',
    unit: 'Mega Fibra Corp',
    price: '199,90',
    period: '/mês',
    description: 'Para escritórios, clínicas e comércios que precisam de alta estabilidade e atendimento prioritário.',
    highlights: [
      'Banda dedicada com alta prioridade de tráfego',
      '1 Endereço IP Fixo Público válido incluso',
      'SLA de atendimento em até 8 horas úteis',
      'Emissão de Nota Fiscal corporativa automatizada',
      'Consultoria básica para organização de rede interna'
    ],
    specs: {
      download: '500 Mbps',
      upload: '250 Mbps',
      wifi: 'Access Point Corporativo',
      ip: '1 IP Fixo Público Válido',
      support: 'SLA 8 horas úteis'
    },
    ctaLabel: 'Contratar Empresarial'
  },
  {
    id: 'corp-dedicated-pro',
    name: 'Link Dedicado Enterprise',
    category: 'corporate',
    speed: '100% Simétrico',
    unit: 'Garantido em Contrato',
    price: 'Sob Consulta',
    period: 'Projeto Personalizado',
    popular: true,
    sla: 'SLA de Restauração ≤ 4h',
    description: 'Circuito IP 100% dedicado de fibra óptica ponto a ponto com garantia integral de banda e rota direta.',
    highlights: [
      'Garantia de 100% de banda (Download = Upload)',
      'SLA de restauração garantido em contrato ≤ 4 horas',
      'Bloco de IPs Públicos IPv4 e IPv6 dedicado',
      'Gráficos de consumo e monitoramento NOC 24/7/365',
      'Gerente de contas e engenheiro de redes exclusivo'
    ],
    specs: {
      download: 'Customizável (100M a 10G)',
      upload: '100% Simétrico ao Download',
      wifi: 'Conexão via SFP / Fibra Direta no Switch',
      ip: 'Sub-rede de IPs Fixos',
      support: 'Engenharia NOC 24/7/365'
    },
    ctaLabel: 'Solicitar Projeto de Link Dedicado'
  },
  {
    id: 'corp-ti-infra',
    name: 'Infraestrutura de T.I & Redes 360°',
    category: 'corporate',
    speed: 'Projetos',
    unit: '& Manutenção',
    price: 'Sob Medida',
    period: 'Contrato ou Avulso',
    description: 'Solução completa para infraestrutura física de rede, cabeamento estruturado, organização de CPD e suporte.',
    highlights: [
      'Cabeamento estruturado Cat6/Cat6A e fibra certificada',
      'Montagem, cabeamento e identificação de Racks e Patch Panels',
      'Contratos mensais de suporte a computadores e servidores',
      'Auditoria de segurança física de rede e roteamento',
      'Atendimento presencial em Alagoinhas e toda a Bahia'
    ],
    specs: {
      download: 'Rede interna até 10 Gbps',
      upload: 'Certificação Fluke Networks',
      wifi: 'Mapeamento Wi-Fi Heatmap',
      ip: 'VLANs e Segmentação',
      support: 'Equipe de Campo Dedicada'
    },
    ctaLabel: 'Solicitar Consultoria de T.I'
  }
];
