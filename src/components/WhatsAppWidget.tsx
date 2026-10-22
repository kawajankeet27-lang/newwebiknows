import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCms } from '../context/CmsContext';
import { useSound } from '../hooks/useSound';
import { Theme } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface WhatsAppWidgetProps {
  theme?: Theme;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ theme = 'light' }) => {
  const { siteMetadata } = useCms();
  const [isHovered, setIsHovered] = useState(false);
  const { playHover, playClick } = useSound();

  const whatsappUrl = siteMetadata?.whatsappUrl || 'https://wa.me/919820012345?text=Hello%20Webiknows%2C%20I%20would%20like%20to%20discuss%20a%20project.';

  const handleClick = () => {
    playClick();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-14 whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold shadow-xl border backdrop-blur-md ${
              theme === 'dark'
                ? 'bg-neutral-900/95 border-neutral-800 text-white'
                : 'bg-white/95 border-neutral-200 text-neutral-900'
            }`}
          >
            Chat with us on WhatsApp 💬
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleClick}
        onMouseEnter={() => {
          playHover();
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-500/40 cursor-pointer transition-transform group"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />

        <WhatsAppIcon className="w-6 h-6 fill-current text-white" />
      </motion.button>
    </div>
  );
};
