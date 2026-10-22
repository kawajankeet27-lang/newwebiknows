import React, { useState } from 'react';
import { CaseStudy, Theme, Page } from '../types';
import { CASE_STUDIES } from '../data/agencyData';
import { CaseStudyModal } from './CaseStudyModal';
import { SpotlightCard } from './SpotlightCard';
import { PixyRollingText } from './PixyRollingText';
import { PixyBorderBeam } from './PixyBorderBeam';
import { GsapMagneticButton } from './GsapMagneticButton';
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

  return (
    <section className={`${isStandalone ? 'pt-28 pb-20 sm:pt-32 sm:pb-24' : 'py-20'} transition-colors duration-300 bg-transparent ${
      theme === 'dark' ? 'text-white' : 'text-neutral-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <motion.div
          className={`max-w-3xl space-y-4 p-6 sm:p-8 rounded-3xl backdrop-blur-xl border shadow-xl ${
            theme === 'dark'
              ? 'bg-neutral-950/80 border-neutral-800/80 shadow-black/80 ring-1 ring-white/5'
              : 'bg-white/85 border-neutral-200/90 shadow-rose-900/10 ring-1 ring-black/5'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-900">
            <span>02. Case Studies & Proof</span>
            <span aria-hidden="true">·</span>
            <span>Client Impact</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance">
            Proven Case Studies & Client Proof.
          </h1>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
          }`}>
            Explore our featured engineering case studies highlighting the industry focus, core technology stack, and full project overview.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 my-8 border-b border-neutral-200 dark:border-neutral-800/40 no-scrollbar">
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-rose-900 text-white shadow-md shadow-rose-900/30'
                  : theme === 'dark'
                  ? 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                  : 'bg-neutral-100 border border-neutral-200 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Redesigned Clean Case Studies Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-8 my-8">
          <AnimatePresence>
            {filteredStudies.map((study, idx) => (
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
