import React from 'react';
import { Theme } from '../types';
import { Award, Trophy, Star, ShieldCheck, Sparkles, Flame } from 'lucide-react';
import { PixyRollingText } from './PixyRollingText';

interface AgencyAwardsBarProps {
  theme: Theme;
}

interface AwardItem {
  id: string;
  source: string;
  title: string;
  year: string;
  icon: typeof Award;
}

export const AgencyAwardsBar: React.FC<AgencyAwardsBarProps> = ({ theme }) => {
  const awards: AwardItem[] = [
    { id: '1', source: 'AWWWARDS', title: 'Site of the Day · Developer Honors', year: '2025', icon: Trophy },
    { id: '2', source: 'FWA OF THE DAY', title: 'Cutting Edge Web Architecture', year: '2025', icon: Sparkles },
    { id: '3', source: 'CSS DESIGN AWARDS', title: 'Best UI/UX & Innovation Kudos', year: '2024', icon: Star },
    { id: '4', source: 'RED DOT DESIGN', title: 'Brand & Communication Excellence', year: '2024', icon: Award },
    { id: '5', source: 'CLUTCH TOP 1%', title: 'Global Custom Software Firm', year: '2025', icon: ShieldCheck },
    { id: '6', source: 'GOOGLE CLOUD', title: 'Premier Enterprise Partner', year: '2025', icon: Flame },
  ];

  const isDark = theme === 'dark';

  return (
    <section
      aria-label="Agency Awards & Accolades"
      className={`py-8 sm:py-10 border-y transition-colors duration-300 relative overflow-hidden select-none ${
        isDark
          ? 'bg-[#0A0A0D] border-neutral-800/80 text-white'
          : 'bg-neutral-50/80 border-neutral-200/90 text-neutral-900'
      }`}
    >
      {/* Subtle background ambient blur */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-16 bg-rose-900/10 rounded-full blur-2xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-16 bg-rose-500/10 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-rose-900 animate-pulse" />
          <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-rose-900 dark:text-rose-800">
            AGENCY ACCREDITATION & AWARDS
          </span>
        </div>
        <div className="text-xs font-mono font-semibold text-neutral-500">
          Recognized by Leading Global Design & Engineering Authorities
        </div>
      </div>

      {/* Infinite Seamless Ticker */}
      <div className="relative w-full overflow-hidden flex group">
        {/* Left and right fade gradients */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none ${
            isDark
              ? 'bg-gradient-to-r from-[#0A0A0D] to-transparent'
              : 'bg-gradient-to-r from-neutral-50 to-transparent'
          }`}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none ${
            isDark
              ? 'bg-gradient-to-l from-[#0A0A0D] to-transparent'
              : 'bg-gradient-to-l from-neutral-50 to-transparent'
          }`}
        />

        {/* Ticker Row */}
        <div className="flex items-center gap-8 shrink-0 animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap py-1">
          {[...awards, ...awards].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.id}-${idx}`}
                data-cursor-text="HONOR"
                className={`inline-flex items-center gap-4 px-5 py-3 rounded-xl border transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                  isDark
                    ? 'border-neutral-800 bg-neutral-900/60 hover:border-rose-800/50 hover:bg-neutral-900 shadow-sm'
                    : 'border-neutral-200 bg-white hover:border-rose-800/40 hover:bg-white shadow-xs'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-rose-900/10 border border-rose-800/20 flex items-center justify-center text-rose-900 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-rose-900 dark:text-rose-800 uppercase">
                      {item.source}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">· {item.year}</span>
                  </div>
                  <div className="text-xs font-bold tracking-tight">
                    <PixyRollingText text={item.title} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
