import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';

interface SpotlightCardProps {
  children: React.ReactNode;
  theme: Theme;
  className?: string;
  onClick?: () => void;
  enableTilt?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  theme,
  className = '',
  onClick,
  enableTilt = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState<{ rotateX: number; rotateY: number }>({ rotateX: 0, rotateY: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    if (enableTilt && window.innerWidth >= 768) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // Enhanced 3D tilt max 7 degrees for a tangible, premium feel
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;
      setTilt({ rotateX, rotateY });
    }
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        rotateX: isTouchDevice ? 0 : tilt.rotateX,
        rotateY: isTouchDevice ? 0 : tilt.rotateY,
        scale: isTouchDevice ? 1 : (isHovered ? 1.02 : 1)
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      style={{ 
        perspective: 1000,
        transformStyle: 'preserve-3d', 
        touchAction: 'pan-y' 
      }}
      className={`relative overflow-hidden rounded-2xl border transition-colors duration-200 w-full max-w-full backdrop-blur-2xl ${
        theme === 'dark'
          ? 'bg-[#0c0c0f]/95 border-neutral-800/90 text-white shadow-xl shadow-black/60'
          : 'bg-white/95 border-neutral-200/90 text-neutral-950 shadow-xl shadow-neutral-900/10 hover:border-rose-800/60'
      } ${className}`}
    >
      {/* Interactive Cursor Spotlight Glow (Desktop Only) */}
      {!isTouchDevice && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${
              theme === 'dark' ? 'rgba(220, 38, 38, 0.22)' : 'rgba(220, 38, 38, 0.12)'
            }, transparent 80%)`
          }}
        />
      )}

      {/* Content with 3D Depth */}
      <motion.div 
        className="relative z-10 w-full max-w-full h-full flex flex-col justify-between"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          translateZ: isHovered ? 25 : 0
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
