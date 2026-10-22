import React from 'react';
import { Theme } from '../types';
import { Figma, Cpu, Code2, Database, LayoutGrid, Sparkles, Zap, Shield, ArrowUpRight } from 'lucide-react';

interface TechMarqueeProps {
  theme: Theme;
}

export const TechMarquee: React.FC<TechMarqueeProps> = ({ theme }) => {
  const marqueeItems = [
    { text: 'FIGMA AUTO-LAYOUT 5.0', icon: Figma, highlight: true },
    { text: 'CUSTOM CRM PIPELINE ENGINES', icon: LayoutGrid, highlight: false },
    { text: 'REACT 19 ARCHITECTURE', icon: Code2, highlight: true },
    { text: 'BI-DIRECTIONAL WEBHOOK SYNC', icon: Zap, highlight: false },
    { text: 'TOKENIZED VARIABLES & MODES', icon: Figma, highlight: true },
    { text: 'SUB-180MS LATENCY BUDGETS', icon: Cpu, highlight: false },
    { text: 'POSTGRESQL & DRIZZLE SCHEMAS', icon: Database, highlight: true },
    { text: 'WCAG AAA ACCESSIBILITY', icon: Shield, highlight: false },
    { text: '60FPS MICRO-INTERACTION PHYSICS', icon: Sparkles, highlight: true },
  ];

  const reverseItems = [
    { text: 'ENTERPRISE DESIGN SYSTEMS', highlight: true },
    { text: 'CROSS-PLATFORM MOBILE APPS', highlight: false },
    { text: 'TAILWIND CSS V4 TOKEN MAPPING', highlight: true },
    { text: 'DRAG-AND-DROP DEAL BOARDS', highlight: false },
    { text: 'REAL-TIME WEBSOCKETS', highlight: true },
    { text: 'PROTOTYPE-TO-CODE HANDOFF', highlight: false },
    { text: 'ACCESSIBLE COLOR CONTRACTS', highlight: true },
    { text: 'ZERO LATENCY ARCHITECTURE', highlight: false },
  ];

  return (
    <div
      style={{ touchAction: 'pan-y' }}
      className={`py-8 overflow-hidden border-y transition-colors duration-300 relative w-full max-w-full ${
        theme === 'dark' ? 'bg-[#0A0A0C] border-neutral-800' : 'bg-white border-neutral-200'
      }`}
    >
      {/* Edge Blur Gradients */}
      <div className={`absolute top-0 bottom-0 left-0 w-24 z-10 pointer-events-none bg-gradient-to-r ${
        theme === 'dark' ? 'from-[#0A0A0C] to-transparent' : 'from-white to-transparent'
      }`} />
      <div className={`absolute top-0 bottom-0 right-0 w-24 z-10 pointer-events-none bg-gradient-to-l ${
        theme === 'dark' ? 'from-[#0A0A0C] to-transparent' : 'from-white to-transparent'
      }`} />

      {/* Track 1: Normal Direction */}
      <div className="animate-marquee flex items-center gap-8 py-2">
        {[...marqueeItems, ...marqueeItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 shrink-0 select-none group cursor-pointer"
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-transform duration-200 group-hover:scale-110 ${
                item.highlight
                  ? 'bg-rose-900 text-white border-rose-800 shadow-sm shadow-rose-900/30'
                  : theme === 'dark'
                  ? 'bg-neutral-900 text-neutral-300 border-neutral-800'
                  : 'bg-neutral-950 text-white border-neutral-900'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-xs sm:text-sm font-extrabold tracking-wider uppercase font-mono ${
                item.highlight
                  ? 'text-rose-900 dark:text-rose-800'
                  : theme === 'dark'
                  ? 'text-white'
                  : 'text-neutral-950'
              }`}>
                {item.text}
              </span>
              <span className="text-neutral-300 dark:text-neutral-700 font-bold ml-4">/</span>
            </div>
          );
        })}
      </div>

      {/* Track 2: Reverse Direction */}
      <div className="animate-marquee-reverse flex items-center gap-8 pt-3 pb-1 opacity-90">
        {[...reverseItems, ...reverseItems].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 shrink-0 select-none cursor-pointer"
          >
            <span className={`text-[11px] sm:text-xs font-bold tracking-widest uppercase font-mono ${
              item.highlight
                ? 'text-neutral-950 dark:text-neutral-200'
                : 'text-rose-900 dark:text-rose-700'
            }`}>
              {item.text}
            </span>
            <span className="text-rose-900/40 font-bold ml-4">·</span>
          </div>
        ))}
      </div>
    </div>
  );
};
