import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
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
  const currentFrameRef = useRef<number>(0);

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

    currentFrameRef.current = index;
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
          // Fallback to framesrtd or alternative alias if needed
          firstImg.src = `/framesrtd/ezgif-frame-001.png`;
          firstImg.onload = () => {
            if (!isCancelled) {
              images[0] = firstImg;
              imagesRef.current = images;
              renderFrame(0);
            }
            resolve();
          };
          firstImg.onerror = () => resolve();
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

  // 2. GSAP ScrollTrigger:
  // Phase 1 (Print 1 to Print 2): ezgif-frame-001.png is strictly FIXED/STATIC.
  // Phase 2 (Print 2 onwards): 3D animation plays 160 frames at 2x speed!
  useEffect(() => {
    if (!stageRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=1200', // Compressed scroll distance (animates 2x faster than before)
        pin: stageRef.current,
        pinSpacing: true,
        scrub: 0.35,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const TRANSITION_END = 0.30; // Threshold between Print 1 (header) and Print 2 (cards)

          if (progress <= TRANSITION_END) {
            // ========================================================
            // FASE 1: Do Print 1 até o Print 2
            // A imagem ezgif-frame-001.png fica TOTALMENTE FIXA (Frame 0)
            // ========================================================
            renderFrame(0);

            const p = progress / TRANSITION_END;
            if (headerRef.current) {
              headerRef.current.style.opacity = `${Math.max(0, 1 - p * 1.1)}`;
              headerRef.current.style.transform = `translateY(${-p * 70}px)`;
              headerRef.current.style.pointerEvents = p > 0.8 ? 'none' : 'auto';
            }
            if (cardsRef.current) {
              cardsRef.current.style.opacity = `${0.85 + p * 0.15}`;
              cardsRef.current.style.transform = `translateY(${-p * 175}px)`;
              cardsRef.current.style.pointerEvents = 'auto';
            }
          } else {
            // ========================================================
            // FASE 2: A partir do Print 2 (Cards em destaque total)
            // O usuário ao rolar a tela agora vê a animação 3D dos 160 frames,
            // rodando 2x mais rápido!
            // ========================================================
            const animProgress = (progress - TRANSITION_END) / (1 - TRANSITION_END);
            const frameIndex = Math.min(
              TOTAL_FRAMES - 1,
              Math.max(0, Math.floor(animProgress * (TOTAL_FRAMES - 1)))
            );
            renderFrame(frameIndex);

            if (headerRef.current) {
              headerRef.current.style.opacity = '0';
              headerRef.current.style.transform = 'translateY(-70px)';
              headerRef.current.style.pointerEvents = 'none';
            }
            if (cardsRef.current) {
              cardsRef.current.style.opacity = '1';
              cardsRef.current.style.transform = 'translateY(-175px)';
              cardsRef.current.style.pointerEvents = 'auto';
            }
          }
        }
      });
    }, sectionRef);

    const handleResize = () => {
      renderFrame(currentFrameRef.current);
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [isPreloaded]);

  return (
    <section className="pricing-scrolly-section" id="planos" ref={sectionRef}>
      {/* Pinned Stage that stays fixed during the two phases */}
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
              <div className="pricing-corporate-callout">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: '#ffffff', fontWeight: 600, fontSize: '0.88rem' }}>
                  <ShieldCheck size={16} />
                  <span>Precisa de projeto com múltiplos IPs fixos, enlace de fibra ou SLA customizado?</span>
                </div>
                <div style={{ marginTop: '0.25rem' }}>
                  <button 
                    type="button" 
                    onClick={onOpenViability}
                    style={{ background: 'none', border: 'none', color: '#ffffff', textDecoration: 'underline', fontWeight: 700, cursor: 'pointer', fontSize: '0.84rem' }}
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
