export type CityHierarchy = {
  id: string;
  name: string;
  badge: string;
  role: string;
  coverageStatus: 'Operação Total' | 'Expansão de Alta Densidade' | 'Rede 100% Digital';
  highlight: string;
  neighborhoodsCount: number;
};

export type ServiceCategory = 'broadband' | 'dedicated' | 'infra' | 'maintenance';

export type ServiceDetail = {
  id: ServiceCategory;
  title: string;
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
  features: string[];
  idealFor: string;
};

export type PricingPlan = {
  id: string;
  name: string;
  category: 'residential' | 'corporate';
  speed: string;
  unit: string;
  price: string;
  period: string;
  description: string;
  popular?: boolean;
  sla?: string;
  highlights: string[];
  specs: {
    download: string;
    upload: string;
    wifi: string;
    ip: string;
    support: string;
  };
  ctaLabel: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  companyOrLocation: string;
  city: 'Alagoinhas' | 'Aramari' | 'Ouriçangas' | 'Salvador / BA';
  category: 'Empresarial' | 'Residencial' | 'Link Dedicado';
  rating: number;
  text: string;
  metricHighlight?: string;
};

export type FaqItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
};
