import React from 'react';
import { Theme, Page } from '../types';
import { useCms } from '../context/CmsContext';
import { SpotlightCard } from './SpotlightCard';
import { TextReveal } from './TextReveal';
import { PixyBorderBeam } from './PixyBorderBeam';
import { PixyRollingText } from './PixyRollingText';
import { GsapTextEffect } from './GsapTextEffect';
import { ShieldCheck, Layers, Zap, Clock, Sparkles, Award, Cpu, CheckCircle2, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface WhyChooseUsSectionProps {
  theme: Theme;
  setCurrentPage: (page: Page) => void;
}

const getIconComponent = (iconName?: string) => {
  switch (iconName) {
    case 'Layers': return Layers;
    case 'Zap': return Zap;
    case 'Clock': return Clock;
    case 'Sparkles': return Sparkles;
    case 'Award': return Award;
    case 'Cpu': return Cpu;
    case 'CheckCircle2': return CheckCircle2;
    case 'Lock': return Lock;
    case 'ShieldCheck':
    default:
      return ShieldCheck;
  }
};

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({
  theme
}) => {
  const cms = useCms();
  const items = cms.whyChooseUs && cms.whyChooseUs.length > 0 ? cms.whyChooseUs : [
    {
      id: '1',
      title: '100% In-House Senior Engineering',
      tag: 'Zero Outsourcing',
      description: 'Dedicated senior software architects building your digital products with complete IP ownership.',
      iconName: 'ShieldCheck'
    },
    {
      id: '2',
      title: 'Figma-to-Code Zero Drift',
      tag: 'Automated Tokens',
      description: 'Synchronized Figma variables into production React & Tailwind for 1:1 pixel fidelity.',
      iconName: 'Layers'
    },
    {
      id: '3',
      title: 'Sub-180ms High-Velocity Performance',
      tag: '<180ms Latency',
      description: 'Optimized React bundles & database schemas ensuring instantaneous page loads.',
      iconName: 'Zap'
    },
    {
      id: '4',
      title: 'Enterprise Security & 24/7 SLA',
      tag: '99.9% Uptime',
      description: 'ISO-grade encryption & dedicated Slack communication channels with your lead architect.',
      iconName: 'Clock'
    }
  ];

  return (
    <section className={`py-20 transition-colors duration-300 bg-transparent ${
      theme === 'dark' ? 'text-white' : 'text-neutral-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 cols): Open viewport reserved for 3D AI Gyro Nucleus Model */}
          <div className="hidden lg:block lg:col-span-5 pointer-events-none min-h-[500px]" />

          {/* Right Column (7 cols): Header & Differentiator Cards Grid */}
          <div className="lg:col-span-7 space-y-8">
            {/* Section Header */}
            <motion.div
              className={`space-y-4 p-6 sm:p-8 rounded-3xl backdrop-blur-2xl border shadow-xl ${
                theme === 'dark'
                  ? 'bg-neutral-950/95 border-neutral-800/80 shadow-black/80 ring-1 ring-white/5'
                  : 'bg-white/95 border-neutral-200/90 shadow-xl shadow-neutral-900/5 ring-1 ring-black/5'
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-900">
                <span>02. Why Choose Webiknows</span>
                <span aria-hidden="true">·</span>
                <span>Engineering Differentiators</span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.85rem] font-extrabold tracking-tight leading-[1.3] text-balance">
                <GsapTextEffect text="Why Global Tech Leaders Choose Webiknows." tag="span" />
              </h2>
              <p className={`gsap-sentence-reveal text-sm sm:text-base leading-relaxed ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
              }`}>
                We bridge the gap between creative Figma prototyping and enterprise software engineering, delivering reliable, high-converting digital engines.
              </p>
            </motion.div>

            {/* Differentiator Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {items.map((item, idx) => {
                const IconComp = getIconComponent(item.iconName);
                return (
                  <motion.div
                    key={item.id || idx}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="group/diff h-full select-none" data-cursor-text="STANDARD">
                      <SpotlightCard
                        theme={theme}
                        enableTilt={true}
                        className="gsap-card-interactive p-6 h-full flex flex-col justify-between rounded-2xl border transition-all hover:border-rose-800/60 shadow-md hover:shadow-xl relative overflow-hidden"
                      >
                        {/* Pixy Border Beam on Hover */}
                        <div className="opacity-0 group-hover/diff:opacity-100 transition-opacity duration-300">
                          <PixyBorderBeam duration={8} size={200} colorFrom="#ef4444" colorTo="#f43f5e" />
                        </div>

                        <div className="space-y-4 relative z-10">
                          <div className="flex items-center justify-between">
                            <div className="p-3.5 rounded-2xl border bg-rose-900/10 border-rose-800/30 shrink-0 group-hover/diff:scale-105 transition-transform duration-300">
                              <IconComp className="w-6 h-6 text-rose-900" />
                            </div>
                            <span className="px-3 py-1 text-xs font-mono font-bold uppercase rounded-full bg-rose-900/10 border border-rose-800/30 text-rose-900">
                              {item.tag}
                            </span>
                          </div>

                          <h3 className="text-lg sm:text-xl font-extrabold tracking-tight pt-2">
                            <PixyRollingText text={item.title} highlightColor="text-rose-900 dark:text-rose-800" />
                          </h3>

                          <p className={`text-xs sm:text-sm leading-relaxed ${
                            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
                          }`}>
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between relative z-10">
                          <span className="text-[11px] font-mono font-bold text-rose-900 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Verified Standard</span>
                          </span>
                          <span className="text-[11px] font-mono font-bold text-neutral-400">[ 0{idx + 1} ]</span>
                        </div>
                      </SpotlightCard>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div> {/* Close lg:col-span-7 */}
        </div> {/* Close grid */}

        {/* Enterprise Trust & Verification Matrix placed directly below Why Choose Webiknows */}
        <div className="mt-14 pt-10 border-t border-neutral-200/80 dark:border-neutral-800/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className={`p-6 rounded-2xl border backdrop-blur-2xl transition-all shadow-xl ${
                theme === 'dark'
                  ? 'border-neutral-800/90 bg-neutral-950/95 text-white hover:border-rose-800/50 shadow-black/60'
                  : 'border-neutral-200/90 bg-white/95 text-neutral-950 hover:border-rose-800/40 shadow-xl shadow-neutral-950/10'
              }`}
            >
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-900/10 border border-rose-800/20 flex items-center justify-center text-rose-900 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono font-bold uppercase text-rose-900">SECURITY AUDIT</div>
              </div>
              <h4 className="text-sm font-extrabold mb-1">ISO 27001 Certified</h4>
              <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                Bank-grade encryption, role-based database rules, and strict NDAs protecting every line of client code.
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl border backdrop-blur-2xl transition-all shadow-xl ${
                theme === 'dark'
                  ? 'border-neutral-800/90 bg-neutral-950/95 text-white hover:border-rose-800/50 shadow-black/60'
                  : 'border-neutral-200/90 bg-white/95 text-neutral-950 hover:border-rose-800/40 shadow-xl shadow-neutral-950/10'
              }`}
            >
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-900/10 border border-rose-800/20 flex items-center justify-center text-rose-900 shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono font-bold uppercase text-rose-900">IP OWNERSHIP</div>
              </div>
              <h4 className="text-sm font-extrabold mb-1">100% Client Git Ownership</h4>
              <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                Zero proprietary lock-in. Full access to raw repositories, design tokens, and cloud infrastructure keys.
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl border backdrop-blur-2xl transition-all shadow-xl ${
                theme === 'dark'
                  ? 'border-neutral-800/90 bg-neutral-950/95 text-white hover:border-rose-800/50 shadow-black/60'
                  : 'border-neutral-200/90 bg-white/95 text-neutral-950 hover:border-rose-800/40 shadow-xl shadow-neutral-950/10'
              }`}
            >
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-900/10 border border-rose-800/20 flex items-center justify-center text-rose-900 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono font-bold uppercase text-rose-900">PERFORMANCE SLA</div>
              </div>
              <h4 className="text-sm font-extrabold mb-1">&lt;180ms Latency SLA</h4>
              <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                Engineered for maximum Core Web Vitals, instant state hydration, and effortless horizontal scalability.
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl border backdrop-blur-2xl transition-all shadow-xl ${
                theme === 'dark'
                  ? 'border-neutral-800/90 bg-neutral-950/95 text-white hover:border-rose-800/50 shadow-black/60'
                  : 'border-neutral-200/90 bg-white/95 text-neutral-950 hover:border-rose-800/40 shadow-xl shadow-neutral-950/10'
              }`}
            >
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-900/10 border border-rose-800/20 flex items-center justify-center text-rose-900 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono font-bold uppercase text-rose-900">SUPPORT GUARANTEE</div>
              </div>
              <h4 className="text-sm font-extrabold mb-1">Direct Lead Architect Slack</h4>
              <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                No account manager bottlenecks. Daily syncs directly with the senior engineer architecting your system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
