import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Theme } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface GsapWebflowEffectsProps {
  theme: Theme;
}

export const GsapWebflowEffects: React.FC<GsapWebflowEffectsProps> = ({ theme }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Sleek Scroll Progress Indicator Bar at top of viewport
    let progressRafId: number | null = null;
    const updateScrollProgress = () => {
      if (progressRafId !== null) return;
      progressRafId = requestAnimationFrame(() => {
        progressRafId = null;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${progress})`;
        }
      });
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    // 2. GSAP ScrollTrigger Animations for cards and sections
    const ctx = gsap.context(() => {
      // Parallax elements on scroll
      gsap.utils.toArray<HTMLElement>('.gsap-scroll-parallax').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0.85 },
          {
            y: -25,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });

      // Zoom-in cards and sections on scroll
      gsap.utils.toArray<HTMLElement>('.gsap-scroll-zoom').forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.94, opacity: 0, y: 50, filter: 'blur(6px)' },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    // 3. GSAP Subtle Card Translate Parallax on Mouse Movement
    const interactiveCards = document.querySelectorAll('.gsap-card-interactive');

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // -1 to 1
      const dy = (e.clientY - cy) / cy; // -1 to 1

      interactiveCards.forEach((card) => {
        gsap.to(card, {
          x: dx * 8,
          y: dy * 8,
          duration: 0.8,
          ease: 'power2.out',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
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
