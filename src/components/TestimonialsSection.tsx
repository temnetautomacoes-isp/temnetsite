import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import '../styles/Testimonials.css';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="section" id="depoimentos" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <MessageSquareQuote size={14} />
            <span>Depoimentos & Casos Reais</span>
          </div>
          <h2 className="section-title">
            Quem conecta com a TemNet recomenda
          </h2>
          <p className="section-subtitle">
            Veja a experiência real de empresas, profissionais e residências que confiam sua conexão diária à TemNet.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS_DATA.map((t) => (
            <div key={t.id} className="testimonial-card card-glow-beam">
              <div>
                <div className="testimonial-stars">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="#ffffff" color="#ffffff" />
                  ))}
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginLeft: '0.4rem' }}>
                    {t.category}
                  </span>
                </div>

                <p className="testimonial-text">
                  "{t.text}"
                </p>

                {t.metricHighlight && (
                  <div className="testimonial-metric-badge">
                    <CheckCircle2 size={12} />
                    <span>{t.metricHighlight}</span>
                  </div>
                )}
              </div>

              <div className="testimonial-author-box">
                <div className="author-avatar">
                  {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div className="author-info">
                  <span className="author-name">{t.name}</span>
                  <span className="author-role">{t.role} • {t.companyOrLocation} ({t.city})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
