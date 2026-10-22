import React from 'react';

interface PixyBorderBeamProps {
  duration?: number;
  size?: number;
  className?: string;
  colorFrom?: string;
  colorTo?: string;
}

export const PixyBorderBeam: React.FC<PixyBorderBeamProps> = ({
  duration = 8,
  size = 200,
  className = '',
  colorFrom = '#ef4444',
  colorTo = '#f43f5e',
}) => {
  return (
    <div
      style={
        {
          '--size': `${size}px`,
          '--duration': `${duration}s`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] ${className}`}
    >
      <div
        className="absolute aspect-square w-[var(--size)] bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent"
        style={{
          offsetPath: 'rect(0 auto auto 0 round inherit)',
          animation: `border-beam var(--duration) infinite linear`,
        }}
      />
    </div>
  );
};
