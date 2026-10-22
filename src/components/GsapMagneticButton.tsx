import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GsapMagneticButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

export const GsapMagneticButton: React.FC<GsapMagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  strength = 0.35,
  ...props
}) => {
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    // Check for touch / coarse pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const xTo = gsap.quickTo(btn, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.3)' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      xTo(x * strength);
      yTo(y * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div
      ref={btnRef}
      className={`inline-block cursor-pointer select-none ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

