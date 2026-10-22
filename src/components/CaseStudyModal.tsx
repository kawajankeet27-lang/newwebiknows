import React, { useState } from 'react';
import { CaseStudy, Theme, Page } from '../types';
import { X, CheckCircle2, TrendingUp, Layers, Sliders, ArrowRight, Quote, ShieldCheck, Sparkles } from 'lucide-react';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  theme: Theme;
  setCurrentPage: (page: Page) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  theme,
  setCurrentPage
}) => {
  const [viewMode, setViewMode] = useState<'final' | 'wireframe'>('final');

  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border transition-all shadow-2xl ${
          theme === 'dark'
            ? 'bg-[#0F0F12] border-neutral-800 text-white shadow-rose-950/30'
            : 'bg-white border-neutral-200 text-neutral-900 shadow-2xl'
        }`}
      >
        {/* Sticky Header Bar */}
        <div className={`sticky top-0 z-20 px-6 py-4 border-b flex items-center justify-between gap-4 backdrop-blur-md ${
          theme === 'dark' ? 'bg-[#0F0F12]/90 border-neutral-800' : 'bg-white/90 border-neutral-200'
        }`}>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-900">
              {caseStudy.category} · {caseStudy.client}
            </span>
            <h3 className="text-xl font-extrabold tracking-tight mt-0.5">
              {caseStudy.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors cursor-pointer border ${
              theme === 'dark'
                ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                : 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-neutral-950'
            }`}
            aria-label="Close case study details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
            {caseStudy.results.map((res, idx) => (
              <div
                key={idx}
                className={`p-3 sm:p-4 rounded-xl border text-center ${
                  theme === 'dark' ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                }`}
              >
                <div className="text-xl sm:text-2xl font-extrabold font-mono text-rose-900">
                  {res.value}
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-neutral-400 mt-1">
                  {res.label}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Wireframe vs Rendered UI Toggle Box */}
          <div className={`p-4 sm:p-6 rounded-2xl border ${
            theme === 'dark' ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
          }`}>
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-neutral-800/20">
              <span className="text-xs font-mono font-bold uppercase text-rose-900">
                Figma Wireframe vs Rendered Application
              </span>

              <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-lg border border-neutral-800 text-white">
                <button
                  onClick={() => setViewMode('final')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                    viewMode === 'final' ? 'bg-rose-900 text-white font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Finished UI
                </button>
                <button
                  onClick={() => setViewMode('wireframe')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                    viewMode === 'wireframe' ? 'bg-rose-900 text-white font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Figma Nodes
                </button>
              </div>
            </div>

            {/* Display Area */}
            {viewMode === 'final' ? (
              <div className="p-6 rounded-xl bg-neutral-900 text-white border border-neutral-800 space-y-3 font-sans">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-rose-700">Project: {caseStudy.title}</span>
                  <span className="text-xs font-mono text-emerald-400">Status: Deployed & Synced</span>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {caseStudy.summary}
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  {caseStudy.techStack.map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs font-mono rounded bg-neutral-800 text-rose-700 border border-neutral-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-neutral-950 text-neutral-300 border-2 border-dashed border-rose-800/40 font-mono text-xs space-y-3">
                <div className="text-rose-700 font-bold">Figma Vector Canvas Node Map:</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {caseStudy.wireframeNodes.map((node, i) => (
                    <div key={i} className="p-3 rounded bg-rose-950/30 border border-rose-800/30">
                      <div className="text-rose-700 font-bold">{node.label}</div>
                      <div className="text-neutral-500 text-[10px]">x: {node.x}px · y: {node.y}px</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Problem & Solution Paragraphs */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`p-5 rounded-xl border ${
              theme === 'dark' ? 'bg-neutral-950/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 mb-2">
                The Client Challenge
              </h4>
              <p className={`text-sm leading-relaxed ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                {caseStudy.challenge}
              </p>
            </div>

            <div className={`p-5 rounded-xl border ${
              theme === 'dark' ? 'bg-neutral-950/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 mb-2">
                The Webiknows Solution
              </h4>
              <p className={`text-sm leading-relaxed ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                {caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Deliverables List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900">
              Key Deliverables Handed Over
            </h4>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {caseStudy.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2.5 ${
                    theme === 'dark'
                      ? 'bg-neutral-900 border-neutral-800 text-neutral-200'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-800'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-rose-800 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client Testimonial Callout */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/40 via-neutral-900 to-neutral-950 border border-rose-800/30 text-white relative overflow-hidden">
            <Quote className="w-10 h-10 text-rose-800/20 absolute -top-1 -left-1" />
            <p className="text-sm sm:text-base italic leading-relaxed relative z-10 text-neutral-200">
              "{caseStudy.testimonial.quote}"
            </p>
            <div className="mt-4 pt-4 border-t border-neutral-800/60 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">{caseStudy.testimonial.author}</div>
                <div className="text-[11px] text-rose-700">{caseStudy.testimonial.role} · {caseStudy.testimonial.company}</div>
              </div>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          {/* Modal Bottom CTA */}
          <div className="pt-4 border-t border-neutral-800/20 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-neutral-400">
              Timeline: <span className="text-rose-800 font-bold">{caseStudy.timeline}</span>
            </div>

            <button
              onClick={() => {
                onClose();
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase rounded-xl text-white bg-rose-900 hover:bg-rose-950 active:scale-95 transition-all shadow-md shadow-rose-900/30 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get in Touch</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
