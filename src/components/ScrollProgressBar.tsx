import React from 'react';
import { motion, useScroll } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-rose-900 z-[10001] origin-left shadow-[0_0_8px_rgba(220,38,38,0.7)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};
