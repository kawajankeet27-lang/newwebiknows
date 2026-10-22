import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';

interface BackgroundAnimationProps {
  theme?: Theme;
}

export const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ theme = 'light' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Interactive mouse gradient spotlight */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full blur-[140px] opacity-35 transition-colors duration-700"
        animate={{
          x: `calc(${mousePosition.x}% - 350px)`,
          y: `calc(${mousePosition.y}% - 350px)`,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 80 }}
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(239, 68, 68, 0.22) 0%, rgba(59, 130, 246, 0.12) 50%, transparent 80%)'
            : 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, rgba(14, 165, 233, 0.1) 50%, transparent 80%)',
        }}
      />

      {/* Floating abstract glowing orbs with richer trajectories */}
      <motion.div
        animate={{
          x: [0, 120, -80, 0],
          y: [0, -140, 90, 0],
          scale: [1, 1.3, 0.85, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute top-1/5 left-1/5 w-[500px] h-[500px] rounded-full blur-[110px] ${
          isDark ? 'bg-rose-900/15' : 'bg-rose-800/10'
        }`}
      />

      <motion.div
        animate={{
          x: [0, -130, 100, 0],
          y: [0, 150, -110, 0],
          scale: [1, 1.25, 0.8, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute bottom-1/4 right-1/4 w-[550px] h-[550px] rounded-full blur-[130px] ${
          isDark ? 'bg-blue-600/15' : 'bg-cyan-500/10'
        }`}
      />

      <motion.div
        animate={{
          x: [0, 90, -90, 0],
          y: [0, 110, 130, 0],
          scale: [0.85, 1.35, 1, 0.85],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute top-3/5 left-1/4 w-[450px] h-[450px] rounded-full blur-[100px] ${
          isDark ? 'bg-emerald-600/12' : 'bg-purple-500/8'
        }`}
      />

      {/* Pulsing light streaks */}
      <motion.div
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scaleX: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute top-1/3 left-0 right-0 h-[1px] ${
          isDark
            ? 'bg-gradient-to-r from-transparent via-rose-800/40 to-transparent'
            : 'bg-gradient-to-r from-transparent via-rose-900/30 to-transparent'
        }`}
      />

      {/* Geometric grid mesh overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isDark
            ? 'bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem]'
            : 'bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem]'
        }`}
      />

      {/* Subtle radial vignette */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(8,8,8,0.9)_100%)]'
            : 'bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(255,255,255,0.75)_100%)]'
        }`}
      />
    </div>
  );
};
