import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Zap, ArrowRight, ShieldCheck, Wifi } from 'lucide-react';
import { RESIDENTIAL_PLANS, CORPORATE_PLANS } from '../data/plans';
import '../styles/Pricing.css';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 160;

interface PricingSectionProps {
  onOpenViability: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenViability }) => {
  const [planCategory, setPlanCategory] = useState<'residential' | 'corporate'>('residential');

  const currentPlans = planCategory === 'residential' ? RESIDENTIAL_PLANS : CORPORATE_PLANS;

  // Refs for Scrollytelling Stage, Canvas, and Content
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [currentFrame, setCurrentFrame] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);

  // Intelligent Canvas Frame Rendering (1920x1080 background cover/contain)
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Device Pixel Ratio for Ultra-Sharp Rendering on Retina/4K
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const displayW = rect.width;
    const displayH = rect.height;

    if (canvas.width !== displayW * dpr || canvas.height !== displayH * dpr) {
      canvas.width = displayW * dpr;
      canvas.height = displayH * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayW, displayH);

    // Calculate Contain / Cover aspect ratio (1920 / 1080)
    const imgAspect = 1920 / 1080;
    const canvasAspect = displayW / displayH;

    let drawW: number;
    let drawH: number;
    let offsetX: number;
    let offsetY: number;

    // Fluid cover-fit for immersive background with center focus
    if (canvasAspect > imgAspect) {
      drawW = displayW;
      drawH = displayW / imgAspect;
      offsetX = 0;
      offsetY = (displayH - drawH) / 2;
    } else {
      drawH = displayH;
      drawW = displayH * imgAspect;
      offsetX = (displayW - drawW) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    ctx.restore();

    setCurrentFrame(index);
  };

  // 1. Asynchronous Preload of all 160 frames from /frames/
  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = [];

    const loadImages = async () => {
      // Load Frame 001 immediately so background is never blank
      const firstImg = new Image();
      firstImg.src = `/frames/ezgif-frame-001.png`;

      await new Promise<void>((resolve) => {
        firstImg.onload = () => {
          if (!isCancelled) {
            images[0] = firstImg;
            imagesRef.current = images;
            renderFrame(0);
          }
          resolve();
        };
        firstImg.onerror = () => {
          // Fallback to framesrtd if needed
          firstImg.src = `/framesrtd/ezgif-frame-001.png`;
          firstImg.onload = () => {
            if (!isCancelled) {
              images[0] = firstImg;
              imagesRef.current = images;
              renderFrame(0);
            }
            resolve();
          };
        };
      });

      // Load remaining frames in small batches
      const loadSingle = (idx: number): Promise<void> => {
        return new Promise((resolve) => {
          const num = String(idx + 1).padStart(3, '0');
          const img = new Image();
          img.src = `/frames/ezgif-frame-${num}.png`;

          img.onload = () => {
            if (!isCancelled) images[idx] = img;
            resolve();
          };
          img.onerror = () => {
            img.src = `/framesrtd/ezgif-frame-${num}.png`;
            img.onload = () => {
              if (!isCancelled) images[idx] = img;
              resolve();
            };
            img.onerror = () => resolve();
          };
        });
      };

      const batchSize = 12;
      for (let i = 1; i < TOTAL_FRAMES; i += batchSize) {
        if (isCancelled) break;
        const batch: Promise<void>[] = [];
        for (let j = i; j < Math.min(i + batchSize, TOTAL_FRAMES); j++) {
          batch.push(loadSingle(j));
        }
        await Promise.all(batch);
      }

      if (!isCancelled) {
        imagesRef.current = images;
        setIsPreloaded(true);
      }
    };

    loadImages();

    return () => {
      isCancelled = true;
    };
  }, []);

  // 2. GSAP ScrollTrigger: Pin section and scrub 160 frames + content transition
  useEffect(() => {
    if (!stageRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pinned timeline scrubbing the 160 frames as background
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=2000',
        pin: stageRef.current,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          // Frame scrubbing from 0 to 159
          const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
          );
          renderFrame(frameIndex);

          // Fluid transition from Print 1 (Header/Toggle) to Print 2 (Pricing Cards)
          if (headerRef.current && cardsRef.current) {
            if (progress < 0.35) {
              // Print 1: Header prominent, cards ready below
              const p = progress / 0.35;
              headerRef.current.style.opacity = `${1 - p * 0.3}`;
              headerRef.current.style.transform = `translateY(${-p * 20}px)`;
              cardsRef.current.style.opacity = `${0.2 + p * 0.4}`;
              cardsRef.current.style.transform = `translateY(${50 - p * 30}px)`;
            } else {
              // Print 2: Cards fully locked into view with background router
              const p = (progress - 0.35) / 0.65;
              headerRef.current.style.opacity = `${0.7 - p * 0.35}`;
              headerRef.current.style.transform = `translateY(${-20 - p * 25}px)`;
              cardsRef.current.style.opacity = `${0.6 + p * 0.4}`;
              cardsRef.current.style.transform = `translateY(${20 - p * 20}px)`;
            }
          }
        }
      });
    }, sectionRef);

    const handleResize = () => {
      renderFrame(currentFrame);
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [isPreloaded, currentFrame]);

  return (
    <section className="pricing-scrolly-section" id="planos" ref={sectionRef}>
      {/* Pinned Stage that stays fixed during the 160-frame rotation */}
      <div className="pricing-pinned-viewport" ref={stageRef}>
        
        {/* 1. BACKGROUND CANVAS: 3D Wi-Fi 6 Router (160 frames) */}
        <canvas ref={canvasRef} className="pricing-bg-canvas" />

        {/* 2. BACKGROUND VIGNETTE OVERLAY: Blends frame studio-grey seamlessly into #09090b */}
        <div className="pricing-bg-overlay" />

        {/* 3. FOREGROUND CONTENT LAYER */}
        <div className="pricing-content-layer">
          <div className="container">
            {/* PRINT 1: Section Header + Category Switcher */}
            <div className="pricing-header-transition" ref={headerRef}>
              <div className="section-header" style={{ marginBottom: '1.75rem' }}>
                <div className="section-badge">
                  <Zap size={14} />
                  <span>Planos e Valores</span>
                </div>
                <h2 className="section-title">
                  Conectividade sob medida para sua residência ou empresa
                </h2>
                <p className="section-subtitle">
                  Sem pegadinhas, sem franquias de dados e com suporte técnico local prioritário. Escolha a sua categoria:
                </p>
              </div>

              {/* Switcher Toggle */}
              <div className="pricing-toggle-wrapper" style={{ marginBottom: '2rem' }}>
                <div className="pricing-toggle-box">
                  <button
                    type="button"
                    className={`toggle-option-btn ${planCategory === 'residential' ? 'active' : ''}`}
                    onClick={() => setPlanCategory('residential')}
                  >
                    Para Residências (Fibra Óptica)
                  </button>
                  <button
                    type="button"
                    className={`toggle-option-btn ${planCategory === 'corporate' ? 'active' : ''}`}
                    onClick={() => setPlanCategory('corporate')}
                  >
                    Empresas & Link Dedicado
                  </button>
                </div>
              </div>
            </div>

            {/* Subtle Hardware Feature Badge while scrolling */}
            <div className="hardware-floating-pill">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.35rem 0.9rem', borderRadius: 'var(--radius-full)', background: 'rgba(9, 9, 11, 0.75)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-subtle)', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <Wifi size={13} style={{ color: '#ffffff' }} />
                <span>Wi-Fi 6 Gigabit Integrado • Giro 360° ({currentFrame + 1}/{TOTAL_FRAMES})</span>
              </div>
            </div>

            {/* PRINT 2: Plans Cards Grid (Frosted Glass on 3D Background) */}
            <div className="pricing-cards-transition" ref={cardsRef}>
              <div className="pricing-grid">
                {currentPlans.map((plan) => (
                  <div 
                    key={plan.id}
                    className={`pricing-card card-glow-beam ${plan.popular ? 'popular-plan' : ''}`}
                  >
                    {plan.popular && (
                      <div className="popular-badge-pill">
                        Mais Escolhido
                      </div>
                    )}

                    <div className="plan-header">
                      <h3 className="plan-name">{plan.name}</h3>
                      <p className="plan-desc">{plan.description}</p>

                      <div className="plan-price-row">
                        {plan.price !== 'Sob Consulta' && plan.price !== 'Sob Medida' ? (
                          <>
                            <span className="plan-currency">R$</span>
                            <span className="plan-amount">{plan.price}</span>
                            <span className="plan-period">{plan.period}</span>
                          </>
                        ) : (
                          <>
                            <span className="plan-amount" style={{ fontSize: '2.1rem' }}>{plan.price}</span>
                            <span className="plan-period" style={{ marginLeft: '0.5rem' }}>{plan.period}</span>
                          </>
                        )}
                      </div>

                      <div className="plan-speed-badge">
                        <Zap size={14} />
                        <span>{plan.speed} {plan.unit}</span>
                      </div>
                    </div>

                    {/* Technical Specifications */}
                    <div className="plan-tech-specs">
                      <div className="spec-line">
                        <span>Download:</span>
                        <span>{plan.specs.download}</span>
                      </div>
                      <div className="spec-line">
                        <span>Upload:</span>
                        <span>{plan.specs.upload}</span>
                      </div>
                      <div className="spec-line">
                        <span>Equipamento:</span>
                        <span>{plan.specs.wifi}</span>
                      </div>
                      <div className="spec-line">
                        <span>Suporte:</span>
                        <span>{plan.specs.support}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="plan-features-list">
                      {plan.highlights.map((highlight, idx) => (
                        <li key={idx} className="plan-feature-item">
                          <Check size={16} className="text-secondary" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={onOpenViability}
                      className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ width: '100%' }}
                    >
                      <span>{plan.ctaLabel}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Corporate Consultation Callout */}
              <div style={{ marginTop: '2.5rem', textAlign: 'center', padding: '1.25rem', background: 'rgba(9, 9, 11, 0.75)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: '#ffffff', fontWeight: 600, fontSize: '0.9rem' }}>
                  <ShieldCheck size={17} />
                  <span>Precisa de projeto com múltiplos IPs fixos, enlace de fibra ou SLA customizado?</span>
                </div>
                <div style={{ marginTop: '0.35rem' }}>
                  <button 
                    type="button" 
                    onClick={onOpenViability}
                    style={{ background: 'none', border: 'none', color: '#ffffff', textDecoration: 'underline', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    Fale diretamente com nossa diretoria técnica &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
