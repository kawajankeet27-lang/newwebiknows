import React from 'react';

interface PixyRollingTextProps {
  text: string;
  className?: string;
  highlightColor?: string;
}

export const PixyRollingText: React.FC<PixyRollingTextProps> = ({
  text,
  className = '',
  highlightColor = 'text-rose-900 dark:text-rose-800',
}) => {
  return (
    <span className={`inline-flex flex-col overflow-hidden relative group/roll h-[1.3em] leading-[1.3em] select-none ${className}`}>
      {/* Top primary copy */}
      <span className="block transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/roll:-translate-y-full">
        {text}
      </span>
      {/* Bottom duplicate copy sliding in from below */}
      <span className={`block absolute top-0 left-0 transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full group-hover/roll:translate-y-0 font-bold ${highlightColor}`}>
        {text}
      </span>
    </span>
  );
};
