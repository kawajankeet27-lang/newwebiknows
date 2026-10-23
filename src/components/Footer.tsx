import React, { useState, useEffect } from 'react';
import { Page, Theme } from '../types';
import { useCms } from '../context/CmsContext';
import { 
  ArrowUp, ArrowUpRight, ShieldCheck, Linkedin, Github, Instagram, Youtube, Facebook, 
  Globe, Phone, Mail, MapPin, Sparkles, Copy, Check, Clock, Radio, Building2
} from 'lucide-react';
import { WebiknowsLogo } from './WebiknowsLogo';
import { GsapMagneticButton } from './GsapMagneticButton';
import { PixyRollingText } from './PixyRollingText';
import { PixyBorderBeam } from './PixyBorderBeam';
import { WhatsAppIcon } from './WhatsAppIcon';
import { motion } from 'framer-motion';

interface FooterProps {
  currentPage: Page | 'cms';
  setCurrentPage: (page: Page | 'cms') => void;
  theme: Theme;
}

// Icon helper mapping for dynamic social links
const renderSocialIcon = (iconName: string) => {
  const norm = (iconName || '').toLowerCase();
  if (norm.includes('whatsapp') || norm.includes('message') || norm.includes('chat')) {
    return <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors" />;
  }
  if (norm.includes('linkedin')) return <Linkedin className="w-4 h-4" />;
  if (norm.includes('github')) return <Github className="w-4 h-4" />;
  if (norm.includes('instagram')) return <Instagram className="w-4 h-4" />;
  if (norm.includes('youtube')) return <Youtube className="w-4 h-4" />;
  if (norm.includes('facebook')) return <Facebook className="w-4 h-4" />;
  if (norm.includes('twitter') || norm.includes('x')) {
    return (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  return <Globe className="w-4 h-4" />;
};

export const Footer: React.FC<FooterProps> = ({
  currentPage,
  setCurrentPage,
  theme
}) => {
  const cms = useCms();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Live Studio Clocks
  const [times, setTimes] = useState({
    mumbai: '',
    london: '',
    sanFrancisco: ''
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimes({
        mumbai: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }),
        london: now.toLocaleTimeString('en-US', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: false }),
        sanFrancisco: now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', hour12: false })
      });
    };
    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const allNavLinks: { id: Page; label: string; num: string }[] = [
    { id: 'home', label: 'Home', num: '01' },
    { id: 'about', label: 'About Us', num: '02' },
    { id: 'services', label: 'Services', num: '03' },
    { id: 'casestudies', label: 'Case Studies', num: '04' },
    { id: 'team', label: 'Meet the Team', num: '05' },
    { id: 'blogs', label: 'Blogs & Insights', num: '06' },
    { id: 'contact', label: 'Contact Us', num: '07' }
  ];
  const navLinks = allNavLinks.filter(item => cms.pageVisibility?.[item.id] !== false);

  const capabilities = [
    { label: 'Custom Software Architecture', page: 'services' as Page, code: 'ENG' },
    { label: 'Tokenized Figma Systems', page: 'services' as Page, code: 'FGM' },
    { label: 'Enterprise CRM Platforms', page: 'services' as Page, code: 'CRM' },
    { label: 'Mobile Engineering (iOS & Android)', page: 'services' as Page, code: 'MBL' },
    { label: 'Webiknows Cloud & DevOps', page: 'services' as Page, code: 'CLD' }
  ];

  const activeSocials = (cms.socialLinks || []).filter(s => s.enabled && s.url);
  const isDark = theme === 'dark';

  const contactPhone = cms.siteMetadata?.contactPhone || '+91 98765 43210';
  const contactEmail = cms.siteMetadata?.contactEmail || 'contact@webiknows.com';
  const officeAddress = cms.siteMetadata?.address || 'Tech City, Mumbai, Maharashtra 400076, India';
  const whatsappUrl = cms.siteMetadata?.whatsappUrl || 'https://wa.me/919820012345?text=Hello%20Webiknows';

  return (
    <>
      {/* 1. STANDALONE 'LET\'S MAKE HISTORY' PRE-FOOTER SECTION (ZERO SOLID BACKGROUND, 3D VISIBILITY) */}
      <section aria-label="Let's Make History" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="p-8 sm:p-14 rounded-3xl bg-white/95 dark:bg-neutral-950/95 border border-rose-900/20 dark:border-rose-800/40 backdrop-blur-2xl relative overflow-hidden shadow-2xl">
          <PixyBorderBeam duration={10} size={300} colorFrom="#ef4444" colorTo="#fca5a5" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-900/10 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-rose-900/15 border border-rose-800/40 text-xs font-mono font-bold tracking-wider uppercase text-rose-800 dark:text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-800 animate-ping" />
                <span>Q4/Q1 INTAKE · READY TO SCALE</span>
              </div>
              
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.92] text-balance text-neutral-950 dark:text-white">
                Let's make <br />
                <span className="bg-gradient-to-r from-rose-700 via-rose-900 to-rose-950 dark:from-rose-500 dark:via-rose-600 dark:to-rose-800 bg-clip-text text-transparent underline decoration-rose-500/30 decoration-wavy underline-offset-8">
                  history.
                </span>
              </h2>

              <p className={`text-base sm:text-lg font-semibold leading-relaxed ${
                isDark ? 'text-neutral-200' : 'text-neutral-800'
              }`}>
                We transform high-stakes concepts into production software engines, tokenized Figma libraries, and enterprise CRM pipelines. Partner directly with senior engineers.
              </p>

              {/* Quick Feature Pill Strip */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono font-bold text-neutral-600 dark:text-neutral-300 pt-2">
                <span className="flex items-center gap-1.5 text-neutral-900 dark:text-neutral-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  ISO 27001 Certified
                </span>
                <span>·</span>
                <span className="text-neutral-900 dark:text-neutral-100">
                  Sub-180ms SLA
                </span>
                <span>·</span>
                <span className="text-neutral-900 dark:text-neutral-100">
                  100% In-House Code
                </span>
              </div>
            </div>

            {/* Interactive Magnetic CTA Cluster */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-stretch gap-4 shrink-0 min-w-[280px]">
              <GsapMagneticButton
                strength={0.4}
                data-cursor-text="TALK"
                onClick={() => {
                  setCurrentPage('contact');
                  scrollToTop();
                }}
              >
                <button
                  type="button"
                  className="group relative flex items-center justify-between sm:justify-center gap-4 px-8 py-5 rounded-2xl bg-rose-900 hover:bg-rose-950 text-white font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-2xl shadow-rose-900/30 active:scale-95 cursor-pointer overflow-hidden w-full"
                >
                  <PixyBorderBeam duration={8} size={180} colorFrom="#ffffff" colorTo="#fca5a5" />
                  <span className="relative z-10 flex items-center gap-3">
                    <Sparkles className="w-4 h-4" />
                    <PixyRollingText text="Start Discovery Session" highlightColor="text-white" />
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110 relative z-10">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </button>
              </GsapMagneticButton>

              <GsapMagneticButton
                strength={0.25}
                data-cursor-text="WHATSAPP"
                onClick={() => {
                  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                }}
              >
                <button
                  type="button"
                  className={`flex items-center justify-between sm:justify-center gap-3 px-6 py-5 rounded-2xl border font-bold text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-95 w-full ${
                    isDark
                      ? 'border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-200 hover:text-white shadow-inner'
                      : 'border-neutral-300 bg-white/80 hover:bg-neutral-100 text-neutral-900 shadow-sm'
                  }`}
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>
                    <PixyRollingText text="WhatsApp Direct" highlightColor="text-[#25D366]" />
                  </span>
                </button>
              </GsapMagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN FOOTER COMPONENT */}
      <footer
        aria-label="Site Footer"
        className={`relative border-t transition-colors duration-500 overflow-hidden bg-white/80 dark:bg-[#080808]/80 backdrop-blur-xl border-neutral-200/80 dark:border-neutral-800/80 ${
          isDark ? 'text-white' : 'text-neutral-950'
        }`}
      >
        {/* Ambient Red Studio Radiance */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-40 right-1/4 w-[700px] h-[350px] bg-rose-900/5 dark:bg-rose-900/10 rounded-full blur-[160px]" />
          <div className="absolute -bottom-40 -left-20 w-[550px] h-[350px] bg-rose-600/5 dark:bg-rose-600/10 rounded-full blur-[160px]" />
          {/* Subtle grid background pattern */}
          <div 
            className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 pb-12 space-y-12">

        {/* 2. ARCHITECTURAL 4-COLUMN FOOTER GRID */}
        <div className="py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 border-b border-neutral-200 dark:border-neutral-800/80">
          
          {/* Col 1 (4.5 cols): Brand Manifesto & Studio Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <button
              onClick={() => {
                setCurrentPage('home');
                scrollToTop();
              }}
              className="flex items-center text-left group focus:outline-none cursor-pointer"
              aria-label="Webiknows IT Solutions Home"
            >
              <WebiknowsLogo size="lg" theme={theme} showTagline={true} />
            </button>

            <p className={`text-sm leading-relaxed max-w-md ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              All In One IT Solution & Technology Company. We engineer resilient custom software, tokenized Figma libraries, native iOS/Android applications, and sub-180ms CRM platforms for high-growth enterprises worldwide.
            </p>

            {/* Architectural Trust Points (Zero Pills) */}
            <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-neutral-500">
              <span className="flex items-center gap-1.5 text-neutral-300 dark:text-neutral-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                ISO 27001 Certified
              </span>
              <span>·</span>
              <span className="text-neutral-300 dark:text-neutral-300">
                Sub-180ms SLA
              </span>
              <span>·</span>
              <span className="text-neutral-300 dark:text-neutral-300">
                100% In-House Code
              </span>
            </div>

            {/* Quick Link to Admin CMS Portal */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentPage('cms');
                  scrollToTop();
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-[11px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isDark
                    ? 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-rose-800 hover:bg-neutral-800'
                    : 'border-neutral-300 bg-white text-neutral-700 hover:text-neutral-950 hover:border-rose-800'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-rose-800" />
                <span>Admin CMS Portal</span>
                <span className="text-[10px] text-neutral-500">→</span>
              </button>
            </div>
          </div>

          {/* Col 2 (2.2 cols): Navigation [ 01 // NAVIGATION ] */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-rose-900 dark:text-rose-800">
              // 01 NAVIGATION
            </h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <li key={link.id}>
                    <button
                      onClick={() => {
                        setCurrentPage(link.id);
                        scrollToTop();
                      }}
                      className={`text-left transition-colors cursor-pointer group flex items-center gap-2 w-full ${
                        isActive
                          ? 'font-bold text-rose-900 dark:text-rose-800'
                          : isDark
                          ? 'text-neutral-400 hover:text-white'
                          : 'text-neutral-600 hover:text-neutral-950'
                      }`}
                    >
                      <span className="text-[11px] font-mono text-neutral-600 group-hover:text-rose-800 transition-colors">
                        {link.num}
                      </span>
                      <span className="font-semibold">
                        <PixyRollingText text={link.label} highlightColor="text-rose-900" />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3 (2.3 cols): Capabilities [ 02 // CAPABILITIES ] */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-rose-900 dark:text-rose-800">
              // 02 CAPABILITIES
            </h4>
            <ul className="space-y-3 text-sm">
              {capabilities.map((cap, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      setCurrentPage(cap.page);
                      scrollToTop();
                    }}
                    className={`text-left transition-colors cursor-pointer group flex items-center gap-2 w-full ${
                      isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-950'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-neutral-600 group-hover:text-rose-800 transition-colors">
                      {cap.code}
                    </span>
                    <span className="font-semibold">
                      <PixyRollingText text={cap.label} highlightColor="text-rose-900" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 (3 cols): Contact Info [ 03 // CONTACT INFO ] (Clean, Architectural, CMS-Synced) */}
          <div className="lg:col-span-3 space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-rose-900 dark:text-rose-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-900 animate-pulse" />
                <span>// 03 CONTACT INFO</span>
              </h4>
              <span className="text-[10px] font-mono text-emerald-500 font-semibold">● ACTIVE</span>
            </div>

            <div className="space-y-5">
              
              {/* Contact Number */}
              <div className="space-y-1 group">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-rose-800" />
                    Contact Number
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(contactPhone, 'phone')}
                    className="hover:text-rose-800 transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
                    title="Copy phone number"
                  >
                    {copiedField === 'phone' ? (
                      <span className="text-emerald-500 flex items-center gap-0.5"><Check className="w-3 h-3" /> Copied</span>
                    ) : (
                      <span className="flex items-center gap-0.5"><Copy className="w-3 h-3" /> Copy</span>
                    )}
                  </button>
                </div>
                <a
                  href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                  className={`text-base font-extrabold font-mono transition-colors block hover:text-rose-900 ${
                    isDark ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  {contactPhone}
                </a>
              </div>

              {/* Email ID */}
              <div className="space-y-1 group">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-rose-800" />
                    Email ID
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(contactEmail, 'email')}
                    className="hover:text-rose-800 transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
                    title="Copy email address"
                  >
                    {copiedField === 'email' ? (
                      <span className="text-emerald-500 flex items-center gap-0.5"><Check className="w-3 h-3" /> Copied</span>
                    ) : (
                      <span className="flex items-center gap-0.5"><Copy className="w-3 h-3" /> Copy</span>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${contactEmail}`}
                  className={`text-sm font-bold font-mono transition-colors block hover:text-rose-900 truncate underline decoration-neutral-700 hover:decoration-rose-800 underline-offset-4 ${
                    isDark ? 'text-neutral-200' : 'text-neutral-800'
                  }`}
                >
                  {contactEmail}
                </a>
              </div>

              {/* Office Address */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-rose-800" />
                  Address
                </span>
                <p className={`text-xs font-medium leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  {officeAddress}
                </p>
              </div>

              {/* Fast Direct Action */}
              <div className="pt-1">
                <GsapMagneticButton
                  strength={0.2}
                  onClick={() => {
                    setCurrentPage('contact');
                    scrollToTop();
                  }}
                >
                  <button
                    type="button"
                    className={`w-full py-2.5 px-4 rounded-xl border text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isDark
                        ? 'border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white hover:border-rose-900'
                        : 'border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 hover:border-rose-900 shadow-xs'
                    }`}
                  >
                    <span>Schedule Direct Meet</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-rose-800" />
                  </button>
                </GsapMagneticButton>
              </div>

            </div>
          </div>

        </div>

        {/* 3. SOCIAL MEDIA CHANNELS BAR */}
        {activeSocials.length > 0 && (
          <div className="py-8 border-b border-neutral-200 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-900 dark:text-rose-800">
                // CONNECT
              </span>
              <span className="text-xs text-neutral-500 font-mono">Follow our engineering and design releases</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {activeSocials.map((social) => (
                <GsapMagneticButton key={social.id} strength={0.3}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Follow Webiknows on ${social.platform}`}
                    aria-label={social.platform}
                    data-cursor-text="LINK"
                    className={`px-3.5 py-2 rounded-xl border transition-all duration-300 flex items-center gap-2 text-xs font-mono font-semibold cursor-pointer group ${
                      isDark 
                        ? 'bg-neutral-900/70 border-neutral-800 text-neutral-300 hover:text-white hover:bg-rose-900 hover:border-rose-800 shadow-xs' 
                        : 'bg-white border-neutral-200 text-neutral-700 hover:text-white hover:bg-rose-900 hover:border-rose-900 shadow-xs'
                    }`}
                  >
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      {renderSocialIcon(social.iconName || social.platform)}
                    </span>
                    <span>{social.platform}</span>
                  </a>
                </GsapMagneticButton>
              ))}
            </div>
          </div>
        )}

        {/* 4. COLOPHON, SYSTEM STATUS & MAGNETIC BACK TO TOP */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-neutral-500"
        >
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>© {new Date().getFullYear()} Webiknows IT Solutions Pvt. Ltd. (webiknows.com). All rights reserved.</span>
            <span className="hidden lg:inline text-neutral-700">·</span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-emerald-500 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              99.98% Uptime SLA · All Systems Operational
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setCurrentPage('contact');
                scrollToTop();
              }}
              className="hover:text-rose-800 transition-colors cursor-pointer"
            >
              Privacy & IP Guarantee
            </button>
            <span className="text-neutral-700">/</span>
            <GsapMagneticButton strength={0.35}>
              <button
                onClick={scrollToTop}
                aria-label="Scroll back to top of page"
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                  isDark
                    ? 'border-neutral-800 bg-neutral-900 hover:border-rose-800 hover:text-white text-neutral-300'
                    : 'border-neutral-300 bg-white hover:border-rose-800 hover:text-neutral-950 text-neutral-700 shadow-xs'
                }`}
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5 text-rose-800" />
              </button>
            </GsapMagneticButton>
          </div>

        </motion.div>

      </div>
    </footer>
  </>
  );
};
