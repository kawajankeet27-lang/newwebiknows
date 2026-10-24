import React, { useState } from 'react';
import { CaseStudy, Theme, Page } from '../types';
import { CASE_STUDIES } from '../data/agencyData';
import { CaseStudyModal } from './CaseStudyModal';
import { SpotlightCard } from './SpotlightCard';
import { PixyRollingText } from './PixyRollingText';
import { PixyBorderBeam } from './PixyBorderBeam';
import { GsapMagneticButton } from './GsapMagneticButton';
import { GsapTextEffect } from './GsapTextEffect';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CaseStudiesPageProps {
  theme: Theme;
  setCurrentPage: (page: Page) => void;
  isStandalone?: boolean;
}

interface CaseStudyCardProps {
  study: CaseStudy;
  theme: Theme;
  onClick: () => void;
  idx: number;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study, theme, onClick, idx }) => {
  const defaultImage = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
  const displayImage = study.imageUrl || defaultImage;
  const industryLabel = study.industry || study.category;
  const isDark = theme === 'dark';
  const paddedIndex = String(idx + 1).padStart(2, '0');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer h-full flex flex-col justify-between select-none"
      onClick={onClick}
      data-cursor-text="VIEW CASE"
    >
      <SpotlightCard
        theme={theme}
        enableTilt={true}
        className="gsap-card-interactive p-5 sm:p-6 h-full flex flex-col justify-between overflow-hidden relative rounded-2xl transition-all duration-300 border hover:border-rose-800/60 shadow-lg hover:shadow-2xl hover:shadow-rose-950/20"
      >
        {/* Pixy Animated Border Beam on Hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PixyBorderBeam duration={7} size={220} colorFrom="#ef4444" colorTo="#f43f5e" />
        </div>

        <div className="space-y-4">
          {/* Top Bar: Agency Index & Industry */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-extrabold text-rose-900 dark:text-rose-800 tracking-wider">
              [ {paddedIndex} / ARCHITECTURE ]
            </span>
            <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${
              isDark ? 'border-neutral-800 bg-neutral-900 text-neutral-400' : 'border-neutral-200 bg-neutral-100 text-neutral-600'
            }`}>
              {study.category}
            </span>
          </div>

          {/* 1. Image with Pixy Clip Reveal & Zoom */}
          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 group-hover:shadow-xl transition-all duration-500">
            <img
              src={displayImage}
              alt={study.title}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-300" />
            
            {/* Live Client Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-lg bg-rose-900 text-white shadow-md shadow-rose-900/30">
                {industryLabel}
              </span>
            </div>

            {/* Hover Floating Overlay Badge */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span className="px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-widest rounded-md bg-black/80 backdrop-blur-md text-white border border-white/20">
                INSPECT SPEC →
              </span>
            </div>
          </div>

          {/* 2. Industry & Title */}
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight group-hover:text-rose-900 transition-colors">
              <PixyRollingText text={study.title} highlightColor="text-rose-900 dark:text-rose-800" />
            </h3>
          </div>

          {/* 3. Description */}
          <p className={`text-sm leading-relaxed line-clamp-3 ${
            isDark ? 'text-neutral-300' : 'text-neutral-600'
          }`}>
            {study.summary}
          </p>

          {/* 4. Technology Used */}
          <div className="pt-2">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Stack & Protocol:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {study.techStack.map((tech, i) => (
                <span
                  key={i}
                  className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md border transition-colors ${
                    isDark
                      ? 'bg-neutral-900 text-neutral-200 border-neutral-800 group-hover:border-neutral-700'
                      : 'bg-neutral-100 text-neutral-800 border-neutral-200 group-hover:border-neutral-300'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card Action Link with Pixy GSAP Magnetic Button */}
        <div className="pt-4 mt-5 border-t border-neutral-200 dark:border-neutral-800/60 flex items-center justify-between">
          <PixyRollingText
            text="View Full Case Study"
            className="text-xs font-bold text-neutral-500 group-hover:text-rose-900"
          />
          <GsapMagneticButton strength={0.35}>
            <div className="w-9 h-9 rounded-xl bg-rose-900/10 border border-rose-800/30 flex items-center justify-center text-rose-900 group-hover:bg-rose-900 group-hover:text-white transition-all shrink-0 shadow-sm">
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </GsapMagneticButton>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({
  theme,
  setCurrentPage,
  isStandalone = false
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const categories = ['All', 'CRM Systems', 'Design Systems', 'Mobile Apps', 'SaaS Platforms'];

  const filteredStudies = activeCategory === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(cs => cs.category === activeCategory);

  const isDark = theme === 'dark';
  const displayedStudies = isStandalone ? filteredStudies : filteredStudies.slice(0, 3);

  return (
    <section className={`${isStandalone ? 'pt-28 pb-20 sm:pt-32 sm:pb-24' : 'py-20'} transition-colors duration-300 bg-transparent relative z-10 ${
      theme === 'dark' ? 'text-white' : 'text-neutral-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* On home page, use asymmetric split layout so 3D scene remains completely visible and interactive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Content Column (7 cols): Header, Filter Tabs & Case Studies */}
          <div className={`${isStandalone ? 'lg:col-span-12' : 'lg:col-span-7'} space-y-6`}>
            
            {/* Page Header (Opaque High-Contrast Glass) */}
            <motion.div
              className={`flex flex-col md:flex-row md:items-end justify-between gap-8 p-6 sm:p-9 rounded-3xl backdrop-blur-2xl border shadow-xl ${
                isDark
                  ? 'bg-neutral-950/95 border-neutral-800/90 shadow-black/80 ring-1 ring-white/10'
                  : 'bg-white/95 border-neutral-200/90 shadow-xl shadow-neutral-900/10 ring-1 ring-black/5'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="max-w-3xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 font-mono">
                  <span>02. Case Studies & Proof</span>
                  <span aria-hidden="true">·</span>
                  <span>Client Impact</span>
                </div>
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[1.85rem] font-extrabold tracking-tight leading-[1.3] text-balance">
                  <GsapTextEffect text="Proven Case Studies & Client Proof." tag="span" />
                </h1>
                <p className={`gsap-sentence-reveal text-sm sm:text-base leading-relaxed ${
                  isDark ? 'text-neutral-300' : 'text-neutral-600'
                }`}>
                  Explore our featured engineering case studies highlighting the industry focus, core technology stack, and full project overview.
                </p>
              </div>
            </motion.div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto py-2 border-b border-neutral-200/60 dark:border-neutral-800/40 no-scrollbar">
              {categories.map(cat => (
                <motion.button
                  key={cat}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer backdrop-blur-sm ${
                    activeCategory === cat
                      ? 'bg-rose-900 text-white shadow-md shadow-rose-900/30'
                      : isDark
                      ? 'bg-neutral-900/70 border border-neutral-800 text-neutral-400 hover:text-white'
                      : 'bg-white/70 border border-neutral-200/80 text-neutral-700 hover:text-neutral-950 hover:bg-white'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* Case Studies Feed / Grid */}
            <motion.div
              layout
              className={isStandalone ? 'grid md:grid-cols-2 gap-8' : 'space-y-6'}
            >
              <AnimatePresence>
                {displayedStudies.map((study, idx) => (
                  <CaseStudyCard
                    key={study.id}
                    study={study}
                    theme={theme}
                    onClick={() => setSelectedCaseStudy(study)}
                    idx={idx}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* View All Button when in embedded home mode - Opaque High-Contrast Card Container */}
            {!isStandalone && (
              <div className="pt-2">
                <div className={`p-4 sm:p-5 rounded-2xl border shadow-xl backdrop-blur-2xl transition-all ${
                  isDark
                    ? 'bg-neutral-950/95 border-neutral-800/90 shadow-black/60'
                    : 'bg-white/95 border-neutral-200/90 shadow-xl shadow-neutral-950/10'
                }`}>
                  <button
                    onClick={() => {
                      setCurrentPage('casestudies');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-4 px-6 rounded-xl bg-rose-900 hover:bg-rose-950 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-rose-900/30 active:scale-98"
                  >
                    <span>Explore All 12+ Production Case Studies</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (5 cols): Open space reserved for 3D scene */}
          {!isStandalone && (
            <div className="hidden lg:block lg:col-span-5 pointer-events-none min-h-[300px]" />
          )}

        </div>

        {/* Case Study Full Modal */}
        <CaseStudyModal
          caseStudy={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
          theme={theme}
          setCurrentPage={setCurrentPage}
        />

      </div>
    </section>
  );
};
