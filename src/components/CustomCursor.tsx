import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if touch device / mobile
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        // 1. Check for Pixy-style data-cursor-text badge
        const textTarget = target.closest('[data-cursor-text]') as HTMLElement | null;
        if (textTarget) {
          const text = textTarget.getAttribute('data-cursor-text');
          setCursorText(text);
          setIsHovered(true);
          return;
        } else {
          setCursorText(null);
        }

        // 2. Check for standard clickable targets
        const clickable = target.closest('button, a, input, select, textarea, [role="button"], [data-cursor-hover]');
        setIsHovered(!!clickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Pixy-Style Interactive Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center font-mono font-bold uppercase select-none"
        style={{
          x: mousePosition.x - (cursorText ? 48 : isHovered ? 24 : 8),
          y: mousePosition.y - (cursorText ? 18 : isHovered ? 24 : 8),
        }}
        animate={{
          width: cursorText ? 104 : isHovered ? 44 : 14,
          height: cursorText ? 36 : isHovered ? 44 : 14,
          borderRadius: 9999,
          backgroundColor: cursorText
            ? '#B91C1C'
            : isHovered
            ? 'rgba(185, 28, 28, 0.15)'
            : '#ef4444',
          border: isHovered && !cursorText ? '1.5px solid #B91C1C' : 'none',
          boxShadow: cursorText
            ? '0 10px 25px -3px rgba(185, 28, 28, 0.5), 0 4px 6px -4px rgba(185, 28, 28, 0.4)'
            : isHovered
            ? '0 0 20px rgba(239, 68, 68, 0.35)'
            : '0 0 10px rgba(239, 68, 68, 0.3)',
        }}
        transition={{
          type: 'spring',
          stiffness: 600,
          damping: 32,
          mass: 0.2,
        }}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] tracking-widest text-white flex items-center gap-1 font-bold whitespace-nowrap"
            >
              <span>{cursorText}</span>
              <ArrowUpRight className="w-3 h-3" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Center Precision Pointer Dot */}
      {!cursorText && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full bg-white shadow-xs"
          style={{
            x: mousePosition.x - 3,
            y: mousePosition.y - 3,
            width: 6,
            height: 6,
          }}
          animate={{
            opacity: isHovered ? 0 : 1,
            scale: isHovered ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      )}
    </>
  );
};
