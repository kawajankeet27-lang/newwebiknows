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
  duration = 0.85,
  yOffset = 90,
  scaleFrom = 0.94,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, scale: scaleFrom, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.15, margin: '-70px 0px -70px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom luxury elastic-smooth cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
