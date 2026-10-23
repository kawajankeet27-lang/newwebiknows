import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GsapTextEffect } from './GsapTextEffect';

interface RoiCalculatorProps {
  theme?: 'light' | 'dark';
}

export const InteractiveRoiCalculator: React.FC<RoiCalculatorProps> = ({ theme = 'light' }) => {
  const [monthlyTraffic, setMonthlyTraffic] = useState(50000);
  const [avgOrderValue, setAvgOrderValue] = useState(250);
  const [currentConversion, setCurrentConversion] = useState(1.8);

  // Projected conversion with Kinetix elite architecture (estimated +65% uplift)
  const projectedConversion = Number((currentConversion * 1.65).toFixed(2));
  
  const currentMonthlyRevenue = (monthlyTraffic * (currentConversion / 100)) * avgOrderValue;
  const projectedMonthlyRevenue = (monthlyTraffic * (projectedConversion / 100)) * avgOrderValue;
  const monthlyUplift = projectedMonthlyRevenue - currentMonthlyRevenue;
  const annualUplift = monthlyUplift * 12;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section className={`py-20 relative overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0A0A0C] text-white' : 'bg-neutral-50/80 text-neutral-950'
    }`}>
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-900/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-rose-800 bg-rose-800/10 px-3 py-1.5 rounded-full border border-rose-800/20 inline-block mb-4">
            Interactive Impact Matrix
          </span>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.85rem] font-extrabold tracking-tight leading-[1.3] mb-4 text-balance">
            <GsapTextEffect text="Calculate Your Digital Revenue Uplift" tag="span" />
          </h2>
          <p className={`gsap-sentence-reveal text-sm sm:text-base ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Experience how elite performance engineering and UX architecture compound your conversion velocity and enterprise value.
          </p>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl p-8 sm:p-12 border backdrop-blur-2xl ${
          theme === 'dark'
            ? 'bg-[#121216]/95 border-neutral-800 shadow-2xl'
            : 'bg-white/98 border-neutral-200 shadow-2xl'
        }`}>
          {/* Sliders Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Monthly Traffic Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold tracking-wide uppercase font-mono">Monthly Active Visitors</label>
                <span className="text-lg font-bold text-rose-800 font-mono">{monthlyTraffic.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={monthlyTraffic}
                onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
                className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-rose-900"
              />
              <div className="flex justify-between text-xs text-neutral-500 mt-1 font-mono">
                <span>5K</span>
                <span>250K</span>
                <span>500K+</span>
              </div>
            </div>

            {/* Average Order / Deal Value Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold tracking-wide uppercase font-mono">Average Deal / Order Value (INR)</label>
                <span className="text-lg font-bold text-rose-800 font-mono">{formatCurrency(avgOrderValue)}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={avgOrderValue}
                onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-rose-900"
              />
              <div className="flex justify-between text-xs text-neutral-500 mt-1 font-mono">
                <span>₹1,000</span>
                <span>₹50,000</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            {/* Current Conversion Rate Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold tracking-wide uppercase font-mono">Current Conversion Rate (%)</label>
                <span className="text-lg font-bold text-rose-800 font-mono">{currentConversion}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={currentConversion}
                onChange={(e) => setCurrentConversion(Number(e.target.value))}
                className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-rose-900"
              />
              <div className="flex justify-between text-xs text-neutral-500 mt-1 font-mono">
                <span>0.5%</span>
                <span>2.5%</span>
                <span>5.0%</span>
              </div>
            </div>
          </div>

          {/* Results Display Card */}
          <div className={`lg:col-span-5 rounded-2xl p-8 flex flex-col justify-between border ${
            theme === 'dark' ? 'bg-neutral-900/90 border-neutral-800' : 'bg-neutral-900 text-white border-neutral-800'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase tracking-widest text-rose-700 font-mono">Projected Impact</span>
                <span className="text-xs bg-rose-800/20 text-rose-700 px-2.5 py-1 rounded-full font-mono font-semibold">+65% Conversion Lift</span>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-xs text-neutral-400 uppercase font-mono mb-1">Projected New Conversion Rate</p>
                  <p className="text-3xl font-extrabold text-white font-mono">{projectedConversion}%</p>
                </div>

                <div>
                  <p className="text-xs text-neutral-400 uppercase font-mono mb-1">Estimated Monthly Revenue Uplift</p>
                  <p className="text-3xl font-extrabold text-emerald-400 font-mono">{formatCurrency(monthlyUplift)}</p>
                </div>

                <div className="pt-4 border-t border-neutral-800">
                  <p className="text-xs text-neutral-400 uppercase font-mono mb-1">Annualized Revenue Growth</p>
                  <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-700 to-rose-300 font-mono">
                    {formatCurrency(annualUplift)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = '#contact';
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-900 to-rose-950 text-white font-bold text-center block shadow-lg shadow-rose-900/30 hover:from-rose-800 hover:to-rose-900 transition-all duration-300 uppercase tracking-wider text-xs font-mono"
              >
                Claim This Growth Architecture
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
