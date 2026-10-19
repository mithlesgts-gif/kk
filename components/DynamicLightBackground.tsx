import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SyncedBimDotsBackground } from './SyncedBimDotsBackground';

interface DynamicLightBackgroundProps {
  theme?: 'sky' | 'azure' | 'blueprint' | 'soft';
  bgImage?: string;
  bgImages?: string[];
  bgImageOpacity?: string;
  animateMotion?: boolean;
  showDots?: boolean;
  showLaser?: boolean;
  showOrbs?: boolean;
  showWireframe?: boolean;
  showCompass?: boolean;
  laserElevationText?: string;
}

export const DynamicLightBackground: React.FC<DynamicLightBackgroundProps> = ({
  theme = 'sky',
  bgImage,
  bgImages,
  bgImageOpacity = 'opacity-80 sm:opacity-85',
  animateMotion = true,
  showDots = true,
  showLaser = true,
  showOrbs = true,
  showWireframe = true,
  showCompass = false,
  laserElevationText = 'ELEV: +14.600m'
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [activeImgIndex, setActiveImgIndex] = React.useState(0);

  // If multiple images provided, cycle through them
  React.useEffect(() => {
    if (!bgImages || bgImages.length <= 1 || shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveImgIndex((prev) => (prev + 1) % bgImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [bgImages, shouldReduceMotion]);

  const currentImage = bgImages && bgImages.length > 0 
    ? bgImages[activeImgIndex] 
    : bgImage;

  // Gradients according to theme
  const themeGradients = {
    sky: 'bg-gradient-to-b from-[#F0F7FF] via-[#E8F2FC] to-[#F2F8FD]',
    azure: 'bg-gradient-to-b from-[#EFF6FF] via-[#E2EDFE] to-[#F0F7FF]',
    blueprint: 'bg-gradient-to-b from-[#F2F7FE] via-[#E9F3FC] to-[#F5F9FE]',
    soft: 'bg-gradient-to-b from-[#F4F9FE] via-[#EAF3FC] to-[#F7FAFE]'
  };

  const orbColor1 = theme === 'azure' 
    ? 'from-blue-500/15 to-sky-400/10' 
    : theme === 'blueprint'
    ? 'from-sky-500/15 to-blue-600/10'
    : 'from-blue-400/12 to-sky-300/10';

  const orbColor2 = theme === 'azure'
    ? 'from-sky-400/15 to-blue-600/10'
    : 'from-blue-500/12 to-indigo-400/8';

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${themeGradients[theme]}`}>
      {/* 1. High-Definition Architectural Building Photographic Backdrop (>=70% Visual Prominence) */}
      {currentImage && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            animate={{
              opacity: 1,
              x: shouldReduceMotion ? 0 : ['-2%', '2%', '-2%'],
              clipPath: 'inset(0 0% 0 0)'
            }}
            transition={{
              clipPath: { duration: 1.2, delay: shouldReduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.9, delay: shouldReduceMotion ? 0 : 0.7 },
              x: { duration: 18, repeat: Infinity, ease: 'easeInOut' }
            }}
            style={{ scale: 1.05 }}
            className="w-full h-full"
          >
            <img
              src={currentImage}
              alt="Construction and building background"
              aria-hidden="true"
              className="w-full h-full object-cover object-center opacity-80 filter brightness-[0.95] contrast-115 saturate-[1.0] transition-opacity duration-1000"
            />
          </motion.div>
          {/* Targeted scrim: preserves 75%+ building visual visibility while keeping text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-white/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-transparent to-white/60" />
        </div>
      )}

      {/* 2. Blueprint Engineering Grid */}
      <div className="absolute inset-0 bg-grid-light opacity-30" />

      {/* 3. Moving Dynamic Ambient Gradient Orbs (Calm Horizontal Drifting) */}
      {showOrbs && !shouldReduceMotion && (
        <>
          {/* Primary Top-Left Drifting Orb */}
          <motion.div
            animate={{
              x: ['-30px', '30px', '-30px'],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute -top-24 -left-20 w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr ${orbColor1} blur-3xl pointer-events-none`}
          />

          {/* Secondary Bottom-Right Drifting Orb */}
          <motion.div
            animate={{
              x: ['30px', '-30px', '30px'],
            }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute -bottom-24 -right-20 w-[34rem] h-[34rem] rounded-full bg-gradient-to-bl ${orbColor2} blur-3xl pointer-events-none`}
          />

          {/* Center Subtle Soft Glow Node */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-400/5 blur-3xl pointer-events-none"
          />
        </>
      )}

      {/* 4. Interactive Synchronized BIM Constellation Dots */}
      {showDots && (
        <SyncedBimDotsBackground 
          density="medium" 
          interactive={true} 
          className="opacity-70"
        />
      )}

      {/* 5. Moving Architectural Wireframe Geometry (Isometric Prism / Cube) — Continuous Smooth Left-to-Right Drift */}
      {showWireframe && !shouldReduceMotion && (
        <>
          <motion.div
            animate={{
              x: [-60, 60],
              opacity: [0, 0.45, 0.45, 0]
            }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            style={{ willChange: 'transform' }}
            className="hidden lg:block absolute top-16 right-12 w-28 h-28 pointer-events-none"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-blue-600 drop-shadow-xs">
              <polygon points="50,15 85,32 50,49 15,32" fill="rgba(37,99,235,0.06)" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
              <polygon points="15,32 50,49 50,85 15,68" fill="rgba(37,99,235,0.09)" stroke="currentColor" strokeWidth="1.2" />
              <polygon points="50,49 85,32 85,68 50,85" fill="rgba(37,99,235,0.14)" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="50" cy="49" r="2.2" fill="#2563EB" />
            </svg>
            <span className="text-[8px] font-mono text-blue-600/80 block text-center mt-1 font-bold">LOD 350 MODEL</span>
          </motion.div>

          <motion.div
            animate={{
              x: [-40, 80],
              opacity: [0, 0.4, 0.4, 0]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ willChange: 'transform' }}
            className="hidden lg:block absolute bottom-16 left-8 w-24 h-24 pointer-events-none"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500 drop-shadow-xs">
              <polygon points="50,18 80,33 50,48 20,33" fill="rgba(37,99,235,0.05)" stroke="currentColor" strokeWidth="1.2" />
              <polygon points="20,33 50,48 50,78 20,63" fill="rgba(37,99,235,0.07)" stroke="currentColor" strokeWidth="1.2" />
              <polygon points="50,48 80,33 80,63 50,78" fill="rgba(37,99,235,0.11)" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
              <circle cx="50" cy="48" r="2" fill="#0284C7" />
            </svg>
            <span className="text-[8px] font-mono text-blue-600/80 block text-center mt-0.5 font-bold">0-CLASH ZONE</span>
          </motion.div>
        </>
      )}

      {/* 6. Rotating Technical Compass Dial */}
      {showCompass && !shouldReduceMotion && (
        <div
          className="hidden xl:block absolute top-1/2 -right-20 -translate-y-1/2 w-56 h-56 opacity-20 pointer-events-none"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-blue-500">
            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
            <line x1="100" y1="5" x2="100" y2="195" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
            <line x1="5" y1="100" x2="195" y2="100" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
            <text x="100" y="20" fill="currentColor" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">N</text>
            <text x="185" y="104" fill="currentColor" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">E</text>
            <text x="100" y="190" fill="currentColor" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">S</text>
            <text x="15" y="104" fill="currentColor" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">W</text>
          </svg>
        </div>
      )}

      {/* 7. Subtle Horizontal Datum Reference Line (Smooth Continuous Left-to-Right Drift) */}
      {showLaser && !shouldReduceMotion && (
        <motion.div
          animate={{
            x: ['-6%', '6%'],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          style={{ willChange: 'transform' }}
          className="absolute left-0 right-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent pointer-events-none z-0"
        >
          <div className="absolute right-10 -top-3 px-2 py-0.5 rounded-full bg-white/95 border border-blue-200/90 text-[9px] font-mono text-blue-700 shadow-xs flex items-center gap-1.5 backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span className="font-semibold">{laserElevationText}</span>
          </div>
        </motion.div>
      )}

      {/* 8. Stationary Geometric Engineering Crosshair Markers */}
      <div className="absolute top-28 left-1/4 flex items-center justify-center w-4 h-4 text-blue-500/50">
        <svg viewBox="0 0 16 16" className="w-full h-full">
          <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1.2" />
          <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>

      <div className="absolute bottom-24 right-1/4 flex items-center justify-center w-4 h-4 text-sky-500/50">
        <svg viewBox="0 0 16 16" className="w-full h-full">
          <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1.2" />
          <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  );
};
