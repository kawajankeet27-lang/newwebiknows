import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface BackToTopProps {
  theme?: 'dark' | 'light';
}

export const BackToTop: React.FC<BackToTopProps> = ({ theme = 'dark' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { playHover, playClick } = useSound();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const progress = totalHeight > 0 ? Math.min(1, Math.max(0, currentScroll / totalHeight)) : 0;
          const visible = currentScroll > 300;
          
          setScrollProgress(prev => Math.abs(prev - progress) > 0.01 ? progress : prev);
          setIsVisible(prev => prev !== visible ? visible : prev);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG circle parameters
  const size = 48;
  const strokeWidth = 3;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={scrollToTop}
          onMouseEnter={playHover}
          className={`fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full shadow-2xl cursor-pointer group backdrop-blur-md transition-colors ${
            theme === 'dark'
              ? 'bg-neutral-900/90 text-white border border-neutral-800 hover:bg-neutral-800'
              : 'bg-white/90 text-neutral-900 border border-neutral-200 hover:bg-neutral-100 shadow-neutral-300/50'
          }`}
          aria-label="Back to top"
        >
          {/* SVG Circular Progress */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
            width={size}
            height={size}
          >
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
              strokeWidth={strokeWidth}
            />
            <motion.circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#B91C1C"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
            />
          </svg>

          {/* Arrow Icon */}
          <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5 text-red-600" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
