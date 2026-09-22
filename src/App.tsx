import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { HowItWorks } from './components/HowItWorks';
import { ServicesTabs } from './components/ServicesTabs';
import { CoverageSection } from './components/CoverageSection';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { ViabilityModal } from './components/ViabilityModal';
import { FloatingWhatsapp } from './components/FloatingWhatsapp';

export const App: React.FC = () => {
  const [viabilityModalOpen, setViabilityModalOpen] = useState(false);

  const openViabilityModal = () => setViabilityModalOpen(true);
  const closeViabilityModal = () => setViabilityModalOpen(false);

  return (
    <div className="app-layout">
      {/* Background Subtle Mesh Grid */}
      <div className="bg-mesh-pattern" aria-hidden="true" />

      {/* Main Navigation */}
      <Navbar onOpenViability={openViabilityModal} />

      <main>
        {/* 1. Hero Section */}
        <Hero onOpenViability={openViabilityModal} />

        {/* 2. Seção de Benefícios */}
        <Benefits />

        {/* 3. Como Funciona em 3 Etapas */}
        <HowItWorks />

        {/* 4. Destaque dos Serviços & Infra de T.I (Tabs) */}
        <ServicesTabs onOpenViability={openViabilityModal} />

        {/* 5. Cidades de Atuação & Hierarquia Regional */}
        <CoverageSection onOpenViability={openViabilityModal} />

        {/* 6. Planos e Preços (Switch Residencial vs Corporativo) */}
        <PricingSection onOpenViability={openViabilityModal} />

        {/* 7. Depoimentos de Usuários & Prova Social */}
        <TestimonialsSection />

        {/* 8. FAQ - Perguntas Frequentes */}
        <FaqSection />

        {/* 9. Seção Final de Conversão */}
        <CtaBanner onOpenViability={openViabilityModal} />
      </main>

      {/* 10. Rodapé Completo */}
      <Footer />

      {/* Interactive Viability Modal */}
      <ViabilityModal 
        isOpen={viabilityModalOpen} 
        onClose={closeViabilityModal} 
      />

      {/* Floating Action Button */}
      <FloatingWhatsapp />
    </div>
  );
};

export default App;
