import React, { useState, useMemo } from 'react';
import { Theme, Page } from '../types';
import { SERVICES } from '../data/agencyData';
import { useCms } from '../context/CmsContext';
import { SpotlightCard } from './SpotlightCard';
import { PixyBorderBeam } from './PixyBorderBeam';
import { PixyRollingText } from './PixyRollingText';
import { GsapMagneticButton } from './GsapMagneticButton';
import { GsapTextEffect } from './GsapTextEffect';
import { 
  CheckCircle2, ArrowRight, Sliders, Clock, TrendingUp, ChevronUp, Sparkles, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const rawServices = cms?.services?.length ? cms.services : SERVICES;
  
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeServiceId, setActiveServiceId] = useState<string | null>(rawServices[0]?.id || SERVICES[0].id);

  const categories = [
    { id: 'all', label: 'All Offerings' },
    { id: 'design', label: 'UI/UX & Figma' },
    { id: 'web', label: 'SaaS & Web Apps' },
    { id: 'mobile', label: 'Mobile & CRM' },
    { id: 'enterprise', label: 'Enterprise Systems' },
  ];

  const filteredServices = useMemo(() => {
    return rawServices.filter(svc => {
      const matchesSearch = searchQuery === '' || 
        svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;
      if (activeCategory === 'all') return true;
      if (activeCategory === 'design') return svc.id.includes('figma') || svc.name.toLowerCase().includes('design') || svc.name.toLowerCase().includes('figma');
      if (activeCategory === 'web') return svc.id.includes('web') || svc.name.toLowerCase().includes('saas') || svc.name.toLowerCase().includes('web');
      if (activeCategory === 'mobile') return svc.id.includes('mobile') || svc.name.toLowerCase().includes('crm') || svc.name.toLowerCase().includes('mobile');
      if (activeCategory === 'enterprise') return svc.id.includes('enterprise') || svc.name.toLowerCase().includes('enterprise') || svc.name.toLowerCase().includes('software');
      return true;
    });
  }, [rawServices, activeCategory, searchQuery]);

  const toggleService = (id: string, e: React.MouseEvent<HTMLElement>) => {
    const isOpening = activeServiceId !== id;
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
      className={`w-full max-w-full ${isStandalone ? 'pt-24 pb-16 sm:pt-28 sm:pb-20' : 'py-12 sm:py-16'} transition-colors duration-300 bg-transparent ${
        theme === 'dark' ? 'text-white' : 'text-neutral-950'
      }`}
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
            
        {/* Translucent Glass Section Banner Header */}
        <motion.div
          className={`space-y-4 p-6 sm:p-8 rounded-3xl backdrop-blur-xl border shadow-xl relative overflow-hidden ${
            theme === 'dark'
              ? 'bg-neutral-950/80 border-neutral-800/80 shadow-black/60 ring-1 ring-white/5'
              : 'bg-white/80 border-neutral-200/80 shadow-xl shadow-neutral-900/5 ring-1 ring-black/5'
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <PixyBorderBeam duration={10} size={280} colorFrom="#ef4444" colorTo="#fca5a5" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-900/10 border border-rose-800/30 text-xs font-mono font-bold uppercase tracking-wider text-rose-900 dark:text-rose-400">
            <Sparkles className="w-3.5 h-3.5 text-rose-800" />
            <span>CORE CAPABILITIES & ENGINEERING OFFERINGS</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-[1.25] text-balance">
            <GsapTextEffect text="Figma Design Systems & High-Velocity Software Offerings." tag="span" />
          </h2>

          <p className={`gsap-sentence-reveal text-xs sm:text-sm md:text-base leading-relaxed ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
          }`}>
            Explore our full suite of technical capabilities. Select any service to expand detailed specifications, deliverables, and production tech stack requirements.
          </p>

          {/* Filter & Search Bar */}
          <div className="pt-2 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-rose-900 text-white shadow-md shadow-rose-900/30 border border-rose-800'
                      : theme === 'dark'
                      ? 'bg-neutral-900/90 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-700'
                      : 'bg-neutral-100/90 text-neutral-700 border border-neutral-200 hover:bg-neutral-200/80 hover:text-neutral-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Keyword Search */}
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search capabilities by keyword (e.g. React, Figma, CRM, Mobile)..."
                className={`w-full pl-10 pr-4 py-2.5 text-xs font-mono rounded-xl border transition-all focus:outline-none focus:ring-1 focus:ring-rose-800 ${
                  theme === 'dark'
                    ? 'bg-neutral-900/80 border-neutral-800 text-white placeholder-neutral-500'
                    : 'bg-white/80 border-neutral-200 text-neutral-900 placeholder-neutral-400'
                }`}
              />
            </div>
          </div>
        </motion.div>

        {/* Services Cards List - Translucent Glass for 3D Scene Visibility */}
        <div className="space-y-3.5">
          {filteredServices.length === 0 ? (
            <div className={`p-8 text-center rounded-2xl border font-mono text-xs ${
              theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800 text-neutral-400' : 'bg-white/60 border-neutral-200 text-neutral-600'
            }`}>
              No capability match found for "{searchQuery}". Try clearing search filters.
            </div>
          ) : (
            filteredServices.map((service, index) => {
              const isExpanded = service.id === activeServiceId;

              return (
                <motion.div
                  key={service.id}
                  id={`services-${service.id}`}
                  className="w-full scroll-mt-28"
                  initial={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', y: 35 }}
                  whileInView={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: 0 }}
                  viewport={{ once: false, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Service Card Header */}
                  <div className="relative group/svc rounded-2xl overflow-hidden">
                    {isExpanded && (
                      <PixyBorderBeam duration={7} size={220} colorFrom="#ef4444" colorTo="#f43f5e" />
                    )}
                    <motion.div
                      whileHover={{ scale: 1.004, x: 2 }}
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
                      className={`w-full p-4 sm:p-5 rounded-2xl text-left border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 backdrop-blur-xl relative z-10 ${
                        isExpanded
                          ? theme === 'dark'
                            ? 'bg-neutral-900/90 border-rose-800/80 shadow-lg shadow-rose-950/30 ring-1 ring-rose-800/50'
                            : 'bg-white/95 border-rose-900 shadow-lg shadow-rose-800/10 ring-1 ring-rose-900'
                          : theme === 'dark'
                          ? 'bg-neutral-950/80 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/90'
                          : 'bg-white/80 border-neutral-200/90 hover:border-rose-700/50 hover:bg-white/95 shadow-md'
                      }`}
                      aria-expanded={isExpanded}
                      data-cursor-text={isExpanded ? 'CLOSE' : 'SPEC'}
                    >
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className={`p-3 rounded-xl border shrink-0 transition-transform duration-300 group-hover/svc:scale-105 ${
                          isExpanded
                            ? 'bg-rose-900/10 border-rose-800/30'
                            : theme === 'dark' ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white/80 border-neutral-200'
                        }`}>
                          <AnimatedSvgIcon iconName={service.iconName} isSelected={isExpanded} theme={theme} />
                        </div>

                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
                            <span className="shrink-0 whitespace-nowrap px-2.5 py-0.5 rounded-lg bg-rose-900/10 dark:bg-rose-950/30 text-rose-900 dark:text-rose-400 border border-rose-800/20 font-mono font-extrabold text-xs">
                              [{index + 1 < 10 ? `0${index + 1}` : index + 1}]
                            </span>
                            <h3 className={`text-base sm:text-lg font-extrabold leading-snug text-balance ${
                              isExpanded ? 'text-rose-900' : theme === 'dark' ? 'text-white' : 'text-neutral-950'
                            }`}>
                              <PixyRollingText
                                text={service.name}
                                highlightColor="text-rose-900 dark:text-rose-800"
                              />
                            </h3>
                          </div>
                          <p className={`text-xs leading-normal line-clamp-1 ${
                            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                          }`}>
                            {service.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Chevron Toggle Button */}
                      <div className="flex items-center shrink-0">
                        <GsapMagneticButton strength={0.25}>
                          <div
                            title={isExpanded ? "Collapse service details" : "Expand service details"}
                            className={`p-2 rounded-xl border transition-all duration-300 ${
                              isExpanded
                                ? 'bg-rose-900 text-white border-rose-800 shadow-md shadow-rose-900/30'
                                : theme === 'dark'
                                ? 'bg-neutral-900/80 border-neutral-800 text-neutral-400 group-hover/svc:text-white group-hover/svc:border-neutral-700'
                                : 'bg-white/90 border-neutral-200 text-neutral-600 group-hover/svc:border-rose-300 group-hover/svc:text-rose-900 shadow-xs'
                            }`}
                          >
                            <ChevronUp className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-0' : 'rotate-180'}`} />
                          </div>
                        </GsapMagneticButton>
                      </div>
                    </motion.div>
                  </div>

                  {/* Inline Detail Drawer */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <SpotlightCard
                          theme={theme}
                          enableTilt={false}
                          className="p-5 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-xl border border-rose-800/30"
                        >
                          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-900/10 rounded-full blur-3xl pointer-events-none" />

                          <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-800/20">
                            <div>
                              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-900">
                                <Sliders className="w-3.5 h-3.5" />
                                <span>Full Service Specification</span>
                              </div>
                              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1">
                                {service.name}
                              </h3>
                            </div>

                            <div className="p-2.5 rounded-xl bg-rose-900/10 border border-rose-800/30 shrink-0 hidden sm:block">
                              <AnimatedSvgIcon iconName={service.iconName} isSelected={true} theme={theme} />
                            </div>
                          </div>

                          <p className={`text-xs sm:text-sm leading-relaxed my-4 ${
                            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                          }`}>
                            {service.description}
                          </p>

                          {/* Key Deliverables Grid */}
                          <div className="space-y-2.5 my-5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-2">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Key Client Deliverables</span>
                            </h4>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                              {service.deliverables.map((item, idx) => (
                                <div
                                  key={idx}
                                  className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 ${
                                    theme === 'dark'
                                      ? 'bg-neutral-900/80 border-neutral-800 text-neutral-200'
                                      : 'bg-white/80 border-neutral-200 text-neutral-800'
                                  }`}
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-900 shrink-0" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tech Stack Pills */}
                          <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-800/20">
                            <div>
                              <span className="text-[11px] font-mono font-semibold text-neutral-500">
                                Figma Architecture Features:
                              </span>
                              <div className="flex flex-wrap gap-1.5 mt-1.5">
                                {service.figmaFeatures.map((feat, idx) => (
                                  <span
                                    key={idx}
                                    className={`px-2 py-0.5 text-[11px] font-mono rounded border ${
                                      theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-800'
                                    }`}
                                  >
                                    {feat}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <span className="text-[11px] font-mono font-semibold text-neutral-500">
                                Production Tech Stack:
                              </span>
                              <div className="flex flex-wrap gap-1.5 mt-1.5">
                                {service.techStack.map((tech, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-0.5 text-[11px] font-mono rounded border border-rose-800/30 bg-rose-950/20 text-rose-900 font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* ROI & Timeline Footer */}
                          <div className="mt-5 pt-4 border-t border-neutral-800/20 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-4 text-xs font-mono">
                              <div className="flex items-center gap-1.5 text-neutral-500">
                                <Clock className="w-3.5 h-3.5 text-rose-900" />
                                <span>{service.estimatedTime}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-neutral-500">
                                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-600 font-bold">{service.typicalRoi}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2.5">
                              <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setActiveServiceId(null)}
                                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase rounded-xl border border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-rose-900 dark:hover:text-white transition-all cursor-pointer bg-white/50 dark:bg-neutral-900/50"
                              >
                                <span>Close Tab</span>
                                <ChevronUp className="w-3.5 h-3.5" />
                              </motion.button>

                              <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => {
                                  setCurrentPage('contact');
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase rounded-xl text-white bg-rose-900 hover:bg-rose-950 transition-all shadow-md shadow-rose-900/30 cursor-pointer"
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
            })
          )}
        </div>

        {/* Services Pre-Footer Glass Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`mt-12 p-6 sm:p-8 rounded-3xl border relative overflow-hidden text-center space-y-5 backdrop-blur-xl ${
            theme === 'dark'
              ? 'bg-neutral-950/80 border-neutral-800 shadow-2xl'
              : 'bg-white/80 border-neutral-200/90 shadow-2xl shadow-neutral-900/5'
          }`}
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-900/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-900/10 border border-rose-800/30 text-rose-900 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Transform Your Tech Stack?</span>
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight leading-[1.3] max-w-3xl mx-auto text-balance">
            <GsapTextEffect text="Let's Build Enterprise Software That Scales With You." tag="span" />
          </h2>

          <p className={`gsap-sentence-reveal text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Connect with our lead architects in Mumbai for a zero-obligation technical audit, Figma token sync review, or custom CRM roadmap.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-1">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-7 py-3.5 rounded-2xl bg-rose-900 hover:bg-rose-950 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-900/30 transition-all flex items-center gap-2 cursor-pointer"
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
              className={`px-7 py-3.5 rounded-2xl border font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-neutral-900/80 border-neutral-800 text-white hover:border-rose-800/50'
                  : 'bg-white/80 border-neutral-300 text-neutral-900 hover:border-rose-800/40 shadow-sm'
              }`}
            >
              <span>Explore Case Studies</span>
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
