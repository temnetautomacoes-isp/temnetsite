import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQ_DATA } from '../data/faq';
import '../styles/Faq.css';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <HelpCircle size={14} />
            <span>Perguntas Frequentes</span>
          </div>
          <h2 className="section-title">
            Tire suas dúvidas sobre a TemNet
          </h2>
          <p className="section-subtitle">
            Respostas diretas e transparentes sobre tecnologia, contratação, instalação e suporte empresarial.
          </p>
        </div>

        <div className="faq-accordion-container">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div 
                key={item.id} 
                className={`faq-item-card ${isOpen ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <div className="faq-toggle-icon">
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-answer-wrapper">
                    <p className="faq-answer-text">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
