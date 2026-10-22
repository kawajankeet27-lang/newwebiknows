import React from 'react';
import { Theme, Page } from '../types';
import { Sparkles, ArrowRight, Play, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { CanvasParticleBackground } from './CanvasParticleBackground';
import { useTranslation } from '../context/TranslationContext';
import { GsapMagneticButton } from './GsapMagneticButton';
import { PixyRollingText } from './PixyRollingText';
import { PixyBorderBeam } from './PixyBorderBeam';

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
        staggerChildren: 0.15,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <section className={`relative pt-36 pb-28 sm:pt-48 sm:pb-36 overflow-hidden transition-colors duration-300 bg-transparent ${
      isDark ? 'text-white' : 'text-neutral-900'
    }`}>

      {/* Grid Pattern Overlay */}
      <div className={`absolute inset-0 pointer-events-none z-0 ${
        isDark ? 'bg-figma-grid-dark opacity-30' : 'bg-figma-grid-light opacity-50'
      }`} />

      {/* Confident Glowing Gradient Orbs in Matte Maroon */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[550px] bg-red-950/20 dark:bg-red-950/30 rounded-full blur-[180px] opacity-90 animate-pulse duration-1000" />
        <div className="absolute top-1/4 right-10 w-[450px] h-[450px] bg-rose-900/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-rose-950/15 rounded-full blur-[130px]" />
      </div>

      {/* Subtle Center Contrast Vignette */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[520px] pointer-events-none rounded-full blur-[120px] z-0 ${
        isDark ? 'bg-black/25' : 'bg-white/30'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[65vh]">
          {/* Left Column: Editorial Headline & CTA Buttons in Frosted Container */}
          <motion.div
            className={`lg:col-span-7 flex flex-col items-start text-left space-y-7 p-6 sm:p-9 rounded-3xl backdrop-blur-xl border shadow-2xl transition-all ${
              isDark
                ? 'bg-neutral-950/75 border-neutral-800/80 shadow-black/80 ring-1 ring-white/5'
                : 'bg-white/85 border-neutral-200/90 shadow-rose-900/10 ring-1 ring-black/5'
            }`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Top Elegant Live Badge */}
            <motion.div
              variants={itemVariants}
              className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider uppercase transition-all ${
                isDark
                  ? 'border-rose-900/40 bg-neutral-900/90 text-rose-400'
                  : 'border-rose-900/20 bg-rose-50/90 text-rose-950 shadow-xs'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-700"></span>
              </span>
              <span className="gsap-translate-target">{t('heroBadge', 'WEB · INNOVATION · KNOWLEDGE')}</span>
              <Flame className="w-3.5 h-3.5 text-rose-600 ml-0.5" />
            </motion.div>

            {/* Clean Editorial Display Headline */}
            <motion.div
              variants={itemVariants}
              className="space-y-2 cursor-default"
            >
              <h1 className="gsap-translate-target text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-balance">
                {t('heroTitlePrefix', 'Transforming Ideas into High-Impact ')}
                <span className="text-rose-900 dark:text-rose-600 font-black">
                  {t('heroTitleHighlight', 'Custom Software')}
                </span>
                {t('heroTitleSuffix', ', Figma Systems & Cloud Engines.')}
              </h1>
            </motion.div>

            {/* Confident Subtitle Prose */}
            <motion.p
              variants={itemVariants}
              className={`gsap-translate-target text-base sm:text-lg font-normal max-w-xl leading-relaxed ${
                isDark ? 'text-neutral-300' : 'text-neutral-600'
              }`}
            >
              {t('heroSubtitle', 'Bespoke software engineering & high-velocity digital products crafted for market leaders.')}
            </motion.p>

            {/* Magnetic CTA Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex flex-wrap items-center justify-start gap-4 sm:gap-5"
            >
              <GsapMagneticButton
                strength={0.35}
                data-cursor-text="LAUNCH"
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group overflow-hidden rounded-2xl shadow-xl shadow-rose-900/30"
                >
                  <PixyBorderBeam duration={4} size={200} colorFrom="#ef4444" colorTo="#f43f5e" />
                  <button
                    type="button"
                    className="flex items-center gap-3 px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-2xl text-white bg-rose-900 group-hover:bg-rose-950 transition-all cursor-pointer shadow-lg"
                  >
                    <Sparkles className="w-4 h-4 animate-spin-slow" />
                    <span className="font-extrabold tracking-wide">
                      <PixyRollingText
                        text={t('startProject', 'Start Your Project')}
                        highlightColor="text-white"
                      />
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                  </button>
                </motion.div>
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
                  className={`flex items-center gap-3 px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-2xl border transition-all duration-300 cursor-pointer active:scale-95 ${
                    isDark
                      ? 'border-neutral-700 bg-neutral-900/95 hover:border-rose-800 hover:bg-neutral-800 text-neutral-100 shadow-xl'
                      : 'border-neutral-300 bg-white hover:border-rose-900 text-neutral-900 shadow-md'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-rose-900/15 flex items-center justify-center text-rose-900">
                    <Play className="w-3 h-3 fill-rose-900" />
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

          {/* Right Column: Clean Open Viewport Reserved for Interactive 3D WebGL Model */}
          <div className="hidden lg:block lg:col-span-5 pointer-events-none min-h-[420px]" />
        </div>
      </div>
    </section>
  );
};
