import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WebiknowsLogo } from './WebiknowsLogo';
import { ArrowRight, Sparkles, Globe, ShieldCheck } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
  theme?: 'light' | 'dark';
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already loaded in this session
    const hasLoaded = sessionStorage.getItem('webiknows_huyml_opened');
    if (hasLoaded) {
      setIsLoading(false);
      onComplete?.();
    }
  }, [onComplete]);

  const handleEnter = () => {
    setIsLoading(false);
    sessionStorage.setItem('webiknows_huyml_opened', 'true');
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between p-6 sm:p-12 bg-white text-neutral-950 select-none overflow-hidden"
        >
          {/* Subtle Red & Gray Ambient Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-rose-900/10 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute inset-0 bg-figma-grid-light opacity-50 pointer-events-none" />

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <WebiknowsLogo size="sm" theme="light" showTagline={false} />
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-[11px] font-mono text-neutral-600">
              <span className="w-2 h-2 rounded-full bg-rose-900 animate-pulse" />
              <span className="font-bold">SYSTEMS ONLINE · Q4 EDIT</span>
            </div>
          </div>

          {/* Center Content / Huyml Style Intro */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-8 my-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-900/30 bg-rose-50 text-rose-900 text-xs font-mono font-bold tracking-widest uppercase shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>WEBIKNOWS STUDIO 2026</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-balance text-neutral-950"
            >
              Shaping Digital Experiences with <span className="text-rose-900 underline decoration-rose-800/40 underline-offset-8">Clarity, Intention</span> & Character.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm sm:text-base text-neutral-600 max-w-xl font-medium"
            >
              Custom Software Engineering, Enterprise CRM Pipelines & Token-Synchronized Figma Systems.
            </motion.p>

            {/* Enter Button with Red and Black contrast */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-4"
            >
              <button
                type="button"
                onClick={handleEnter}
                className="group relative inline-flex items-center gap-4 px-9 py-5 rounded-full bg-rose-900 hover:bg-rose-950 text-white font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-xl shadow-rose-900/30 cursor-pointer active:scale-95"
              >
                <span>Enter Experience</span>
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </button>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between w-full max-w-7xl mx-auto text-xs font-mono text-neutral-500 gap-4 pt-6 border-t border-neutral-200">
            <div>© 2026 Webiknows IT Solutions Pvt. Ltd.</div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-rose-900" /> ISO 27001 SECURE</span>
              <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-neutral-700" /> MUMBAI · LONDON · SF</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
