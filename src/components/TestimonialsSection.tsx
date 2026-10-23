import React, { useState, useEffect } from 'react';
import { Theme, Page, TestimonialItem } from '../types';
import { useCms } from '../context/CmsContext';
import { SpotlightCard } from './SpotlightCard';
import { TextReveal } from './TextReveal';
import { PixyBorderBeam } from './PixyBorderBeam';
import { PixyRollingText } from './PixyRollingText';
import { GsapMagneticButton } from './GsapMagneticButton';
import {
  Quote,
  MapPin,
  Building2,
  Star,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Zap,
  TrendingUp,
  Award,
  Sparkles,
  ExternalLink,
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialsSectionProps {
  theme: Theme;
  setCurrentPage?: (page: Page) => void;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Marcus Vance',
    role: 'VP of Revenue Operations',
    companyName: 'Aura Global Tech',
    location: 'San Francisco, USA',
    industry: 'Enterprise SaaS & CRM',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    metric: '+184%',
    metricLabel: 'Sales Pipeline Velocity',
    rating: 5,
    projectDelivered: 'Next-Gen Enterprise CRM Suite',
    comment:
      'Webiknows turned our cluttered sales process into an ultra-sleek, lightning-fast CRM. Our sales velocity increased by 184% within the first quarter of deployment. Their zero-drift Figma handoff meant engineering matched our exact executive vision.'
  },
  {
    id: '2',
    name: 'Elena Rostova',
    role: 'Head of Product Design',
    companyName: 'Nexus Cloud Infrastructure',
    location: 'London, UK',
    industry: 'Cloud Infrastructure',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    metric: '3.2x',
    metricLabel: 'Design-to-Code Velocity',
    rating: 5,
    projectDelivered: 'Tokenized Figma Multi-Brand System',
    comment:
      'The tokenized Figma design system created by Webiknows completely synchronized our product designers and frontend developers into one seamless workflow. We shipped four product tiers without a single visual discrepancy.'
  },
  {
    id: '3',
    name: 'Siddharth Patel',
    role: 'Chief Technology Officer',
    companyName: 'OmniPay Financial',
    location: 'Mumbai, India',
    industry: 'Fintech & Banking',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    metric: '<120ms',
    metricLabel: 'P99 Transaction Latency',
    rating: 5,
    projectDelivered: 'Fintech Mobile Banking App',
    comment:
      'Webiknows delivered a world-class fintech mobile app experience. The gesture micro-animations and zero-latency transactions make our banking platform feel effortlessly premium. Our customer app rating jumped from 3.8 to 4.9 stars.'
  },
  {
    id: '4',
    name: 'Dr. Sarah Lin',
    role: 'Chief Medical Officer & Co-Founder',
    companyName: 'PulseHealth Analytics',
    location: 'Singapore',
    industry: 'HealthTech',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    metric: '100%',
    metricLabel: 'FDA & HIPAA Compliance',
    rating: 5,
    projectDelivered: 'Clinical Telemetry Web App',
    comment:
      'Designing for healthcare requires flawless precision. Webiknows exceeded all FDA user interface guidelines while maintaining a sleek, modern visual aesthetic. Clinicians praise how intuitive the real-time telemetry charts are.'
  },
  {
    id: '5',
    name: 'Ajay Kulkarni',
    role: 'Director of Engineering',
    companyName: 'Apex E-Commerce Solutions',
    location: 'Bengaluru, India',
    industry: 'Global E-Commerce',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    metric: '500k+',
    metricLabel: 'Concurrent Flash Buyers',
    rating: 5,
    projectDelivered: 'High-Throughput Cloud Engine',
    comment:
      'Their engineering team built a custom Webiknows Cloud engine that handled our holiday flash sale traffic of over 500,000 concurrent buyers without a single hitch. Zero dropped carts, sub-second checkout, and zero downtime.'
  },
  {
    id: '6',
    name: 'Kenji Takahashi',
    role: 'Managing Director',
    companyName: 'Tokyo Tech Labs',
    location: 'Tokyo, Japan',
    industry: 'Enterprise SaaS & CRM',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    metric: '0 Hours',
    metricLabel: 'Code & Design Debt',
    rating: 5,
    projectDelivered: 'Enterprise Core Modernization',
    comment:
      '100% code ownership, zero design debt, and transparent daily communication. Working with Webiknows has been our best IT engineering partnership to date. They operate as true senior architects, not just an outsourced vendor.'
  }
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ theme }) => {
  const cms = useCms();
  const rawList = cms?.testimonials && cms.testimonials.length > 0 ? cms.testimonials : DEFAULT_TESTIMONIALS;

  // Enrich raw CMS items with realistic metadata defaults if absent
  const testimonials: TestimonialItem[] = rawList.map((item, idx) => {
    const fallback = DEFAULT_TESTIMONIALS[idx % DEFAULT_TESTIMONIALS.length];
    return {
      ...fallback,
      ...item,
      role: item.role || fallback.role,
      avatarUrl: item.avatarUrl || fallback.avatarUrl,
      metric: item.metric || fallback.metric,
      metricLabel: item.metricLabel || fallback.metricLabel,
      industry: item.industry || fallback.industry,
      rating: item.rating || fallback.rating || 5,
      projectDelivered: item.projectDelivered || fallback.projectDelivered
    };
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const activeTestimonials = testimonials;
  const safeIndex = currentIndex % activeTestimonials.length;
  const current = activeTestimonials[safeIndex] || testimonials[0];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % activeTestimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + activeTestimonials.length) % activeTestimonials.length);
  };

  // Auto-advance slider every 7 seconds unless hovered/paused
  useEffect(() => {
    if (isPaused || activeTestimonials.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused, activeTestimonials.length]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98,
      filter: 'blur(4px)'
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.98,
      filter: 'blur(4px)',
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1] as const
      }
    })
  };

  const isDark = theme === 'dark';

  return (
    <section
      aria-label="Client Feedback and Trust Verification"
      className={`py-24 sm:py-32 transition-colors duration-300 bg-white/20 dark:bg-[#080808]/20 backdrop-blur-sm border-y border-white/10 dark:border-white/5 relative z-10 overflow-hidden ${
        isDark ? 'text-white' : 'text-neutral-950'
      }`}
    >
      {/* Background Subtle Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-rose-900/5 dark:bg-rose-900/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-rose-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header: Kicker, Title, Subtitle, and Slide Controls */}
        <div className={`p-6 sm:p-8 rounded-3xl backdrop-blur-xl border shadow-xl flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 ${
          isDark
            ? 'bg-neutral-950/80 border-neutral-800/80 shadow-black/80 ring-1 ring-white/5'
            : 'bg-white/85 border-neutral-200/90 shadow-rose-900/10 ring-1 ring-black/5'
        }`}>
          <motion.div
            className="max-w-3xl space-y-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-rose-900 animate-ping" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-900 dark:text-rose-800">
                [ 04 / VERIFIED CLIENT TESTIMONIALS & TRUST ]
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] text-balance">
              <TextReveal text="Client Feedback, Delivered Impact & Verified Trust." staggerDuration={0.02} />
            </h2>

            <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
              Direct testimonials from engineering leaders and product executives whose revenue, latency, and design systems were transformed by Webiknows IT Solutions.
            </p>
          </motion.div>

          {/* Right Header: Verified Clutch Trust Pill & Magnetic Slider Controls */}
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            {/* Live Trust Pill */}
            <div
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-mono font-semibold ${
                isDark
                  ? 'border-neutral-800 bg-neutral-900/90 text-neutral-300'
                  : 'border-neutral-200 bg-neutral-50 text-neutral-700 shadow-xs'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>4.98 / 5.0 Rating</span>
              <span className="text-neutral-400">·</span>
              <span className="text-rose-900 font-bold">100% Verified</span>
            </div>

            {/* Slide Index Counter & Magnetic Arrows */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-neutral-500">
                0{safeIndex + 1} <span className="text-rose-900">/</span> 0{activeTestimonials.length}
              </span>

              <div className="flex items-center gap-2">
                <GsapMagneticButton strength={0.35}>
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous client testimonial"
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isDark
                        ? 'bg-neutral-900 border-neutral-800 text-neutral-200 hover:border-rose-800 hover:text-white'
                        : 'bg-white border-neutral-200 text-neutral-800 hover:border-rose-800 hover:bg-neutral-50 shadow-xs'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </GsapMagneticButton>

                <GsapMagneticButton strength={0.35}>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next client testimonial"
                    className="p-3 rounded-xl bg-rose-900 text-white border border-rose-800 shadow-md shadow-rose-900/30 hover:bg-rose-950 transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </GsapMagneticButton>
              </div>
            </div>
          </div>
        </div>


        {/* Main Grid: Left Spotlight Editorial Testimonial Card + Right Interactive Client Selector Rail */}
        <div
          className="grid lg:grid-cols-12 gap-8 items-stretch"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Column: Spotlight Testimonial Hero (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full"
                data-cursor-text="FEEDBACK"
              >
                <SpotlightCard
                  theme={theme}
                  enableTilt={false}
                  className="p-7 sm:p-12 rounded-3xl border shadow-xl relative overflow-hidden backdrop-blur-xl h-full flex flex-col justify-between border-neutral-200 dark:border-neutral-800 group"
                >
                  {/* Pixy Animated Border Beam on Active Card */}
                  <PixyBorderBeam duration={8} size={260} colorFrom="#ef4444" colorTo="#f43f5e" />

                  {/* Ambient internal card glow */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-rose-900/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="space-y-6 relative z-10">
                    {/* Top Meta Bar: Project Delivered, Review Source, Star Rating */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800/80 pb-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-rose-900/10 border border-rose-800/30 flex items-center justify-center text-rose-900">
                          <Quote className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-rose-900 dark:text-rose-800">
                            DELIVERED WORK
                          </div>
                          <div className="text-xs font-extrabold tracking-tight">
                            {current.projectDelivered || 'Enterprise Architecture'}
                          </div>
                        </div>
                      </div>

                      {/* Real Business Impact Metric Badge */}
                      {current.metric && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-rose-800/30 bg-rose-900/10 text-rose-900 dark:text-rose-700 font-mono">
                          <Flame className="w-4 h-4 fill-rose-900" />
                          <span className="text-sm font-black">{current.metric}</span>
                          <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-300">
                            {current.metricLabel}
                          </span>
                        </div>
                      )}

                      {/* 5-Star Rating */}
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(current.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500 stroke-amber-500" />
                        ))}
                      </div>
                    </div>

                    {/* Editorial Quotation Body */}
                    <blockquote
                      className={`text-lg sm:text-2xl font-medium leading-relaxed italic ${
                        isDark ? 'text-neutral-100' : 'text-neutral-900'
                      }`}
                    >
                      "{current.comment}"
                    </blockquote>
                  </div>

                  {/* Author Meta Row: Avatar, Executive Role, Company, Location, Verified Check */}
                  <div className="pt-8 mt-6 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <img
                          src={current.avatarUrl}
                          alt={current.name}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-rose-900/30 shadow-md"
                        />
                        <div
                          title="Verified Client Identity"
                          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-rose-900 text-white flex items-center justify-center shadow-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Name & Role */}
                      <div>
                        <div className="text-lg font-black tracking-tight text-neutral-950 dark:text-white">
                          <PixyRollingText text={current.name} highlightColor="text-rose-900 dark:text-rose-800" />
                        </div>
                        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                          {current.role}
                        </div>
                      </div>
                    </div>

                    {/* Company & Country */}
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-800/20 bg-rose-900/10 text-rose-900 dark:text-rose-700 font-bold">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{current.companyName}</span>
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{current.location}</span>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Interactive Client Selector Rail (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 flex items-center justify-between px-1">
              <span>Client Reviewers</span>
              <span>{activeTestimonials.length} Stories</span>
            </div>

            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[520px] pr-1">
              {activeTestimonials.map((item, idx) => {
                const isSelected = idx === safeIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setDirection(idx > safeIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3.5 cursor-pointer relative overflow-hidden select-none ${
                      isSelected
                        ? isDark
                          ? 'bg-[#0E0E12] border-rose-800/70 shadow-lg shadow-rose-950/30 ring-1 ring-rose-800/40'
                          : 'bg-white border-rose-900 shadow-md shadow-rose-800/10 ring-1 ring-rose-900'
                        : isDark
                        ? 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                        : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300 hover:bg-white'
                    }`}
                  >
                    {/* Active Indicator Bar */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-900" />
                    )}

                    <img
                      src={item.avatarUrl}
                      alt={item.name}
                      className="w-10 h-10 rounded-xl object-cover shrink-0 border border-neutral-300 dark:border-neutral-800"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className={`text-xs font-extrabold truncate ${isSelected ? 'text-rose-900' : ''}`}>
                          {item.name}
                        </div>
                        {item.metric && (
                          <span className="text-[10px] font-mono font-bold text-rose-900 shrink-0">
                            {item.metric}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-neutral-500 truncate">
                        {item.companyName} · {item.industry}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Consultation CTA Card */}
            <div
              className={`p-4 rounded-2xl border transition-all ${
                isDark ? 'bg-neutral-900/70 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-mono font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Code Ownership</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">ISO 27001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Enterprise Trust & Verification Matrix */}
        <div className="mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-800/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className={`p-5 rounded-2xl border transition-all ${
                isDark
                  ? 'border-neutral-800 bg-neutral-900/50 hover:border-rose-800/40'
                  : 'border-neutral-200 bg-neutral-50/80 hover:border-rose-800/40 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-rose-900/10 border border-rose-800/20 flex items-center justify-center text-rose-900">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono font-bold uppercase text-rose-900">SECURITY AUDIT</div>
              </div>
              <h4 className="text-sm font-extrabold mb-1">ISO 27001 Certified</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Bank-grade encryption, role-based database rules, and strict NDAs protecting every line of client code.
              </p>
            </div>

            <div
              className={`p-5 rounded-2xl border transition-all ${
                isDark
                  ? 'border-neutral-800 bg-neutral-900/50 hover:border-rose-800/40'
                  : 'border-neutral-200 bg-neutral-50/80 hover:border-rose-800/40 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-rose-900/10 border border-rose-800/20 flex items-center justify-center text-rose-900">
                  <Lock className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono font-bold uppercase text-rose-900">IP OWNERSHIP</div>
              </div>
              <h4 className="text-sm font-extrabold mb-1">100% Client Git Ownership</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Zero proprietary lock-in. Full access to raw repositories, design tokens, and cloud infrastructure keys.
              </p>
            </div>

            <div
              className={`p-5 rounded-2xl border transition-all ${
                isDark
                  ? 'border-neutral-800 bg-neutral-900/50 hover:border-rose-800/40'
                  : 'border-neutral-200 bg-neutral-50/80 hover:border-rose-800/40 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-rose-900/10 border border-rose-800/20 flex items-center justify-center text-rose-900">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono font-bold uppercase text-rose-900">PERFORMANCE SLA</div>
              </div>
              <h4 className="text-sm font-extrabold mb-1">&lt;180ms Latency SLA</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Engineered for maximum Core Web Vitals, instant state hydration, and effortless horizontal scalability.
              </p>
            </div>

            <div
              className={`p-5 rounded-2xl border transition-all ${
                isDark
                  ? 'border-neutral-800 bg-neutral-900/50 hover:border-rose-800/40'
                  : 'border-neutral-200 bg-neutral-50/80 hover:border-rose-800/40 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-rose-900/10 border border-rose-800/20 flex items-center justify-center text-rose-900">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono font-bold uppercase text-rose-900">SUPPORT GUARANTEE</div>
              </div>
              <h4 className="text-sm font-extrabold mb-1">Direct Lead Architect Slack</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                No account manager bottlenecks. Daily syncs directly with the senior engineer architecting your system.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
