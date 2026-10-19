import React from 'react';
import { motion } from 'motion/react';
import { SyncedBimDotsBackground } from './SyncedBimDotsBackground';

interface BackgroundDesignElementsProps {
  variant?: 'hero' | 'section' | 'subtle';
  showIsometricCube?: boolean;
  showLaserGrid?: boolean;
  showDots?: boolean;
}

export const BackgroundDesignElements: React.FC<BackgroundDesignElementsProps> = ({
  variant = 'section',
  showIsometricCube = true,
  showLaserGrid = true,
  showDots = true
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 1. Blueprint Grid Base Overlay */}
      <div className="absolute inset-0 bg-grid-light opacity-50" />

      {/* 2. Synchronized Moving Dots & Constellation Mesh (White & Blue Only) */}
      {showDots && (
        <SyncedBimDotsBackground 
          density={variant === 'hero' ? 'high' : 'medium'} 
          className="opacity-75"
        />
      )}

      {/* 3. Soft Moving Ambient Gradient Orbs (Smooth Left-to-Right Panning) */}
      <motion.div
        animate={{
          x: [-50, 50],
          opacity: [0.4, 0.8, 0.8, 0.4]
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ willChange: 'transform' }}
        className="absolute top-10 -left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-400/10 to-blue-600/5 blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{
          x: [-40, 60],
          opacity: [0.3, 0.7, 0.7, 0.3]
        }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        style={{ willChange: 'transform' }}
        className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-gradient-to-bl from-sky-400/10 to-blue-600/5 blur-3xl pointer-events-none"
      />

      {/* 4. Architectural Wireframe Prisms (Smooth Continuous Left-to-Right Motion) */}
      {showIsometricCube && (
        <>
          {/* Top-Right Isometric Wireframe Cube Drawing */}
          <motion.div
            animate={{
              x: [-60, 60],
              opacity: [0, 0.6, 0.6, 0]
            }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            style={{ willChange: 'transform' }}
            className="hidden lg:block absolute top-16 right-12 w-28 h-28 pointer-events-none"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-blue-600 drop-shadow-sm">
              <polygon points="50,15 85,32 50,49 15,32" fill="rgba(37,99,235,0.05)" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
              <polygon points="15,32 50,49 50,85 15,68" fill="rgba(37,99,235,0.08)" stroke="currentColor" strokeWidth="1.2" />
              <polygon points="50,49 85,32 85,68 50,85" fill="rgba(37,99,235,0.12)" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="50" cy="49" r="2.2" fill="#2563EB" />
            </svg>
            <span className="text-[8px] font-mono text-blue-600/80 block text-center mt-1 font-bold">AXIS A: +14.2m</span>
          </motion.div>

          {/* Bottom-Left Blue Accent Isometric Wireframe Drawing */}
          <motion.div
            animate={{
              x: [-40, 80],
              opacity: [0, 0.55, 0.55, 0]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ willChange: 'transform' }}
            className="hidden lg:block absolute bottom-20 left-10 w-24 h-24 pointer-events-none"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500 drop-shadow-sm">
              <polygon points="50,18 80,33 50,48 20,33" fill="rgba(37,99,235,0.04)" stroke="currentColor" strokeWidth="1.2" />
              <polygon points="20,33 50,48 50,78 20,63" fill="rgba(37,99,235,0.06)" stroke="currentColor" strokeWidth="1.2" />
              <polygon points="50,48 80,33 80,63 50,78" fill="rgba(37,99,235,0.1)" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
              <circle cx="50" cy="48" r="2" fill="#0284C7" />
            </svg>
            <span className="text-[8px] font-mono text-blue-600/80 block text-center mt-0.5 font-bold">COORD: 0-CLASH</span>
          </motion.div>
        </>
      )}

      {/* 5. Moving Architectural Compass Ring */}
      <div className="hidden xl:block absolute top-1/2 -right-16 -translate-y-1/2 w-48 h-48 opacity-25">
        <svg viewBox="0 0 200 200" className="w-full h-full text-blue-500">
          <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
          <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
          <text x="100" y="22" fill="currentColor" fontSize="10" textAnchor="middle" fontFamily="monospace">N</text>
          <text x="185" y="104" fill="currentColor" fontSize="10" textAnchor="middle" fontFamily="monospace">E</text>
        </svg>
      </div>

      {/* 6. Subtle Horizontal Datum Line (Smooth Left-to-Right Drift) */}
      {showLaserGrid && (
        <motion.div
          animate={{
            x: ['-6%', '6%'],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          style={{ willChange: 'transform' }}
          className="absolute left-0 right-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500/35 to-transparent pointer-events-none"
        >
          <div className="absolute right-8 -top-3 px-2 py-0.5 rounded bg-white/95 border border-blue-200 text-[9px] font-mono text-blue-600 shadow-xs flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>LEVEL 04 ELEV: +16.800m</span>
          </div>
        </motion.div>
      )}

      {/* 7. Geometric Crosshair Nodes (Stable, Non-Shaking) */}
      <div className="absolute top-24 left-1/4 flex items-center justify-center w-4 h-4 text-blue-500/60">
        <svg viewBox="0 0 16 16" className="w-full h-full">
          <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1.2" />
          <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>

      <div className="absolute top-2/3 right-1/4 flex items-center justify-center w-4 h-4 text-sky-500/60">
        <svg viewBox="0 0 16 16" className="w-full h-full">
          <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1.2" />
          <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>

      <div className="absolute bottom-16 right-1/3 flex items-center justify-center w-3 h-3 text-blue-400/50">
        <svg viewBox="0 0 16 16" className="w-full h-full">
          <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
};
