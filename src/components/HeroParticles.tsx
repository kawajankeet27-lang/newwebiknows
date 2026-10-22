import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroParticlesProps {
  theme: 'dark' | 'light';
}

export const HeroParticles: React.FC<HeroParticlesProps> = ({ theme }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 700], [0, -180]);
  const y2 = useTransform(scrollY, [0, 700], [0, -300]);
  const rotate = useTransform(scrollY, [0, 700], [0, 30]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.15]);

  // Deterministic particle generation for digital energy feel
  const particles = React.useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: (i * 37) % 100,
      y: (i * 47) % 100,
      size: 2 + (i % 5),
      speed: 0.6 + ((i % 4) * 0.35),
      pulseDuration: 2.5 + (i % 4),
      color: i % 5 === 0 
        ? 'bg-rose-800 shadow-[0_0_16px_rgba(239,68,68,0.8)]' 
        : i % 3 === 0 
        ? 'bg-rose-700/80 shadow-[0_0_12px_rgba(248,113,113,0.6)]' 
        : theme === 'dark' 
        ? 'bg-neutral-400/40' 
        : 'bg-neutral-500/30'
    }));
  }, [theme]);

  return (
    <motion.div 
      style={{ opacity }}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Floating digital energy nodes reacting to scroll */}
      <motion.div style={{ y: y1, rotate }} className="absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ 
              opacity: [0.25, 0.9, 0.25], 
              scale: [0.8, 1.3, 0.8],
              y: [0, -25 * p.speed, 0],
              x: [0, (p.id % 2 === 0 ? 10 : -10), 0]
            }}
            transition={{
              duration: p.pulseDuration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            className={`absolute rounded-full ${p.color}`}
          />
        ))}
      </motion.div>

      {/* Subtle connecting energy mesh parallax */}
      <motion.div style={{ y: y2 }} className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_20%,rgba(220,38,38,0.12),rgba(0,0,0,0))] pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};
