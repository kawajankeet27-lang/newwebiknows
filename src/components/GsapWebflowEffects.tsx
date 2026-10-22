import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Theme } from '../types';

interface GsapWebflowEffectsProps {
  theme: Theme;
}

export const GsapWebflowEffects: React.FC<GsapWebflowEffectsProps> = ({ theme }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. GSAP Scroll Progress Indicator Bar at top of viewport
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scaleX: progress,
          duration: 0.1,
          ease: 'none',
        });
      }
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    // 2. GSAP Subtle Card Translate Parallax on Mouse Movement
    const interactiveCards = document.querySelectorAll('.gsap-card-interactive');

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // -1 to 1
      const dy = (e.clientY - cy) / cy; // -1 to 1

      interactiveCards.forEach((card) => {
        gsap.to(card, {
          x: dx * 6,
          y: dy * 6,
          duration: 0.8,
          ease: 'power2.out',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Sleek Webflow-Style GSAP Scroll Progress Hairline Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none bg-transparent">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-rose-900 via-rose-500 to-rose-900 origin-left transform scale-x-0 shadow-sm shadow-rose-900/50"
        />
      </div>
    </>
  );
};
