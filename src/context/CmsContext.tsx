import React, { createContext, useContext, useState, useEffect } from 'react';
import { BlogPost, TeamMember, CaseStudy, Service, TestimonialItem, WhyChooseUsItem, LeadItem, MeetingRequestItem, MeetingSlotItem, AiConsultantFaqItem, AiConsultantLeadItem, SiteFaqItem, SocialMediaLinkItem, Page, PageSeoItem, OfficeLocationItem } from '../types';
import { CASE_STUDIES, SERVICES, TEAM_MEMBERS } from '../data/agencyData';

export interface CmsState {
  isAdminLoggedIn: boolean;
  pageVisibility: Record<Page, boolean>;
  sectionVisibility: {
    hero: boolean;
    marquee: boolean;
    clientLogos: boolean;
    whyChooseUs: boolean;
    services: boolean;
    caseStudies: boolean;
    testimonials: boolean;
    blogs: boolean;
    faq: boolean;
  };
  services: Service[];
  caseStudies: CaseStudy[];
  testimonials: TestimonialItem[];
  whyChooseUs: WhyChooseUsItem[];
  team: TeamMember[];
  blogs: BlogPost[];
  leads: LeadItem[];
  meetingRequests: MeetingRequestItem[];
  meetingSlots: MeetingSlotItem[];
  aiFaqs: AiConsultantFaqItem[];
  aiLeads: AiConsultantLeadItem[];
  siteFaqs: SiteFaqItem[];
  socialLinks: SocialMediaLinkItem[];
  officeLocations: OfficeLocationItem[];
  aiConsultantEmail: string;
  adminNotificationEmail: string;
  pageSeoSettings: Record<Page, PageSeoItem>;
  siteMetadata: {
    agencyName: string;
    tagline: string;
    heroHeadline: string;
    heroSubtitle: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    whatsappNumber: string;
    whatsappUrl: string;
  };
}

interface CmsContextType extends CmsState {
  login: (pass: string) => boolean;
  logout: () => void;
  togglePage: (page: Page) => void;
  toggleSection: (sectionKey: keyof CmsState['sectionVisibility']) => void;

  // CRUD for Services
  addService: (service: Service) => void;
  updateService: (service: Service) => void;
  deleteService: (id: string) => void;

  // CRUD for Case Studies
  addCaseStudy: (study: CaseStudy) => void;
  updateCaseStudy: (study: CaseStudy) => void;
  deleteCaseStudy: (id: string) => void;

  // CRUD for Testimonials
  addTestimonial: (item: TestimonialItem) => void;
  updateTestimonial: (item: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;

  // CRUD for Why Choose Us
  addWhyChooseUs: (item: WhyChooseUsItem) => void;
  updateWhyChooseUs: (item: WhyChooseUsItem) => void;
  deleteWhyChooseUs: (id: string) => void;

  // CRUD for Team Members
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (id: string) => void;

  // CRUD for Blogs
  addBlog: (blog: BlogPost) => void;
  updateBlog: (blog: BlogPost) => void;
  deleteBlog: (id: string) => void;

  // CRUD for Leads Received
  addLead: (leadInput: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => void;
  updateLead: (lead: LeadItem) => void;
  deleteLead: (id: string) => void;

  // CRUD for Meeting Schedule Requests
  addMeetingRequest: (meetingInput: Omit<MeetingRequestItem, 'id' | 'createdAt' | 'status'>) => void;
  updateMeetingRequest: (meeting: MeetingRequestItem) => void;
  deleteMeetingRequest: (id: string) => void;

  // CRUD for Meeting Schedule Time Slots
  addMeetingSlot: (slot: MeetingSlotItem) => void;
  updateMeetingSlot: (slot: MeetingSlotItem) => void;
  deleteMeetingSlot: (id: string) => void;
  toggleMeetingSlot: (id: string) => void;

  // CRUD for Social Media Links
  addSocialLink: (link: SocialMediaLinkItem) => void;
  updateSocialLink: (link: SocialMediaLinkItem) => void;
  deleteSocialLink: (id: string) => void;
  toggleSocialLink: (id: string) => void;

  // CRUD for Website FAQs
  addSiteFaq: (faq: SiteFaqItem) => void;
  updateSiteFaq: (faq: SiteFaqItem) => void;
  deleteSiteFaq: (id: string) => void;

  // CRUD for AI Consultant Q&A
  addAiFaq: (faq: AiConsultantFaqItem) => void;
  updateAiFaq: (faq: AiConsultantFaqItem) => void;
  deleteAiFaq: (id: string) => void;

  // CRUD for AI Consultant Form Leads
  addAiLead: (leadInput: Omit<AiConsultantLeadItem, 'id' | 'createdAt' | 'status'>) => void;
  updateAiLead: (lead: AiConsultantLeadItem) => void;
  deleteAiLead: (id: string) => void;

  // AI Consultant Email Setting
  updateAiConsultantEmail: (email: string) => void;

  // Notification Email Setting
  updateNotificationEmail: (email: string) => void;

  // CRUD for Office Locations / Global Hubs
  addOfficeLocation: (office: OfficeLocationItem) => void;
  updateOfficeLocation: (office: OfficeLocationItem) => void;
  deleteOfficeLocation: (id: string) => void;
  toggleOfficeLocation: (id: string) => void;

  // Site Metadata & SEO
  updateMetadata: (metadata: Partial<CmsState['siteMetadata']>) => void;
  updatePageSeo: (pageId: Page, seo: Partial<PageSeoItem>) => void;
  resetToDefaults: () => void;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Marcus Vance',
    companyName: 'Aura Global Tech',
    location: 'San Francisco, USA',
    comment: 'Webiknows turned our cluttered sales process into an ultra-sleek, lightning-fast CRM. Our sales velocity increased by 184% within the first quarter of deployment.'
  },
  {
    id: '2',
    name: 'Elena Rostova',
    companyName: 'Nexus Cloud Infrastructure',
    location: 'London, UK',
    comment: 'The tokenized Figma design system created by Webiknows completely synchronized our product designers and frontend developers into one seamless workflow.'
  },
  {
    id: '3',
    name: 'Siddharth Patel',
    companyName: 'OmniPay Financial',
    location: 'Mumbai, India',
    comment: 'Webiknows delivered a world-class fintech mobile app experience. The gesture micro-animations and zero-latency transactions make our banking platform feel effortlessly premium.'
  },
  {
    id: '4',
    name: 'Dr. Sarah Lin',
    companyName: 'PulseHealth Analytics',
    location: 'Singapore',
    comment: 'Designing for healthcare requires flawless precision. Webiknows exceeded all FDA user interface guidelines while maintaining a sleek, modern visual aesthetic.'
  },
  {
    id: '5',
    name: 'Ajay Kulkarni',
    companyName: 'Apex E-Commerce Solutions',
    location: 'Bengaluru, India',
    comment: 'Their engineering team built a custom Webiknows Cloud engine that handled our holiday flash sale traffic of over 500,000 concurrent buyers without a single hitch.'
  },
  {
    id: '6',
    name: 'Kenji Takahashi',
    companyName: 'Tokyo Tech Labs',
    location: 'Tokyo, Japan',
    comment: '100% code ownership, zero design debt, and transparent daily communication. Working with Webiknows has been our best IT engineering partnership to date.'
  }
];

const DEFAULT_WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    id: '1',
    title: '100% In-House Senior Engineering',
    tag: 'Zero Outsourcing',
    description: 'Zero third-party outsourcing. Our dedicated software architects build your custom web apps, mobile solutions, and CRM engines with 100% IP ownership.',
    iconName: 'ShieldCheck'
  },
  {
    id: '2',
    title: 'Figma-to-Code Zero Drift Guarantee',
    tag: 'Automated Tokens',
    description: 'We synchronize Figma Variables directly into production React & Tailwind CSS custom properties, ensuring 1:1 pixel fidelity without UI design debt.',
    iconName: 'Layers'
  },
  {
    id: '3',
    title: 'Sub-180ms High-Velocity Performance',
    tag: '<180ms Latency',
    description: 'Compositor-only animations, lightweight React 19 bundles, and optimized PostgreSQL database schemas guarantee sub-180ms UI render budgets.',
    iconName: 'Zap'
  },
  {
    id: '4',
    title: 'ISO 27001 Security & 24/7 SLA Support',
    tag: '99.9% Uptime SLA',
    description: 'Enterprise-grade encryption, role-based security audits, and dedicated Slack/Teams communication channels with your lead architect.',
    iconName: 'Clock'
  }
];

const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: 'figma-to-code-tokens',
    title: 'Bridging Figma Design Systems to React & Tailwind CSS v4',
    excerpt: 'How our engineering team automated design token synchronization from Figma Variables directly into production code.',
    content: 'Design systems often drift away from production code within months. By utilizing Figma REST API and custom token transformers, we guarantee zero drift between design variables and React styling tokens...',
    category: 'Figma Systems',
    readTime: '6 min read',
    date: 'Oct 12, 2026',
    author: { name: 'Alex Vance', role: 'Head of Figma Product Systems' },
    tags: ['Figma', 'React', 'Tailwind', 'Tokens']
  },
  {
    id: 'scaling-crm-pipelines',
    title: 'Architecting High-Velocity Custom CRM Pipelines with Sub-180ms Latency',
    excerpt: 'Why off-the-shelf CRMs fail fast-growing enterprise sales teams and how custom React pipelines solve it.',
    content: 'When sales pipelines grow past 50,000 active deals, standard SaaS CRM interfaces slow down and hinder closing velocity. Here is how we engineer optimized drag-and-drop Kanban boards with real-time webhooks...',
    category: 'CRM Architecture',
    readTime: '8 min read',
    date: 'Sep 28, 2026',
    author: { name: 'Sarah Chen', role: 'Lead Custom CRM Architect' },
    tags: ['CRM', 'Node.js', 'PostgreSQL', 'Performance']
  },
  {
    id: 'micro-interactions-conversion',
    title: 'The Psychological Impact of Micro-Interactions on SaaS Conversion Rates',
    excerpt: 'Subtle spring animations, sound cues, and haptic feedback can increase user engagement by up to 42%.',
    content: 'Users judge web applications within 50 milliseconds of landing. Smooth page transitions, magnetic buttons, and responsive state indicators make software feel alive and premium...',
    category: 'Micro-Animations',
    readTime: '5 min read',
    date: 'Sep 14, 2026',
    author: { name: 'Elena Novak', role: 'Senior UX Researcher' },
    tags: ['UX', 'Framer Motion', 'Micro-Animations']
  }
];

const DEFAULT_LEADS: LeadItem[] = [
  {
    id: 'lead-101',
    name: 'Ananya Sharma',
    email: 'ananya@techcorp.in',
    phone: '+91 98200 12345',
    company: 'TechCorp India',
    budget: '₹50,000 - ₹100,000',
    message: 'Looking for a custom CRM pipeline with automated deal scoring and WhatsApp API integration.',
    status: 'New',
    createdAt: 'Oct 13, 2026 14:30',
    notes: 'Initial inquiry received from website contact form.',
    notificationSent: true
  },
  {
    id: 'lead-102',
    name: 'David Miller',
    email: 'd.miller@finflow.com',
    phone: '+1 (415) 890-1234',
    company: 'FinFlow Systems',
    budget: '₹100,000+',
    message: 'Need a Figma tokenized design system converted into React 19 + Tailwind CSS v4 code with WCAG AAA accessibility.',
    status: 'In Discussion',
    createdAt: 'Oct 12, 2026 09:15',
    notes: 'Proposal sent. Awaiting engineering scope confirmation.',
    notificationSent: true
  },
  {
    id: 'lead-103',
    name: 'Rajesh Kulkarni',
    email: 'rajesh@apexecom.com',
    phone: '+91 91670 99887',
    company: 'Apex E-Commerce',
    budget: '₹25,000 - ₹50,000',
    message: 'We require high-velocity page performance optimization for our flash sale portal with sub-180ms latency.',
    status: 'Qualified',
    createdAt: 'Oct 11, 2026 18:45',
    notes: 'Lead qualified by technical team.',
    notificationSent: true
  }
];

const DEFAULT_MEETING_REQUESTS: MeetingRequestItem[] = [
  {
    id: 'meet-201',
    name: 'Vikram Mehta',
    email: 'v.mehta@nexusgroup.com',
    phone: '+91 98111 22334',
    company: 'Nexus Group',
    date: '2026-10-16',
    slot: '10:30 AM IST',
    topic: 'Custom Cloud Infrastructure & Figma System Handoff',
    status: 'Pending',
    createdAt: 'Oct 13, 2026 16:00',
    notes: 'Requested senior architect to demonstrate Figma tokens.',
    notificationSent: true
  },
  {
    id: 'meet-202',
    name: 'Sarah Jenkins',
    email: 'sarah@luminahealth.io',
    phone: '+1 (650) 445-9981',
    company: 'Lumina Health',
    date: '2026-10-18',
    slot: '03:30 PM IST',
    topic: 'HIPAA Compliant Healthcare SaaS Web App & UI Audit',
    status: 'Confirmed',
    createdAt: 'Oct 12, 2026 11:20',
    notes: 'Calendar invite sent.',
    notificationSent: true
  }
];

const DEFAULT_AI_FAQS: AiConsultantFaqItem[] = [
  {
    id: 'ai-faq-1',
    question: 'How much does a custom CRM pipeline engine cost?',
    answer: 'Our custom CRM engines typically range from ₹50,000 for standard workflow automation to ₹3,50,000+ for enterprise multi-tier architecture with bi-directional webhooks and custom analytics.',
    category: 'Pricing & Budget'
  },
  {
    id: 'ai-faq-2',
    question: 'What is your typical project turnaround time?',
    answer: 'Standard projects take between 3 to 8 weeks from initial Figma tokens and wireframes to production cloud deployment, with express 2-week rapid sprint options available.',
    category: 'Timeline'
  },
  {
    id: 'ai-faq-3',
    question: 'Do you design Figma token systems and design libraries?',
    answer: 'Yes! We build pristine Figma design systems with auto-layout variables and token synchronization that export directly into production-ready React & Tailwind CSS components.',
    category: 'Design Systems'
  },
  {
    id: 'ai-faq-4',
    question: 'Can you integrate AI and automated workflows into our existing apps?',
    answer: 'Absolutely. We seamlessly integrate Gemini AI models, automated email dispatchers, payment gateways, and real-time webhook pipelines into any web or mobile stack.',
    category: 'AI & Automations'
  }
];

const DEFAULT_AI_LEADS: AiConsultantLeadItem[] = [
  {
    id: 'ai-lead-101',
    name: 'Rajesh Kumar',
    mobile: '+91 98765 43210',
    email: 'rajesh.kumar@fintech.in',
    service: 'CRM & Pipeline Automation',
    createdAt: 'Oct 13, 2026 18:20',
    status: 'New',
    notes: 'Inquired during evening consultation session. Interested in migrating from Salesforce.',
    notificationSent: true
  },
  {
    id: 'ai-lead-102',
    name: 'Sophia Chen',
    mobile: '+1 (415) 555-0192',
    email: 'sophia@nexusdesign.io',
    service: 'Figma Design System',
    createdAt: 'Oct 12, 2026 14:10',
    status: 'Contacted',
    notes: 'Looking for dark/light mode token library export.',
    notificationSent: true
  }
];


const DEFAULT_SITE_FAQS: SiteFaqItem[] = [
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


const DEFAULT_SOCIAL_LINKS: SocialMediaLinkItem[] = [
  { id: 'soc-1', platform: 'LinkedIn', url: 'https://linkedin.com/company/webiknows', iconName: 'Linkedin', enabled: true },
  { id: 'soc-2', platform: 'Twitter / X', url: 'https://x.com/webiknows', iconName: 'Twitter', enabled: true },
  { id: 'soc-3', platform: 'GitHub', url: 'https://github.com/webiknows', iconName: 'Github', enabled: true },
  { id: 'soc-4', platform: 'Instagram', url: 'https://instagram.com/webiknows', iconName: 'Instagram', enabled: true },
  { id: 'soc-5', platform: 'YouTube', url: 'https://youtube.com/@webiknows', iconName: 'Youtube', enabled: true },
  { id: 'soc-6', platform: 'Facebook', url: 'https://facebook.com/webiknows', iconName: 'Facebook', enabled: false },
  { id: 'soc-7', platform: 'WhatsApp', url: 'https://wa.me/919820012345', iconName: 'WhatsApp', enabled: true }
];

export const DEFAULT_OFFICE_LOCATIONS: OfficeLocationItem[] = [
  {
    id: 'office-1',
    name: 'Mumbai Global Headquarters',
    division: 'Webiknows IT Solutions (HQ)',
    city: 'Mumbai, India',
    address: 'Tech City, Powai IT Corridor, Mumbai, Maharashtra 400076, India',
    phone: '+91 98765 43210',
    email: 'contact@webiknows.com',
    timezone: 'Asia/Kolkata',
    isHq: true,
    active: true
  },
  {
    id: 'office-2',
    name: 'London Operations & Design Studio',
    division: 'Global Client Operations & UX Strategy',
    city: 'London, UK',
    address: '30 St Mary Axe, City of London, EC3A 8EP, United Kingdom',
    phone: '+44 20 7946 0912',
    email: 'london@webiknows.com',
    timezone: 'Europe/London',
    isHq: false,
    active: true
  },
  {
    id: 'office-3',
    name: 'San Francisco Engineering Lab',
    division: 'Cloud Division & Custom CRM Architecture',
    city: 'San Francisco, CA',
    address: '500 Howard Street, SoMa, San Francisco, CA 94105, USA',
    phone: '+1 (415) 890-4421',
    email: 'sf@webiknows.com',
    timezone: 'America/Los_Angeles',
    isHq: false,
    active: true
  }
];

export const DEFAULT_MEETING_SLOTS: MeetingSlotItem[] = [
  { id: 'slot-1', timeString: '09:00 AM IST', label: 'Early Morning Strategy Slot', active: true },
  { id: 'slot-2', timeString: '10:30 AM IST', label: 'Morning Architecture Consultation', active: true },
  { id: 'slot-3', timeString: '01:00 PM IST', label: 'Afternoon Product Review', active: true },
  { id: 'slot-4', timeString: '03:30 PM IST', label: 'Late Afternoon Engineering Sync', active: true },
  { id: 'slot-5', timeString: '05:00 PM IST', label: 'Evening Closing Session', active: true }
];


const DEFAULT_PAGE_SEO: Record<Page, PageSeoItem> = {
  home: {
    pageId: 'home',
    pageName: 'Home',
    seoTitle: 'Webiknows IT Solutions | Custom Software, CRM & Figma-to-Code Systems',
    metaDescription: 'All-in-one IT solution and technology company delivering custom software, Figma design systems, web development, mobile apps, CRM systems, and cloud infrastructure.',
    ogTitle: 'Webiknows IT Solutions - Enterprise Software & Figma-to-Code Systems',
    ogDescription: 'Accelerate your digital growth with our custom CRM pipelines, high-velocity web apps, and 100% token-synchronized Figma systems.',
    ogImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    keywords: 'custom software development, CRM engineering, Figma to code, web development, mobile apps, SaaS platforms'
  },
  about: {
    pageId: 'about',
    pageName: 'About Us',
    seoTitle: 'About Webiknows | Expert Software Engineers & Figma Specialists',
    metaDescription: 'Learn about our Figma-first engineering methodology, our mission, vision, core philosophy, and expert team of senior software architects.',
    ogTitle: 'About Webiknows - World-Class Software Engineering Team',
    ogDescription: 'Discover our 100% in-house senior engineering team dedicated to zero technical debt and sub-180ms performance.',
    ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
    keywords: 'about webiknows, software engineering company, senior developers, figma design systems'
  },
  services: {
    pageId: 'services',
    pageName: 'Services',
    seoTitle: 'Our Services | Custom CRM, SaaS & Mobile Apps | Webiknows',
    metaDescription: 'Professional IT services including Custom CRM, SaaS Platforms, Mobile App Development, UI/UX Design Systems, and Cloud Architecture.',
    ogTitle: 'IT & Software Development Services - Webiknows',
    ogDescription: 'Explore our enterprise-grade engineering services designed to scale your business with lightning-fast velocity.',
    ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    keywords: 'custom crm development, saas platform engineering, mobile apps, ui/ux design, cloud architecture'
  },
  casestudies: {
    pageId: 'casestudies',
    pageName: 'Case Studies',
    seoTitle: 'Case Studies & Success Stories | Webiknows IT Solutions',
    metaDescription: 'Explore our proven track record of delivering high-velocity software, custom CRMs, and tokenized design systems for global clients.',
    ogTitle: 'Case Studies & Success Stories - Webiknows',
    ogDescription: 'See how we helped enterprises and high-growth startups achieve 3.4x velocity and zero technical debt.',
    ogImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
    keywords: 'case studies, client success stories, software case studies, webiknows portfolio'
  },
  team: {
    pageId: 'team',
    pageName: 'Meet the Team',
    seoTitle: 'Meet Our Expert Software Architects & Engineers | Webiknows',
    metaDescription: 'Meet the brilliant minds behind Webiknows: senior software architects, Figma design system experts, and cloud engineers.',
    ogTitle: 'Our Expert Team - Webiknows IT Solutions',
    ogDescription: 'Get to know our senior in-house engineering team committed to uncompromising quality and zero outsourcing.',
    ogImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
    keywords: 'leadership team, software architects, engineering experts, webiknows team'
  },
  blogs: {
    pageId: 'blogs',
    pageName: 'Blogs & Insights',
    seoTitle: 'Tech Blogs & Insights on Figma, CRM & SaaS | Webiknows',
    metaDescription: 'Read our latest expert insights on Figma-to-code design tokens, high-velocity CRM architecture, and SaaS performance optimization.',
    ogTitle: 'Tech Insights & Articles - Webiknows',
    ogDescription: 'Deep dives into modern frontend development, React 19, Tailwind CSS v4, and scalable backend engineering.',
    ogImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200',
    keywords: 'tech blogs, engineering articles, figma design tokens, crm architecture, react 19'
  },
  contact: {
    pageId: 'contact',
    pageName: 'Contact Us',
    seoTitle: 'Contact Webiknows | Schedule a Strategy Session with Our Architects',
    metaDescription: 'Get in touch with Webiknows IT Solutions. Schedule a consultation or send us an inquiry for your custom software project.',
    ogTitle: 'Contact Us - Webiknows IT Solutions',
    ogDescription: 'Reach out to our engineering team today and start accelerating your digital products.',
    ogImage: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=1200',
    keywords: 'contact webiknows, hire software engineers, schedule consultation, IT agency contact'
  }
};

const STORAGE_KEY = 'webiknows_agency_cms_state_v6';



const defaultCmsState: CmsState = {
  isAdminLoggedIn: false,
  pageVisibility: {
    home: true,
    about: true,
    services: true,
    casestudies: true,
    team: true,
    blogs: true,
    contact: true
  },
  sectionVisibility: {
    hero: true,
    marquee: false,
    clientLogos: true,
    whyChooseUs: true,
    services: true,
    caseStudies: true,
    testimonials: true,
    blogs: true,
    faq: true
  },
  services: SERVICES,
  caseStudies: CASE_STUDIES,
  testimonials: DEFAULT_TESTIMONIALS,
  whyChooseUs: DEFAULT_WHY_CHOOSE_US,
  team: TEAM_MEMBERS,
  blogs: DEFAULT_BLOGS,
  leads: DEFAULT_LEADS,
  meetingRequests: DEFAULT_MEETING_REQUESTS,
  meetingSlots: DEFAULT_MEETING_SLOTS,
  aiFaqs: DEFAULT_AI_FAQS,
  aiLeads: DEFAULT_AI_LEADS,
  siteFaqs: DEFAULT_SITE_FAQS,
  socialLinks: DEFAULT_SOCIAL_LINKS,
  officeLocations: DEFAULT_OFFICE_LOCATIONS,
  aiConsultantEmail: 'consultant@webiknows.com',
  adminNotificationEmail: 'admin@webiknows.com',
  pageSeoSettings: DEFAULT_PAGE_SEO,
  siteMetadata: {
    agencyName: 'WEBIKNOWS.',
    tagline: 'All In One IT Solution & Technology Company',
    heroHeadline: 'Transforming Ideas into High-Impact Custom Software, Figma Systems & Cloud Engines.',
    heroSubtitle: 'Webiknows IT Solutions Pvt. Ltd. delivers bespoke web applications, mobile apps, custom CRM engines, and cloud infrastructure engineered for maximum velocity.',
    contactEmail: 'contact@webiknows.com',
    contactPhone: '+91 98765 43210',
    address: 'Mumbai, India · Global Remote Engineering Hubs',
    whatsappNumber: '+91 98200 12345',
    whatsappUrl: 'https://wa.me/919820012345?text=Hello%20Webiknows%2C%20I%20would%20like%20to%20discuss%20a%20project.'
  }
};

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CmsState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { 
          ...defaultCmsState, 
          ...parsed, 
          officeLocations: parsed.officeLocations && parsed.officeLocations.length > 0 
            ? parsed.officeLocations 
            : DEFAULT_OFFICE_LOCATIONS,
          meetingSlots: parsed.meetingSlots && parsed.meetingSlots.length > 0
            ? parsed.meetingSlots
            : DEFAULT_MEETING_SLOTS,
          isAdminLoggedIn: false 
        };
      }
    } catch (e) {
      console.error('Failed to load CMS state from localStorage', e);
    }
    return defaultCmsState;
  });

  useEffect(() => {
    try {
      const { isAdminLoggedIn, ...persisted } = state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
    } catch (e) {
      console.error('Failed to save CMS state to localStorage', e);
    }
  }, [state]);

  const login = (pass: string) => {
    if (pass === 'agency2026' || pass === 'admin' || pass === 'webiknows') {
      setState(prev => ({ ...prev, isAdminLoggedIn: true }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setState(prev => ({ ...prev, isAdminLoggedIn: false }));
  };

  const togglePage = (page: Page) => {
    setState(prev => ({
      ...prev,
      pageVisibility: {
        ...prev.pageVisibility,
        [page]: !prev.pageVisibility[page]
      }
    }));
  };

  const toggleSection = (sectionKey: keyof CmsState['sectionVisibility']) => {
    setState(prev => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [sectionKey]: !prev.sectionVisibility[sectionKey]
      }
    }));
  };

  // Services CRUD
  const addService = (service: Service) => {
    setState(prev => ({ ...prev, services: [service, ...prev.services] }));
  };

  const updateService = (service: Service) => {
    setState(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === service.id ? service : s)
    }));
  };

  const deleteService = (id: string) => {
    setState(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }));
  };

  // Case Studies CRUD
  const addCaseStudy = (study: CaseStudy) => {
    setState(prev => ({ ...prev, caseStudies: [study, ...prev.caseStudies] }));
  };

  const updateCaseStudy = (study: CaseStudy) => {
    setState(prev => ({
      ...prev,
      caseStudies: prev.caseStudies.map(cs => cs.id === study.id ? study : cs)
    }));
  };

  const deleteCaseStudy = (id: string) => {
    setState(prev => ({ ...prev, caseStudies: prev.caseStudies.filter(cs => cs.id !== id) }));
  };

  // Testimonials CRUD
  const addTestimonial = (item: TestimonialItem) => {
    setState(prev => ({ ...prev, testimonials: [item, ...prev.testimonials] }));
  };

  const updateTestimonial = (item: TestimonialItem) => {
    setState(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => t.id === item.id ? item : t)
    }));
  };

  const deleteTestimonial = (id: string) => {
    setState(prev => ({ ...prev, testimonials: prev.testimonials.filter(t => t.id !== id) }));
  };

  // Why Choose Us CRUD
  const addWhyChooseUs = (item: WhyChooseUsItem) => {
    setState(prev => ({ ...prev, whyChooseUs: [item, ...prev.whyChooseUs] }));
  };

  const updateWhyChooseUs = (item: WhyChooseUsItem) => {
    setState(prev => ({
      ...prev,
      whyChooseUs: prev.whyChooseUs.map(w => w.id === item.id ? item : w)
    }));
  };

  const deleteWhyChooseUs = (id: string) => {
    setState(prev => ({ ...prev, whyChooseUs: prev.whyChooseUs.filter(w => w.id !== id) }));
  };

  // Team Members CRUD
  const addTeamMember = (member: TeamMember) => {
    setState(prev => ({ ...prev, team: [member, ...prev.team] }));
  };

  const updateTeamMember = (member: TeamMember) => {
    setState(prev => ({
      ...prev,
      team: prev.team.map(m => m.id === member.id ? member : m)
    }));
  };

  const deleteTeamMember = (id: string) => {
    setState(prev => ({ ...prev, team: prev.team.filter(m => m.id !== id) }));
  };

  // Blogs CRUD
  const addBlog = (blog: BlogPost) => {
    setState(prev => ({ ...prev, blogs: [blog, ...prev.blogs] }));
  };

  const updateBlog = (blog: BlogPost) => {
    setState(prev => ({
      ...prev,
      blogs: prev.blogs.map(b => b.id === blog.id ? blog : b)
    }));
  };

  const deleteBlog = (id: string) => {
    setState(prev => ({ ...prev, blogs: prev.blogs.filter(b => b.id !== id) }));
  };

  // Leads Received CRUD
  const addLead = (leadInput: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => {
    const newLead: LeadItem = {
      ...leadInput,
      id: 'lead-' + Date.now(),
      status: 'New',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      notificationSent: true
    };
    setState(prev => ({ ...prev, leads: [newLead, ...prev.leads] }));
  };

  const updateLead = (updatedLead: LeadItem) => {
    setState(prev => ({
      ...prev,
      leads: prev.leads.map(l => l.id === updatedLead.id ? updatedLead : l)
    }));
  };

  const deleteLead = (id: string) => {
    setState(prev => ({ ...prev, leads: prev.leads.filter(l => l.id !== id) }));
  };

  // Meeting Schedule Requests CRUD
  const addMeetingRequest = (meetingInput: Omit<MeetingRequestItem, 'id' | 'createdAt' | 'status'>) => {
    const newMeeting: MeetingRequestItem = {
      ...meetingInput,
      id: 'meet-' + Date.now(),
      status: 'Pending',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      notificationSent: true
    };
    setState(prev => ({ ...prev, meetingRequests: [newMeeting, ...prev.meetingRequests] }));
  };

  const updateMeetingRequest = (updatedMeeting: MeetingRequestItem) => {
    setState(prev => ({
      ...prev,
      meetingRequests: prev.meetingRequests.map(m => m.id === updatedMeeting.id ? updatedMeeting : m)
    }));
  };

  const deleteMeetingRequest = (id: string) => {
    setState(prev => ({ ...prev, meetingRequests: prev.meetingRequests.filter(m => m.id !== id) }));
  };


  // Social Media Links CRUD
  const addSocialLink = (link: SocialMediaLinkItem) => {
    setState(prev => ({ ...prev, socialLinks: [link, ...(prev.socialLinks || [])] }));
  };

  const updateSocialLink = (updatedLink: SocialMediaLinkItem) => {
    setState(prev => ({
      ...prev,
      socialLinks: (prev.socialLinks || []).map(l => l.id === updatedLink.id ? updatedLink : l)
    }));
  };

  const deleteSocialLink = (id: string) => {
    setState(prev => ({ ...prev, socialLinks: (prev.socialLinks || []).filter(l => l.id !== id) }));
  };

  const toggleSocialLink = (id: string) => {
    setState(prev => ({
      ...prev,
      socialLinks: (prev.socialLinks || []).map(l => l.id === id ? { ...l, enabled: !l.enabled } : l)
    }));
  };

  // Website FAQ CRUD
  const addSiteFaq = (faq: SiteFaqItem) => {
    setState(prev => ({ ...prev, siteFaqs: [faq, ...(prev.siteFaqs || [])] }));
  };

  const updateSiteFaq = (updatedFaq: SiteFaqItem) => {
    setState(prev => ({
      ...prev,
      siteFaqs: (prev.siteFaqs || []).map(f => f.id === updatedFaq.id ? updatedFaq : f)
    }));
  };

  const deleteSiteFaq = (id: string) => {
    setState(prev => ({ ...prev, siteFaqs: (prev.siteFaqs || []).filter(f => f.id !== id) }));
  };

  // AI Consultant FAQ CRUD

  const addAiFaq = (faq: AiConsultantFaqItem) => {
    setState(prev => ({ ...prev, aiFaqs: [faq, ...prev.aiFaqs] }));
  };

  const updateAiFaq = (updatedFaq: AiConsultantFaqItem) => {
    setState(prev => ({
      ...prev,
      aiFaqs: prev.aiFaqs.map(f => f.id === updatedFaq.id ? updatedFaq : f)
    }));
  };

  const deleteAiFaq = (id: string) => {
    setState(prev => ({ ...prev, aiFaqs: prev.aiFaqs.filter(f => f.id !== id) }));
  };

  // AI Consultant Form Leads CRUD
  const addAiLead = (leadInput: Omit<AiConsultantLeadItem, 'id' | 'createdAt' | 'status'>) => {
    const newAiLead: AiConsultantLeadItem = {
      ...leadInput,
      id: 'ai-lead-' + Date.now(),
      status: 'New',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      notificationSent: true
    };
    setState(prev => ({ ...prev, aiLeads: [newAiLead, ...prev.aiLeads] }));
  };

  const updateAiLead = (updatedLead: AiConsultantLeadItem) => {
    setState(prev => ({
      ...prev,
      aiLeads: prev.aiLeads.map(l => l.id === updatedLead.id ? updatedLead : l)
    }));
  };

  const deleteAiLead = (id: string) => {
    setState(prev => ({ ...prev, aiLeads: prev.aiLeads.filter(l => l.id !== id) }));
  };

  const updateAiConsultantEmail = (email: string) => {
    setState(prev => ({ ...prev, aiConsultantEmail: email }));
  };

  // Notification Email Setting
  const updateNotificationEmail = (email: string) => {
    setState(prev => ({ ...prev, adminNotificationEmail: email }));
  };

  // Site Metadata Update
  const updateMetadata = (metadata: Partial<CmsState['siteMetadata']>) => {
    setState(prev => ({
      ...prev,
      siteMetadata: {
        ...prev.siteMetadata,
        ...metadata
      }
    }));
  };

  const updatePageSeo = (pageId: Page, seo: Partial<PageSeoItem>) => {
    setState(prev => ({
      ...prev,
      pageSeoSettings: {
        ...prev.pageSeoSettings,
        [pageId]: {
          ...prev.pageSeoSettings[pageId],
          ...seo
        }
      }
    }));
  };

  // Office Locations CRUD
  const addOfficeLocation = (office: OfficeLocationItem) => {
    setState(prev => ({
      ...prev,
      officeLocations: [office, ...(prev.officeLocations || [])]
    }));
  };

  const updateOfficeLocation = (office: OfficeLocationItem) => {
    setState(prev => ({
      ...prev,
      officeLocations: (prev.officeLocations || []).map(o => o.id === office.id ? office : o)
    }));
  };

  const deleteOfficeLocation = (id: string) => {
    setState(prev => ({
      ...prev,
      officeLocations: (prev.officeLocations || []).filter(o => o.id !== id)
    }));
  };

  const toggleOfficeLocation = (id: string) => {
    setState(prev => ({
      ...prev,
      officeLocations: (prev.officeLocations || []).map(o => o.id === id ? { ...o, active: !o.active } : o)
    }));
  };

  // Meeting Slots CRUD
  const addMeetingSlot = (slot: MeetingSlotItem) => {
    setState(prev => ({
      ...prev,
      meetingSlots: [slot, ...(prev.meetingSlots || [])]
    }));
  };

  const updateMeetingSlot = (slot: MeetingSlotItem) => {
    setState(prev => ({
      ...prev,
      meetingSlots: (prev.meetingSlots || []).map(s => s.id === slot.id ? slot : s)
    }));
  };

  const deleteMeetingSlot = (id: string) => {
    setState(prev => ({
      ...prev,
      meetingSlots: (prev.meetingSlots || []).filter(s => s.id !== id)
    }));
  };

  const toggleMeetingSlot = (id: string) => {
    setState(prev => ({
      ...prev,
      meetingSlots: (prev.meetingSlots || []).map(s => s.id === id ? { ...s, active: !s.active } : s)
    }));
  };

  const resetToDefaults = () => {
    setState(defaultCmsState);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <CmsContext.Provider value={{
      ...state,
      login,
      logout,
      togglePage,
      toggleSection,
      addService,
      updateService,
      deleteService,
      addCaseStudy,
      updateCaseStudy,
      deleteCaseStudy,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      addWhyChooseUs,
      updateWhyChooseUs,
      deleteWhyChooseUs,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
      addBlog,
      updateBlog,
      deleteBlog,
      addLead,
      updateLead,
      deleteLead,
      addMeetingRequest,
      updateMeetingRequest,
      deleteMeetingRequest,
      addMeetingSlot,
      updateMeetingSlot,
      deleteMeetingSlot,
      toggleMeetingSlot,
      addAiFaq,
      updateAiFaq,
      addSocialLink,
      updateSocialLink,
      deleteSocialLink,
      toggleSocialLink,
      addSiteFaq,
      updateSiteFaq,
      deleteSiteFaq,
      deleteAiFaq,
      addAiLead,
      updateAiLead,
      deleteAiLead,
      updateAiConsultantEmail,
      updateNotificationEmail,
      addOfficeLocation,
      updateOfficeLocation,
      deleteOfficeLocation,
      toggleOfficeLocation,
      updateMetadata,
      updatePageSeo,
      resetToDefaults
    }}>
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
