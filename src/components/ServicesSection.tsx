import React, { useState } from 'react';
import { Theme, Page, Service } from '../types';
import { SERVICES } from '../data/agencyData';
import { useCms } from '../context/CmsContext';
import { PixyBorderBeam } from './PixyBorderBeam';
import { GsapMagneticButton } from './GsapMagneticButton';
import { 
  CheckCircle2, ArrowRight, ArrowLeft, Sparkles,
  Smartphone, Globe, Database, Cpu, LayoutGrid, Code, Layers, X
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ServicesSectionProps {
  theme: Theme;
  setCurrentPage: (page: Page) => void;
  isStandalone?: boolean;
}

interface AnimatedSvgIconProps {
  iconName: string;
  isSelected: boolean;
  theme: Theme;
}

const AnimatedSvgIcon: React.FC<AnimatedSvgIconProps> = ({ iconName, isSelected, theme }) => {
  const strokeColor = isSelected ? '#B91C1C' : theme === 'dark' ? '#F3F4F6' : '#111827';
  const glowColor = isSelected ? 'rgba(185, 28, 28, 0.35)' : 'transparent';

  const renderPaths = () => {
    switch (iconName) {
      case 'Figma':
      case 'Layers':
        return (
          <>
            <motion.path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.path
              d="M2 12L12 17L22 12"
              stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            />
            <motion.path
              d="M2 17L12 22L22 17"
              stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
            />
          </>
        );
      case 'Smartphone':
        return (
          <>
            <motion.rect
              x="5" y="2" width="14" height="20" rx="3"
              stroke={strokeColor} strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.circle
              cx="12" cy="18" r="1"
              fill={strokeColor}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            />
            <motion.path
              d="M9 5H15"
              stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            />
          </>
        );
      case 'LayoutGrid':
      case 'Database':
        return (
          <>
            <motion.ellipse
              cx="12" cy="5" rx="9" ry="3"
              stroke={strokeColor} strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <motion.path
              d="M3 5V12C3 13.6569 7.02944 15 12 15C16.9706 15 21 13.6569 21 12V5"
              stroke={strokeColor} strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            />
            <motion.path
              d="M3 12V19C3 20.6569 7.02944 22 12 22C16.9706 22 21 20.6569 21 19V12"
              stroke={strokeColor} strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            />
          </>
        );
      case 'Code':
      case 'Globe':
        return (
          <>
            <motion.polyline
              points="16 18 22 12 16 6"
              stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <motion.polyline
              points="8 6 2 12 8 18"
              stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            />
            <motion.line
              x1="14" y1="4" x2="10" y2="20"
              stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            />
          </>
        );
      case 'Cpu':
      default:
        return (
          <>
            <motion.rect
              x="4" y="4" width="16" height="16" rx="2"
              stroke={strokeColor} strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.rect
              x="9" y="9" width="6" height="6" rx="1"
              stroke={strokeColor} strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            />
            <motion.path
              d="M9 1V4M15 1V4M9 20V23M15 20V23M1 9H4M1 15H4M20 9H23M20 15H23"
              stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
            />
          </>
        );
    }
  };

  return (
    <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
      <div 
        className="absolute inset-0 rounded-lg blur-md transition-all duration-300 pointer-events-none" 
        style={{ backgroundColor: glowColor }} 
      />
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-6 h-6"
      >
        {renderPaths()}
      </svg>
    </div>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  theme,
  setCurrentPage,
  isStandalone = false
}) => {
  const cms = useCms();
  const rawServices = cms?.services?.length ? cms.services : SERVICES;
  const isDark = theme === 'dark';
  
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  return (
    <div className={`w-full max-w-full transition-colors duration-300 ${isDark ? 'text-white' : 'text-neutral-950'}`}>
      
      {/* 1. EDITORIAL HEADER */}
      <section className={`relative w-full max-w-full overflow-hidden ${isStandalone ? 'pt-28 pb-12 sm:pt-36 sm:pb-16' : 'pt-12 pb-6'} border-b border-neutral-200/40 dark:border-neutral-800/40 bg-transparent`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-rose-900/10 dark:bg-rose-950/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[250px] bg-rose-600/5 dark:bg-rose-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          
          {/* Header Card Container for Maximum Readability */}
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl backdrop-blur-2xl ${
            isDark
              ? 'bg-neutral-950/95 border-neutral-800/90 text-white shadow-black/80 ring-1 ring-white/10'
              : 'bg-white/95 border-neutral-200/90 text-neutral-950 shadow-2xl shadow-neutral-900/10 ring-1 ring-black/5'
          }`}>
            <div className="space-y-4">
              {/* Header Tag */}
              <div className="flex items-center gap-2 text-rose-900 dark:text-rose-400 font-extrabold uppercase tracking-wider text-xs font-mono">
                <Sparkles className="w-4 h-4 text-rose-800 dark:text-rose-400" />
                <span>Core Engineering Capabilities</span>
              </div>

              {/* Title & Subtitle */}
              <div className="max-w-4xl space-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-neutral-950 dark:text-white text-balance">
                  Bespoke Software Engineering &{' '}
                  <span className="bg-gradient-to-r from-rose-700 via-rose-900 to-rose-950 dark:from-rose-400 dark:via-rose-500 dark:to-rose-600 bg-clip-text text-transparent underline decoration-rose-500/30 underline-offset-8">
                    Tokenized Figma Systems.
                  </span>
                </h1>
                <p className={`text-sm sm:text-base md:text-lg font-semibold leading-relaxed ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                  From atomic Figma design tokens to high-velocity React/TypeScript backends, we build tailored digital engines with zero technical debt.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MAIN SERVICES SHOWCASE GRID */}
      <section className="py-8 sm:py-12 w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* GRID LAYOUT WITH INLINE HORIZONTAL EXPANSION */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {(isStandalone ? rawServices : rawServices.slice(0, 4)).map((service, index) => {
              const isExpanded = isStandalone && expandedServiceId === service.id;

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`flex flex-col h-full ${isExpanded ? 'col-span-1 md:col-span-2 lg:col-span-4' : 'col-span-1'}`}
                >
                  <div className={`flex flex-col justify-between h-full p-6 sm:p-7 rounded-3xl border transition-all duration-300 relative overflow-hidden backdrop-blur-2xl group hover:border-rose-800/80 hover:shadow-2xl hover:shadow-rose-900/20 ${
                    isDark 
                      ? 'bg-[#080d1a]/95 border-neutral-800/90 text-white shadow-black/80 ring-1 ring-white/10' 
                      : 'bg-white/95 border-neutral-200/90 text-neutral-950 shadow-2xl shadow-neutral-900/10 ring-1 ring-black/5'
                  }`}>
                    <PixyBorderBeam duration={9} size={220} colorFrom="#ef4444" colorTo="#fca5a5" />

                    {isExpanded ? (
                      /* EXPANDED HORIZONTAL CARD VIEW */
                      <div className="space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80">
                          <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'}`}>
                              <AnimatedSvgIcon iconName={service.iconName} isSelected={true} theme={theme} />
                            </div>
                            <div>
                              <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-rose-900 dark:text-rose-400">
                                0{index + 1}. Capability Specification
                              </span>
                              <h3 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5 text-neutral-950 dark:text-white">
                                {service.name}
                              </h3>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setExpandedServiceId(null)}
                            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-colors cursor-pointer border ${
                              isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800' : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200'
                            }`}
                            aria-label="Collapse box"
                          >
                            <ArrowLeft className="w-4 h-4 text-rose-800 dark:text-rose-400" />
                            <span className="text-xs font-extrabold uppercase tracking-wider">Back</span>
                          </button>
                        </div>

                        {/* Description & Tagline */}
                        <div className="space-y-3">
                          <p className={`text-sm sm:text-base font-semibold leading-relaxed ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                            {service.tagline}
                          </p>
                          <p className={`text-xs sm:text-sm font-normal leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                            {service.description}
                          </p>
                        </div>

                        {/* Metrics Box */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-neutral-900/90 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                            <span className="text-[11px] font-mono font-bold uppercase text-neutral-500 dark:text-neutral-400">Timeline SLA</span>
                            <div className="text-base sm:text-lg font-mono font-black text-rose-900 dark:text-rose-400 mt-1">
                              {service.estimatedTime}
                            </div>
                          </div>
                          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-neutral-900/90 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                            <span className="text-[11px] font-mono font-bold uppercase text-neutral-500 dark:text-neutral-400">Typical ROI Benchmark</span>
                            <div className="text-base sm:text-lg font-mono font-black text-emerald-600 dark:text-emerald-400 mt-1">
                              {service.typicalRoi}
                            </div>
                          </div>
                        </div>

                        {/* Deliverables List */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            Included Deliverables
                          </h4>
                          <div className="grid sm:grid-cols-2 gap-2.5">
                            {service.deliverables.map((item, idx) => (
                              <div key={idx} className={`p-3 rounded-xl border text-xs font-semibold flex items-start gap-2.5 ${
                                isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-100 border-neutral-200 text-neutral-950'
                              }`}>
                                <CheckCircle2 className="w-4 h-4 text-rose-800 dark:text-rose-400 shrink-0 mt-0.5" />
                                <span className="leading-snug">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Figma Features / Tech Stack */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            Figma Details & Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {service.figmaFeatures.map((feat, idx) => (
                              <span key={idx} className="px-3 py-1.5 text-xs font-mono font-bold rounded-xl border border-rose-800/40 bg-rose-900/10 text-rose-900 dark:text-rose-400">
                                {feat}
                              </span>
                            ))}
                            {service.techStack.map((tech, idx) => (
                              <span key={idx} className={`px-3 py-1.5 text-xs font-mono font-bold rounded-xl border ${
                                isDark ? 'bg-neutral-900 border-neutral-700 text-white' : 'bg-neutral-100 border-neutral-300 text-neutral-950'
                              }`}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Schedule Consultation CTA */}
                        <div className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
                          <button
                            type="button"
                            onClick={() => {
                              setCurrentPage('contact');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-rose-900 hover:bg-rose-950 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-rose-900/30 cursor-pointer active:scale-98 inline-flex items-center justify-center gap-2"
                          >
                            <span>Schedule Consultation</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* NORMAL COLLAPSED CARD VIEW */
                      <>
                        <div className="space-y-4">
                          {/* Header: Index & Animated Domain Emblem */}
                          <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-neutral-800/80">
                            <span className="font-mono text-xs font-extrabold text-rose-900 dark:text-rose-400">
                              0{index + 1}. Capability
                            </span>
                            <div className={`p-2.5 rounded-xl border ${
                              isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
                            }`}>
                              <AnimatedSvgIcon iconName={service.iconName} isSelected={isExpanded} theme={theme} />
                            </div>
                          </div>

                          {/* Title & Tagline */}
                          <div className="space-y-2">
                            <h3 className="text-xl font-black tracking-tight text-neutral-950 dark:text-white group-hover:text-rose-900 dark:group-hover:text-rose-400 transition-colors text-balance">
                              {service.name}
                            </h3>
                            <p className={`text-xs sm:text-sm font-semibold leading-relaxed line-clamp-2 ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                              {service.tagline}
                            </p>
                          </div>

                          {/* Deliverables Checklist */}
                          <div className="space-y-2 pt-1">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                              Deliverables
                            </span>
                            <ul className="space-y-1.5 text-xs">
                              {service.deliverables.slice(0, 2).map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-800 dark:text-rose-400 shrink-0 mt-0.5" />
                                  <span className={`text-xs font-semibold leading-snug ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tech Stack Tokens */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {service.techStack.slice(0, 3).map((tech, idx) => (
                              <span
                                key={idx}
                                className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-md border ${
                                  isDark
                                    ? 'bg-neutral-900/90 border-neutral-700 text-neutral-100'
                                    : 'bg-neutral-100 border-neutral-300 text-neutral-950'
                                }`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Bottom: Timeline SLA & Action */}
                        <div className="mt-6 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between gap-2">
                          <div className="flex flex-col text-[11px] font-mono">
                            <span className="text-neutral-500 dark:text-neutral-400 font-medium">Timeline SLA</span>
                            <span className="font-extrabold text-neutral-950 dark:text-white text-xs">{service.estimatedTime}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (isStandalone) {
                                setExpandedServiceId(service.id);
                              } else {
                                setCurrentPage('services');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }
                            }}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-900 hover:bg-rose-950 text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-md shadow-rose-900/30 cursor-pointer active:scale-98"
                          >
                            <span>{isStandalone ? 'View Details' : 'Explore'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </>
                    )}

                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Home Preview CTA Button */}
          {!isStandalone && (
            <div className="text-center pt-2">
              <GsapMagneticButton strength={0.3}>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-4 rounded-2xl bg-rose-900 hover:bg-rose-950 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-rose-900/30 inline-flex items-center gap-2.5 cursor-pointer active:scale-98"
                >
                  <span>Explore All Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </GsapMagneticButton>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};
