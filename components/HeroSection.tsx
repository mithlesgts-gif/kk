import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  ArrowUpRight, 
  Layers, 
  Box, 
  ShieldCheck, 
  Building2, 
  Compass, 
  GitBranch, 
  Calendar,
  CheckCircle2,
  HardHat,
  Cpu,
  FileCheck2,
  Maximize2
} from 'lucide-react';
import { HeroBlueprintAnimation } from './HeroBlueprintAnimation';
import bridgeHeroImg from '../assets/images/bridge_hero_bg.jpg';

interface HeroSectionProps {
  onOpenBooking?: () => void;
}

interface RotatingInfoItem {
  badge: string;
  badgeLabel: string;
  title: string;
  description: string;
  footLeft: string;
  footRight: string;
  footRightColor?: string;
}

// 1. Box 1: Rotating BIM Project Stages & LOD Specifications
const lodStageItems: RotatingInfoItem[] = [
  {
    badge: 'LOD 350',
    badgeLabel: 'COORDINATED',
    title: 'LOD 350 — Constructability',
    description: 'Multi-discipline interfaces, connections, support brackets & trade clearances.',
    footLeft: 'TOLERANCE: ±1mm',
    footRight: '0 CLASH',
    footRightColor: 'text-emerald-400'
  },
  {
    badge: 'LOD 200',
    badgeLabel: 'SCHEMATIC',
    title: 'LOD 200 — Design Development',
    description: 'Approximate geometry, spatial volumes, massing & schematic orientation.',
    footLeft: 'SPATIAL MODELING',
    footRight: 'CONCEPT',
    footRightColor: 'text-sky-300'
  },
  {
    badge: 'LOD 300',
    badgeLabel: 'DETAILED',
    title: 'LOD 300 — Detailed Design',
    description: 'Specific assemblies, exact quantities, shapes, locations & system sizing.',
    footLeft: 'ACCURACY: ±5mm',
    footRight: 'PARAMETRIC',
    footRightColor: 'text-blue-300'
  },
  {
    badge: 'LOD 400',
    badgeLabel: 'FABRICATION',
    title: 'LOD 400 — Fabrication Spools',
    description: 'Shop drawing assemblies, rebar schedules, pipe spools & anchor bolts.',
    footLeft: 'SHOP DRAWINGS',
    footRight: 'VERIFIED',
    footRightColor: 'text-emerald-400'
  },
  {
    badge: 'LOD 500',
    badgeLabel: 'AS-BUILT',
    title: 'LOD 500 — As-Built Representation',
    description: 'Field-verified geometry, laser scan comparison & life-cycle registers.',
    footLeft: 'FIELD VERIFIED',
    footRight: 'ISO 19650-2',
    footRightColor: 'text-blue-300'
  },
  {
    badge: '4D BIM',
    badgeLabel: 'SEQUENCING',
    title: '4D BIM — Construction Sequencing',
    description: 'Model elements linked to Primavera P6 / MS Project construction schedules.',
    footLeft: 'PHASING AUDIT',
    footRight: 'TIME-LINKED',
    footRightColor: 'text-sky-300'
  },
  {
    badge: 'SCAN TO BIM',
    badgeLabel: 'POINT CLOUD',
    title: 'Scan-to-BIM — Existing Conditions',
    description: 'High-resolution terrestrial LiDAR surveys converted into parametric Revit models.',
    footLeft: 'LOA 30/40 SURVEY',
    footRight: '±3mm LASER',
    footRightColor: 'text-emerald-400'
  },
  {
    badge: 'QA/QC BIM',
    badgeLabel: 'AUDITED',
    title: 'QA/QC — Model Validation',
    description: 'Automated parameter checks, coordinate alignment & metadata audit reports.',
    footLeft: 'CDE PROTOCOLS',
    footRight: 'ZERO ERROR',
    footRightColor: 'text-emerald-400'
  }
];

// 2. Box 2: Rotating Digital Twin & Core Capabilities
const digitalTwinItems: RotatingInfoItem[] = [
  {
    badge: 'DIGITAL TWIN',
    badgeLabel: 'LOD 500 READY',
    title: 'Digital Twin — Connected Intelligence',
    description: 'COBie metadata, asset life-cycle registers & verified sensor points.',
    footLeft: 'FM INTEGRATION',
    footRight: 'ISO 19650',
    footRightColor: 'text-blue-300'
  },
  {
    badge: 'ARCH BIM',
    badgeLabel: 'DESIGN INTENT',
    title: 'Architectural BIM — Parametric Modeling',
    description: 'Complex parametric envelopes, facade assemblies, and interior fit-outs.',
    footLeft: 'REVIT 2025',
    footRight: 'PARAMETRIC',
    footRightColor: 'text-sky-300'
  },
  {
    badge: 'STRUCT BIM',
    badgeLabel: 'REBAR & STEEL',
    title: 'Structural BIM — Detailing & Spools',
    description: 'Cast-in-place concrete, post-tensioned slabs, and structural steel trusses.',
    footLeft: 'TEKLA / REVIT',
    footRight: 'FABRICATION',
    footRightColor: 'text-emerald-400'
  },
  {
    badge: 'MEP BIM',
    badgeLabel: 'INTEGRATED',
    title: 'MEP BIM — Building Systems',
    description: 'HVAC ductwork, hydronic piping, electrical risers & fire protection networks.',
    footLeft: 'SMACNA / ASHRAE',
    footRight: 'COORDINATED',
    footRightColor: 'text-sky-300'
  },
  {
    badge: 'COORDINATION',
    badgeLabel: '0 CLASH',
    title: 'Clash Detection — Coordination Review',
    description: 'Multi-trade federation and systematic hard/soft interference resolution.',
    footLeft: 'NAVISWORKS',
    footRight: 'AUDITED',
    footRightColor: 'text-emerald-400'
  },
  {
    badge: 'SHOP DWGS',
    badgeLabel: 'ACCURATE',
    title: 'Construction Documentation — Drawings',
    description: 'Dimensioned 2D plans, sections, spool sheets, and Bill of Materials.',
    footLeft: 'CSD / BWIC',
    footRight: 'FAB-READY',
    footRightColor: 'text-emerald-400'
  },
  {
    badge: '5D QTO',
    badgeLabel: 'COST CONTROL',
    title: 'Quantity Takeoff — Model-Based QTO',
    description: 'Automated material volume extraction and schedule-linked cost estimation.',
    footLeft: 'BOQ EXTRACTION',
    footRight: '±0.5% VARIANCE',
    footRightColor: 'text-blue-300'
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const [lodIndex, setLodIndex] = useState(0);
  const [twinIndex, setTwinIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Automatic content rotation for Box 1 (every 3.8s)
  useEffect(() => {
    const timer = setInterval(() => {
      setLodIndex((prev) => (prev + 1) % lodStageItems.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  // Automatic content rotation for Box 2 (every 4.3s)
  useEffect(() => {
    const timer = setInterval(() => {
      setTwinIndex((prev) => (prev + 1) % digitalTwinItems.length);
    }, 4300);
    return () => clearInterval(timer);
  }, []);

  const currentLodItem = lodStageItems[lodIndex];
  const currentTwinItem = digitalTwinItems[twinIndex];

  const marqueeKeywords = [
    'BIM Modeling',
    'Architectural BIM',
    'Structural BIM',
    'MEP Coordination',
    'Clash Detection',
    'Scan to BIM',
    'Digital Construction',
    'Shop Drawings',
    '4D Construction Simulation',
    'Revit Content Creation'
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-36 sm:pt-40 md:pt-44 pb-4 overflow-hidden bg-gradient-to-b from-[#E2ECF7] via-[#EDF3FA] to-[#E3EDF6]">
      {/* 1. Engineering Infrastructure Cable-Stayed Bridge Background with Smooth Horizontal Pan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <motion.img
          src={bridgeHeroImg}
          alt="Cable-stayed civil and structural engineering infrastructure bridge spanning across water at sunset"
          animate={shouldReduceMotion ? {} : { x: ['-3%', '3%'] }}
          transition={{ duration: 48, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          style={{ scale: 1.12, willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
          className="w-full h-full object-cover object-center filter contrast-110 brightness-[0.88] saturate-[1.05]"
        />
        {/* Subtle Navy-Blue Overlay Scrim ensuring WCAG AA contrast for headline and badges while preserving the bridge details */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#09152C]/85 via-[#0F224A]/60 to-[#09152C]/85 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09152C]/70 via-transparent to-[#09152C]/85 pointer-events-none" />
      </div>

      {/* 2. Subtle Precision Datum Elevation Linework (Smooth Horizontal Drift, Zero Jitter) */}
      <HeroBlueprintAnimation />

      {/* 
        4. Large-Screen Dedicated Flanking Information Boxes
        Left Box: Automatically Cycles through LOD 200–500, 4D BIM, Scan-to-BIM, QA/QC
        Right Box: Automatically Cycles through Digital Twin, Architectural, Structural, MEP, Shop Drawings
      */}
      {/* Left Dedicated Flank: LOD Stages & Constructability (Desktop xl+) */}
      <div 
        className="hidden xl:flex flex-col justify-between absolute top-44 left-8 2xl:left-14 w-64 2xl:w-72 h-[152px] p-4 rounded-2xl bg-[#09152C]/92 backdrop-blur-md border border-blue-500/35 shadow-xl shadow-blue-950/40 pointer-events-auto z-20 group hover:border-[#165DFF] transition-all text-white overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLodItem.badge}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="h-full flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{currentLodItem.badge}</span>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 text-[9px] font-bold border border-blue-500/30">
                {currentLodItem.badgeLabel}
              </span>
            </div>
            <div className="my-1.5 space-y-1">
              <div className="text-xs font-bold text-white font-display truncate">
                {currentLodItem.title}
              </div>
              <div className="text-[11px] text-slate-300 font-body leading-snug line-clamp-2">
                {currentLodItem.description}
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-300">
              <span>{currentLodItem.footLeft}</span>
              <span className={`font-bold ${currentLodItem.footRightColor || 'text-emerald-400'}`}>
                {currentLodItem.footRight}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Dedicated Flank: Digital Twin & Systems (Desktop xl+) */}
      <div 
        className="hidden xl:flex flex-col justify-between absolute top-44 right-8 2xl:right-14 w-64 2xl:w-72 h-[152px] p-4 rounded-2xl bg-[#09152C]/92 backdrop-blur-md border border-blue-500/35 shadow-xl shadow-blue-950/40 pointer-events-auto z-20 group hover:border-[#165DFF] transition-all text-white overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTwinItem.badge}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="h-full flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 text-sky-400 font-bold">
                <Box className="w-3.5 h-3.5 text-sky-400" />
                <span>{currentTwinItem.badge}</span>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-[9px] font-bold">
                {currentTwinItem.badgeLabel}
              </span>
            </div>
            <div className="my-1.5 space-y-1">
              <div className="text-xs font-bold text-white font-display truncate">
                {currentTwinItem.title}
              </div>
              <div className="text-[11px] text-slate-300 font-body leading-snug line-clamp-2">
                {currentTwinItem.description}
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-300">
              <span>{currentTwinItem.footLeft}</span>
              <span className={`font-bold ${currentTwinItem.footRightColor || 'text-blue-300'}`}>
                {currentTwinItem.footRight}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Center Content Container with Guaranteed Visibility & Spacing */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20 space-y-6 my-auto">
        {/* Controlled, Directional Headline Reveal (Stationary, Non-Shaking) */}
        <div className="space-y-4 relative">
          {/* Engineering Badge */}
          <div className="flex items-center justify-center select-none">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#09152C]/90 border border-blue-500/40 text-xs font-mono text-blue-300 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="font-semibold">Integrated BIM Solutions</span>
              <span className="text-blue-500">·</span>
              <span className="text-white font-medium">LOD 100 to LOD 500</span>
            </div>
          </div>

          {/* 
            Required Headline: 
            "Engineering the Digital Twin from LOD 100 to LOD 500 & Beyond"
          */}
          <motion.h1 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display tracking-tight leading-[1.12] text-white drop-shadow-md"
          >
            <span className="block">Engineering the Digital Twin</span>
            <span className="block mt-1 sm:mt-2 text-slate-100">
              from LOD 100 to{' '}
              <span className="text-[#38BDF8] relative inline-block underline decoration-[#60A5FA]/60 decoration-2 sm:decoration-4 underline-offset-4">
                LOD 500 &amp; Beyond
              </span>
            </span>
          </motion.h1>
        </div>

        {/* Clear, Readable Engineering Value Proposition */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm sm:text-lg md:text-xl text-slate-100 max-w-2xl sm:max-w-3xl mx-auto font-body leading-relaxed font-normal drop-shadow-sm px-2"
        >
          Integrated Building Information Modeling (BIM) solutions engineered to accelerate multidisciplinary coordination, eliminate field clashes, and deliver construction-ready accuracy from <span className="text-sky-300 font-semibold">LOD 100 conceptual design</span> to <span className="text-sky-300 font-semibold">LOD 500 digital twins</span>.
        </motion.p>

        {/* Primary and Secondary Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-1"
        >
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#165DFF] hover:bg-[#2878FF] text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
          >
            <Calendar className="w-4 h-4 text-blue-200" />
            <span>Book Free 1:1 Consultation</span>
          </button>

          <a
            href="#contact"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0B1736]/90 text-white hover:text-blue-300 border border-blue-500/40 hover:border-[#165DFF] font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-sm hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md"
          >
            <span>Discuss Project</span>
            <ArrowUpRight className="w-4 h-4 text-blue-300 group-hover:text-white" />
          </a>

          <a
            href="#lifecycle-animation"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-950/80 hover:bg-blue-900/90 text-blue-200 font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 border border-blue-500/40 backdrop-blur-md"
          >
            <span>Watch Construction Lifecycle</span>
          </a>
        </motion.div>

        {/* 
          Mobile & Tablet Dedicated Rotating Boxes (Visible on screens below xl)
          Ensures the rotating LOD 350 and Digital Twin boxes are accessible on all screen sizes!
        */}
        <div className="xl:hidden pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
          {/* Box 1 (Mobile/Tablet): LOD & Deliverables */}
          <div className="p-3.5 rounded-2xl bg-[#09152C]/92 backdrop-blur-md border border-blue-500/35 shadow-md shadow-blue-950/30 text-white overflow-hidden min-h-[142px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mob-lod-${currentLodItem.badge}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="h-full flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{currentLodItem.badge}</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 text-[9px] font-bold border border-blue-500/30">
                    {currentLodItem.badgeLabel}
                  </span>
                </div>
                <div className="my-1.5">
                  <div className="text-xs font-bold text-white font-display truncate">
                    {currentLodItem.title}
                  </div>
                  <div className="text-[11px] text-slate-300 font-body leading-snug line-clamp-2">
                    {currentLodItem.description}
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-300">
                  <span>{currentLodItem.footLeft}</span>
                  <span className={`font-bold ${currentLodItem.footRightColor || 'text-emerald-400'}`}>
                    {currentLodItem.footRight}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Box 2 (Mobile/Tablet): Digital Twin & Capabilities */}
          <div className="p-3.5 rounded-2xl bg-[#09152C]/92 backdrop-blur-md border border-blue-500/35 shadow-md shadow-blue-950/30 text-white overflow-hidden min-h-[142px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mob-twin-${currentTwinItem.badge}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="h-full flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-sky-400 font-bold">
                    <Box className="w-3.5 h-3.5" />
                    <span>{currentTwinItem.badge}</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-[9px] font-bold">
                    {currentTwinItem.badgeLabel}
                  </span>
                </div>
                <div className="my-1.5">
                  <div className="text-xs font-bold text-white font-display truncate">
                    {currentTwinItem.title}
                  </div>
                  <div className="text-[11px] text-slate-300 font-body leading-snug line-clamp-2">
                    {currentTwinItem.description}
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-300">
                  <span>{currentTwinItem.footLeft}</span>
                  <span className={`font-bold ${currentTwinItem.footRightColor || 'text-blue-300'}`}>
                    {currentTwinItem.footRight}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Responsive Telemetry Cards Strip (Dark Navy Tinted Glass Surfaces) */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="pt-4 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto text-left"
        >
          <div className="p-3.5 rounded-2xl bg-[#09152C]/90 backdrop-blur-md border border-blue-500/30 shadow-md shadow-blue-950/20 hover:border-blue-400 transition-all text-white">
            <span className="text-[10px] font-mono text-blue-400 font-bold block">1:1 GOVERNANCE</span>
            <span className="text-xs font-bold text-white font-display">Dedicated PM</span>
            <span className="text-[11px] text-slate-300 block mt-0.5">Direct Lead Accountability</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#09152C]/90 backdrop-blur-md border border-blue-500/30 shadow-md shadow-blue-950/20 hover:border-blue-400 transition-all text-white">
            <span className="text-[10px] font-mono text-blue-400 font-bold block">PRECISION MATRIX</span>
            <span className="text-xs font-bold text-white font-display">Zero Clash Model</span>
            <span className="text-[11px] text-slate-300 block mt-0.5">Navisworks Hard/Soft Audit</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#09152C]/90 backdrop-blur-md border border-blue-500/30 shadow-md shadow-blue-950/20 hover:border-blue-400 transition-all text-white">
            <span className="text-[10px] font-mono text-blue-400 font-bold block">FULL LIFECYCLE</span>
            <span className="text-xs font-bold text-white font-display">LOD 100 to 500</span>
            <span className="text-[11px] text-slate-300 block mt-0.5">Concept to Digital Twin</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#09152C]/90 backdrop-blur-md border border-blue-500/30 shadow-md shadow-blue-950/20 hover:border-blue-400 transition-all text-white">
            <span className="text-[10px] font-mono text-blue-400 font-bold block">GLOBAL STANDARDS</span>
            <span className="text-xs font-bold text-white font-display">ISO 19650</span>
            <span className="text-[11px] text-slate-300 block mt-0.5">Common Data Environment</span>
          </div>
        </motion.div>
      </div>

      {/* Continuously Moving Engineering Keyword Marquee Strip */}
      <div className="w-full bg-[#081226] text-white py-3.5 border-y border-blue-900/60 overflow-hidden relative mt-8 z-20 shadow-inner">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-mono tracking-wider uppercase">
          {[...marqueeKeywords, ...marqueeKeywords].map((word, idx) => (
            <span key={idx} className="flex items-center gap-8">
              <span className={idx % 3 === 0 ? 'text-[#2878FF] font-bold' : idx % 3 === 1 ? 'text-sky-300 font-bold' : 'text-slate-200'}>
                {word}
              </span>
              <span className="text-blue-500/50" aria-hidden="true">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
