import React, { useState, useEffect } from 'react';
import { Page, Theme } from '../types';
import { Sparkles, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../hooks/useSound';
import { WebiknowsLogo } from './WebiknowsLogo';
import { useCms } from '../context/CmsContext';
import { PixyRollingText } from './PixyRollingText';
import { GsapMagneticButton } from './GsapMagneticButton';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  theme = 'light'
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { playHover, playClick } = useSound();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled(prev => prev !== isScrolled ? isScrolled : prev);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cms = useCms();

  const handleNavClick = (page: Page) => {
    playClick();
    setCurrentPage(page);
    setMobileMenuOpen(false);
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.0 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const allNavItems: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'casestudies', label: 'Case Studies' },
    { id: 'about', label: 'About Us' },
    { id: 'team', label: 'Team & Leadership' },
    { id: 'blogs', label: 'Insights & Blog' },
    { id: 'contact', label: 'Contact Us' }
  ];
  const navItems = allNavItems.filter(item => cms.pageVisibility?.[item.id] !== false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-sm py-2.5 sm:py-3 text-neutral-950'
          : 'bg-white border-b border-neutral-100 py-3 sm:py-4 text-neutral-950'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar: 3-Zone Contract */}
        <div className="flex items-center justify-between gap-4 sm:gap-8">
          
          {/* Zone 1: Single-Element Brand Wordmark */}
          <button
            onMouseEnter={playHover}
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left group cursor-pointer focus:outline-none shrink-0"
            aria-label="Webiknows IT Solutions Home"
          >
            <WebiknowsLogo size="md" theme="light" showTagline={false} />
          </button>

          {/* Zone 2: Single-Line Navigation Links (Desktop / Laptop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onMouseEnter={playHover}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-rose-900 font-semibold'
                      : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navItemIndicator"
                      className="absolute inset-0 rounded-lg -z-10 bg-rose-50 border border-rose-200"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <PixyRollingText
                    text={item.label}
                    highlightColor="text-rose-900"
                  />
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Pixy GSAP Magnetic Action Button */}
            <div onMouseEnter={playHover} onClick={playClick}>
              <GsapMagneticButton
                strength={0.3}
                data-cursor-text="CONTACT"
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hidden sm:inline-block"
              >
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs font-bold tracking-wide uppercase rounded-lg text-white bg-rose-900 hover:bg-rose-950 shadow-md shadow-rose-900/25 whitespace-nowrap shrink-0 transition-all hover:shadow-lg active:scale-95">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    <PixyRollingText text="Get in Touch" highlightColor="text-white" />
                  </span>
                </div>
              </GsapMagneticButton>
            </div>

            {/* Mobile / Tablet Hamburger Toggle */}
            <button
              onMouseEnter={playHover}
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-lg cursor-pointer text-neutral-800 hover:bg-neutral-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Animated Mobile & Tablet Navigation Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs lg:hidden"
              />
              <motion.div
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="lg:hidden mt-3 p-4 rounded-2xl border transition-all overflow-hidden shadow-2xl relative z-50 bg-white border-neutral-200 text-neutral-900"
              >
              <div className="flex flex-col gap-1.5">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onMouseEnter={playHover}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left px-4 py-3 text-sm font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                      currentPage === item.id
                        ? 'bg-rose-900 text-white shadow-md shadow-rose-900/30'
                        : 'hover:bg-neutral-100 text-neutral-800'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs opacity-60">→</span>
                  </button>
                ))}
                
                <div className="pt-3 mt-2 border-t border-neutral-200 flex items-center gap-2">
                  <button
                    onMouseEnter={playHover}
                    onClick={() => handleNavClick('contact')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xl text-white bg-rose-900 hover:bg-rose-950 cursor-pointer shadow-md shadow-rose-900/30"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Get in Touch</span>
                  </button>
                </div>
              </div>
            </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
