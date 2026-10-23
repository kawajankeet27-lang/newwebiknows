import React, { useState, useEffect } from 'react';
import { Page, Theme } from './types';
import { CmsProvider, useCms } from './context/CmsContext';
import { TranslationProvider } from './context/TranslationContext';
import { GsapWebflowEffects } from './components/GsapWebflowEffects';
import { CmsDashboard } from './components/CmsDashboard';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TechMarquee } from './components/TechMarquee';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { CaseStudiesPage } from './components/CaseStudiesPage';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutPage } from './components/AboutPage';
import { TeamPage } from './components/TeamPage';
import { BlogsPage } from './components/BlogsPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { FadeInSection } from './components/FadeInSection';
import { ClientLogoMarquee } from './components/ClientLogoMarquee';
import { CommandPalette } from './components/CommandPalette';
import { AiConsultantWidget } from './components/AiConsultantWidget';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { FaqSection } from './components/FaqSection';
import { BlogsSliderSection } from './components/BlogsSliderSection';
import { Preloader } from './components/Preloader';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import { motion, AnimatePresence } from 'framer-motion';
import { useWebVitals } from './hooks/useWebVitals';
import { DynamicJsonLd } from './components/DynamicJsonLd';
import { Webiknows3dScrollExperience } from './components/Webiknows3dScrollExperience';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';

function MainAppContent() {
  useWebVitals();
  const [currentPage, setCurrentPage] = useState<Page | 'cms'>('home');
  // Defaulting to light theme with pristine white background and bold red/black typography
  const [theme, setTheme] = useState<Theme>('light');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const cms = useCms();

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#cms') {
        setCurrentPage('cms');
      }
    };
    if (window.location.hash === '#cms') {
      setCurrentPage('cms');
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (currentPage === 'cms') {
    return <CmsDashboard theme={theme} setCurrentPage={(p) => setCurrentPage(p)} />;
  }

  const pageTransition = {
    initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
    animate: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -16, 
      filter: 'blur(6px)',
      transition: { 
        duration: 0.3, 
        ease: [0.16, 1, 0.3, 1] as const 
      } 
    }
  };

  return (
    <div
      style={{ touchAction: 'pan-y' }}
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 w-full max-w-full overflow-x-hidden relative bg-transparent ${
        theme === 'dark' ? 'text-white' : 'text-neutral-950'
      }`}
    >
      {/* Sophisticated Branded Preloader */}
      <Preloader theme={theme} />

      {/* Webflow-Style GSAP Scroll Progress & Interactive Effects */}
      <GsapWebflowEffects theme={theme} />

      {/* Unique & Impressive Background Motion Effects */}
      <BackgroundAnimation theme={theme} />

      {/* Persistent Full-Page Three.js WebGL Scene with GSAP Scroll Camera Path across all pages */}
      <ErrorBoundary fallback={null}>
        <Webiknows3dScrollExperience theme={theme} currentPage={currentPage as Page} />
      </ErrorBoundary>

      {/* Dynamic JSON-LD Schema Markup */}
      <DynamicJsonLd currentPage={currentPage} />

      {/* Fixed Top Navigation Bar */}
      <Navbar
        currentPage={currentPage as Page}
        setCurrentPage={(p) => setCurrentPage(p)}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Page View Router with AnimatePresence */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden relative z-10" style={{ touchAction: 'pan-y' }}>
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (cms.pageVisibility?.home !== false) && (
            <motion.div key="home" className="w-full max-w-full overflow-x-hidden" {...pageTransition}>
              {/* Hero Section */}
              {(cms.sectionVisibility?.hero !== false) && (
                <div id="hero">
                  <FadeInSection yOffset={60} delay={0.05}>
                    <HeroSection
                      theme={theme}
                      setCurrentPage={(p) => setCurrentPage(p)}
                    />
                  </FadeInSection>
                </div>
              )}

              {/* Trusted By Client Logo Marquee */}
              {(cms.sectionVisibility?.clientLogos !== false) && (
                <div id="client-logos">
                  <FadeInSection>
                    <ClientLogoMarquee theme={theme} />
                  </FadeInSection>
                </div>
              )}

              {/* Services Section */}
              {(cms.sectionVisibility?.services !== false) && (
                <FadeInSection>
                  <ServicesSection
                    theme={theme}
                    setCurrentPage={(p) => setCurrentPage(p)}
                  />
                </FadeInSection>
              )}

              {/* Why Choose Us Section */}
              {(cms.sectionVisibility?.whyChooseUs !== false) && (
                <div id="why-choose-us">
                  <FadeInSection>
                    <WhyChooseUsSection
                      theme={theme}
                      setCurrentPage={(p) => setCurrentPage(p)}
                    />
                  </FadeInSection>
                </div>
              )}

              {/* Case Studies Section */}
              {(cms.sectionVisibility?.caseStudies !== false) && (
                <div id="case-studies">
                  <FadeInSection>
                    <CaseStudiesPage
                      theme={theme}
                      setCurrentPage={(p) => setCurrentPage(p)}
                    />
                  </FadeInSection>
                </div>
              )}

              {/* Testimonials Section */}
              {(cms.sectionVisibility?.testimonials !== false) && (
                <div id="testimonials">
                  <FadeInSection>
                    <TestimonialsSection
                      theme={theme}
                      setCurrentPage={(p) => setCurrentPage(p)}
                    />
                  </FadeInSection>
                </div>
              )}

              {/* Blogs Section (Slider Design) */}
              {(cms.sectionVisibility?.blogs !== false) && (
                <div id="blogs">
                  <FadeInSection>
                    <BlogsSliderSection
                      theme={theme}
                      setCurrentPage={(p) => setCurrentPage(p)}
                    />
                  </FadeInSection>
                </div>
              )}

              {/* FAQ Section */}
              {(cms.sectionVisibility?.faq !== false) && (
                <div id="faq">
                  <FadeInSection>
                    <FaqSection theme={theme} setCurrentPage={(p) => setCurrentPage(p)} />
                  </FadeInSection>
                </div>
              )}
            </motion.div>
          )}

          {currentPage === 'about' && (cms.pageVisibility?.about !== false) && (
            <motion.div key="about" className="w-full max-w-full overflow-x-hidden" {...pageTransition}>
              <AboutPage
                theme={theme}
                setCurrentPage={(p) => setCurrentPage(p)}
              />
            </motion.div>
          )}

          {currentPage === 'services' && (cms.pageVisibility?.services !== false) && (
            <motion.div key="services" className="w-full max-w-full overflow-x-hidden" {...pageTransition}>
              <ServicesSection
                theme={theme}
                setCurrentPage={(p) => setCurrentPage(p)}
                isStandalone={true}
              />
            </motion.div>
          )}

          {currentPage === 'casestudies' && (cms.pageVisibility?.casestudies !== false) && (
            <motion.div key="casestudies" className="w-full max-w-full overflow-x-hidden" {...pageTransition}>
              <CaseStudiesPage
                theme={theme}
                setCurrentPage={(p) => setCurrentPage(p)}
                isStandalone={true}
              />
            </motion.div>
          )}

          {currentPage === 'team' && (cms.pageVisibility?.team !== false) && (
            <motion.div key="team" className="w-full max-w-full overflow-x-hidden" {...pageTransition}>
              <TeamPage
                theme={theme}
              />
            </motion.div>
          )}

          {currentPage === 'blogs' && (cms.pageVisibility?.blogs !== false) && (
            <motion.div key="blogs" className="w-full max-w-full overflow-x-hidden" {...pageTransition}>
              <BlogsPage
                theme={theme}
              />
            </motion.div>
          )}

          {currentPage === 'contact' && (cms.pageVisibility?.contact !== false) && (
            <motion.div key="contact" className="w-full max-w-full overflow-x-hidden" {...pageTransition}>
              <ContactPage
                theme={theme}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Quiet Footer */}
      <Footer
        currentPage={currentPage as Page}
        setCurrentPage={(p) => setCurrentPage(p)}
        theme={theme}
      />

      {/* Small Red Circular Custom Cursor */}
      <CustomCursor />

      {/* Sticky WhatsApp Chat Widget */}
      <WhatsAppWidget theme={theme} />

      {/* Spotlight Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        currentPage={currentPage as Page}
        setCurrentPage={(p) => setCurrentPage(p)}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Floating AI Consultant Assistant Widget */}
      <AiConsultantWidget
        theme={theme}
      />
    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <TranslationProvider>
        <SmoothScrollProvider>
          <MainAppContent />
        </SmoothScrollProvider>
      </TranslationProvider>
    </CmsProvider>
  );
}
