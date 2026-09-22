import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wifi, Radio, Cpu, ChevronDown } from 'lucide-react';
import '../styles/RouterCanvasShowcase.css';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 160;

export const RouterCanvasShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [loadedPercent, setLoadedPercent] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Intelligent Canvas Frame Rendering (1920x1080 contain with center alignment)
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Get display dimensions
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const displayW = rect.width;
    const displayH = rect.height;

    // Set internal resolution scaled by dpr
    if (canvas.width !== displayW * dpr || canvas.height !== displayH * dpr) {
      canvas.width = displayW * dpr;
      canvas.height = displayH * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayW, displayH);

    // Calculate aspect ratios (1920 / 1080)
    const imgAspect = 1920 / 1080;
    const canvasAspect = displayW / displayH;

    let drawW: number;
    let drawH: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasAspect > imgAspect) {
      drawH = displayH;
      drawW = displayH * imgAspect;
      offsetX = (displayW - drawW) / 2;
      offsetY = 0;
    } else {
      drawW = displayW;
      drawH = displayW / imgAspect;
      offsetX = 0;
      offsetY = (displayH - drawH) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    ctx.restore();

    setCurrentFrameIndex(index);
  };

  // 1. Preload 160 frames from /frames/ezgif-frame-XXX.png
  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const loadImages = async () => {
      // First, load frame 001 immediately for zero blank flash
      const firstImg = new Image();
      const firstSrc = `/frames/ezgif-frame-001.png`;
      firstImg.src = firstSrc;

      await new Promise<void>((resolve) => {
        firstImg.onload = () => {
          if (!isCancelled) {
            images[0] = firstImg;
            imagesRef.current = images;
            renderFrame(0);
            loadedCount++;
            setLoadedPercent(Math.round((loadedCount / TOTAL_FRAMES) * 100));
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

      // Load remaining frames in batches of 8 for optimal performance
      const loadFrame = (idx: number): Promise<void> => {
        return new Promise((resolve) => {
          const frameNum = String(idx + 1).padStart(3, '0');
          const img = new Image();
          img.src = `/frames/ezgif-frame-${frameNum}.png`;

          img.onload = () => {
            if (!isCancelled) {
              images[idx] = img;
              loadedCount++;
              setLoadedPercent(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            }
            resolve();
          };
          img.onerror = () => {
            // Fallback path
            img.src = `/framesrtd/ezgif-frame-${frameNum}.png`;
            img.onload = () => {
              if (!isCancelled) {
                images[idx] = img;
                loadedCount++;
                setLoadedPercent(Math.round((loadedCount / TOTAL_FRAMES) * 100));
              }
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
          batch.push(loadFrame(j));
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

  // 2. Setup GSAP ScrollTrigger once stage and images are ready
  useEffect(() => {
    if (!stageRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const frameTracker = { frame: 0 };

      // Pin the showcase section and scrub through the 160 frames smoothly
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top+=75',
        end: '+=1800',
        pin: stageRef.current,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          // Calculate exact frame index from 0 to 159
          const targetIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
          );

          frameTracker.frame = targetIndex;
          renderFrame(targetIndex);
        }
      });
    }, containerRef);

    // Resize listener for sharp canvas & ScrollTrigger refresh
    const handleResize = () => {
      renderFrame(currentFrameIndex);
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [isPreloaded, currentFrameIndex]);

  // Scrollytelling active callout content based on scrollProgress
  const getActiveCallout = () => {
    if (scrollProgress < 0.35) {
      return {
        icon: <Wifi size={20} className="text-secondary" />,
        title: 'Tecnologia Wi-Fi 6 Gigabit',
        description: 'Velocidades até 3x mais rápidas, menor latência e capacidade massiva para múltiplos dispositivos conectados simultaneamente.'
      };
    } else if (scrollProgress < 0.70) {
      return {
        icon: <Radio size={20} className="text-secondary" />,
        title: '4 Antenas Beamforming de Alto Ganho',
        description: 'Direcionamento inteligente de sinal de radiofrequência, eliminando pontos cegos em residências de grande porte e empresas.'
      };
    } else {
      return {
        icon: <Cpu size={20} className="text-secondary" />,
        title: 'Incluso em Todos os Planos Fibra',
        description: 'Equipamento homologado pela Anatel, configurado por técnicos locais e com manutenção garantida sem custos extras.'
      };
    }
  };

  const callout = getActiveCallout();

  return (
    <div className="router-showcase-section" ref={containerRef}>
      <div className="router-pinned-stage card-glow-beam" ref={stageRef}>
        {/* Preloader overlay while initial batch loads */}
        {!isPreloaded && loadedPercent < 25 && (
          <div className="router-preloader">
            <div className="preloader-spinner" />
            <span className="preloader-text">Carregando visualização 3D ({loadedPercent}%)...</span>
          </div>
        )}

        {/* Top Header Controls */}
        <div className="router-stage-header">
          <div className="stage-badge">
            <Wifi size={14} />
            <span>Roteador Wi-Fi 6 High-End Incluso</span>
          </div>

          <div className="stage-frame-counter">
            <span>Visão 360° • {currentFrameIndex + 1}/{TOTAL_FRAMES}</span>
          </div>
        </div>

        {/* 3D Canvas */}
        <canvas ref={canvasRef} className="router-3d-canvas" />

        {/* Vignette Edge Blending */}
        <div className="canvas-vignette-overlay" />

        {/* Scrollytelling Interactive Callouts & Progress Bar */}
        <div className="scrolly-callout-overlay">
          <div className="scrolly-card-active">
            <h4 className="scrolly-card-title">
              {callout.icon}
              <span>{callout.title}</span>
            </h4>
            <p className="scrolly-card-desc">{callout.description}</p>
          </div>

          <div className="scrolly-progress-wrapper">
            <div className="scrolly-progress-label">
              <span>Giro 360°</span>
              <ChevronDown size={14} />
            </div>
            <div className="scrolly-progress-bar">
              <div 
                className="scrolly-progress-fill" 
                style={{ width: `${Math.max(5, scrollProgress * 100)}%` }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
