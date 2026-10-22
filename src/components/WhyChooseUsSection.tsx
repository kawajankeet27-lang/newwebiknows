import React from 'react';
import { Theme, Page } from '../types';
import { useCms } from '../context/CmsContext';
import { SpotlightCard } from './SpotlightCard';
import { TextReveal } from './TextReveal';
import { PixyBorderBeam } from './PixyBorderBeam';
import { PixyRollingText } from './PixyRollingText';
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
                <span>02. Why Choose Webiknows</span>
                <span aria-hidden="true">·</span>
                <span>Engineering Differentiators</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance">
                <TextReveal text="Why Global Tech Leaders Choose Webiknows." staggerDuration={0.025} />
              </h2>
              <p className={`text-base sm:text-lg leading-relaxed ${
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
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
      </div>
    </section>
  );
};
