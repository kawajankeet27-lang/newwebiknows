import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';
import { Shield, Globe, Zap, Cpu, Layers, Terminal, Box, Compass } from 'lucide-react';

interface ClientLogoMarqueeProps {
  theme: Theme;
}

export const ClientLogoMarquee: React.FC<ClientLogoMarqueeProps> = ({ theme }) => {
  const [isPaused, setIsPaused] = useState(false);

  const clients = [
    { name: 'AURA GLOBAL', icon: Shield, tag: 'Fintech Enterprise' },
    { name: 'NEXUS CLOUD', icon: Globe, tag: 'Cloud Infrastructure' },
    { name: 'OMNIPAY', icon: Zap, tag: 'Payments OS' },
    { name: 'VORTEX AI', icon: Cpu, tag: 'Machine Learning' },
    { name: 'HYPERSCALE', icon: Layers, tag: 'Enterprise CRM' },
    { name: 'SYNTHETIX', icon: Terminal, tag: 'Design Tokens' },
    { name: 'QUANTUM LABS', icon: Box, tag: 'Deep Tech Systems' },
    { name: 'STELLAR SYSTEMS', icon: Compass, tag: 'Aerospace SaaS' },
  ];

  // Tripled array for seamless infinite looping
  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
      <div
        className={`rounded-3xl border overflow-hidden relative transition-colors duration-300 select-none backdrop-blur-2xl shadow-xl p-8 sm:p-10 ${
          theme === 'dark' ? 'bg-[#08080A]/95 border-neutral-800/80 shadow-black/80 ring-1 ring-white/5' : 'bg-white/95 border-neutral-200/90 shadow-2xl shadow-neutral-900/10 ring-1 ring-black/5'
        }`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Header Label */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-200/50 dark:border-neutral-800/50 pb-6">
          <div className="space-y-1">
            <p className={`text-xs font-mono uppercase tracking-widest font-bold ${
              theme === 'dark' ? 'text-rose-800' : 'text-rose-900'
            }`}>
              TRUSTED BY GLOBAL LEADERS
            </p>
            <p className={`text-sm font-semibold ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              Engineering partners for unicorn scale-ups & enterprise ecosystems.
            </p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-500">
              LIVE PRODUCTION STATUS
            </span>
          </div>
        </div>

        {/* Edge Blur Gradients */}
        <div className={`absolute top-0 bottom-0 left-0 w-32 z-10 pointer-events-none bg-gradient-to-r ${
          theme === 'dark' ? 'from-[#08080A] to-transparent' : 'from-white to-transparent'
        }`} />
        <div className={`absolute top-0 bottom-0 right-0 w-32 z-10 pointer-events-none bg-gradient-to-l ${
          theme === 'dark' ? 'from-[#08080A] to-transparent' : 'from-white to-transparent'
        }`} />

        {/* Marquee Track */}
        <div className="flex overflow-hidden w-full">
          <motion.div
            className="flex items-center gap-10 shrink-0"
            animate={{
              x: isPaused ? undefined : ['0%', '-33.333%'],
            }}
            transition={{
              ease: 'linear',
              duration: 35,
              repeat: Infinity,
            }}
            style={{ width: 'max-content' }}
          >
            {duplicatedClients.map((client, idx) => {
              const Icon = client.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-4 px-8 py-5 rounded-2xl border transition-all duration-300 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-[1.05] cursor-pointer shadow-sm ${
                    theme === 'dark'
                      ? 'bg-neutral-900/60 border-neutral-800 hover:border-rose-900/50 hover:bg-neutral-800 text-white'
                      : 'bg-neutral-50/50 border-neutral-200 hover:border-rose-900/40 hover:shadow-xl text-neutral-900'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    theme === 'dark' ? 'bg-neutral-800 text-rose-800' : 'bg-white text-rose-900 shadow-xs'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-max">
                    <div className="text-sm font-black tracking-widest uppercase font-mono">
                      {client.name}
                    </div>
                    <div className={`text-[10px] font-bold tracking-tight uppercase ${
                      theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'
                    }`}>
                      {client.tag}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
