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
    <div
      className={`py-12 border-y overflow-hidden relative transition-colors duration-300 select-none backdrop-blur-2xl shadow-md ${
        theme === 'dark' ? 'bg-[#08080A]/95 border-neutral-800/80' : 'bg-white/95 border-neutral-200/90 shadow-sm'
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header Label */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <p className={`text-xs font-mono uppercase tracking-widest ${
          theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
        }`}>
          Trusted by engineering leaders & unicorn scale-ups worldwide
        </p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-900 animate-pulse" />
          <span className={`text-[11px] font-mono ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}`}>
            Live Production Partners
          </span>
        </div>
      </div>

      {/* Edge Blur Gradients */}
      <div className={`absolute top-0 bottom-0 left-0 w-32 z-10 pointer-events-none bg-gradient-to-r ${
        theme === 'dark' ? 'from-[#060608] to-transparent' : 'from-neutral-50 to-transparent'
      }`} />
      <div className={`absolute top-0 bottom-0 right-0 w-32 z-10 pointer-events-none bg-gradient-to-l ${
        theme === 'dark' ? 'from-[#060608] to-transparent' : 'from-neutral-50 to-transparent'
      }`} />

      {/* Marquee Track */}
      <div className="flex overflow-hidden w-full">
        <motion.div
          className="flex items-center gap-8 shrink-0"
          animate={{
            x: isPaused ? undefined : ['0%', '-33.333%'],
          }}
          transition={{
            ease: 'linear',
            duration: 28,
            repeat: Infinity,
          }}
          style={{ width: 'max-content' }}
        >
          {duplicatedClients.map((client, idx) => {
            const Icon = client.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-xl border transition-all duration-300 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-[1.03] cursor-pointer shadow-sm ${
                  theme === 'dark'
                    ? 'bg-neutral-900/70 border-neutral-800 hover:border-rose-900/50 hover:bg-neutral-900 text-white'
                    : 'bg-white border-neutral-200 hover:border-rose-900/40 hover:shadow-md text-neutral-900'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  theme === 'dark' ? 'bg-neutral-800 text-rose-800' : 'bg-neutral-100 text-rose-900'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-extrabold tracking-wider uppercase font-mono">
                    {client.name}
                  </div>
                  <div className={`text-[10px] font-medium tracking-tight ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
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
  );
};
