import React from 'react';
import { Theme, Page } from '../types';
import { ClientLogoMarquee } from './ClientLogoMarquee';
import { FaqSection } from './FaqSection';
import { GsapTextEffect } from './GsapTextEffect';
import { motion } from 'framer-motion';
import { Target, Eye, Compass, Sparkles, CheckCircle2, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';

interface AboutPageProps {
  theme: Theme;
  setCurrentPage: (page: Page) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ theme, setCurrentPage }) => {
  const pillars = [
    {
      title: 'Our Goal',
      subtitle: 'Precision & Scale',
      badge: '3.4x Velocity',
      description: 'To engineer 100% token-synchronized Figma-to-Code systems, robust enterprise cloud architectures, and scalable bespoke platforms that accelerate client growth by 3.4x.',
      icon: Target,
      accent: 'from-rose-900 to-rose-600',
      borderGlow: 'hover:border-rose-800/60',
      bgGlow: 'bg-rose-900/10'
    },
    {
      title: 'Our Vision',
      subtitle: 'Global Engineering Standard',
      badge: 'Zero Technical Debt',
      description: 'To become the premier global software partner for unicorn startups and Fortune enterprises seeking flawless digital experiences, automated CRM pipelines, and bulletproof security.',
      icon: Eye,
      accent: 'from-purple-600 to-indigo-600',
      borderGlow: 'hover:border-purple-500/60',
      bgGlow: 'bg-purple-600/10'
    },
    {
      title: 'Our Mission',
      subtitle: 'Uncompromising Quality',
      badge: '24/7 Resilient Ops',
      description: 'Empowering engineering leaders with lightning-fast CI/CD pipelines, rigorous code quality, zero technical debt, and dedicated fractional tech teams committed to excellence.',
      icon: Compass,
      accent: 'from-blue-600 to-cyan-600',
      borderGlow: 'hover:border-blue-500/60',
      bgGlow: 'bg-blue-600/10'
    }
  ];

  return (
    <div className={`pt-28 pb-20 sm:pt-32 sm:pb-24 transition-colors duration-300 space-y-20 bg-transparent relative z-10 ${
      theme === 'dark' ? 'text-white' : 'text-neutral-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero */}
        <motion.div
          className={`max-w-4xl space-y-6 p-6 sm:p-9 rounded-3xl backdrop-blur-2xl border shadow-xl ${
            theme === 'dark'
              ? 'bg-neutral-950/95 border-neutral-800/80 shadow-black/80 ring-1 ring-white/5'
              : 'bg-white/95 border-neutral-200/90 shadow-xl shadow-neutral-900/5 ring-1 ring-black/5'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 font-mono">
            <span>03. About Webiknows IT Solutions</span>
            <span aria-hidden="true">·</span>
            <span>Agency History & Vision</span>
          </div>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[1.85rem] font-extrabold tracking-tight leading-[1.3] text-balance text-neutral-900 dark:text-white">
            <GsapTextEffect text="All In One IT Solution & Technology Company." tag="span" />
          </h1>
          <p className={`gsap-sentence-reveal text-sm sm:text-base leading-relaxed ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
          }`}>
            Established in 2017 by CEO Ajit Tambde, Webiknows IT Solutions Pvt. Ltd. (webiknows.com) is a premier IT solutions and software engineering powerhouse headquartered in Mumbai, India. We deliver custom software engineering, Figma design systems, web & mobile applications, bespoke CRM platforms, and Webiknows Cloud enterprise hosting.
          </p>
        </motion.div>
      </div>

      {/* Logo Slider / Client Marquee shifted above Core Philosophy */}
      <ClientLogoMarquee theme={theme} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Redesigned Our Core Philosophy Section */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800/40 pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-900/10 border border-rose-800/20 text-rose-800 text-xs font-mono font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Core Philosophy</span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.85rem] font-extrabold tracking-tight leading-[1.3]">
                <GsapTextEffect text="Goal, Vision & Mission" tag="span" />
              </h2>
              <p className={`gsap-sentence-reveal text-xs sm:text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Built on unwavering standards of engineering excellence, design precision, and client partnership.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-900 animate-pulse" />
              <span>Webiknows Enterprise Framework 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`p-8 rounded-3xl border flex flex-col justify-between space-y-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg ${
                    theme === 'dark'
                      ? 'bg-[#0D0D12] border-neutral-800 hover:border-rose-800/50 bg-gradient-to-b from-[#0D0D12] to-[#08080B]'
                      : 'bg-white border-neutral-200 hover:border-rose-800/40 bg-gradient-to-b from-white to-neutral-50'
                  }`}
                >
                  {/* Decorative Glow */}
                  <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full ${pillar.bgGlow} blur-3xl pointer-events-none`} />

                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${pillar.accent} text-white shadow-md`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-neutral-800/50 text-neutral-300 border border-neutral-700/50">
                        {pillar.badge}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-900">{pillar.subtitle}</span>
                      <h3 className="text-2xl font-extrabold tracking-tight">{pillar.title}</h3>
                    </div>

                    <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-neutral-800/50 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                      <CheckCircle2 className="w-4 h-4 text-rose-800" />
                      <span>Verified Standard</span>
                    </div>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-neutral-900 text-neutral-400' : 'bg-neutral-100 text-neutral-600'}`}>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ Section Component with Smooth Accordion */}
      <FaqSection theme={theme} setCurrentPage={setCurrentPage} />
    </div>
  );
};
