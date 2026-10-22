import React, { createContext, useContext, useState, useEffect } from 'react';
import gsap from 'gsap';

export type Locale = 'en' | 'hi' | 'ja' | 'de' | 'fr' | 'es';

export interface LanguageOption {
  code: Locale;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語', flag: '🇯🇵' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'French', nativeLabel: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español', flag: '🇪🇸' },
];

const TRANSLATIONS: Record<Locale, Record<string, string>> = {
  en: {
    heroBadge: 'WEB · INNOVATION · KNOWLEDGE | ENTERPRISE IT SOLUTIONS',
    heroTitlePrefix: 'Transforming Ideas into High-Impact ',
    heroTitleHighlight: 'Custom Software',
    heroTitleSuffix: ', Figma Systems & Cloud Engines.',
    heroSubtitle: 'Bespoke software engineering & high-velocity digital products crafted for market leaders.',
    startProject: 'Start Your Project',
    exploreCapabilities: 'Explore Capabilities',
    getInTouch: 'Get in Touch',
    trustedBy: 'Trusted by engineering leaders & unicorn scale-ups worldwide',
    awardsTitle: 'Global Recognition & Industry Accolades',
    servicesTitle: 'Figma Design Systems & Engineering Offerings.',
    servicesSubtitle: 'Click any service offering below to expand the complete technical specifications inline.',
    whyChooseTitle: 'Why Global Tech Leaders Choose Webiknows.',
    whyChooseSubtitle: 'We bridge the gap between creative Figma prototyping and enterprise software engineering.',
    caseStudiesTitle: 'Proven Case Studies & Client Proof.',
    caseStudiesSubtitle: 'Explore our featured engineering case studies highlighting industry focus, tech stack, and impact.',
    testimonialsTitle: 'What Our Clients Say About Webiknows.',
    testimonialsSubtitle: 'Real testimonials from enterprise CTOs, product managers, and founders.',
    blogsTitle: 'Latest Insights & Engineering Articles.',
    blogsSubtitle: 'Deep dives into Figma token automation, sub-180ms CRM architectures, and React micro-animations.',
    faqTitle: 'Frequently Asked Questions.',
    faqSubtitle: 'Everything you need to know about our Figma tokenization, custom CRM engineering, and IP ownership.',
    faqBadge: '07. Client Knowledge & Process',
    customRequirement: 'Have a custom requirement?',
    bookConsultation: 'Book Consultation',
    navHome: 'Home',
    navAbout: 'About Us',
    navServices: 'Services',
    navCaseStudies: 'Case Studies',
    navTeam: 'Meet the Team',
    navBlogs: 'Blogs',
    navContact: 'Contact Us',
  },
  hi: {
    heroBadge: 'वेब · नवाचार · ज्ञान | एंटरप्राइज आईटी सॉल्यूशंस',
    heroTitlePrefix: 'विचारों को बदलें उच्च-प्रभावशाली ',
    heroTitleHighlight: 'कस्टम सॉफ्टवेयर',
    heroTitleSuffix: ', फिग्मा सिस्टम और क्लाउड इंजन में।',
    heroSubtitle: 'मार्केट लीडर्स के लिए तैयार की गई विशेष सॉफ्टवेयर इंजीनियरिंग और उच्च-गति डिजिटल उत्पाद।',
    startProject: 'परियोजना शुरू करें',
    exploreCapabilities: 'क्षमताओं का अन्वेषण करें',
    getInTouch: 'संपर्क करें',
    trustedBy: 'विश्व भर के इंजीनियरिंग लीडर्स और यूनिकॉर्न स्टार्टअप्स का विश्वसनीय साथी',
    awardsTitle: 'वैश्विक मान्यता और उद्योग पुरस्कार',
    servicesTitle: 'फिग्मा डिज़ाइन सिस्टम और इंजीनियरिंग सेवाएं।',
    servicesSubtitle: 'संपूर्ण तकनीकी विनिर्देशों को देखने के लिए किसी भी सेवा पर क्लिक करें।',
    whyChooseTitle: 'वैश्विक टेक लीडर्स वेबिनोज़ को क्यों चुनते हैं।',
    whyChooseSubtitle: 'हम रचनात्मक फिग्मा प्रोटोटाइप और एंटरप्राइज सॉफ्टवेयर इंजीनियरिंग के बीच की दूरी को पाटते हैं।',
    caseStudiesTitle: 'प्रमाणित केस स्टडीज और ग्राहक परिणाम।',
    caseStudiesSubtitle: 'हमारे प्रमुख प्रोजेक्ट्स, तकनीक स्टैक और व्यावसायिक प्रभाव का अन्वेषण करें।',
    testimonialsTitle: 'हमारे ग्राहक वेबिनोज़ के बारे में क्या कहते हैं।',
    testimonialsSubtitle: 'एंटरप्राइज सीटीओ, प्रोडक्ट मैनेजर्स और संस्थापकों के वास्तविक अनुभव।',
    blogsTitle: 'नवीनतम अंतर्दृष्टि और इंजीनियरिंग लेख।',
    blogsSubtitle: 'फिग्मा टोकन ऑटोमेशन, कस्टम सीआरएम और रिएक्ट माइक्रो-एनिमेशन पर गहन तकनीकी लेख।',
    faqTitle: 'अक्सर पूछे जाने वाले प्रश्न।',
    faqSubtitle: 'हमारे फिग्मा टोकनाइज़ेशन, सीआरएम इंजीनियरिंग और आईपी स्वामित्व के बारे में सब कुछ।',
    faqBadge: '07. ग्राहक ज्ञान और प्रक्रिया',
    customRequirement: 'क्या आपकी कोई कस्टम आवश्यकता है?',
    bookConsultation: 'परामर्श बुक करें',
    navHome: 'होम',
    navAbout: 'हमारे बारे में',
    navServices: 'सेवाएं',
    navCaseStudies: 'केस स्टडीज',
    navTeam: 'हमारी टीम',
    navBlogs: 'ब्लॉग्स',
    navContact: 'संपर्क करें',
  },
  ja: {
    heroBadge: 'WEB · INNOVATION · KNOWLEDGE | ENTERPRISE IT SOLUTIONS',
    heroTitlePrefix: 'アイデアを革新的な ',
    heroTitleHighlight: 'カスタムソフトウェア',
    heroTitleSuffix: '、Figmaシステム、クラウドエンジンへと昇華。',
    heroSubtitle: '市場をリードする企業のために創られた、高精度ソフトウェアエンジニアリングとデジタル製品。',
    startProject: 'プロジェクトを開始',
    exploreCapabilities: '技術仕様を見る',
    getInTouch: 'お問い合わせ',
    trustedBy: '世界中のエンジニアリングリーダーとユニコーン企業から信頼',
    awardsTitle: '世界的な評価とアワード実績',
    servicesTitle: 'Figmaデザインシステム & ソフトウェア開発。',
    servicesSubtitle: 'サービスをクリックして、技術仕様インラインドロワーを展開します。',
    whyChooseTitle: 'グローバルテック企業がWebiknowsを選ぶ理由。',
    whyChooseSubtitle: '直感的なFigmaプロトタイプと堅牢なエンタープライズエンジニアリングを完全に融合。',
    caseStudiesTitle: '実績とケーススタディ。',
    caseStudiesSubtitle: '業界特化型CRM、デザインシステム、フルスタック開発の導入事例。',
    testimonialsTitle: 'クライアントからの評価と声。',
    testimonialsSubtitle: 'CTOやプロダクトリーダーからの生の声と信頼のフィードバック。',
    blogsTitle: '最新の技術知見とエンジニアリング記事。',
    blogsSubtitle: 'Figmaトークン自動化、高速CRMアーキテクチャ、Reactマイクロアニメーション。',
    faqTitle: 'よくあるご質問。',
    faqSubtitle: 'Figmaトークン化、個別CRM開発、知的所有権に関する詳細情報。',
    faqBadge: '07. 開発プロセス & FAQ',
    customRequirement: '個別の要件や仕様がありますか？',
    bookConsultation: '技術相談を予約する',
    navHome: 'ホーム',
    navAbout: '会社概要',
    navServices: 'サービス',
    navCaseStudies: '事例紹介',
    navTeam: 'チーム紹介',
    navBlogs: 'ブログ',
    navContact: 'お問い合わせ',
  },
  de: {
    heroBadge: 'WEB · INNOVATION · KNOWLEDGE | ENTERPRISE IT SOLUTIONS',
    heroTitlePrefix: 'Ideen in wirkungsstarke ',
    heroTitleHighlight: 'Individualsoftware',
    heroTitleSuffix: ', Figma-Systeme & Cloud-Engines verwandeln.',
    heroSubtitle: 'Maßgeschneiderte Softwareentwicklung & High-Velocity Digitalprodukte für Marktführer.',
    startProject: 'Projekt starten',
    exploreCapabilities: 'Leistungen erkunden',
    getInTouch: 'Kontakt aufnehmen',
    trustedBy: 'Weltweit von Tech-Leadern und Unicorn-Startups geschätzt',
    awardsTitle: 'Globale Anerkennung & Branchenauszeichnungen',
    servicesTitle: 'Figma-Designsysteme & Software-Engineering.',
    servicesSubtitle: 'Klicken Sie auf ein Angebot, um technische Spezifikationen inline zu öffnen.',
    whyChooseTitle: 'Warum führende Tech-Unternehmen Webiknows wählen.',
    whyChooseSubtitle: 'Wir verbinden kreatives Figma-Prototyping mit solider Enterprise-Softwarearchitektur.',
    caseStudiesTitle: 'Erfolgsgeschichten & Fallstudien.',
    caseStudiesSubtitle: 'Entdecken Sie Referenzprojekte, Technologiestacks und messbare Ergebnisse.',
    testimonialsTitle: 'Was unsere Kunden über Webiknows sagen.',
    testimonialsSubtitle: 'Echtes Feedback von CTOs, Produktleitern und Gründern weltweit.',
    blogsTitle: 'Aktuelle Einblicke & technische Fachartikel.',
    blogsSubtitle: 'Figma-Token-Automatisierung, sub-180ms CRM-Architekturen und React-Animationen.',
    faqTitle: 'Häufig gestellte Fragen.',
    faqSubtitle: 'Alles über unsere Figma-Synchronisation, CRM-Entwicklung und IP-Rechte.',
    faqBadge: '07. Wissen & Entwicklungsprozess',
    customRequirement: 'Haben Sie spezielle Anforderungen?',
    bookConsultation: 'Beratungsgespräch buchen',
    navHome: 'Startseite',
    navAbout: 'Über uns',
    navServices: 'Leistungen',
    navCaseStudies: 'Fallstudien',
    navTeam: 'Unser Team',
    navBlogs: 'Blog',
    navContact: 'Kontakt',
  },
  fr: {
    heroBadge: 'WEB · INNOVATION · KNOWLEDGE | ENTERPRISE IT SOLUTIONS',
    heroTitlePrefix: 'Transformer vos idées en ',
    heroTitleHighlight: 'logiciels sur mesure',
    heroTitleSuffix: ', systèmes Figma et moteurs cloud à fort impact.',
    heroSubtitle: 'Ingénierie logicielle sur mesure et produits digitaux haute vélocité conçus pour les leaders du marché.',
    startProject: 'Démarrer votre projet',
    exploreCapabilities: 'Explorer les compétences',
    getInTouch: 'Prendre contact',
    trustedBy: 'Approuvé par les leaders technologiques et licornes mondiales',
    awardsTitle: 'Reconnaissance mondiale & distinctions du secteur',
    servicesTitle: 'Systèmes de design Figma & Ingénierie sur mesure.',
    servicesSubtitle: 'Cliquez sur une offre pour déployer les spécifications techniques en ligne.',
    whyChooseTitle: 'Pourquoi les leaders technologiques choisissent Webiknows.',
    whyChooseSubtitle: 'Nous comblons le fossé entre prototypage Figma créatif et architecture logicielle d’entreprise.',
    caseStudiesTitle: 'Études de cas éprouvées & résultats clients.',
    caseStudiesSubtitle: 'Découvrez nos projets phares, nos technologies et leur impact stratégique.',
    testimonialsTitle: 'Ce que nos clients disent de Webiknows.',
    testimonialsSubtitle: 'Témoignages authentiques de CTO, directeurs produit et fondateurs.',
    blogsTitle: 'Dernières analyses & articles d’ingénierie.',
    blogsSubtitle: 'Tokenisation Figma, architectures CRM ultra-rapides et micro-interactions React.',
    faqTitle: 'Foire aux questions.',
    faqSubtitle: 'Tout savoir sur nos tokens Figma, nos solutions CRM et la propriété intellectuelle.',
    faqBadge: '07. Processus & FAQ client',
    customRequirement: 'Vous avez un besoin technique spécifique ?',
    bookConsultation: 'Réserver une session',
    navHome: 'Accueil',
    navAbout: 'À propos',
    navServices: 'Services',
    navCaseStudies: 'Études de cas',
    navTeam: 'Notre équipe',
    navBlogs: 'Blog',
    navContact: 'Contact',
  },
  es: {
    heroBadge: 'WEB · INNOVATION · KNOWLEDGE | ENTERPRISE IT SOLUTIONS',
    heroTitlePrefix: 'Transformando ideas en ',
    heroTitleHighlight: 'software a medida',
    heroTitleSuffix: ', sistemas Figma y motores cloud de alto impacto.',
    heroSubtitle: 'Ingeniería de software a medida y productos digitales de alta velocidad para líderes del mercado.',
    startProject: 'Iniciar proyecto',
    exploreCapabilities: 'Explorar capacidades',
    getInTouch: 'Contáctanos',
    trustedBy: 'Con la confianza de líderes tecnológicos y unicornios globales',
    awardsTitle: 'Reconocimiento global y galardones del sector',
    servicesTitle: 'Sistemas de diseño Figma e ingeniería de software.',
    servicesSubtitle: 'Haz clic en cualquier servicio para ver las especificaciones técnicas completas.',
    whyChooseTitle: 'Por qué los líderes tecnológicos eligen Webiknows.',
    whyChooseSubtitle: 'Unimos el diseño creativo en Figma con la ingeniería de software empresarial.',
    caseStudiesTitle: 'Casos de éxito y pruebas de clientes.',
    caseStudiesSubtitle: 'Explora nuestros proyectos destacados, arquitectura técnica y métricas de impacto.',
    testimonialsTitle: 'Lo que dicen nuestros clientes de Webiknows.',
    testimonialsSubtitle: 'Testimonios reales de directores de tecnología, jefes de producto y fundadores.',
    blogsTitle: 'Últimas publicaciones y artículos técnicos.',
    blogsSubtitle: 'Automatización de tokens en Figma, CRM de baja latencia y microanimaciones React.',
    faqTitle: 'Preguntas frecuentes.',
    faqSubtitle: 'Todo lo que necesitas saber sobre tokenización Figma, CRM y propiedad de código.',
    faqBadge: '07. Proceso y preguntas frecuentes',
    customRequirement: '¿Tienes un requerimiento personalizado?',
    bookConsultation: 'Reservar consulta',
    navHome: 'Inicio',
    navAbout: 'Nosotros',
    navServices: 'Servicios',
    navCaseStudies: 'Casos de estudio',
    navTeam: 'Equipo',
    navBlogs: 'Blog',
    navContact: 'Contacto',
  },
};

interface TranslationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, fallback?: string) => string;
  isTranslating: boolean;
  activeLanguage: LanguageOption;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [isTranslating, setIsTranslating] = useState(false);

  const activeLanguage = LANGUAGES.find(l => l.code === locale) || LANGUAGES[0];

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    setIsTranslating(true);

    // GSAP animated text translate transition effect across the page
    gsap.to('.gsap-translate-target', {
      y: -12,
      opacity: 0.2,
      duration: 0.18,
      stagger: 0.02,
      ease: 'power2.in',
      onComplete: () => {
        setLocaleState(newLocale);
        setTimeout(() => {
          gsap.fromTo(
            '.gsap-translate-target',
            { y: 14, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.35,
              stagger: 0.03,
              ease: 'power3.out',
              onComplete: () => {
                setIsTranslating(false);
              },
            }
          );
        }, 50);
      },
    });
  };

  const t = (key: string, fallback = ''): string => {
    return TRANSLATIONS[locale]?.[key] || TRANSLATIONS.en?.[key] || fallback;
  };

  return (
    <TranslationContext.Provider
      value={{
        locale,
        setLocale,
        t,
        isTranslating,
        activeLanguage,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
