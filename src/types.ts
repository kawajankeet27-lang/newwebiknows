export type Page = 'home' | 'about' | 'services' | 'casestudies' | 'team' | 'blogs' | 'contact';

export type Theme = 'dark' | 'light';

export interface PageSeoItem {
  pageId: Page;
  pageName: string;
  seoTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  keywords: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  companyName: string;
  location: string;
  comment: string;
  role?: string;
  avatarUrl?: string;
  metric?: string;
  metricLabel?: string;
  industry?: string;
  rating?: number;
  projectDelivered?: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  iconName: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: 'CRM Systems' | 'SaaS Platforms' | 'Mobile Apps' | 'Design Systems';
  industry?: string;
  imageUrl?: string;
  client: string;
  timeline: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  deliverables: string[];
  techStack: string[];
  wireframeNodes: { label: string; x: number; y: number }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  metrics: {
    conversionBefore: string;
    conversionAfter: string;
    pipelineGrowth: string;
    designSpeedUp: string;
  };
}

export interface Service {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  deliverables: string[];
  figmaFeatures: string[];
  techStack: string[];
  estimatedTime: string;
  typicalRoi: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  location: string;
  bio?: string;
  expertise?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Figma Systems' | 'CRM Architecture' | 'Micro-Animations' | 'Engineering';
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
  };
  tags: string[];
  codeSnippet?: {
    language: string;
    title: string;
    code: string;
  };
}

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  budget?: string;
  message: string;
  status: 'New' | 'In Discussion' | 'Qualified' | 'Closed';
  createdAt: string;
  notes?: string;
  notificationSent?: boolean;
}

export interface MeetingRequestItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  date: string;
  slot: string;
  topic?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
  notes?: string;
  notificationSent?: boolean;
}

export interface MeetingSlotItem {
  id: string;
  timeString: string;
  label: string;
  active: boolean;
}

export interface AiConsultantFaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface AiConsultantLeadItem {
  id: string;
  name: string;
  mobile: string;
  email: string;
  service: string;
  createdAt: string;
  status: 'New' | 'In Discussion' | 'Contacted' | 'Closed';
  notes?: string;
  notificationSent?: boolean;
}

export interface SiteFaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SocialMediaLinkItem {
  id: string;
  platform: string;
  url: string;
  iconName: string;
  enabled: boolean;
}

export interface OfficeLocationItem {
  id: string;
  name: string;
  division: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  timezone: string;
  isHq?: boolean;
  active: boolean;
}

