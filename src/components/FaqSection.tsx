import React, { useState, useEffect } from 'react';
import { Theme, Page } from '../types';
import { useCms } from '../context/CmsContext';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { GsapTextEffect } from './GsapTextEffect';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqSectionProps {
  theme: Theme;
  setCurrentPage: (page: Page) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ theme, setCurrentPage }) => {
  const cms = useCms();
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs = cms.siteFaqs && cms.siteFaqs.length > 0 ? cms.siteFaqs : [
    {
      id: 'faq-1',
      question: 'How does the Figma-to-Code handoff work at Webiknows IT Solutions?',
      answer: 'We eliminate traditional handoff delays by tokenizing all Figma components (colors, typography, radii, spacing) directly into Tailwind CSS custom variables. Before writing code, we conduct a token parity check so that every React component maps 1:1 with auto-layout variants in Figma.',
      category: 'Figma Systems'
    },
    {
      id: 'faq-2',
      question: 'Do you build bespoke CRMs or integrate existing platforms like HubSpot/Salesforce?',
      answer: 'Both! For clients with unique sales pipelines or high seat licensing costs, we engineer bespoke CRM platforms running on React, Node.js, and PostgreSQL with custom Kanban boards and real-time WebSockets. For clients using Salesforce or HubSpot, we build custom bi-directional webhook connectors.',
      category: 'CRM Engineering'
    },
    {
      id: 'faq-3',
      question: 'Who owns the Figma files, design tokens, and source code upon project completion?',
      answer: 'You retain 100% full intellectual property ownership. Upon project delivery, we hand over complete edit access to all Figma file libraries, GitHub source code repositories, database schemas, and API documentation.',
      category: 'Process & Delivery'
    },
    {
      id: 'faq-4',
      question: 'What is your typical project timeline and sprint cadence?',
      answer: 'Standard sprints run between 6 to 8 weeks, divided into 2-week milestones: Milestone 1 covers Figma Canvas & Token Architecture, Milestone 2 delivers React & Mobile Frontend prototypes, and Milestone 3 completes Custom CRM Webhooks & QA testing. Express 3-4 week sprints are also available.',
      category: 'Process & Delivery'
    },
    {
      id: 'faq-5',
      question: 'How do you ensure accessibility and high performance in complex web applications?',
      answer: 'All our Figma component libraries undergo WCAG AA contrast verification. On the engineering side, we enforce strict performance budgets (<180ms render latency, 95+ Lighthouse scores) using compositor-only micro-animations and optimized bundle splitting.',
      category: 'Figma Systems'
    },
    {
      id: 'faq-6',
      question: 'Do you offer post-launch maintenance and custom CRM warranty?',
      answer: 'Yes! All custom software and CRM engines include a 12-month technical warranty covering bug fixes and API updates. We also offer dedicated monthly retainer plans for ongoing Figma component system updates and pipeline optimizations.',
      category: 'CRM Engineering'
    }
  ];

  useEffect(() => {
    if (faqs.length > 0 && !openId) {
      setOpenId(faqs[0].id);
    }
  }, [faqs, openId]);

  useEffect(() => {
    const scriptId = 'faq-json-ld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(structuredData);

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) {
        existing.remove();
      }
    };
  }, [faqs]);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={`py-20 transition-colors duration-300 relative z-10 overflow-hidden bg-transparent ${
      theme === 'dark' ? 'text-white' : 'text-neutral-950'
    }`}>
      {/* Background Subtle Gradient Blurs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-rose-900/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-rose-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 55 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-12"
        >
          {/* 12-Column Responsive Alignment Grid */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column (5 cols, sticky): Section Header, Consultation Card & 3D HUD */}
            <div className="lg:col-span-5 sticky top-28 space-y-6">
              
              {/* Section Header Card (Opaque High-Contrast Glass) */}
              <div className={`space-y-4 p-6 sm:p-8 rounded-3xl backdrop-blur-2xl border shadow-xl ${
                theme === 'dark'
                  ? 'bg-neutral-950/95 border-neutral-800/90 shadow-black/80 ring-1 ring-white/10'
                  : 'bg-white/95 border-neutral-200/90 shadow-xl shadow-neutral-900/10 ring-1 ring-black/5'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-900 font-mono">
                  <HelpCircle className="w-4 h-4" />
                  <span>07. Client Knowledge & Process</span>
                  <span aria-hidden="true">·</span>
                  <span>Common Inquiries</span>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.85rem] font-extrabold tracking-tight leading-[1.3] text-balance">
                  <GsapTextEffect text="Frequently Asked Questions." tag="span" />
                </h2>
                <p className={`gsap-sentence-reveal text-sm sm:text-base leading-relaxed ${
                  theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
                }`}>
                  Everything you need to know about our Figma tokenization, custom CRM engineering, and IP ownership.
                </p>
              </div>



              {/* Quick Consultation CTA Card */}
              <div className={`p-6 rounded-3xl border transition-all backdrop-blur-2xl ${
                theme === 'dark'
                  ? 'bg-[#111117]/95 border-neutral-800 shadow-xl'
                  : 'bg-white/95 border-neutral-200/90 shadow-lg'
              }`}>
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-rose-900 bg-rose-900/10 border border-rose-800/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Direct Technical Channel</span>
                  </div>

                  <h3 className="text-lg font-extrabold tracking-tight">
                    Have a custom requirement?
                  </h3>

                  <p className={`text-xs leading-relaxed ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    Speak directly with a Mumbai-based lead architect to review your Figma component tokens or CRM integration roadmap.
                  </p>

                  <button
                    onClick={() => {
                      setCurrentPage('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-3 px-5 rounded-2xl bg-rose-900 hover:bg-rose-950 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-rose-900/30 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Schedule Free Call</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Accordion Questions (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden backdrop-blur-2xl ${
                      isOpen
                        ? theme === 'dark'
                          ? 'bg-[#0F0F12]/95 border-rose-800/80 shadow-lg shadow-rose-950/20 ring-1 ring-rose-800/50'
                          : 'bg-white border-rose-900 shadow-lg ring-1 ring-rose-900/30'
                        : theme === 'dark'
                        ? 'bg-neutral-950/95 border-neutral-800/90 hover:border-neutral-700 hover:bg-neutral-900/95'
                        : 'bg-white/95 border-neutral-200/90 hover:border-neutral-300 hover:bg-white shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <span className="text-xs sm:text-sm font-mono font-bold text-rose-900 shrink-0">
                          {index < 9 ? `0${index + 1}.` : `${index + 1}.`}
                        </span>
                        <span className={`text-sm sm:text-base font-bold transition-colors ${
                          isOpen ? 'text-rose-900' : theme === 'dark' ? 'text-white' : 'text-neutral-950'
                        }`}>
                          {faq.question}
                        </span>
                      </div>

                      <div className={`p-2 rounded-xl border shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-rose-900 text-white border-rose-800 shadow-sm' : theme === 'dark' ? 'text-neutral-400 border-neutral-800 bg-neutral-900' : 'text-neutral-500 border-neutral-200 bg-white'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Framer Motion Animated Collapsible Drawer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className={`px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm leading-relaxed border-t ${
                            theme === 'dark' ? 'text-neutral-300 border-neutral-800/60' : 'text-neutral-700 border-neutral-200/80'
                          }`}>
                            <div className="flex items-center gap-2 mb-2 font-mono text-[11px] font-bold text-rose-800">
                              <span>Category: {faq.category}</span>
                            </div>
                            <p>{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
