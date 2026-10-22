import React from 'react';

interface WebiknowsLogoProps {
  variant?: 'full' | 'icon-only' | 'wordmark-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
  showTagline?: boolean;
  className?: string;
}

export const WebiknowsLogo: React.FC<WebiknowsLogoProps> = ({
  variant = 'full',
  size = 'md',
  theme = 'dark',
  showTagline = false,
  className = '',
}) => {
  const isDark = theme === 'dark';

  // Sizing definitions
  const sizeMap = {
    sm: {
      iconWidth: 32,
      iconHeight: 26,
      mainTextSize: 'text-lg',
      taglineTextSize: 'text-[8px]',
      gap: 'gap-2',
    },
    md: {
      iconWidth: 44,
      iconHeight: 35,
      mainTextSize: 'text-2xl',
      taglineTextSize: 'text-[10px]',
      gap: 'gap-2.5',
    },
    lg: {
      iconWidth: 58,
      iconHeight: 46,
      mainTextSize: 'text-3xl',
      taglineTextSize: 'text-xs',
      gap: 'gap-3',
    },
    xl: {
      iconWidth: 76,
      iconHeight: 60,
      mainTextSize: 'text-4xl sm:text-5xl',
      taglineTextSize: 'text-sm',
      gap: 'gap-4',
    },
  };

  const currentSize = sizeMap[size];

  // Precision 3D Folded Ribbon "W" SVG Icon matching official Webiknows brand mark
  const RibbonWIcon = (
    <svg
      width={currentSize.iconWidth}
      height={currentSize.iconHeight}
      viewBox="0 0 120 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
    >
      <defs>
        {/* Deep Vibrant Crimson Gradients for 3D Ribbon Folds */}
        <linearGradient
          id="wk-ribbon-left-outer"
          x1="10"
          y1="10"
          x2="45"
          y2="85"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#B91C1C" />
          <stop offset="60%" stopColor="#990000" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>

        <linearGradient
          id="wk-ribbon-left-fold"
          x1="30"
          y1="10"
          x2="15"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#990000" />
        </linearGradient>

        <linearGradient
          id="wk-ribbon-center-loop"
          x1="35"
          y1="25"
          x2="85"
          y2="85"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="35%" stopColor="#B91C1C" />
          <stop offset="100%" stopColor="#990000" />
        </linearGradient>

        <linearGradient
          id="wk-ribbon-right-wing"
          x1="70"
          y1="20"
          x2="115"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="50%" stopColor="#B91C1C" />
          <stop offset="100%" stopColor="#990000" />
        </linearGradient>

        {/* Soft Shadow for 3D ribbon overlap */}
        <filter id="wk-ribbon-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow
            dx="2"
            dy="3"
            stdDeviation="2.5"
            floodColor="#000000"
            floodOpacity="0.35"
          />
        </filter>
      </defs>

      <g filter="url(#wk-ribbon-shadow)">
        {/* Ribbon Band 1: Top-Left Fold Ring */}
        <path
          d="M 28 12 L 44 12 L 20 54 L 8 54 Z"
          fill="url(#wk-ribbon-left-fold)"
        />

        {/* Ribbon Band 2: Far Left Outer Downward Leg */}
        <path
          d="M 8 54 L 28 12 L 12 36 L 2 58 Z"
          fill="url(#wk-ribbon-left-outer)"
          opacity="0.9"
        />

        {/* Ribbon Band 3: Main Left-to-Center Diagonal Drop & Upward Center Ribbon */}
        <path
          d="M 20 54 L 46 88 L 62 88 L 32 38 Z"
          fill="url(#wk-ribbon-left-outer)"
        />

        {/* Ribbon Band 4: Center Cross-Over 3D Fold */}
        <path
          d="M 32 38 L 58 88 L 74 88 L 48 38 Z"
          fill="url(#wk-ribbon-center-loop)"
        />

        {/* Ribbon Band 5: Center-Right Diagonal Up to Top-Right Wing */}
        <path
          d="M 48 38 L 78 12 L 94 12 L 62 62 Z"
          fill="url(#wk-ribbon-right-wing)"
        />

        {/* Ribbon Band 6: Far Right Wing Stroke */}
        <path
          d="M 78 12 L 114 88 L 98 88 L 62 62 Z"
          fill="url(#wk-ribbon-right-wing)"
        />
      </g>
    </svg>
  );

  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center ${className}`}>{RibbonWIcon}</div>;
  }

  return (
    <div className={`inline-flex items-center ${currentSize.gap} ${className}`}>
      {variant !== 'wordmark-only' && RibbonWIcon}

      <div className="flex flex-col justify-center leading-none select-none">
        {/* Main Wordmark: WEBI in Crimson Red, KNOWS in Charcoal / White */}
        <div className="flex items-baseline tracking-tight font-sans font-extrabold">
          <span className={`${currentSize.mainTextSize} text-rose-900 dark:text-rose-800 font-extrabold tracking-tight`}>
            WEBI
          </span>
          <span
            className={`${currentSize.mainTextSize} font-bold ${
              isDark ? 'text-neutral-100' : 'text-neutral-800'
            } tracking-tight`}
          >
            KNOWS
          </span>
          <span className={`${currentSize.mainTextSize} text-rose-900 font-black ml-0.5`}>.</span>
        </div>

        {/* Sub-Tagline: WEB | INNOVATION | KNOWLEDGE */}
        {showTagline && (
          <div className={`flex items-center gap-1.5 mt-1 font-mono uppercase tracking-widest ${currentSize.taglineTextSize} font-semibold`}>
            <span className="text-rose-900 dark:text-rose-800">WEB</span>
            <span className="text-neutral-400 dark:text-neutral-600">|</span>
            <span className="text-rose-900 dark:text-rose-800">INNOVATION</span>
            <span className="text-neutral-400 dark:text-neutral-600">|</span>
            <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
              KNOWLEDGE
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
