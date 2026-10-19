import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

interface ArchitecturalSectionBackgroundProps {
  image: string;
  secondaryImage?: string;
  theme?: 'light' | 'dark';
  alt?: string;
  className?: string;
  title?: string;
  location?: string;
  elevation?: string;
  showGrid?: boolean;
  showScanLine?: boolean;
}

export const ArchitecturalSectionBackground: React.FC<ArchitecturalSectionBackgroundProps> = ({
  image,
  secondaryImage,
  theme = 'light',
  alt = 'Architectural building framework and BIM coordination',
  className = '',
  title = 'Metropolitan High-Rise Superstructure',
  location = 'Jamshedpur / Global Delivery',
  elevation = 'DATUM: +68.400m',
  showGrid = false,
  showScanLine = true
}) => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-40px' });

  const isDark = theme === 'dark';

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
    >
      {/* 
        Controlled Directional Entrance Animation with Smooth Horizontal Panning
        Calm, steady left-to-right drift without vertical shaking or jitter
      */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0.95 } : { opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full h-full relative overflow-hidden"
      >
        {/* High-definition architectural construction image smoothly moving from left to right */}
        <motion.img
          src={image}
          alt={alt}
          animate={shouldReduceMotion ? {} : { x: ['-4%', '4%'] }}
          transition={{ duration: 46, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          style={{ scale: 1.12, willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
          className={`w-full h-full object-cover object-center ${
            isDark
              ? 'opacity-95 filter brightness-[0.95] contrast-120 saturate-[1.08]'
              : 'opacity-92 filter brightness-[0.96] contrast-115 saturate-[1.05]'
          }`}
        />

        {/* 
          Targeted readability scrim: cool-blue architectural tone preserving authentic construction visibility
          while ensuring text meets WCAG AA standards
        */}
        {isDark ? (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/30 pointer-events-none" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-[#DFEAF5]/80 via-[#EBF2F9]/55 to-[#DFEAF5]/30 pointer-events-none" />
        )}

        {/* Vertical vignette to blend cleanly with adjacent sections */}
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-gradient-to-b from-slate-950/55 via-transparent to-slate-950/65'
              : 'bg-gradient-to-b from-[#DFEAF5]/55 via-transparent to-[#DFEAF5]/65'
          } pointer-events-none`}
        />
      </motion.div>

      {/* Engineering Technical Coordinates Stamp */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="hidden md:flex absolute top-6 left-6 items-center gap-2 text-[10px] font-mono pointer-events-none z-10"
      >
        <span
          className={`px-2 py-0.5 rounded ${
            isDark
              ? 'bg-slate-900/90 text-blue-400 border border-blue-500/30'
              : 'bg-[#DFEAF5]/95 text-blue-700 border border-blue-300 shadow-xs'
          }`}
        >
          {elevation}
        </span>
        <span className={isDark ? 'text-slate-400' : 'text-slate-700 font-semibold'}>
          {title} · {location}
        </span>
      </motion.div>
    </div>
  );
};
