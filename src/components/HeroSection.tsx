import React from 'react';
import { Theme, Page } from '../types';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';
import { GsapMagneticButton } from './GsapMagneticButton';
import { PixyRollingText } from './PixyRollingText';
import { PixyBorderBeam } from './PixyBorderBeam';
import { GsapTextEffect } from './GsapTextEffect';

interface HeroSectionProps {
  theme: Theme;
  setCurrentPage: (page: Page) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  theme,
  setCurrentPage
}) => {
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <section 
      className={`relative w-full max-w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center overflow-hidden transition-colors duration-300 py-12 sm:py-16 bg-transparent ${
        isDark ? 'text-white' : 'text-neutral-950'
      }`}
    >

      {/* Grid Pattern Background Overlay */}
      <div className={`absolute inset-0 pointer-events-none z-0 ${
        isDark ? 'bg-figma-grid-dark opacity-20' : 'bg-figma-grid-light opacity-40'
      }`} />

      {/* Glowing Crimson Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-rose-950/15 dark:bg-rose-950/25 rounded-full blur-[160px] opacity-90 animate-pulse duration-1000" />
      </div>

      {/* High-Contrast Hero Content Card Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div 
          className={`w-full p-6 sm:p-12 md:p-20 rounded-3xl backdrop-blur-2xl border shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center space-y-6 sm:space-y-10 ${
            isDark
              ? 'bg-neutral-950/95 border-neutral-800/90 shadow-black/80 ring-1 ring-white/10'
              : 'bg-white/95 border-neutral-200/90 shadow-2xl shadow-neutral-900/10 ring-1 ring-black/5'
          }`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated Border Beam Edge */}
          <PixyBorderBeam duration={12} size={400} colorFrom="#ef4444" colorTo="#fca5a5" />

          {/* Main Display Headline in 2 Clean High-Contrast Lines */}
          <motion.div
            variants={itemVariants}
            className="space-y-4 cursor-default w-full"
          >
            <h1 className="gsap-translate-target text-2xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-black tracking-tight leading-[1.15] text-center max-w-5xl mx-auto text-neutral-950 dark:text-white">
              <GsapTextEffect tag="span" stagger={0.03}>
                Transforming Bold Ideas into <br className="hidden md:inline" />
                <span className="text-rose-900 dark:text-rose-400 font-black underline decoration-rose-500/30 underline-offset-8">
                  High-Impact Custom Software & Figma Systems.
                </span>
              </GsapTextEffect>
            </h1>
          </motion.div>

          {/* Subtitle Prose - Clean High Contrast */}
          <motion.p
            variants={itemVariants}
            className={`gsap-translate-target gsap-sentence-reveal text-sm sm:text-base md:text-xl font-semibold max-w-3xl mx-auto text-center leading-relaxed ${
              isDark ? 'text-neutral-200' : 'text-neutral-800'
            }`}
          >
            {t('heroSubtitle', 'Bespoke software engineering & high-velocity digital products crafted for market leaders.')}
          </motion.p>

          {/* Centered Action Buttons Cluster */}
          <motion.div
            variants={itemVariants}
            className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 w-full mx-auto"
          >
            <GsapMagneticButton
              strength={0.35}
              data-cursor-text="LAUNCH"
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative group overflow-hidden rounded-2xl shadow-xl shadow-rose-900/30 w-full sm:w-auto">
                <PixyBorderBeam duration={4} size={250} colorFrom="#ef4444" colorTo="#f43f5e" />
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 px-6 sm:px-10 py-5 sm:py-6 text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-2xl text-white bg-rose-900 hover:bg-rose-950 transition-all cursor-pointer shadow-lg active:scale-98"
                >
                  <Sparkles className="w-5 h-5 animate-spin-slow" />
                  <span>
                    <PixyRollingText
                      text={t('startProject', 'Start Your Project')}
                      highlightColor="text-white"
                    />
                  </span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
                </button>
              </div>
            </GsapMagneticButton>

            <GsapMagneticButton
              strength={0.25}
              data-cursor-text="EXPLORE"
              onClick={() => {
                setCurrentPage('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <button
                type="button"
                className={`w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-10 py-5 sm:py-6 text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-2xl border transition-all duration-300 cursor-pointer active:scale-98 ${
                  isDark
                    ? 'border-neutral-700 bg-neutral-900/95 hover:border-rose-800 hover:bg-neutral-800 text-neutral-100 shadow-xl'
                    : 'border-neutral-300 bg-white hover:border-rose-900 hover:bg-neutral-50 text-neutral-900 shadow-md'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-rose-900/15 flex items-center justify-center text-rose-900">
                  <Play className="w-4 h-4 fill-rose-900" />
                </div>
                <span>
                  <PixyRollingText
                    text={t('exploreCapabilities', 'Explore Capabilities')}
                    highlightColor="text-rose-900"
                  />
                </span>
              </button>
            </GsapMagneticButton>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
