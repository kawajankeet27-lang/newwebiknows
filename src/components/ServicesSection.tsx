import React, { useState } from 'react';
import { Theme, Page } from '../types';
import { SERVICES } from '../data/agencyData';
import { useCms } from '../context/CmsContext';
import { SpotlightCard } from './SpotlightCard';
import { TextReveal } from './TextReveal';
import { PixyBorderBeam } from './PixyBorderBeam';
import { PixyRollingText } from './PixyRollingText';
import { GsapMagneticButton } from './GsapMagneticButton';
import { CheckCircle2, ArrowRight, Sliders, Clock, TrendingUp, ChevronDown, ChevronUp, Sparkles, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServicesSectionProps {
  theme: Theme;
  setCurrentPage: (page: Page) => void;
  isStandalone?: boolean;
}

// Custom animated digital architecture SVG icon component
interface AnimatedSvgIconProps {
  iconName: string;
  isSelected: boolean;
  theme: Theme;
}

const AnimatedSvgIcon: React.FC<AnimatedSvgIconProps> = ({ iconName, isSelected, theme }) => {
  const strokeColor = isSelected ? '#B91C1C' : theme === 'dark' ? '#9CA3AF' : '#4B5563';
  const glowColor = isSelected ? 'rgba(185, 28, 28, 0.4)' : 'transparent';

  const renderPaths = () => {
    switch (iconName) {
      case 'Layers':
        return (
          <>
            <motion.path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.path
              d="M2 12L12 17L22 12"
              stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            />
            <motion.path
              d="M2 17L12 22L22 17"
              stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
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
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.circle
              cx="12" cy="18" r="1"
              fill={strokeColor}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: 0.5 }}
            />
            <motion.path
              d="M9 5H15"
              stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: 0.3 }}
            />
          </>
        );
      case 'Globe':
        return (
          <>
            <motion.circle
              cx="12" cy="12" r="9"
              stroke={strokeColor} strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.path
              d="M3.6 9H20.4M3.6 15H20.4"
              stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            />
            <motion.path
              d="M11.5 3C13.5 6 14.5 9 14.5 12C14.5 15 13.5 18 11.5 21M12.5 3C10.5 6 9.5 9 9.5 12C9.5 15 10.5 18 12.5 21"
              stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
            />
          </>
        );
      case 'Database':
        return (
          <>
            <motion.ellipse
              cx="12" cy="5" rx="9" ry="3"
              stroke={strokeColor} strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <motion.path
              d="M3 5V12C3 13.6569 7.02944 15 12 15C16.9706 15 21 13.6569 21 12V5"
              stroke={strokeColor} strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            />
            <motion.path
              d="M3 12V19C3 20.6569 7.02944 22 12 22C16.9706 22 21 20.6569 21 19V12"
              stroke={strokeColor} strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            />
          </>
        );
      case 'Cpu':
        return (
          <>
            <motion.rect
              x="4" y="4" width="16" height="16" rx="2"
              stroke={strokeColor} strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.rect
              x="9" y="9" width="6" height="6" rx="1"
              stroke={strokeColor} strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            />
            <motion.path
              d="M9 1V4M15 1V4M9 20V23M15 20V23M1 9H4M1 15H4M20 9H23M20 15H23"
              stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
            />
          </>
        );
      case 'Sparkles':
      default:
        return (
          <>
            <motion.path
              d="M12 3V21M3 12H21M5.63604 5.63604L18.364 18.364M18.364 5.63604L5.63604 18.364"
              stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            <motion.circle
              cx="12" cy="12" r="3"
              stroke={strokeColor} strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            />
          </>
        );
    }
  };

  return (
    <div className="relative flex items-center justify-center w-6 h-6">
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
  const servicesList = cms?.services?.length ? cms.services : SERVICES;
  // State for active expanded service card id
  const [activeServiceId, setActiveServiceId] = useState<string | null>(servicesList[0]?.id || SERVICES[0].id);

  const toggleService = (id: string, e: React.MouseEvent<HTMLElement>) => {
    const isOpening = activeServiceId !== id;
    // Toggle active state: if already open, close it (set null); otherwise open it
    setActiveServiceId(prev => (prev === id ? null : id));
    
    if (isOpening) {
      const targetElement = e.currentTarget;
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 120);
    }
  };

  return (
    <section
      id="services"
      className={`${isStandalone ? 'pt-28 pb-20 sm:pt-32 sm:pb-24' : 'py-20'} transition-colors duration-300 bg-transparent ${
        theme === 'dark' ? 'text-white' : 'text-neutral-950'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Header & Expandable Service Drawers */}
          <div className="lg:col-span-7 space-y-8">
            {/* Section Header */}
            <motion.div
              className={`space-y-4 p-6 sm:p-8 rounded-3xl backdrop-blur-xl border shadow-xl ${
                theme === 'dark'
                  ? 'bg-neutral-950/85 border-neutral-800/80 shadow-black/80 ring-1 ring-white/5'
                  : 'bg-white/85 border-neutral-200/90 shadow-rose-900/10 ring-1 ring-black/5'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-900">
                <span>01. Core Capabilities</span>
                <span aria-hidden="true">·</span>
                <span>Agency Offerings & 3D Interactive Ecosystem</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance">
                <TextReveal text="Figma Design Systems & Engineering Offerings." staggerDuration={0.025} />
              </h2>
              <p className={`text-base sm:text-lg leading-relaxed ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
              }`}>
                Click any service offering below to expand technical specifications and sync the 3D WebGL viewport directly to that service model.
              </p>
            </motion.div>

            {/* Services List with Expandable Inline Detail Drawers */}
            <div className="space-y-4">
          {servicesList.map((service, index) => {
            const isExpanded = service.id === activeServiceId;

            return (
              <motion.div
                key={service.id}
                id={`services-${service.id}`}
                className="w-full scroll-mt-28"
                initial={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', y: 30 }}
                whileInView={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Service Selector Card Header with Pixy Effects */}
                <div className="relative group/svc rounded-2xl overflow-hidden">
                  {isExpanded && (
                    <PixyBorderBeam duration={7} size={220} colorFrom="#ef4444" colorTo="#f43f5e" />
                  )}
                  <motion.div
                    whileHover={{ scale: 1.006, x: 2 }}
                    whileTap={{ scale: 0.995 }}
                    role="button"
                    tabIndex={0}
                    onClick={(e) => toggleService(service.id, e)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleService(service.id, e as unknown as React.MouseEvent<HTMLElement>);
                      }
                    }}
                    className={`w-full p-5 sm:p-6 rounded-2xl text-left border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 backdrop-blur-md relative z-10 ${
                      isExpanded
                        ? theme === 'dark'
                          ? 'bg-[#0F0F12] border-rose-800/80 shadow-lg shadow-rose-950/30 ring-1 ring-rose-800/50'
                          : 'bg-white border-rose-900 shadow-md shadow-rose-800/10 ring-1 ring-rose-900'
                        : theme === 'dark'
                        ? 'bg-neutral-950/70 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/80'
                        : 'bg-neutral-50/80 border-neutral-200 hover:border-rose-700/50 hover:bg-neutral-100/80'
                    }`}
                    aria-expanded={isExpanded}
                    data-cursor-text={isExpanded ? 'CLOSE' : 'SPEC'}
                  >
                    <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                      <div className={`p-3.5 rounded-xl border shrink-0 transition-transform duration-300 group-hover/svc:scale-105 ${
                        isExpanded
                          ? 'bg-rose-900/10 border-rose-800/30'
                          : theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
                      }`}>
                        <AnimatedSvgIcon iconName={service.iconName} isSelected={isExpanded} theme={theme} />
                      </div>

                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-rose-900">
                            [ 0{index + 1} ]
                          </span>
                          <h3 className={`text-base sm:text-lg font-extrabold truncate ${
                            isExpanded ? 'text-rose-900' : theme === 'dark' ? 'text-white' : 'text-neutral-950'
                          }`}>
                            <PixyRollingText
                              text={service.name}
                              highlightColor="text-rose-900 dark:text-rose-800"
                            />
                          </h3>
                        </div>
                        <p className={`text-xs sm:text-sm line-clamp-1 ${
                          theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                        }`}>
                          {service.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Expand / Collapse Top Arrow Button & 3D Fly Button */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                          if (maxScroll > 0) {
                            const ratios = [0.0, 0.25, 0.50, 0.75, 1.0];
                            const targetY = maxScroll * ratios[index % ratios.length];
                            window.scrollTo({ top: targetY, behavior: 'smooth' });
                          }
                        }}
                        className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          theme === 'dark'
                            ? 'bg-neutral-900 border-neutral-800 text-rose-400 hover:border-rose-700 hover:bg-neutral-800'
                            : 'bg-white border-neutral-200 text-rose-900 hover:border-rose-800 hover:bg-rose-50 shadow-xs'
                        }`}
                        title="Fly 3D Camera Viewport to this Service Model"
                      >
                        <Box className="w-3.5 h-3.5 text-rose-800 dark:text-rose-400" />
                        <span className="hidden sm:inline">3D View</span>
                      </button>

                      <span className={`text-xs font-mono font-bold hidden md:inline-block px-3 py-1 rounded-full border ${
                        isExpanded
                          ? 'bg-rose-900 text-white border-rose-800 shadow-sm'
                          : theme === 'dark'
                          ? 'bg-neutral-900 border-neutral-800 text-neutral-400'
                          : 'bg-neutral-200/60 border-neutral-300 text-neutral-700'
                      }`}>
                        {isExpanded ? 'Viewing Spec' : 'Click to View'}
                      </span>
                      <GsapMagneticButton strength={0.25}>
                        <div
                          title={isExpanded ? "Collapse service details" : "Expand service details"}
                          className={`p-2 rounded-lg border transition-all duration-300 ${
                            isExpanded
                              ? 'bg-rose-900 text-white border-rose-800 shadow-md shadow-rose-900/30'
                              : theme === 'dark'
                              ? 'bg-neutral-900 border-neutral-800 text-neutral-400'
                              : 'bg-white border-neutral-200 text-neutral-600'
                          }`}
                        >
                          <ChevronUp className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-0' : 'rotate-180'}`} />
                        </div>
                      </GsapMagneticButton>
                    </div>
                  </motion.div>
                </div>

                {/* Inline Expandable Service Spec Drawer - Expands directly under the clicked card */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <SpotlightCard
                        theme={theme}
                        enableTilt={false}
                        className="p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl border border-rose-800/30"
                      >
                        {/* Subtle Ambient Red Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-900/10 rounded-full blur-3xl pointer-events-none" />

                        {/* Header Info */}
                        <div className="flex items-start justify-between gap-4 pb-6 border-b border-neutral-800/20">
                          <div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-900">
                              <Sliders className="w-3.5 h-3.5" />
                              <span>Full Service Specification</span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                              {service.name}
                            </h3>
                          </div>

                          <div className="p-3 rounded-xl bg-rose-900/10 border border-rose-800/30 shrink-0 hidden sm:block">
                            <AnimatedSvgIcon iconName={service.iconName} isSelected={true} theme={theme} />
                          </div>
                        </div>

                        {/* Service Full Description */}
                        <p className={`text-sm sm:text-base leading-relaxed my-6 ${
                          theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                        }`}>
                          {service.description}
                        </p>

                        {/* Key Client Deliverables Grid */}
                        <div className="space-y-3 my-6">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Key Client Deliverables</span>
                          </h4>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                            {service.deliverables.map((item, idx) => (
                              <div
                                key={idx}
                                className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2.5 ${
                                  theme === 'dark'
                                    ? 'bg-neutral-900/80 border-neutral-800 text-neutral-200'
                                    : 'bg-neutral-50 border-neutral-200 text-neutral-800'
                                }`}
                              >
                                <CheckCircle2 className="w-4 h-4 text-rose-900 shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Figma Specs & Production Tech Stack Pills */}
                        <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-neutral-800/20">
                          <div>
                            <span className="text-xs font-mono font-semibold text-neutral-500">
                              Figma Architecture Features:
                            </span>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {service.figmaFeatures.map((feat, idx) => (
                                <span
                                  key={idx}
                                  className={`px-2.5 py-1 text-xs font-mono rounded border ${
                                    theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-800'
                                  }`}
                                >
                                  {feat}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-xs font-mono font-semibold text-neutral-500">
                              Production Tech Stack:
                            </span>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {service.techStack.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-2.5 py-1 text-xs font-mono rounded border border-rose-800/30 bg-rose-950/20 text-rose-900 font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* ROI, Timeline, Collapse & CTA Footer */}
                        <div className="mt-6 pt-6 border-t border-neutral-800/20 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-5 text-xs font-mono">
                            <div className="flex items-center gap-1.5 text-neutral-500">
                              <Clock className="w-3.5 h-3.5 text-rose-900" />
                              <span>{service.estimatedTime}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-neutral-500">
                              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600 font-bold">{service.typicalRoi}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => setActiveServiceId(null)}
                              className="flex items-center gap-1.5 px-4 py-3 text-xs font-bold uppercase rounded-xl border border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-rose-900 dark:hover:text-white transition-all cursor-pointer bg-white/50 dark:bg-neutral-900/50"
                            >
                              <span>Collapse Spec</span>
                              <ChevronUp className="w-3.5 h-3.5" />
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={() => {
                                setCurrentPage('contact');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase rounded-xl text-white bg-rose-900 hover:bg-rose-950 transition-all shadow-md shadow-rose-900/30 cursor-pointer"
                            >
                              <span>Schedule Consultation</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </motion.button>
                          </div>
                        </div>
                      </SpotlightCard>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Services CTA Section Above Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`mt-20 p-8 sm:p-12 rounded-[2.5xl] border relative overflow-hidden text-center space-y-6 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-neutral-900 via-[#0F0F14] to-neutral-900 border-neutral-800'
              : 'bg-gradient-to-r from-neutral-50 via-white to-neutral-50 border-neutral-200 shadow-xl'
          }`}
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-900/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-900/10 border border-rose-800/30 text-rose-900 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Transform Your Tech Stack?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto text-balance">
            Let's Build Enterprise Software That Scales With You.
          </h2>

          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Connect with our lead architects in Mumbai for a zero-obligation technical audit, Figma token sync review, or custom CRM roadmap.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-2xl bg-rose-900 hover:bg-rose-950 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-900/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Schedule Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setCurrentPage('casestudies');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-8 py-4 rounded-2xl border font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-neutral-900 border-neutral-800 text-white hover:border-rose-800/50'
                  : 'bg-white border-neutral-300 text-neutral-900 hover:border-rose-800/40 shadow-sm'
              }`}
            >
              <span>Explore Case Studies</span>
            </motion.button>
          </div>
        </motion.div>
          </div> {/* Close lg:col-span-7 */}

          {/* Right Column (5 cols): Open viewport reserved for 3D Silicon Engine & Workstation Model */}
          <div className="hidden lg:block lg:col-span-5 pointer-events-none min-h-[500px]" />
        </div> {/* Close grid */}
      </div>
    </section>
  );
};
