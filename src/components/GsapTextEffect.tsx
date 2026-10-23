import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GsapTextEffectProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  delay?: number;
  stagger?: number;
  yOffset?: number | string;
  duration?: number;
  once?: boolean;
}

export const GsapTextEffect: React.FC<GsapTextEffectProps> = ({
  children,
  text,
  className = '',
  tag: Tag = 'div',
  delay = 0,
  stagger = 0.03,
  yOffset = '100%',
  duration = 0.75,
  once = false,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Target either individual word spans or sentence children
    const wordElements = container.querySelectorAll('.gsap-word-unit');
    const targets = wordElements.length > 0 ? wordElements : container.children;

    if (!targets || targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          y: yOffset,
          opacity: 0,
          filter: 'blur(5px)',
          rotateX: 15,
        },
        {
          y: '0%',
          opacity: 1,
          filter: 'blur(0px)',
          rotateX: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 88%',
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [text, delay, stagger, yOffset, duration, once]);

  // If simple text is passed, automatically wrap each word in an overflow-hidden container
  if (text) {
    const words = text.split(' ');
    return (
      // @ts-expect-error dynamic tag element
      <Tag ref={containerRef} className={`inline-block ${className}`} style={{ perspective: '1000px' }}>
        {words.map((word, idx) => (
          <span key={idx} className="inline-block overflow-hidden align-top mr-[0.25em]">
            <span className="gsap-word-unit inline-block will-change-transform">
              {word}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  // If complex JSX children (e.g. spans with highlights) are passed
  return (
    // @ts-expect-error dynamic tag element
    <Tag ref={containerRef} className={className} style={{ perspective: '1000px' }}>
      {children}
    </Tag>
  );
};
