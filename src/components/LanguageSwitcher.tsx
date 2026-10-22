import React, { useState, useRef, useEffect } from 'react';
import { useTranslation, LANGUAGES, Locale } from '../context/TranslationContext';
import { Theme } from '../types';
import { Globe, ChevronDown, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface LanguageSwitcherProps {
  theme: Theme;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ theme }) => {
  const { locale, setLocale, isTranslating, activeLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (newLocale: Locale) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    // Trigger subtle GSAP bounce on button
    if (triggerRef.current) {
      gsap.fromTo(
        triggerRef.current,
        { scale: 0.94 },
        { scale: 1, duration: 0.35, ease: 'back.out(2)' }
      );
    }

    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative z-50">
      {/* Language Trigger Pill Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer shadow-xs select-none ${
          isOpen
            ? 'border-rose-800 text-rose-900 bg-rose-50/80 dark:bg-rose-950/40 ring-1 ring-rose-800/40'
            : theme === 'dark'
            ? 'bg-neutral-900/90 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
            : 'bg-white border-neutral-200 text-neutral-800 hover:border-neutral-300 shadow-xs'
        }`}
        aria-label="Select Language"
        aria-expanded={isOpen}
      >
        <span className="text-sm">{activeLanguage.flag}</span>
        <span className="uppercase font-bold tracking-wider">{activeLanguage.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-rose-900' : 'text-neutral-400'}`} />
      </button>

      {/* Animated Dropdown Menu with Finsweet/Weglot-Style Aesthetics */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute right-0 mt-2 w-52 p-1.5 rounded-2xl border shadow-2xl backdrop-blur-xl ${
              theme === 'dark'
                ? 'bg-[#0E0E12]/95 border-neutral-800 text-neutral-200 shadow-black/60'
                : 'bg-white/95 border-neutral-200 text-neutral-900 shadow-xl'
            }`}
          >
            {/* Header Tag */}
            <div className="px-3 py-1.5 mb-1 flex items-center justify-between border-b border-neutral-800/10 dark:border-neutral-800/60 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-rose-800" />
                <span>Webflow Translate</span>
              </span>
              <span className="text-rose-800 font-bold">GSAP</span>
            </div>

            {/* Language Options List */}
            <div className="space-y-0.5">
              {LANGUAGES.map((lang) => {
                const isSelected = lang.code === locale;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer font-medium ${
                      isSelected
                        ? 'bg-rose-900 text-white font-bold shadow-sm shadow-rose-900/30'
                        : theme === 'dark'
                        ? 'hover:bg-neutral-800/80 text-neutral-300 hover:text-white'
                        : 'hover:bg-neutral-100 text-neutral-700 hover:text-neutral-950'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base leading-none">{lang.flag}</span>
                      <div className="text-left">
                        <div className="leading-tight">{lang.nativeLabel}</div>
                        <div className={`text-[10px] ${isSelected ? 'text-red-100' : 'text-neutral-400'}`}>
                          {lang.label} ({lang.code.toUpperCase()})
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 shrink-0 text-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Translation Engine Footer */}
            <div className="mt-1.5 pt-1.5 border-t border-neutral-800/10 dark:border-neutral-800/60 px-3 py-1 flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span>Instant Kinetic Reveal</span>
              <span className="flex items-center gap-1 text-rose-800 font-semibold">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Live Active</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Animated Translating Notice Pill */}
      <AnimatePresence>
        {isTranslating && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full bg-neutral-950 text-white border border-rose-800/50 shadow-2xl shadow-rose-950/40 text-xs font-mono font-bold flex items-center gap-2.5 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-rose-800 animate-ping" />
            <span>GSAP Translating to {activeLanguage.nativeLabel}...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
