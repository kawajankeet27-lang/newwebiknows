import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Theme } from '../types';
import { MoveHorizontal, Sliders, CheckCircle2, Eye } from 'lucide-react';

interface PrototypeSliderProps {
  theme: Theme;
}

export const PrototypeSlider: React.FC<PrototypeSliderProps> = ({ theme }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePointerMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || e.buttons === 1) {
      handlePointerMove(e.clientX);
    }
  };

  const handleHandleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX);
    }
  };

  return (
    <div className={`p-4 sm:p-6 lg:p-8 rounded-2xl border transition-all duration-300 shadow-xl w-full max-w-full overflow-hidden ${
      theme === 'dark' ? 'bg-[#0F0F12] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
    }`}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-900">
            <Sliders className="w-4 h-4" />
            <span>Interactive Handoff Inspector</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1">
            Figma Wireframe Nodes vs. Production CRM Interface
          </h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-xl">
            {isMobile 
              ? 'Tap preset buttons below or drag the center handle to switch between Figma details and production code.'
              : 'Drag the central slider handle to inspect atomic tokens transform into sub-180ms React components.'}
          </p>
        </div>

        {/* Legend / Mobile Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono shrink-0">
          {/* Quick preset buttons on mobile & desktop */}
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => setSliderPosition(90)}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                sliderPosition > 70 ? 'bg-rose-900 text-white' : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Figma
            </button>
            <button
              onClick={() => setSliderPosition(50)}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                sliderPosition >= 40 && sliderPosition <= 60 ? 'bg-rose-900 text-white' : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              50/50 Split
            </button>
            <button
              onClick={() => setSliderPosition(10)}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                sliderPosition < 30 ? 'bg-rose-900 text-white' : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Rendered Code
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Canvas Container - strictly touch-action: pan-y so vertical scrolling never triggers horizontal shift */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        style={{ touchAction: 'pan-y' }}
        className="relative h-[360px] sm:h-[400px] rounded-xl overflow-hidden mt-6 select-none border border-neutral-300 dark:border-neutral-800 w-full max-w-full"
      >
        {/* Layer 1: Production CRM Interface (Bottom Layer) */}
        <div className="absolute inset-0 bg-neutral-950 text-white p-4 sm:p-6 lg:p-8 flex flex-col justify-between overflow-hidden pointer-events-none">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-neutral-800 gap-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-900 flex items-center justify-center font-bold text-xs text-white shrink-0">
                CRM
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white truncate max-w-[180px] sm:max-w-none">
                  Aura Enterprise Lead Hub
                </h4>
                <div className="text-[9px] sm:text-[10px] text-emerald-400 font-mono truncate">
                  Status: WebSocket Connected (<span className="text-rose-700">142ms</span>)
                </div>
              </div>
            </div>
            <span className="text-[10px] sm:text-xs font-mono font-bold px-2 sm:px-2.5 py-1 rounded bg-rose-950 text-rose-700 border border-red-800/60 shrink-0">
              $420K Pipeline
            </span>
          </div>

          {/* Cards Pipeline Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 my-auto">
            <div className="p-2.5 sm:p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
              <span className="text-[9px] sm:text-[10px] uppercase font-mono text-neutral-400">STAGE: DISCOVERY</span>
              <div className="text-xs font-bold text-white truncate">Starlight Mobility</div>
              <div className="text-xs sm:text-sm font-mono text-rose-800 font-bold">$85,000</div>
            </div>
            <div className="p-2.5 sm:p-3.5 rounded-xl bg-neutral-900 border border-rose-800/50 shadow-md shadow-rose-950/40 space-y-1">
              <span className="text-[9px] sm:text-[10px] uppercase font-mono text-rose-700 font-bold">STAGE: FIGMA TOKENS</span>
              <div className="text-xs font-bold text-white truncate">Nexus Aerospace</div>
              <div className="text-xs sm:text-sm font-mono text-rose-800 font-bold">$160,000</div>
            </div>
            <div className="p-2.5 sm:p-3.5 rounded-xl bg-neutral-900 border border-emerald-500/40 space-y-1 hidden sm:block">
              <span className="text-[9px] sm:text-[10px] uppercase font-mono text-emerald-400 font-bold">STAGE: CLOSED WON 🎉</span>
              <div className="text-xs font-bold text-white truncate">Vanguard Medical</div>
              <div className="text-xs sm:text-sm font-mono text-emerald-400 font-bold">$175,000</div>
            </div>
          </div>

          {/* Footer Metrics */}
          <div className="pt-2 sm:pt-3 border-t border-neutral-800 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400">
            <span>Latency: &lt;180ms · React 19 Core</span>
            <span className="text-rose-700 font-bold">100% Token Parity</span>
          </div>
        </div>

        {/* Layer 2: Figma Wireframe & Vector Node Grid (Clipped via clip-path) */}
        <div
          className="absolute inset-0 bg-white border-r-2 border-rose-900 overflow-hidden shadow-2xl transition-none pointer-events-none"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
          }}
        >
          <div className="w-full h-full bg-canvas-lines-light p-4 sm:p-6 lg:p-8 flex flex-col justify-between font-mono text-neutral-900 select-none">
            {/* Figma Auto-Layout Header */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-dashed border-red-300 gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="px-1.5 sm:px-2 py-0.5 rounded bg-rose-900 text-white text-[9px] sm:text-[10px] font-bold">
                  Frame #102
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-rose-900 truncate">
                  auto-layout: px-16, py-12
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-neutral-500 font-bold shrink-0">
                variant: tokens
              </span>
            </div>

            {/* Vector Nodes Bounding Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 my-auto">
              <div className="p-2 sm:p-3 rounded-lg border-2 border-dashed border-neutral-400 bg-rose-50/50 space-y-0.5 sm:space-y-1">
                <div className="text-[9px] sm:text-[10px] text-rose-900 font-bold truncate">[Node: DiscoveryCard]</div>
                <div className="text-[9px] sm:text-[10px] text-neutral-700 truncate">variant="inbound"</div>
                <div className="text-[9px] sm:text-[10px] text-neutral-500">radius: 12px</div>
              </div>
              <div className="p-2 sm:p-3 rounded-lg border-2 border-dashed border-rose-800 bg-red-100/60 space-y-0.5 sm:space-y-1">
                <div className="text-[9px] sm:text-[10px] text-rose-900 font-bold truncate">[Node: ActiveToken]</div>
                <div className="text-[9px] sm:text-[10px] text-rose-950 font-bold truncate">var(--crimson-red)</div>
                <div className="text-[9px] sm:text-[10px] text-neutral-500">layout: flex-col</div>
              </div>
              <div className="p-2 sm:p-3 rounded-lg border-2 border-dashed border-neutral-400 bg-rose-50/50 space-y-0.5 sm:space-y-1 hidden sm:block">
                <div className="text-[9px] sm:text-[10px] text-rose-900 font-bold truncate">[Node: ClosedWon]</div>
                <div className="text-[9px] sm:text-[10px] text-neutral-700 truncate">state: finalized</div>
                <div className="text-[9px] sm:text-[10px] text-neutral-500">cubic-bezier</div>
              </div>
            </div>

            {/* Figma Token Meta */}
            <div className="pt-2 sm:pt-3 border-t border-dashed border-red-300 flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-600">
              <span className="text-rose-900 font-bold truncate">Collection: Global / Core / V2</span>
              <span className="shrink-0">8pt grid</span>
            </div>
          </div>
        </div>

        {/* Central Slider Handle: ONLY this button accepts touch-drag, preventing accidental screen move */}
        <div
          className="absolute top-0 bottom-0 z-30 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-1 h-full bg-rose-900 shadow-lg shadow-rose-900/50" />
          <div
            onTouchMove={handleHandleTouchMove}
            className="absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rose-900 text-white flex items-center justify-center shadow-xl shadow-rose-900/60 border-2 border-white cursor-ew-resize pointer-events-auto hover:scale-110 active:scale-95 transition-transform touch-none"
            aria-label="Drag to compare"
          >
            <MoveHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
