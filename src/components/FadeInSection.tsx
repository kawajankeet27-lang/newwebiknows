import React from 'react';
import { motion } from 'framer-motion';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  scaleFrom?: number;
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  yOffset = 60,
  scaleFrom = 0.95,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, scale: scaleFrom, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -yOffset, scale: scaleFrom, filter: 'blur(8px)' }}
      viewport={{ once: true, amount: 0.1, margin: '-20px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom luxury cubic-bezier for premium buttery motion
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
