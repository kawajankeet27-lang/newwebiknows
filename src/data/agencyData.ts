import { CaseStudy, Service, TeamMember, BlogPost } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'aura-crm',
    title: 'Aura CRM Enterprise Suite',
    subtitle: 'Unified Sales Pipeline & Automated Customer Lifecycle OS',
    category: 'CRM Systems',
    industry: 'Enterprise CRM & Automation',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    client: 'Aura Global Tech',
    timeline: '12 Weeks',
    summary: 'Redesigned and engineered a high-velocity enterprise CRM platform from Figma design system to custom React & Node backend with real-time deal sync.',
    challenge: 'Aura was struggling with fragmented sales data across 4 legacy tools, causing a 42% drop in sales follow-up velocity and sluggish UI load times over 4.2 seconds.',
    solution: 'We constructed a unified Figma design system with tokenized dark/light UI modes, then built a bespoke CRM pipeline engine with multi-stage drag-and-drop boards, automated lead scoring, and instant webhooks.',
    results: [
      { label: 'Pipeline Velocity', value: '+184%' },
      { label: 'UI Latency', value: '< 180ms' },
      { label: 'Lead Conversion', value: '3.4x' },
      { label: 'Annual Saved Hours', value: '1,420 hrs' }
    ],
    deliverables: [
      'Complete Figma Component Library (320+ Tokens)',
      'Custom React Pipeline Board with Micro-Animations',
      'Real-time Lead Scoring & Webhook Automations',
      'Role-based Permission Matrix & Security Audit'
    ],
    techStack: ['Figma Variables', 'React 19', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Express'],
    wireframeNodes: [
      { label: 'Deal Matrix', x: 120, y: 80 },
      { label: 'Lead Scorer', x: 380, y: 80 },
      { label: 'Webhook Hub', x: 250, y: 220 }
    ],
    testimonial: {
      quote: 'Webiknows turned our cluttered sales process into an ultra-sleek, lightning-fast CRM that our sales team actually loves using every day.',
      author: 'Marcus Vance',
      role: 'Chief Revenue Officer',
      company: 'Aura Global Tech'
    },
    metrics: {
      conversionBefore: '2.1%',
      conversionAfter: '7.8%',
      pipelineGrowth: '$18.4M',
      designSpeedUp: '4x Faster Dev Handoff'
    }
  },
  {
    id: 'nexus-design-system',
    title: 'Nexus Figma Design System',
    subtitle: 'Enterprise Tokens & Component Architecture for 80+ Designers',
    category: 'Design Systems',
    industry: 'Cloud Infrastructure & Design Systems',
    imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80',
    client: 'Nexus Cloud Infrastructure',
    timeline: '8 Weeks',
    summary: 'Built a scalable multi-brand Figma design system with automated code export to React and Tailwind CSS.',
    challenge: 'Inconsistent component usage across 6 product teams led to bloated frontend code, UI bugs, and 3-week design handoff delays.',
    solution: 'Created an atomic Figma design system with automated auto-layout components, responsive variants, contrast-verified tokens, and direct React prop mapping.',
    results: [
      { label: 'Design Handoff', value: '-70% Time' },
      { label: 'Component Reusability', value: '94%' },
      { label: 'UI Bugs Reduced', value: '-82%' },
      { label: 'Designers Onboarded', value: '85 Staff' }
    ],
    deliverables: [
      'Figma Token Variables (Color, Spacing, Typography)',
      'Interactive Figma Micro-Animation Specs',
      'Tailwind CSS Config Mapping & UI Package',
      'Figma Plugin for Auto-Syncing Tokens to Code'
    ],
    techStack: ['Figma Auto-Layout 5', 'Figma Tokens API', 'TypeScript', 'Tailwind CSS'],
    wireframeNodes: [
      { label: 'Design Tokens', x: 100, y: 60 },
      { label: 'Variant Specs', x: 350, y: 60 },
      { label: 'React Code Export', x: 225, y: 200 }
    ],
    testimonial: {
      quote: 'The Nexus Design System created by Webiknows completely synchronized our product designers and frontend developers into one harmonious workflow.',
      author: 'Elena Rostova',
      role: 'VP of Product Experience',
      company: 'Nexus Cloud'
    },
    metrics: {
      conversionBefore: '18 Days/Feature',
      conversionAfter: '4 Days/Feature',
      pipelineGrowth: '80+ Active UI Kits',
      designSpeedUp: '350% Speed Gain'
    }
  },
  {
    id: 'omnipay-mobile',
    title: 'OmniPay Fintech Mobile App',
    subtitle: 'Cross-Platform Banking & Crypto Portfolio Application',
    category: 'Mobile Apps',
    industry: 'Fintech & Digital Banking',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    client: 'OmniPay Financial Inc.',
    timeline: '10 Weeks',
    summary: 'End-to-end Figma UI/UX prototyping and cross-platform mobile application development for high-volume transactions.',
    challenge: 'Users reported high drop-off rates during multi-currency transfers due to confusing navigation and lack of haptic visual feedback.',
    solution: 'Engineered an intuitive mobile navigation architecture with gesture-driven micro-interactions, dark glass aesthetics, and instant biometric authentication.',
    results: [
      { label: 'App Store Rating', value: '4.9 ★' },
      { label: 'Transfer Completion', value: '98.4%' },
      { label: 'Monthly Active Users', value: '420,000+' },
      { label: 'User Retention', value: '+62%' }
    ],
    deliverables: [
      'Figma High-Fidelity Mobile Interactive Prototype',
      'Cross-Platform iOS & Android Native UI Components',
      'Biometric Security & Encrypted Session Flows',
      'Micro-Animation Feedback Engine'
    ],
    techStack: ['Figma Mobile Specs', 'React Native / Web', 'Tailwind CSS', 'Framer Motion', 'REST/GraphQL'],
    wireframeNodes: [
      { label: 'Wallet Node', x: 140, y: 90 },
      { label: 'Transfer Sheet', x: 340, y: 90 },
      { label: 'Biometric Gate', x: 240, y: 210 }
    ],
    testimonial: {
      quote: 'Webiknows delivered a world-class mobile app experience. The micro-animations make spending and investing feel effortlessly premium.',
      author: 'Siddharth Patel',
      role: 'Founder & CEO',
      company: 'OmniPay Financial'
    },
    metrics: {
      conversionBefore: '3.2 Mins/Txn',
      conversionAfter: '18 Secs/Txn',
      pipelineGrowth: '$140M Vol',
      designSpeedUp: '100% Prototyped'
    }
  },
  {
    id: 'pulse-saas',
    title: 'PulseHealth AI Diagnostic Platform',
    subtitle: 'Clinical Workflow & Patient Intelligence Dashboard',
    category: 'SaaS Platforms',
    industry: 'Healthcare & AI Diagnostics',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    client: 'PulseHealth Analytics',
    timeline: '14 Weeks',
    summary: 'Architected a complex medical software platform with dense data visualization, patient records management, and real-time telemetry.',
    challenge: 'Clinicians were overwhelmed by complex dense EHR tables and slow search interfaces during critical patient consultations.',
    solution: 'Designed a ultra-clean high-contrast interface in Figma with dark and high-contrast modes, clean tabular typography, and instant keyboard shortcut workflows.',
    results: [
      { label: 'Diagnosis Speed', value: '2.8x Faster' },
      { label: 'Clinical Adoption', value: '99.2%' },
      { label: 'Data Accuracy', value: '99.98%' },
      { label: 'FDA UI Audit', value: 'Passed 100%' }
    ],
    deliverables: [
      'Accessible Figma UI Specs (WCAG AAA Compliant)',
      'Clinical SaaS Dashboard Framework',
      'Interactive Patient Timeline & Diagnostic Charts',
      'Dense Data Table Engine with Filtering'
    ],
    techStack: ['Figma Accessibility Specs', 'React 19', 'Tailwind CSS', 'TypeScript', 'D3 Charts'],
    wireframeNodes: [
      { label: 'Patient Vitals', x: 120, y: 70 },
      { label: 'Telemetry Stream', x: 360, y: 70 },
      { label: 'Diagnostic Matrix', x: 240, y: 190 }
    ],
    testimonial: {
      quote: 'Designing for healthcare requires flawless precision. Webiknows exceeded all FDA user interface guidelines while maintaining a sleek, modern visual aesthetic.',
      author: 'Dr. Sarah Lin',
      role: 'Chief Medical Information Officer',
      company: 'PulseHealth'
    },
    metrics: {
      conversionBefore: '12 Mins/Chart',
      conversionAfter: '3.5 Mins/Chart',
      pipelineGrowth: '240 Hospitals',
      designSpeedUp: 'Zero UX Errors'
    }
  }
];

export const SERVICES: Service[] = [
  {
    id: 'figma-design-systems',
    name: 'Figma UI/UX & Design Systems',
    tagline: 'Pixel-perfect component architecture, tokens & interactive wireframes',
    description: 'Production-ready Figma systems with variables, auto-layout 5.0, responsive grids, and dark/light theme tokens.',
    iconName: 'Figma',
    deliverables: [
      'Tokenized Color & Typography Libraries',
      'Auto-Layout Responsive Components',
      'Interactive High-Fidelity Prototypes',
      'Design-to-Code Documentation Specs'
    ],
    figmaFeatures: ['Variables & Modes', 'Component Properties', 'Auto Layout 5', 'Smart Animate'],
    techStack: ['Figma', 'Tokens Studio', 'Tailwind CSS'],
    estimatedTime: '2 - 4 Weeks',
    typicalRoi: '3.5x Design Speed'
  },
  {
    id: 'custom-crm-development',
    name: 'Custom CRM Development & Automations',
    tagline: 'Tailored pipeline engines, automated sales workflows & data synchronization',
    description: 'Bespoke CRM platforms featuring custom sales pipelines, automated deal scoring, and seamless API integrations.',
    iconName: 'LayoutGrid',
    deliverables: [
      'Kanban & List Pipeline Views',
      'Automated Lead Scoring & Workflows',
      'Revenue Forecasting Dashboards',
      'HubSpot & Stripe Bi-directional Sync'
    ],
    figmaFeatures: ['CRM Layout Grid', 'Data Density Variants', 'Drag-and-Drop States'],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Webhooks'],
    estimatedTime: '4 - 8 Weeks',
    typicalRoi: '184% Pipeline Velocity'
  },
  {
    id: 'web-saas-engineering',
    name: 'Web Application & SaaS Engineering',
    tagline: 'Lightning-fast React web apps with rich micro-animations & clean code',
    description: 'High-performance web apps built with modern React, Tailwind CSS, and sub-180ms render speeds.',
    iconName: 'Code',
    deliverables: [
      'Responsive React Frontend',
      'WCAG AA Accessible Architecture',
      'Sub-200ms Micro-Interactions',
      '95+ Lighthouse Score'
    ],
    figmaFeatures: ['Component Prop Mapping', 'Breakpoint Specs', 'State Variant Matrices'],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    estimatedTime: '4 - 10 Weeks',
    typicalRoi: '99.9% Uptime & <180ms'
  },
  {
    id: 'mobile-app-development',
    name: 'Cross-Platform Mobile Apps',
    tagline: 'Native iOS & Android app development with gesture micro-interactions',
    description: 'Responsive mobile apps featuring smooth gesture controls, haptic feedback, and offline data sync.',
    iconName: 'Smartphone',
    deliverables: [
      'iOS & Android Cross-Platform Apps',
      'Touch-Optimized Viewports',
      'Biometric Security & Offline Sync',
      'App Store & Play Store Handoff'
    ],
    figmaFeatures: ['Mobile Frame Specs', 'Gesture Animation Wireframes', 'Touch Targets'],
    techStack: ['React Native', 'Tailwind CSS', 'Framer Motion'],
    estimatedTime: '6 - 10 Weeks',
    typicalRoi: '4.9 Star Rating'
  },
  {
    id: 'custom-software-engineering',
    name: 'Enterprise Custom Software',
    tagline: 'Scalable backend architectures, API integrations & secure databases',
    description: 'When standard software reaches its limits, we engineer bespoke software solutions tailored precisely to your operational requirements, data pipelines, and security standards.',
    iconName: 'Cpu',
    deliverables: [
      'Modular REST & WebSockets Backend Architecture',
      'PostgreSQL / Relational Data Schema Design',
      'Role-Based Access Control (RBAC) & OAuth Sync',
      'Comprehensive Technical Documentation & Source Code'
    ],
    figmaFeatures: ['Data Schema Maps', 'System Flow Wireframes', 'Role Access Visual Matrix'],
    techStack: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'Redis'],
    estimatedTime: '6 - 12 Weeks',
    typicalRoi: '60% Operational Expense Reduction'
  },
  {
    id: 'micro-interactions-prototyping',
    name: 'Interactive Prototyping & Motion Design',
    tagline: 'High-converting micro-animations, interactive state transitions & feedback loops',
    description: 'Static designs don’t convert like feel-good interactive interfaces. We prototype fluid hover states, subtle card tilts, state feedback, and transition curves that elevate brand quality.',
    iconName: 'Sparkles',
    deliverables: [
      'Figma Smart-Animate Interactive Prototypes',
      'CSS & Motion React Animation Code Snippets',
      'Interaction Latency & Micro-Feedback Guidelines',
      'User Testing Interactive Clickable Sandbox'
    ],
    figmaFeatures: ['Smart Animate Timings', 'Custom Easing Curves', 'Interactive Hover Components'],
    techStack: ['Motion (Framer)', 'CSS Keyframes', 'Figma Prototype Engine'],
    estimatedTime: '1 - 3 Weeks',
    typicalRoi: '42% User Engagement Increase'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ajit-tambde',
    name: 'Ajit Tambde',
    role: 'Founder & CEO',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    location: 'Mumbai, India'
  },
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'Lead Custom CRM & Full-Stack Architect',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    location: 'London, UK'
  },
  {
    id: 'marcus-reyes',
    name: 'Marcus Reyes',
    role: 'Head of Webiknows Cloud & Mobile Engineering',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    location: 'Mumbai, India'
  },
  {
    id: 'elena-novak',
    name: 'Elena Novak',
    role: 'Senior Figma Design Systems Lead',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    location: 'San Francisco, CA'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'figma-variables-2026',
    title: 'Mastering Figma Variables & Modes for Multi-Theme React Apps',
    excerpt: 'Learn how to construct single-source-of-truth Figma tokens that map directly into Tailwind CSS v4 variables for dark and light mode switching.',
    content: `When building modern digital products, dark and light mode should never be an afterthought. In this deep dive, we explore how Webiknows IT Solutions builds tokenized Figma libraries where colors, radii, and semantic spacing automatically translate into clean code.

### Step 1: Defining Semantic Tokens in Figma
Instead of hardcoding colors like "#881337" across 400 frames, define primitive variables first:
- \`primitive/rose-900\` -> \`#881337\`
- \`primitive/slate-950\` -> \`#080808\`
- \`primitive/white\` -> \`#FFFFFF\`

Then create semantic tokens with Dark and Light Mode collections:
- \`color/surface/background\` -> (Light: \`#FFFFFF\`, Dark: \`#080808\`)
- \`color/text/primary\` -> (Light: \`#0A0A0A\`, Dark: \`#FFFFFF\`)
- \`color/brand/accent\` -> (Light: \`#881337\`, Dark: \`#E11D48\`)

### Step 2: Mapping to CSS Variables
By mapping Figma Token Variables to CSS custom properties, switching themes becomes a single DOM class toggle without rewriting component styles!`,
    category: 'Figma Systems',
    readTime: '6 min read',
    date: 'Oct 10, 2026',
    author: {
      name: 'Ajit Tambde',
      role: 'Founder & CEO'
    },
    tags: ['Figma Tokens', 'Tailwind CSS', 'Dark Mode', 'Design Systems'],
    codeSnippet: {
      language: 'css',
      title: 'globals.css Token Mapping',
      code: `:root {
  --surface-bg: #ffffff;
  --text-main: #0a0a0a;
  --brand-accent: #B91C1C;
}

[data-theme='dark'] {
  --surface-bg: #080808;
  --text-main: #ffffff;
  --brand-accent: #e11d48;
}`
    }
  },
  {
    id: 'custom-crm-architecture',
    title: 'Why Off-The-Shelf CRMs Fail Growing Agencies (And How We Engineer Custom Ones)',
    excerpt: 'Off-the-shelf CRMs lock you into rigid schemas and slow interface loads. Here is how custom CRM engineering increases deal conversion by 184%.',
    content: `Most growing technology agencies start on standard SaaS CRMs. But as your team scales to handle complex custom software proposals, design sprint milestones, and custom webhooks, generic CRM tools start slowing down your sales team.

### The 3 Major Bottlenecks of Legacy CRMs
1. **Bloated UI Latency**: Loading a contact record takes 3-5 seconds because of 50 unused standard fields.
2. **Rigid Pipeline Kanban Boards**: Standard tools don't support live Figma file embeds, custom ROI calculators, or instant contract generation.
3. **High Per-Seat Licensing Costs**: Paying $150/user/month for features your team doesn't use.

### The Custom CRM Architecture
At Webiknows IT Solutions, we design custom CRM portals directly in Figma, then build lightweight React pipeline boards running on top of Node.js and PostgreSQL. Real-time updates occur via WebSockets, allowing your entire sales team to collaborate live on deal notes without refreshing the page!`,
    category: 'CRM Architecture',
    readTime: '8 min read',
    date: 'Oct 04, 2026',
    author: {
      name: 'Sarah Chen',
      role: 'Lead CRM Architect'
    },
    tags: ['Custom CRM', 'React 19', 'PostgreSQL', 'Webhooks', 'Sales Pipelines'],
    codeSnippet: {
      language: 'typescript',
      title: 'Custom Pipeline Drag State Engine',
      code: `export function usePipelineBoard(initialDeals: Deal[]) {
  const [deals, setDeals] = useState(initialDeals);

  const moveDeal = (dealId: string, newStageId: StageId) => {
    setDeals(prev => prev.map(deal => 
      deal.id === dealId ? { ...deal, stage: newStageId, updatedAt: new Date().toISOString() } : deal
    ));
    // Trigger instant backend webhook sync
    api.syncDealStage({ dealId, newStageId });
  };

  return { deals, moveDeal };
}`
    }
  },
  {
    id: 'micro-interaction-physics',
    title: 'The Math Behind 60fps Micro-Animations in React Interfaces',
    excerpt: 'How compositor-only animations, subtle hover spring curves, and instant tactile feedback double user retention.',
    content: `Micro-animations are not just visual eye candy—they provide cognitive certainty to users. When a button compresses 2px on click with an exponential spring curve, the user instantly knows their action was received before the server response even returns.

### Golden Rules of Micro-Animations
- **Keep Latency Under 200ms**: Hover states should respond within 100ms. Modal transitions settle between 180-220ms.
- **Animate Compositor Properties Only**: Stick strictly to \`transform\`, \`opacity\`, and \`filter\`. Never animate \`width\`, \`height\`, or \`top\` as they trigger costly browser layout reflows.
- **Use Natural Spring Physics**: Replace linear transitions with cubic-bezier curves like \`cubic-bezier(0.16, 1, 0.3, 1)\`.`,
    category: 'Micro-Animations',
    readTime: '5 min read',
    date: 'Sep 28, 2026',
    author: {
      name: 'Marcus Reyes',
      role: 'Principal Motion Engineer'
    },
    tags: ['Micro-Animations', 'Framer Motion', 'React', 'UX Design'],
    codeSnippet: {
      language: 'tsx',
      title: 'Sleek Button Micro-Interaction',
      code: `<button className="px-5 py-2.5 rounded-lg font-medium bg-rose-900 text-white transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-rose-900/25">
  Interactive CTA
</button>`
    }
  }
];
