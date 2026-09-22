import { CityHierarchy } from '../types';

export const CITIES_DATA: CityHierarchy[] = [
  {
    id: 'alagoinhas',
    name: 'Alagoinhas',
    badge: '1º Cidade Polo & Matriz Operacional',
    role: 'Central de Operações & Backbone Principal',
    coverageStatus: 'Operação Total',
    highlight: 'Disponibilidade de Link Dedicado até 10 Gbps, NOC 24/7 com equipe técnica presencial imediata e fibra óptica em mais de 45 bairros.',
    neighborhoodsCount: 48
  },
  {
    id: 'aramari',
    name: 'Aramari',
    badge: '2º Polo Regional',
    role: 'Alta Capilaridade e Conexão Urbana/Rural',
    coverageStatus: 'Expansão de Alta Densidade',
    highlight: 'Rede redundante para comércios locais, agroindústrias e residências com latência ultra-baixa interligada diretamente ao anel de Alagoinhas.',
    neighborhoodsCount: 18
  },
  {
    id: 'ouricangas',
    name: 'Ouriçangas',
    badge: '3º Polo de Atuação Direta',
    role: 'Rede 100% Digital e Suporte Ágil',
    coverageStatus: 'Rede 100% Digital',
    highlight: 'Infraestrutura moderna com cabeamento óptico de ponta a ponta e atendimento dedicado a empresas e residências do município.',
    neighborhoodsCount: 14
  }
];

export const BAHIA_EXPANSION = {
  title: 'Atendimento Corporativo em Toda a Bahia',
  description: 'Para empresas, indústrias, redes varejistas e órgãos públicos com filiais ou demandas em qualquer município da Bahia, a TemNet desenvolve projetos customizados de Link Dedicado, VPNs corporativas, SD-WAN e Infraestrutura de T.I de grande porte.',
  citiesAvailable: ['Feira de Santana', 'Salvador & RMS', 'Catu', 'Pojuca', 'Entre Rios', 'Esplanada', 'Inhambupe', 'Santo Amaro', 'Demais municípios da Bahia']
};
