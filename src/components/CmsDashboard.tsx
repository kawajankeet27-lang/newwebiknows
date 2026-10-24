import React, { useState } from 'react';
import { useCms, CmsState } from '../context/CmsContext';
import { Theme, Page, BlogPost, TeamMember, CaseStudy, Service, TestimonialItem, WhyChooseUsItem, LeadItem, MeetingRequestItem, MeetingSlotItem, AiConsultantFaqItem, AiConsultantLeadItem, SiteFaqItem, SocialMediaLinkItem, OfficeLocationItem } from '../types';
import { 
  ShieldCheck, Lock, LogOut, LayoutDashboard, ToggleLeft, ToggleRight, 
  FileText, Users, Briefcase, Cpu, Settings, Plus, Trash2, Edit3, 
  Check, X, ArrowLeft, RefreshCw, Eye, Sparkles, MessageSquareQuote, Award,
  Globe, Phone, Mail, MapPin, AlignLeft, Inbox, Calendar, UserCheck, Search, Bell, Send, Clock, Bot, MessageSquare, HelpCircle, ChevronLeft, ChevronRight, Menu, FileSpreadsheet, Filter, Share2, Link, ExternalLink, Linkedin, Github, Instagram, Youtube, Facebook, MessageCircle, Building2, Copy, Radio
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WebiknowsLogo } from './WebiknowsLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { exportLeadsToExcel, exportMeetingsToExcel, exportAiLeadsToExcel, isMatchingMonthAndDate } from '../utils/excelExport';

interface CmsDashboardProps {
  theme: Theme;
  setCurrentPage: (page: Page) => void;
}

export const CmsDashboard: React.FC<CmsDashboardProps> = ({ theme, setCurrentPage }) => {
  const cms = useCms();
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'visibility' | 'leads' | 'meetings' | 'meeting-slots' | 'aifaqs' | 'aileads' | 'sitefaqs' | 'socials' | 'contact-crud' | 'services' | 'casestudies' | 'testimonials' | 'whychoose' | 'team' | 'blogs' | 'settings' | 'seo'
  >('overview');

  const [selectedSeoPage, setSelectedSeoPage] = useState<Page>('home');
  const [seoForm, setSeoForm] = useState(cms.pageSeoSettings?.home || {
    pageId: 'home',
    pageName: 'Home',
    seoTitle: '',
    metaDescription: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    keywords: ''
  });
  const [seoSavedNotice, setSeoSavedNotice] = useState(false);

  React.useEffect(() => {
    if (cms.pageSeoSettings?.[selectedSeoPage]) {
      setSeoForm(cms.pageSeoSettings[selectedSeoPage]);
    }
  }, [selectedSeoPage, cms.pageSeoSettings]);

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    cms.updatePageSeo(selectedSeoPage, seoForm);
    setSeoSavedNotice(true);
    setTimeout(() => setSeoSavedNotice(false), 3000);
  };

  const [editingSocial, setEditingSocial] = useState<SocialMediaLinkItem | null>(null);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [socialSearch, setSocialSearch] = useState('');

  const [editingSiteFaq, setEditingSiteFaq] = useState<SiteFaqItem | null>(null);
  const [isSiteFaqModalOpen, setIsSiteFaqModalOpen] = useState(false);
  const [siteFaqSearch, setSiteFaqSearch] = useState('');
  const [siteFaqCategoryFilter, setSiteFaqCategoryFilter] = useState('All');

  // CRUD Modals state
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceSearch, setServiceSearch] = useState('');

  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);

  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);

  const [editingWhyChoose, setEditingWhyChoose] = useState<WhyChooseUsItem | null>(null);
  const [isWhyChooseModalOpen, setIsWhyChooseModalOpen] = useState(false);

  const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  // Office Locations / Hubs CRUD State
  const [editingOffice, setEditingOffice] = useState<OfficeLocationItem | null>(null);
  const [isOfficeModalOpen, setIsOfficeModalOpen] = useState(false);
  const [officeSearch, setOfficeSearch] = useState('');
  const [deleteConfirmOfficeId, setDeleteConfirmOfficeId] = useState<string | null>(null);

  // Meeting Slots CRUD State
  const [editingMeetingSlot, setEditingMeetingSlot] = useState<MeetingSlotItem | null>(null);
  const [isMeetingSlotModalOpen, setIsMeetingSlotModalOpen] = useState(false);
  const [meetingSlotSearch, setMeetingSlotSearch] = useState('');

  // Leads & Meetings State
  const [editingLead, setEditingLead] = useState<LeadItem | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadSearch, setLeadSearch] = useState('');
  const [leadFilterStatus, setLeadFilterStatus] = useState<string>('All');
  const [leadMonthFilter, setLeadMonthFilter] = useState<string>('All');
  const [leadSpecificDate, setLeadSpecificDate] = useState<string>('');
  const [leadStartDate, setLeadStartDate] = useState<string>('');
  const [leadEndDate, setLeadEndDate] = useState<string>('');

  const [editingMeeting, setEditingMeeting] = useState<MeetingRequestItem | null>(null);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [meetingSearch, setMeetingSearch] = useState('');
  const [meetingFilterStatus, setMeetingFilterStatus] = useState<string>('All');
  const [meetingMonthFilter, setMeetingMonthFilter] = useState<string>('All');
  const [meetingSpecificDate, setMeetingSpecificDate] = useState<string>('');
  const [meetingStartDate, setMeetingStartDate] = useState<string>('');
  const [meetingEndDate, setMeetingEndDate] = useState<string>('');

  const [editingAiFaq, setEditingAiFaq] = useState<AiConsultantFaqItem | null>(null);
  const [isAiFaqModalOpen, setIsAiFaqModalOpen] = useState(false);
  const [aiFaqSearch, setAiFaqSearch] = useState('');

  const [editingAiLead, setEditingAiLead] = useState<AiConsultantLeadItem | null>(null);
  const [isAiLeadModalOpen, setIsAiLeadModalOpen] = useState(false);
  const [aiLeadSearch, setAiLeadSearch] = useState('');
  const [aiLeadFilterStatus, setAiLeadFilterStatus] = useState<string>('All');
  const [aiLeadMonthFilter, setAiLeadMonthFilter] = useState<string>('All');
  const [aiLeadSpecificDate, setAiLeadSpecificDate] = useState<string>('');
  const [aiLeadStartDate, setAiLeadStartDate] = useState<string>('');
  const [aiLeadEndDate, setAiLeadEndDate] = useState<string>('');

  const [aiConsultantEmailInput, setAiConsultantEmailInput] = useState(cms.aiConsultantEmail || 'consultant@webiknows.com');
  const [aiEmailSavedNotice, setAiEmailSavedNotice] = useState(false);

  // Notification Email State
  const [notificationEmailInput, setNotificationEmailInput] = useState(cms.adminNotificationEmail || 'admin@webiknows.com');
  const [emailSavedNotice, setEmailSavedNotice] = useState(false);

  // Metadata form state
  const [metadataForm, setMetadataForm] = useState(cms.siteMetadata);
  const [metadataSavedNotice, setMetadataSavedNotice] = useState(false);

  React.useEffect(() => {
    if (cms.siteMetadata) {
      setMetadataForm(cms.siteMetadata);
    }
  }, [cms.siteMetadata]);

  const handleSaveMetadata = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    cms.updateMetadata(metadataForm);
    setMetadataSavedNotice(true);
    setTimeout(() => setMetadataSavedNotice(false), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = cms.login(passwordInput);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
    }
  };

  const handleSaveNotificationEmail = (e: React.FormEvent) => {
    e.preventDefault();
    cms.updateNotificationEmail(notificationEmailInput);
    setEmailSavedNotice(true);
    setTimeout(() => setEmailSavedNotice(false), 3000);
  };

  const handleSaveAiConsultantEmail = (e: React.FormEvent) => {
    e.preventDefault();
    cms.updateAiConsultantEmail(aiConsultantEmailInput);
    setAiEmailSavedNotice(true);
    setTimeout(() => setAiEmailSavedNotice(false), 3000);
  };

  if (!cms.isAdminLoggedIn) {
    // Filtered Site FAQs
  const filteredSiteFaqs = (cms.siteFaqs || []).filter(faq => {
    const matchesCategory = siteFaqCategoryFilter === 'All' || faq.category === siteFaqCategoryFilter;
    const q = siteFaqSearch.toLowerCase();
    const matchesQuery = faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
      <div className={`min-h-screen flex items-center justify-center p-4 transition-colors ${
        theme === 'dark' ? 'bg-[#060608] text-white' : 'bg-neutral-100 text-neutral-900'
      }`}>
        <div className={`w-full max-w-md p-8 rounded-3xl border shadow-2xl transition-all ${
          theme === 'dark' ? 'bg-[#0F0F12] border-neutral-800' : 'bg-white border-neutral-200'
        }`}>
          <div className="text-center space-y-3 mb-8">
            <div className="w-14 h-14 bg-rose-900 rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg shadow-rose-900/30">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">WEBIKNOWS CMS Admin</h1>
            <p className="text-xs text-neutral-400">
              Log in with admin credentials for full CRUD access to leads, meeting schedule requests, content, and notification settings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-2 text-neutral-400">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password (default: agency2026)"
                  className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-rose-900 ${
                    theme === 'dark'
                      ? 'bg-neutral-900 border-neutral-800 text-white'
                      : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                  }`}
                  autoFocus
                />
              </div>
              {loginError && (
                <p className="text-xs text-rose-800 mt-2 font-medium">
                  Invalid password. Try <code className="bg-rose-950 px-1 py-0.5 rounded text-red-300">agency2026</code> or <code className="bg-rose-950 px-1 py-0.5 rounded text-red-300">admin</code>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-rose-900 hover:bg-rose-950 transition-colors shadow-lg shadow-rose-900/30 cursor-pointer"
            >
              Sign In to Admin CMS Portal
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setCurrentPage('home');
                  window.location.hash = '';
                }}
                className="text-xs font-mono text-neutral-400 hover:text-rose-800 transition-colors flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Public Website</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Filtered Leads
  const filteredLeads = cms.leads.filter(lead => {
    const matchesStatus = leadFilterStatus === 'All' || lead.status === leadFilterStatus;
    const matchesMonthDate = isMatchingMonthAndDate(lead.createdAt, leadMonthFilter, leadSpecificDate || leadStartDate, leadSpecificDate || leadEndDate);
    const query = leadSearch.toLowerCase();
    const matchesQuery = !query || 
      lead.name.toLowerCase().includes(query) || 
      lead.email.toLowerCase().includes(query) || 
      (lead.company && lead.company.toLowerCase().includes(query)) ||
      lead.message.toLowerCase().includes(query);
    return matchesStatus && matchesMonthDate && matchesQuery;
  });

  // Filtered Meetings
  const filteredMeetings = cms.meetingRequests.filter(meet => {
    const matchesStatus = meetingFilterStatus === 'All' || meet.status === meetingFilterStatus;
    const matchesMonthDate = isMatchingMonthAndDate(meet.date || meet.createdAt, meetingMonthFilter, meetingSpecificDate || meetingStartDate, meetingSpecificDate || meetingEndDate);
    const query = meetingSearch.toLowerCase();
    const matchesQuery = !query || 
      meet.name.toLowerCase().includes(query) || 
      meet.email.toLowerCase().includes(query) || 
      (meet.company && meet.company.toLowerCase().includes(query)) ||
      meet.date.includes(query) ||
      meet.slot.toLowerCase().includes(query);
    return matchesStatus && matchesMonthDate && matchesQuery;
  });

  // Filtered AI Consultant FAQs
  const filteredAiFaqs = cms.aiFaqs.filter(faq => {
    const q = aiFaqSearch.toLowerCase();
    return !q || 
      faq.question.toLowerCase().includes(q) || 
      faq.answer.toLowerCase().includes(q) || 
      (faq.category && faq.category.toLowerCase().includes(q));
  });

  // Filtered AI Consultant Leads
  const filteredAiLeads = cms.aiLeads.filter(lead => {
    const matchesStatus = aiLeadFilterStatus === 'All' || lead.status === aiLeadFilterStatus;
    const matchesMonthDate = isMatchingMonthAndDate(lead.createdAt, aiLeadMonthFilter, aiLeadSpecificDate || aiLeadStartDate, aiLeadSpecificDate || aiLeadEndDate);
    const q = aiLeadSearch.toLowerCase();
    const matchesQuery = !q || 
      lead.name.toLowerCase().includes(q) || 
      lead.email.toLowerCase().includes(q) || 
      lead.mobile.toLowerCase().includes(q) ||
      lead.service.toLowerCase().includes(q);
    return matchesStatus && matchesMonthDate && matchesQuery;
  });

  // Filtered Site FAQs
  const filteredSiteFaqs = (cms.siteFaqs || []).filter((faq: SiteFaqItem) => {
    const matchesCategory = siteFaqCategoryFilter === 'All' || faq.category === siteFaqCategoryFilter;
    const q = siteFaqSearch.toLowerCase();
    const matchesQuery = !q || faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className={`h-screen flex flex-row transition-colors relative overflow-hidden ${
      theme === 'dark' ? 'bg-[#080808] text-white' : 'bg-neutral-50 text-neutral-950'
    }`}>
      {/* Permanent Sticky Menu Bar Navigation */}
      <aside
        className={`sticky top-0 h-screen w-72 lg:w-80 shrink-0 border-r p-6 flex flex-col justify-between overflow-y-auto transition-colors z-40 select-none ${
          theme === 'dark' ? 'bg-[#0C0C0F] border-neutral-800' : 'bg-white border-neutral-200'
        }`}
      >
        <div className="space-y-6">
          {/* Brand */}
          <div className="flex flex-col gap-2 border-b border-neutral-800/40 pb-4">
            <div className="flex items-center justify-between">
              <WebiknowsLogo size="sm" theme={theme} showTagline={false} />
            </div>
            <div className="flex items-center justify-between pl-0.5">
              <span className="text-[10px] font-mono font-bold tracking-wider text-rose-800 uppercase">ADMIN CMS PORTAL</span>
              <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Connected
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 font-medium text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-rose-900 text-white font-bold shadow-md shadow-rose-900/25'
                  : theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </div>
            </button>

            {/* LEADS RECEIVED TAB BUTTON */}
            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-rose-900 text-white font-bold shadow-md shadow-rose-900/25'
                  : theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Leads Received</span>
              </div>
              <div className="flex items-center gap-1">
                {cms.leads.some(l => l.status === 'New') && (
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                )}
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/20 font-bold">{cms.leads.length}</span>
              </div>
            </button>

            {/* MEETING REQUESTS TAB BUTTON */}
            <button
              onClick={() => setActiveTab('meetings')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'meetings'
                  ? 'bg-rose-900 text-white font-bold shadow-md shadow-rose-900/25'
                  : theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                <span>Meeting Schedule Requests</span>
              </div>
              <div className="flex items-center gap-1">
                {cms.meetingRequests.some(m => m.status === 'Pending') && (
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                )}
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/20 font-bold">{cms.meetingRequests.length}</span>
              </div>
            </button>

            {/* AI CONSULTANT Q&A TAB BUTTON */}
            <button
              onClick={() => setActiveTab('aifaqs')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'aifaqs'
                  ? 'bg-rose-900 text-white font-bold shadow-md shadow-rose-900/25'
                  : theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bot className="w-4 h-4" />
                <span>AI Consultant Q&A</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/20 font-bold">{cms.aiFaqs.length}</span>
            </button>

            {/* AI CONSULTANT FORM LEADS TAB BUTTON */}
            <button
              onClick={() => setActiveTab('aileads')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'aileads'
                  ? 'bg-rose-900 text-white font-bold shadow-md shadow-rose-900/25'
                  : theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span>AI Consultant Leads</span>
              </div>
              <div className="flex items-center gap-1">
                {cms.aiLeads.some(l => l.status === 'New') && (
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></span>
                )}
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/20 font-bold">{cms.aiLeads.length}</span>
              </div>
            </button>

            {/* SOCIAL MEDIA LINKS TAB BUTTON */}
            <button
              onClick={() => setActiveTab('socials')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'socials'
                  ? 'bg-rose-900 text-white font-bold shadow-md shadow-rose-900/25'
                  : theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <Share2 className="w-4 h-4" />
                <span>Social Media Links</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/20 font-bold">
                {(cms.socialLinks || []).filter(s => s.enabled).length}/{(cms.socialLinks || []).length}
              </span>
            </button>

            {/* WEBSITE FAQS TAB BUTTON */}
            <button
              onClick={() => setActiveTab('sitefaqs')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'sitefaqs'
                  ? 'bg-rose-900 text-white font-bold shadow-md shadow-rose-900/25'
                  : theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4" />
                <span>Website FAQs CRUD</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/20 font-bold">{(cms.siteFaqs || []).length}</span>
            </button>

            <button
              onClick={() => setActiveTab('visibility')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'visibility'
                  ? 'bg-rose-900 text-white font-bold shadow-md shadow-rose-900/25'
                  : theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <Eye className="w-4 h-4" />
                <span>Page & Section Matrix</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('seo')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'seo'
                  ? 'bg-rose-900 text-white font-bold shadow-md shadow-rose-900/25'
                  : theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4" />
                <span>SEO & OpenGraph</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('contact-crud')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'contact-crud'
                  ? 'bg-rose-900 text-white font-bold shadow-md shadow-rose-900/25'
                  : theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-rose-800" />
                <span>Contact Info & Hubs CRUD</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/20">{(cms.officeLocations || []).length}</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-rose-900 text-white font-bold shadow-md shadow-rose-900/25'
                  : theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4" />
                <span>Services CRUD</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/20">{cms.services.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('casestudies')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'casestudies'
                  ? 'bg-rose-900 text-white font-bold shadow-md shadow-rose-900/25'
                  : theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4" />
                <span>Case Studies CRUD</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/20">{cms.caseStudies.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'testimonials'
                  ? 'bg-rose-900 text-white font-bold shadow-md shadow-rose-900/25'
                  : theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquareQuote className="w-4 h-4" />
                <span>Testimonials CRUD</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/20">{cms.testimonials.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('whychoose')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'whychoose'
                  ? 'bg-rose-900 text-white font-bold shadow-md shadow-rose-900/25'
                  : theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4" />
                <span>Why Choose Us CRUD</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/20">{cms.whyChooseUs.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'team'
                  ? 'bg-rose-900 text-white font-bold shadow-md shadow-rose-900/25'
                  : theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Team Members CRUD</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/20">{cms.team.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'blogs'
                  ? 'bg-rose-900 text-white font-bold shadow-md shadow-rose-900/25'
                  : theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Blogs & Insights CRUD</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/20">{cms.blogs.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('meeting-slots')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'meeting-slots'
                  ? 'bg-rose-900 text-white font-bold shadow-md shadow-rose-900/25'
                  : theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4" />
                <span>Meeting Slots CRUD</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/20">{(cms.meetingSlots || []).length}</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-rose-900 text-white font-bold shadow-md shadow-rose-900/25'
                  : theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Notification & Site Settings</span>
            </button>
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 mt-6 border-t border-neutral-800/40 space-y-2">
          <button
            onClick={() => {
              setCurrentPage('home');
              window.location.hash = '';
            }}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              theme === 'dark' ? 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800' : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Website</span>
          </button>

          <button
            onClick={cms.logout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-800 hover:bg-rose-950/20 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Admin Session</span>
          </button>
        </div>
      </aside>

      {/* CMS Main Content Area */}
      <main className="flex-1 h-screen p-6 lg:p-10 overflow-y-auto min-w-0">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Admin Dashboard Overview</h1>
              <p className="text-xs text-neutral-400 mt-1">
                Full CRUD control center for Webiknows IT Solutions: manage leads received, meeting schedule requests, services, case studies, testimonials, and notification routing.
              </p>
            </div>

            {/* Notification Email Bar */}
            <div className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              theme === 'dark' ? 'bg-rose-950/20 border-red-900/50 text-white' : 'bg-rose-50 border-rose-200 text-neutral-900'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-900 text-white flex items-center justify-center shrink-0">
                  <Bell className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-800">Admin Notification Email Routing</div>
                  <div className="text-sm font-semibold mt-0.5">
                    Form filled details & strategy session requests are sent to: <span className="font-mono text-rose-700 font-bold underline">{cms.adminNotificationEmail}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('settings')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-900 hover:bg-rose-950 text-white transition-all shadow-md cursor-pointer shrink-0"
              >
                Update Notification Email
              </button>
            </div>

            {/* Overview Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div 
                onClick={() => setActiveTab('leads')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer hover:border-rose-800/50 ${
                  theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Inbox className="w-6 h-6 text-rose-900" />
                  <span className="text-2xl font-black">{cms.leads.length}</span>
                </div>
                <div className="text-xs font-bold mt-2">Leads Received</div>
                <div className="text-[10px] text-neutral-400">Website contact form inquiries</div>
              </div>

              <div 
                onClick={() => setActiveTab('meetings')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer hover:border-rose-800/50 ${
                  theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Calendar className="w-6 h-6 text-rose-900" />
                  <span className="text-2xl font-black">{cms.meetingRequests.length}</span>
                </div>
                <div className="text-xs font-bold mt-2">Strategy Meetings</div>
                <div className="text-[10px] text-neutral-400">Scheduled session requests</div>
              </div>

              <div 
                onClick={() => setActiveTab('services')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer hover:border-rose-800/50 ${
                  theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Cpu className="w-6 h-6 text-rose-900" />
                  <span className="text-2xl font-black">{cms.services.length}</span>
                </div>
                <div className="text-xs font-bold mt-2">Active Services</div>
                <div className="text-[10px] text-neutral-400">Deliverables & tech stack</div>
              </div>

              <div 
                onClick={() => setActiveTab('casestudies')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer hover:border-rose-800/50 ${
                  theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Briefcase className="w-6 h-6 text-rose-900" />
                  <span className="text-2xl font-black">{cms.caseStudies.length}</span>
                </div>
                <div className="text-xs font-bold mt-2">Case Studies</div>
                <div className="text-[10px] text-neutral-400">Featured client projects</div>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className={`p-6 rounded-3xl border space-y-4 ${
              theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold flex items-center gap-2">
                    <Inbox className="w-5 h-5 text-rose-900" />
                    <span>Recent Leads Received</span>
                  </h3>
                  <p className="text-xs text-neutral-400">Latest form submissions recorded in CMS</p>
                </div>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-900 text-white text-xs font-bold hover:bg-rose-950 transition-all cursor-pointer"
                >
                  View All ({cms.leads.length})
                </button>
              </div>

              <div className="space-y-3">
                {cms.leads.slice(0, 3).map((lead) => (
                  <div key={lead.id} className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                  }`}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{lead.name}</span>
                        <span className="text-xs text-neutral-400">({lead.company || 'Direct Inquiry'})</span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold font-mono ${
                          lead.status === 'New' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' :
                          lead.status === 'In Discussion' ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30' :
                          lead.status === 'Qualified' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' :
                          'bg-neutral-800 text-neutral-400 border border-neutral-700'
                        }`}>
                          {lead.status}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-400 flex flex-wrap gap-3">
                        <span>📧 {lead.email}</span>
                        <span>📞 {lead.phone}</span>
                        <span>💰 {lead.budget}</span>
                      </div>
                      <p className="text-xs italic text-neutral-300 line-clamp-1 mt-1">"{lead.message}"</p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingLead(lead);
                        setIsLeadModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-xs font-bold cursor-pointer shrink-0"
                    >
                      Edit Lead
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* LEADS RECEIVED TAB */}
        {activeTab === 'leads' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-900">
                  <Inbox className="w-4 h-4" />
                  <span>Contact Form Submissions Matrix</span>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight mt-1">Leads Received</h1>
                <p className="text-xs text-neutral-400">View, edit lead fields, update status, add internal notes, or delete records.</p>
              </div>

              <button
                onClick={() => {
                  setEditingLead(null);
                  setIsLeadModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-2xl bg-rose-900 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-900/30 hover:bg-rose-950 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Manual Lead</span>
              </button>
            </div>

            {/* Notification Bar */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs ${
              theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
            }`}>
              <div className="flex items-center gap-2 text-neutral-300">
                <Bell className="w-4 h-4 text-rose-800" />
                <span>All incoming website leads dispatch notifications to: <strong className="text-rose-700 font-mono">{cms.adminNotificationEmail}</strong></span>
              </div>
              <button
                onClick={() => setActiveTab('settings')}
                className="text-rose-800 font-bold hover:underline cursor-pointer"
              >
                Change Email
              </button>
            </div>

            {/* Filter & Search Controls with Excel Export & Date/Month Filter */}
            <div className={`p-5 rounded-3xl border space-y-4 ${
              theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                {/* Status Badges */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                  {['All', 'New', 'In Discussion', 'Qualified', 'Closed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setLeadFilterStatus(st)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        leadFilterStatus === st
                          ? 'bg-rose-900 text-white shadow-md'
                          : theme === 'dark' ? 'bg-neutral-900 text-neutral-400 border border-neutral-800' : 'bg-neutral-200 text-neutral-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                {/* Search & Export Excel Button */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative min-w-[220px] flex-1">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search leads..."
                      value={leadSearch}
                      onChange={(e) => setLeadSearch(e.target.value)}
                      className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none ${
                        theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                      }`}
                    />
                  </div>

                  <button
                    onClick={() => exportLeadsToExcel(filteredLeads, 'Webiknows_Leads_Received')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/25 transition-all cursor-pointer"
                    title="Export currently filtered leads to Excel Spreadsheet"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Download Excel (.xlsx)</span>
                  </button>
                </div>
              </div>

              {/* Date & Month Filter Inputs */}
              <div className="pt-3 border-t border-neutral-800/40 flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 font-mono font-bold text-rose-800">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter by Month / Date:</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-400 font-mono text-[11px]">Select Month:</span>
                  <select
                    value={leadMonthFilter}
                    onChange={(e) => {
                      setLeadMonthFilter(e.target.value);
                      if (e.target.value !== 'All') setLeadSpecificDate('');
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-xs outline-none font-mono ${
                      theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-100 border-neutral-300 text-neutral-900'
                    }`}
                  >
                    <option value="All">All Months</option>
                    <option value="Oct 2026">October 2026</option>
                    <option value="Sep 2026">September 2026</option>
                    <option value="Aug 2026">August 2026</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-400 font-mono text-[11px]">Exact Date:</span>
                  <input
                    type="date"
                    value={leadSpecificDate}
                    onChange={(e) => {
                      setLeadSpecificDate(e.target.value);
                      if (e.target.value) { setLeadMonthFilter('All'); setLeadStartDate(''); setLeadEndDate(''); }
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-xs outline-none font-mono ${
                      theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-100 border-neutral-300 text-neutral-900'
                    }`}
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-400 font-mono text-[11px]">Custom Range:</span>
                  <input
                    type="date"
                    value={leadStartDate}
                    onChange={(e) => {
                      setLeadStartDate(e.target.value);
                      if (e.target.value) { setLeadMonthFilter('All'); setLeadSpecificDate(''); }
                    }}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs outline-none font-mono ${
                      theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-100 border-neutral-300 text-neutral-900'
                    }`}
                    title="Start Date"
                  />
                  <span className="text-neutral-500 font-mono">to</span>
                  <input
                    type="date"
                    value={leadEndDate}
                    onChange={(e) => {
                      setLeadEndDate(e.target.value);
                      if (e.target.value) { setLeadMonthFilter('All'); setLeadSpecificDate(''); }
                    }}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs outline-none font-mono ${
                      theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-100 border-neutral-300 text-neutral-900'
                    }`}
                    title="End Date"
                  />
                </div>

                {(leadMonthFilter !== 'All' || leadSpecificDate !== '' || leadStartDate !== '' || leadEndDate !== '') && (
                  <button
                    onClick={() => {
                      setLeadMonthFilter('All');
                      setLeadSpecificDate('');
                      setLeadStartDate('');
                      setLeadEndDate('');
                    }}
                    className="px-2.5 py-1 rounded-xl bg-rose-950/40 border border-red-800/60 text-rose-700 hover:text-white text-[11px] font-bold font-mono flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                    <span>Reset Date Filter</span>
                  </button>
                )}

                <div className="ml-auto text-[11px] font-mono text-neutral-400">
                  Displaying <strong className="text-rose-800 font-bold">{filteredLeads.length}</strong> of {cms.leads.length} leads
                </div>
              </div>
            </div>

            {/* Leads List Grid */}
            {filteredLeads.length === 0 ? (
              <div className="p-12 text-center text-neutral-500 font-mono text-xs border border-dashed border-neutral-800 rounded-3xl">
                No leads found matching your search criteria.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className={`p-6 rounded-3xl border transition-all space-y-4 ${
                      theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/40 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold">{lead.name}</h3>
                          <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold font-mono uppercase tracking-wider ${
                            lead.status === 'New' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' :
                            lead.status === 'In Discussion' ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30' :
                            lead.status === 'Qualified' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' :
                            'bg-neutral-800 text-neutral-400 border border-neutral-700'
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-400 font-mono flex flex-wrap gap-4">
                          <span>📧 {lead.email}</span>
                          <span>📞 {lead.phone}</span>
                          <span>🏢 {lead.company || 'Independent'}</span>
                          <span>💼 Budget: {lead.budget}</span>
                        </div>
                      </div>

                      <div className="text-right text-[11px] font-mono text-neutral-400">
                        Received: {lead.createdAt}
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">Project Brief / Requirements</div>
                      <p className={`p-3 rounded-xl leading-relaxed ${
                        theme === 'dark' ? 'bg-neutral-900/80 text-neutral-200' : 'bg-neutral-100 text-neutral-800'
                      }`}>
                        {lead.message}
                      </p>
                    </div>

                    {lead.notes && (
                      <div className="text-xs text-amber-400 bg-amber-950/20 p-2.5 rounded-xl border border-amber-900/30 font-mono">
                        📝 Admin Notes: {lead.notes}
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={() => {
                          setEditingLead(lead);
                          setIsLeadModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Lead Fields</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete lead from "${lead.name}"?`)) {
                            cms.deleteLead(lead.id);
                          }
                        }}
                        className="px-3 py-2 rounded-xl bg-rose-950/30 border border-red-900/50 text-rose-700 hover:bg-red-900/50 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MEETING SLOTS CRUD TAB */}
        {activeTab === 'meeting-slots' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
                  <Clock className="w-7 h-7 text-rose-900" />
                  <span>Meeting Schedule Time Slots CRUD</span>
                </h1>
                <p className="text-xs text-neutral-400 mt-1">
                  Full administrative CRUD access to add, edit, delete, or pause available time slots for the "Schedule a Meeting" form.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setEditingMeetingSlot(null);
                    setIsMeetingSlotModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-rose-900 hover:bg-rose-950 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-rose-900/30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Meeting Slot</span>
                </button>
              </div>
            </div>

            <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
              theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-900/10 text-rose-800 border border-rose-800/20">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold flex items-center gap-2">
                      <span>Available Consultation Time Slots</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-neutral-800 text-neutral-300">
                        {(cms.meetingSlots || []).length} Slots
                      </span>
                    </h2>
                    <p className="text-xs text-neutral-400">
                      Active slots appear instantly in the interactive meeting booking calendar on the Contact page.
                    </p>
                  </div>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={meetingSlotSearch}
                    onChange={(e) => setMeetingSlotSearch(e.target.value)}
                    placeholder="Search time slot..."
                    className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none ${
                      theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(cms.meetingSlots || [])
                  .filter((slot) => {
                    if (!meetingSlotSearch.trim()) return true;
                    const q = meetingSlotSearch.toLowerCase();
                    return slot.timeString.toLowerCase().includes(q) || slot.label.toLowerCase().includes(q);
                  })
                  .map((slot) => (
                    <div
                      key={slot.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                        slot.active
                          ? theme === 'dark'
                            ? 'bg-neutral-900/60 border-neutral-800 hover:border-rose-800/50'
                            : 'bg-neutral-50 border-neutral-200/90 hover:border-rose-800/50 shadow-xs'
                          : 'opacity-60 border-dashed border-neutral-800'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-mono font-bold text-rose-800 uppercase tracking-wider">
                            CONSULTATION SLOT
                          </span>
                          <button
                            type="button"
                            onClick={() => cms.toggleMeetingSlot(slot.id)}
                            className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase cursor-pointer transition-colors ${
                              slot.active
                                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                            }`}
                          >
                            {slot.active ? 'ACTIVE' : 'PAUSED'}
                          </button>
                        </div>

                        <div>
                          <h3 className="text-xl font-black font-mono tracking-tight text-white">{slot.timeString}</h3>
                          <p className="text-xs text-neutral-400 mt-1">{slot.label}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingMeetingSlot(slot);
                            setIsMeetingSlotModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-800/80 hover:bg-neutral-700 text-xs font-bold text-neutral-200 cursor-pointer flex items-center gap-1.5"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete time slot ${slot.timeString}?`)) {
                              cms.deleteMeetingSlot(slot.id);
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg border border-red-900/40 bg-rose-950/20 hover:bg-red-900/40 text-xs font-bold text-rose-700 cursor-pointer flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {(cms.meetingSlots || []).length === 0 && (
                <div className="py-12 text-center text-neutral-500 text-xs space-y-3">
                  <Clock className="w-10 h-10 mx-auto text-neutral-600" />
                  <p>No meeting slots added yet. Click "+ Add New Meeting Slot" above.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MEETING SCHEDULE REQUESTS TAB */}
        {activeTab === 'meetings' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-900">
                  <Calendar className="w-4 h-4" />
                  <span>Strategy Sessions & Meeting Requests</span>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight mt-1">Meeting Schedule Requests</h1>
                <p className="text-xs text-neutral-400">View booked consultation sessions, reschedule dates/time slots, update meeting status, or add notes.</p>
              </div>

              <button
                onClick={() => {
                  setEditingMeeting(null);
                  setIsMeetingModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-2xl bg-rose-900 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-900/30 hover:bg-rose-950 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Schedule Manual Meeting</span>
              </button>
            </div>

            {/* Notification Bar */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs ${
              theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
            }`}>
              <div className="flex items-center gap-2 text-neutral-300">
                <Bell className="w-4 h-4 text-rose-800" />
                <span>Meeting calendar notifications are routed to: <strong className="text-rose-700 font-mono">{cms.adminNotificationEmail}</strong></span>
              </div>
              <button
                onClick={() => setActiveTab('settings')}
                className="text-rose-800 font-bold hover:underline cursor-pointer"
              >
                Change Email
              </button>
            </div>

            {/* Filter & Search Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setMeetingFilterStatus(st)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      meetingFilterStatus === st
                        ? 'bg-rose-900 text-white shadow-md'
                        : theme === 'dark' ? 'bg-neutral-900 text-neutral-400 border border-neutral-800' : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search meeting requests..."
                  value={meetingSearch}
                  onChange={(e) => setMeetingSearch(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none ${
                    theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                  }`}
                />
              </div>
            </div>

            {/* Meetings Grid */}
            {filteredMeetings.length === 0 ? (
              <div className="p-12 text-center text-neutral-500 font-mono text-xs border border-dashed border-neutral-800 rounded-3xl">
                No meeting schedule requests found matching your search.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredMeetings.map((meet) => (
                  <div
                    key={meet.id}
                    className={`p-6 rounded-3xl border space-y-4 flex flex-col justify-between transition-all ${
                      theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 border-b border-neutral-800/40 pb-3">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold font-mono uppercase tracking-wider ${
                          meet.status === 'Pending' ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30' :
                          meet.status === 'Confirmed' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' :
                          meet.status === 'Completed' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' :
                          'bg-rose-950/40 text-rose-700 border border-red-800/50'
                        }`}>
                          {meet.status}
                        </span>

                        <span className="text-[11px] font-mono text-neutral-400">
                          Booked: {meet.createdAt}
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold">{meet.name}</h3>

                      <div className="text-xs font-mono space-y-1 text-neutral-400">
                        <div>📧 {meet.email}</div>
                        <div>📞 {meet.phone || 'N/A'}</div>
                        <div>🏢 {meet.company || 'Enterprise Guest'}</div>
                      </div>

                      {/* Scheduled Date & Time Badge */}
                      <div className="p-3 rounded-xl bg-rose-900/10 border border-rose-800/20 flex items-center justify-between gap-2 text-xs font-mono text-rose-700">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="font-bold">{meet.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-bold">
                          <Clock className="w-4 h-4" />
                          <span>{meet.slot}</span>
                        </div>
                      </div>

                      {meet.topic && (
                        <div className="text-xs text-neutral-300">
                          <strong>Topic / Agenda:</strong> {meet.topic}
                        </div>
                      )}

                      {meet.notes && (
                        <div className="text-xs text-amber-400 bg-amber-950/20 p-2.5 rounded-xl border border-amber-900/30 font-mono">
                          📝 Notes: {meet.notes}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800/40">
                      <button
                        onClick={() => {
                          setEditingMeeting(meet);
                          setIsMeetingModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Reschedule / Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete meeting request for "${meet.name}"?`)) {
                            cms.deleteMeetingRequest(meet.id);
                          }
                        }}
                        className="px-3 py-2 rounded-xl bg-rose-950/30 border border-red-900/50 text-rose-700 hover:bg-red-900/50 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* AI CONSULTANT Q&A TAB */}
        {activeTab === 'aifaqs' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-900">
                  <Bot className="w-4 h-4" />
                  <span>Interactive Q&A Knowledge Base</span>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight mt-1">AI Consultant Questions & Answers</h1>
                <p className="text-xs text-neutral-400">Add, edit, or delete questions and answers used by the website AI Consultant to guide visitors.</p>
              </div>

              <button
                onClick={() => {
                  setEditingAiFaq(null);
                  setIsAiFaqModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-2xl bg-rose-900 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-900/30 hover:bg-rose-950 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Question & Answer</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search AI Consultant questions & answers..."
                value={aiFaqSearch}
                onChange={(e) => setAiFaqSearch(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none ${
                  theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                }`}
              />
            </div>

            {/* FAQs List */}
            {filteredAiFaqs.length === 0 ? (
              <div className="p-12 text-center text-neutral-500 font-mono text-xs border border-dashed border-neutral-800 rounded-3xl">
                No AI Consultant Q&A items found matching your search.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAiFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className={`p-6 rounded-3xl border flex flex-col md:flex-row md:items-start justify-between gap-4 ${
                      theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
                    }`}
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-rose-900/10 text-rose-800 border border-rose-800/20">
                          {faq.category || 'General Q&A'}
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-rose-800" />
                        {faq.question}
                      </h3>
                      <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-900/60 p-3 rounded-2xl border border-neutral-800/50">
                        {faq.answer}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setEditingAiFaq(faq);
                          setIsAiFaqModalOpen(true);
                        }}
                        className="px-3.5 py-2 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-xs font-bold cursor-pointer"
                      >
                        Edit Q&A
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete question "${faq.question}"?`)) {
                            cms.deleteAiFaq(faq.id);
                          }
                        }}
                        className="p-2 rounded-xl border border-red-900/50 bg-rose-950/30 text-rose-700 hover:bg-red-900/50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* AI CONSULTANT FORM LEADS TAB */}
        {activeTab === 'aileads' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-500">
                  <MessageSquare className="w-4 h-4" />
                  <span>Pre-Chat Leads & Inquiry Pipeline</span>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight mt-1">AI Consultant Form Leads</h1>
                <p className="text-xs text-neutral-400">User details recorded before AI consultation sessions. Admin has full access to edit fields, update status, add notes, or update notification email.</p>
              </div>

              <button
                onClick={() => {
                  setEditingAiLead(null);
                  setIsAiLeadModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-2xl bg-purple-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30 hover:bg-purple-700 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Manual AI Lead</span>
              </button>
            </div>

            {/* AI Consultant Recipient Email Configurator Card */}
            <form onSubmit={handleSaveAiConsultantEmail} className={`p-6 rounded-3xl border space-y-4 ${
              theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-800 uppercase tracking-wider">
                  <Mail className="w-4 h-4" />
                  <span>AI Consultant Notification Email Setting</span>
                </div>
                {aiEmailSavedNotice && (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 font-mono">
                    <Check className="w-4 h-4" /> Recipient Email Updated!
                  </span>
                )}
              </div>

              <p className="text-xs text-neutral-400">
                Update the email ID where incoming AI Consultant pre-chat form details (Name, Mobile Number, Email ID, Service requested) will be received:
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={aiConsultantEmailInput}
                  onChange={(e) => setAiConsultantEmailInput(e.target.value)}
                  placeholder="e.g. consultant@webiknows.com"
                  className={`flex-1 px-4 py-2.5 text-xs rounded-xl border outline-none font-mono ${
                    theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                  }`}
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-rose-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-rose-950 transition-all cursor-pointer shadow-md shadow-rose-900/20"
                >
                  Update Email ID
                </button>
              </div>
            </form>

            {/* Filter & Search Controls with Excel Export & Date/Month Filter */}
            <div className={`p-5 rounded-3xl border space-y-4 ${
              theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                  {['All', 'New', 'Contacted', 'In Discussion', 'Closed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setAiLeadFilterStatus(st)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        aiLeadFilterStatus === st
                          ? 'bg-purple-600 text-white shadow-md'
                          : theme === 'dark' ? 'bg-neutral-900 text-neutral-400 border border-neutral-800' : 'bg-neutral-200 text-neutral-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative min-w-[220px] flex-1">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search AI Consultant leads..."
                      value={aiLeadSearch}
                      onChange={(e) => setAiLeadSearch(e.target.value)}
                      className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none ${
                        theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                      }`}
                    />
                  </div>

                  <button
                    onClick={() => exportAiLeadsToExcel(filteredAiLeads, 'Webiknows_AI_Consultant_Leads')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/25 transition-all cursor-pointer"
                    title="Export currently filtered AI Consultant leads to Excel Spreadsheet"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Download Excel (.xlsx)</span>
                  </button>
                </div>
              </div>

              {/* Date & Month Filter Inputs */}
              <div className="pt-3 border-t border-neutral-800/40 flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 font-mono font-bold text-purple-400">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter by Month / Date:</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-400 font-mono text-[11px]">Select Month:</span>
                  <select
                    value={aiLeadMonthFilter}
                    onChange={(e) => {
                      setAiLeadMonthFilter(e.target.value);
                      if (e.target.value !== 'All') setAiLeadSpecificDate('');
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-xs outline-none font-mono ${
                      theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-100 border-neutral-300 text-neutral-900'
                    }`}
                  >
                    <option value="All">All Months</option>
                    <option value="Oct 2026">October 2026</option>
                    <option value="Sep 2026">September 2026</option>
                    <option value="Aug 2026">August 2026</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-400 font-mono text-[11px]">Exact Date:</span>
                  <input
                    type="date"
                    value={aiLeadSpecificDate}
                    onChange={(e) => {
                      setAiLeadSpecificDate(e.target.value);
                      if (e.target.value) { setAiLeadMonthFilter('All'); setAiLeadStartDate(''); setAiLeadEndDate(''); }
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-xs outline-none font-mono ${
                      theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-100 border-neutral-300 text-neutral-900'
                    }`}
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-400 font-mono text-[11px]">Custom Range:</span>
                  <input
                    type="date"
                    value={aiLeadStartDate}
                    onChange={(e) => {
                      setAiLeadStartDate(e.target.value);
                      if (e.target.value) { setAiLeadMonthFilter('All'); setAiLeadSpecificDate(''); }
                    }}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs outline-none font-mono ${
                      theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-100 border-neutral-300 text-neutral-900'
                    }`}
                    title="Start Date"
                  />
                  <span className="text-neutral-500 font-mono">to</span>
                  <input
                    type="date"
                    value={aiLeadEndDate}
                    onChange={(e) => {
                      setAiLeadEndDate(e.target.value);
                      if (e.target.value) { setAiLeadMonthFilter('All'); setAiLeadSpecificDate(''); }
                    }}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs outline-none font-mono ${
                      theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-100 border-neutral-300 text-neutral-900'
                    }`}
                    title="End Date"
                  />
                </div>

                {(aiLeadMonthFilter !== 'All' || aiLeadSpecificDate !== '' || aiLeadStartDate !== '' || aiLeadEndDate !== '') && (
                  <button
                    onClick={() => {
                      setAiLeadMonthFilter('All');
                      setAiLeadSpecificDate('');
                      setAiLeadStartDate('');
                      setAiLeadEndDate('');
                    }}
                    className="px-2.5 py-1 rounded-xl bg-purple-950/40 border border-purple-800/60 text-purple-300 hover:text-white text-[11px] font-bold font-mono flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                    <span>Reset Date Filter</span>
                  </button>
                )}

                <div className="ml-auto text-[11px] font-mono text-neutral-400">
                  Displaying <strong className="text-purple-400 font-bold">{filteredAiLeads.length}</strong> of {cms.aiLeads.length} leads
                </div>
              </div>
            </div>

            {/* AI Leads Grid */}
            {filteredAiLeads.length === 0 ? (
              <div className="p-12 text-center text-neutral-500 font-mono text-xs border border-dashed border-neutral-800 rounded-3xl">
                No AI Consultant leads found matching your search.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAiLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className={`p-6 rounded-3xl border space-y-4 transition-all ${
                      theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/40 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5">
                            <UserCheck className="w-4 h-4 text-purple-500 shrink-0" />
                            <h3 className={`text-base font-extrabold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{lead.name}</h3>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                            lead.status === 'New' ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' :
                            lead.status === 'Contacted' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' :
                            lead.status === 'In Discussion' ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30' :
                            'bg-neutral-800 text-neutral-400 border border-neutral-700'
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-400 font-mono flex flex-wrap gap-4 mt-1">
                          <span>📱 {lead.mobile}</span>
                          <span>📧 {lead.email}</span>
                          <span>💼 Service Needed: <strong className="text-purple-400">{lead.service}</strong></span>
                        </div>
                      </div>

                      <div className="text-right text-[11px] font-mono text-neutral-400">
                        Captured: {lead.createdAt}
                      </div>
                    </div>

                    {lead.notes && (
                      <div className="text-xs text-amber-400 bg-amber-950/20 p-2.5 rounded-xl border border-amber-900/30 font-mono">
                        📝 Admin Notes: {lead.notes}
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={() => {
                          setEditingAiLead(lead);
                          setIsAiLeadModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Lead Fields</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete AI Consultant lead for "${lead.name}"?`)) {
                            cms.deleteAiLead(lead.id);
                          }
                        }}
                        className="px-3 py-2 rounded-xl bg-rose-950/30 border border-red-900/50 text-rose-700 hover:bg-red-900/50 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* WEBSITE FAQS CRUD TAB */}
        {activeTab === 'sitefaqs' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
                  <HelpCircle className="w-8 h-8 text-rose-900" />
                  <span>Website FAQs Management</span>
                </h1>
                <p className="text-xs text-neutral-400 mt-1">
                  Add, edit, or delete public client knowledge & development FAQs shown in the FAQ section.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingSiteFaq(null);
                  setIsSiteFaqModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-2xl bg-rose-900 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-900/30 hover:bg-rose-950 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Website FAQ</span>
              </button>
            </div>

            {/* Filter & Search Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {['All', 'Figma Systems', 'CRM Engineering', 'Process & Delivery', 'General'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSiteFaqCategoryFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      siteFaqCategoryFilter === cat
                        ? 'bg-rose-900 text-white shadow-md'
                        : theme === 'dark' ? 'bg-neutral-900 text-neutral-400 border border-neutral-800' : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search website FAQs..."
                  value={siteFaqSearch}
                  onChange={(e) => setSiteFaqSearch(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none ${
                    theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                  }`}
                />
              </div>
            </div>

            {/* FAQs Grid */}
            {filteredSiteFaqs.length === 0 ? (
              <div className="p-12 text-center text-neutral-500 font-mono text-xs border border-dashed border-neutral-800 rounded-3xl">
                No website FAQs found matching your query.
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredSiteFaqs.map((faq, idx) => (
                  <div
                    key={faq.id}
                    className={`p-6 rounded-3xl border transition-all space-y-3 ${
                      theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 border-b border-neutral-800/40 pb-3">
                      <div className="space-y-1">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-rose-900/10 border border-rose-800/30 text-rose-800">
                          {faq.category}
                        </span>
                        <h3 className="text-base font-extrabold pt-1">{faq.question}</h3>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setEditingSiteFaq(faq);
                            setIsSiteFaqModalOpen(true);
                          }}
                          className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer"
                          title="Edit FAQ"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete website FAQ "${faq.question}"?`)) {
                              cms.deleteSiteFaq(faq.id);
                            }
                          }}
                          className="p-2 rounded-xl border border-red-900/50 bg-rose-950/30 text-rose-700 hover:bg-red-900/50 cursor-pointer"
                          title="Delete FAQ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className={`text-xs leading-relaxed ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SOCIAL MEDIA LINKS CRUD TAB */}
        {activeTab === 'socials' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
                  <Share2 className="w-8 h-8 text-rose-900" />
                  <span>Social Media Links Management</span>
                </h1>
                <p className="text-xs text-neutral-400 mt-1">
                  Toggle social media icons ON/OFF and configure public profile links displayed in the website footer.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingSocial(null);
                  setIsSocialModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-2xl bg-rose-900 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-900/30 hover:bg-rose-950 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Social Platform</span>
              </button>
            </div>

            {/* Search Controls */}
            <div className="flex items-center justify-between gap-4">
              <div className="relative min-w-[260px]">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search social platforms..."
                  value={socialSearch}
                  onChange={(e) => setSocialSearch(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none ${
                    theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                  }`}
                />
              </div>

              <div className="text-xs font-mono text-neutral-400">
                Active Footer Icons: <strong className="text-emerald-500 font-bold">{(cms.socialLinks || []).filter(s => s.enabled).length}</strong> enabled
              </div>
            </div>

            {/* Social Links List */}
            <div className="grid gap-4">
              {(cms.socialLinks || [])
                .filter(s => !socialSearch || s.platform.toLowerCase().includes(socialSearch.toLowerCase()))
                .map((social) => (
                  <div
                    key={social.id}
                    className={`p-5 rounded-3xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-4 shrink-0">
                      <div className={`p-3 rounded-2xl border flex items-center justify-center ${
                        social.enabled 
                          ? 'bg-rose-900/10 border-rose-800/30 text-rose-800' 
                          : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                      }`}>
                        <Share2 className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-extrabold">{social.platform}</h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                            social.enabled 
                              ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                          }`}>
                            {social.enabled ? 'VISIBLE IN FOOTER' : 'HIDDEN'}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 font-mono mt-0.5">Icon ID: {social.iconName || 'Globe'}</p>
                      </div>
                    </div>

                    {/* URL Input Form */}
                    <div className="flex-1 max-w-xl flex items-center gap-2">
                      <input
                        type="url"
                        value={social.url}
                        onChange={(e) => cms.updateSocialLink({ ...social, url: e.target.value })}
                        placeholder="https://..."
                        className={`w-full px-3.5 py-2 text-xs rounded-xl border outline-none font-mono ${
                          theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                        }`}
                      />

                      {social.url && (
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white cursor-pointer shrink-0"
                          title="Open link in new tab"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    {/* Actions & Visibility Toggle */}
                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => cms.toggleSocialLink(social.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          social.enabled
                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                            : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                        }`}
                      >
                        {social.enabled ? 'TURN OFF' : 'TURN ON'}
                      </button>

                      <button
                        onClick={() => {
                          setEditingSocial(social);
                          setIsSocialModalOpen(true);
                        }}
                        className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer"
                        title="Edit Social Platform"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete social link for "${social.platform}"?`)) {
                            cms.deleteSocialLink(social.id);
                          }
                        }}
                        className="p-2 rounded-xl border border-red-900/50 bg-rose-950/30 text-rose-700 hover:bg-red-900/50 cursor-pointer"
                        title="Delete Social Platform"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* SERVICES CRUD TAB */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-900">
                  <Briefcase className="w-4 h-4 text-rose-800" />
                  <span>Core Engineering Capabilities & Interactive Architecture Calculator</span>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight mt-1">Services & Capabilities Management</h1>
                <p className="text-xs text-neutral-400">Add, edit, or delete core agency service offerings, SLA delivery timelines, deliverables, tech stack tokens, and ROI benchmarks.</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingService(null);
                  setIsServiceModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-2xl bg-rose-900 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-900/30 hover:bg-rose-950 transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service Capability</span>
              </button>
            </div>

            {/* Search & Statistics Bar */}
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
            }`}>
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                  placeholder="Filter service capabilities by name, tech stack, or SLA..."
                  className={`w-full pl-9 pr-4 py-2 text-xs font-mono rounded-xl border outline-none ${
                    theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                  }`}
                />
              </div>

              <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
                <span>Total Active Capabilities:</span>
                <span className="font-extrabold text-rose-800 px-2.5 py-0.5 rounded-md bg-rose-900/10 border border-rose-800/20">
                  {cms.services.length}
                </span>
              </div>
            </div>

            {/* Services Cards Grid */}
            {cms.services.filter(s => {
              const q = serviceSearch.toLowerCase().trim();
              return !q || s.name.toLowerCase().includes(q) || s.tagline.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.techStack.some(t => t.toLowerCase().includes(q));
            }).length === 0 ? (
              <div className="p-12 text-center text-neutral-500 font-mono text-xs border border-dashed border-neutral-800 rounded-3xl">
                No service capability found matching "{serviceSearch}". Click "+ Add New Service Capability" above to create one.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6 items-stretch">
                {cms.services
                  .filter(s => {
                    const q = serviceSearch.toLowerCase().trim();
                    return !q || s.name.toLowerCase().includes(q) || s.tagline.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.techStack.some(t => t.toLowerCase().includes(q));
                  })
                  .map((service, index) => (
                    <div
                      key={service.id}
                      className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between space-y-5 transition-all ${
                        theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800 hover:border-rose-900/40' : 'bg-white border-neutral-200 shadow-sm'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-neutral-800/50">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-rose-900">0{index + 1}.</span>
                            <span className="text-xs font-mono font-bold text-neutral-400 uppercase">[{service.iconName}]</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-md bg-rose-900/10 border border-rose-800/30 text-rose-800">
                              SLA: {service.estimatedTime}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <h3 className="text-xl font-extrabold text-white">{service.name}</h3>
                          <p className="text-xs font-medium text-rose-800 font-mono">{service.tagline}</p>
                        </div>

                        <p className="text-xs text-neutral-400 leading-relaxed">{service.description}</p>

                        {/* Deliverables Preview */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-mono uppercase font-bold text-neutral-500">Deliverables ({service.deliverables?.length || 0}):</span>
                          <ul className="space-y-1 text-xs text-neutral-300">
                            {service.deliverables?.slice(0, 3).map((item, idx) => (
                              <li key={idx} className="flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span className="truncate">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech Stack Tokens */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {service.techStack?.map((tech, idx) => (
                            <span key={idx} className="px-2 py-0.5 text-[10px] font-mono bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-md">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="pt-4 border-t border-neutral-800/50 flex items-center justify-between gap-3">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">
                          ROI: {service.typicalRoi || 'High Impact'}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingService(service);
                              setIsServiceModalOpen(true);
                            }}
                            className="px-3.5 py-2 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete service "${service.name}"?`)) {
                                cms.deleteService(service.id);
                              }
                            }}
                            className="p-2 rounded-xl border border-red-900/50 bg-rose-950/30 text-rose-700 hover:bg-red-900/50 cursor-pointer"
                            title="Delete Service"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* CASE STUDIES TAB */}
        {activeTab === 'casestudies' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Case Studies CRUD</h1>
                <p className="text-xs text-neutral-400">Manage client portfolio items, architecture highlights, and metrics.</p>
              </div>

              <button
                onClick={() => {
                  setEditingCase(null);
                  setIsCaseModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-2xl bg-rose-900 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-900/30 hover:bg-rose-950 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Case Study</span>
              </button>
            </div>

            <div className="space-y-4">
              {cms.caseStudies.map((study) => (
                <div
                  key={study.id}
                  className={`p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-rose-900 uppercase">{study.category} · {study.client}</span>
                    <h3 className="text-lg font-extrabold">{study.title}</h3>
                    <p className="text-xs text-neutral-400">{study.summary}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingCase(study);
                        setIsCaseModalOpen(true);
                      }}
                      className="px-3.5 py-2 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-xs font-bold cursor-pointer"
                    >
                      Edit Case
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete case study "${study.title}"?`)) {
                          cms.deleteCaseStudy(study.id);
                        }
                      }}
                      className="p-2 rounded-xl border border-red-900/50 bg-rose-950/30 text-rose-700 hover:bg-red-900/50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TESTIMONIALS TAB */}
        {activeTab === 'testimonials' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Testimonials Management</h1>
                <p className="text-xs text-neutral-400">Add, edit, or delete client feedback and quotes.</p>
              </div>

              <button
                onClick={() => {
                  setEditingTestimonial(null);
                  setIsTestimonialModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-2xl bg-rose-900 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-900/30 hover:bg-rose-950 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Testimonial</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {cms.testimonials.map((t) => (
                <div
                  key={t.id}
                  className={`p-6 rounded-3xl border space-y-3 ${
                    theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
                  }`}
                >
                  <p className="text-xs italic leading-relaxed">"{t.comment}"</p>
                  <div className="pt-2 border-t border-neutral-800/40 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs">{t.name}</div>
                      <div className="text-[10px] text-neutral-400">{t.companyName} · {t.location}</div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingTestimonial(t);
                          setIsTestimonialModalOpen(true);
                        }}
                        className="p-2 rounded-lg hover:bg-neutral-800 cursor-pointer text-neutral-300"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete testimonial by ${t.name}?`)) {
                            cms.deleteTestimonial(t.id);
                          }
                        }}
                        className="p-2 rounded-lg hover:bg-rose-950 text-rose-700 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WHY CHOOSE US TAB */}
        {activeTab === 'whychoose' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Why Choose Us Section</h1>
                <p className="text-xs text-neutral-400">Edit key competitive advantages and proof points.</p>
              </div>

              <button
                onClick={() => {
                  setEditingWhyChoose(null);
                  setIsWhyChooseModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-2xl bg-rose-900 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-900/30 hover:bg-rose-950 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Reason</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {cms.whyChooseUs.map((item) => (
                <div
                  key={item.id}
                  className={`p-6 rounded-3xl border space-y-3 ${
                    theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-rose-900/10 border border-rose-800/20 text-rose-800">
                      {item.tag}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">[{item.iconName}]</span>
                  </div>

                  <h3 className="text-base font-bold">{item.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{item.description}</p>

                  <div className="pt-3 border-t border-neutral-800/40 flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingWhyChoose(item);
                        setIsWhyChooseModalOpen(true);
                      }}
                      className="p-2 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-neutral-200 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete item "${item.title}"?`)) {
                          cms.deleteWhyChooseUs(item.id);
                        }
                      }}
                      className="p-2 rounded-lg border border-red-900/50 bg-rose-950/30 text-rose-700 hover:bg-red-900/50 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TEAM MEMBERS TAB */}
        {activeTab === 'team' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Team Members CRUD</h1>
                <p className="text-xs text-neutral-400">Manage leadership & engineering team profiles.</p>
              </div>

              <button
                onClick={() => {
                  setEditingTeam(null);
                  setIsTeamModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-2xl bg-rose-900 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-900/30 hover:bg-rose-950 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Team Member</span>
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {cms.team.map((m) => (
                <div
                  key={m.id}
                  className={`p-6 rounded-3xl border space-y-3 ${
                    theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={m.imageUrl} alt={m.name} className="w-12 h-12 rounded-full object-cover border border-rose-800/30" />
                    <div>
                      <h3 className="font-bold text-sm">{m.name}</h3>
                      <div className="text-[11px] text-rose-800 font-mono">{m.role}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-800/40 flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingTeam(m);
                        setIsTeamModalOpen(true);
                      }}
                      className="p-2 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-neutral-200 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete team member ${m.name}?`)) {
                          cms.deleteTeamMember(m.id);
                        }
                      }}
                      className="p-2 rounded-lg border border-red-900/50 bg-rose-950/30 text-rose-700 hover:bg-red-900/50 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLOGS TAB */}
        {activeTab === 'blogs' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Blogs & Engineering Insights CRUD</h1>
                <p className="text-xs text-neutral-400">Publish or edit technical articles appearing in the homepage slider.</p>
              </div>

              <button
                onClick={() => {
                  setEditingBlog(null);
                  setIsBlogModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-2xl bg-rose-900 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-900/30 hover:bg-rose-950 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Blog Article</span>
              </button>
            </div>

            <div className="space-y-4">
              {cms.blogs.map((b) => (
                <div
                  key={b.id}
                  className={`p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-rose-900 uppercase">{b.category} · {b.readTime}</span>
                    <h3 className="text-lg font-extrabold">{b.title}</h3>
                    <p className="text-xs text-neutral-400">{b.excerpt}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingBlog(b);
                        setIsBlogModalOpen(true);
                      }}
                      className="px-3.5 py-2 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-xs font-bold cursor-pointer"
                    >
                      Edit Article
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete blog article "${b.title}"?`)) {
                          cms.deleteBlog(b.id);
                        }
                      }}
                      className="p-2 rounded-xl border border-red-900/50 bg-rose-950/30 text-rose-700 hover:bg-red-900/50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VISIBILITY TAB */}
        {activeTab === 'visibility' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Page & Section Visibility Matrix</h1>
              <p className="text-xs text-neutral-400 mt-1">Toggle public visibility for any page or homepage section instantly.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-3xl border ${theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'}`}>
                <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-rose-900" />
                  <span>Homepage Sections</span>
                </h3>

                <div className="space-y-3 text-xs">
                  {Object.entries(cms.sectionVisibility).map(([key, isVisible]) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-xl border border-neutral-800/60 bg-neutral-900/30">
                      <span className="font-bold uppercase font-mono tracking-wider">{key}</span>
                      <button
                        onClick={() => cms.toggleSection(key as keyof CmsState['sectionVisibility'])}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          isVisible ? 'bg-emerald-600 text-white' : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {isVisible ? 'VISIBLE' : 'HIDDEN'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-6 rounded-3xl border ${theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'}`}>
                <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-rose-900" />
                  <span>Public Navigation Pages</span>
                </h3>

                <div className="space-y-3 text-xs">
                  {Object.entries(cms.pageVisibility).map(([page, isVisible]) => (
                    <div key={page} className="flex items-center justify-between p-3 rounded-xl border border-neutral-800/60 bg-neutral-900/30">
                      <span className="font-bold uppercase font-mono tracking-wider">{page}</span>
                      <button
                        onClick={() => cms.togglePage(page as Page)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          isVisible ? 'bg-emerald-600 text-white' : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {isVisible ? 'ENABLED' : 'DISABLED'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEO & OPENGRAPH TAB */}
        {activeTab === 'seo' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">SEO & OpenGraph Management</h1>
                <p className="text-xs text-neutral-400 mt-1">Dynamically update SEO title, meta description, keywords, and OpenGraph share cards for every page.</p>
              </div>
            </div>

            {/* Page Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {(['home', 'about', 'services', 'casestudies', 'team', 'blogs', 'contact'] as Page[]).map((p) => {
                const pageInfo = cms.pageSeoSettings?.[p];
                const isSelected = selectedSeoPage === p;
                return (
                  <button
                    key={p}
                    onClick={() => setSelectedSeoPage(p)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-rose-900 text-white shadow-lg shadow-rose-900/30'
                        : theme === 'dark'
                        ? 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
                        : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {pageInfo?.pageName || p}
                  </button>
                );
              })}
            </div>

            {/* SEO Form & Live Search Preview */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form Editor */}
              <div className={`lg:col-span-2 p-6 rounded-3xl border space-y-6 ${
                theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
              }`}>
                <div className="flex items-center justify-between border-b pb-4 border-neutral-800">
                  <h3 className="text-base font-bold flex items-center gap-2">
                    <Globe className="w-5 h-5 text-rose-900" />
                    <span>Edit SEO Metadata for <span className="text-rose-800 uppercase font-mono">{selectedSeoPage}</span></span>
                  </h3>
                  {seoSavedNotice && (
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/30 animate-pulse">
                      SEO Updated Successfully!
                    </span>
                  )}
                </div>

                <form onSubmit={handleSaveSeo} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-2 text-neutral-400">
                      SEO Title (Recommended: 50-60 characters)
                    </label>
                    <input
                      type="text"
                      value={seoForm.seoTitle}
                      onChange={(e) => setSeoForm({ ...seoForm, seoTitle: e.target.value })}
                      className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-rose-900 ${
                        theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                      }`}
                      placeholder="e.g. Webiknows IT Solutions | Custom Software & CRM"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-2 text-neutral-400">
                      Meta Description (Recommended: 150-160 characters)
                    </label>
                    <textarea
                      rows={3}
                      value={seoForm.metaDescription}
                      onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
                      className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-rose-900 ${
                        theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                      }`}
                      placeholder="Enter meta description for search engine result pages..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-2 text-neutral-400">
                      Meta Keywords (comma separated)
                    </label>
                    <input
                      type="text"
                      value={seoForm.keywords}
                      onChange={(e) => setSeoForm({ ...seoForm, keywords: e.target.value })}
                      className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-rose-900 ${
                        theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                      }`}
                      placeholder="custom software, crm development, figma tokens"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-2 text-neutral-400">
                        OpenGraph Title (Social Share Title)
                      </label>
                      <input
                        type="text"
                        value={seoForm.ogTitle}
                        onChange={(e) => setSeoForm({ ...seoForm, ogTitle: e.target.value })}
                        className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-rose-900 ${
                          theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                        }`}
                        placeholder="OpenGraph Share Title"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-2 text-neutral-400">
                        OpenGraph Image URL
                      </label>
                      <input
                        type="text"
                        value={seoForm.ogImage}
                        onChange={(e) => setSeoForm({ ...seoForm, ogImage: e.target.value })}
                        className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-rose-900 ${
                          theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                        }`}
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-2 text-neutral-400">
                      OpenGraph Description (Social Share Description)
                    </label>
                    <textarea
                      rows={2}
                      value={seoForm.ogDescription}
                      onChange={(e) => setSeoForm({ ...seoForm, ogDescription: e.target.value })}
                      className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-rose-900 ${
                        theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                      }`}
                      placeholder="OpenGraph description for LinkedIn, Twitter, and WhatsApp previews..."
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-rose-900 hover:bg-rose-950 transition-colors shadow-lg shadow-rose-900/30 cursor-pointer flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save SEO Settings for {seoForm.pageName}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Live Preview Column */}
              <div className="space-y-6">
                <div className={`p-6 rounded-3xl border space-y-4 ${
                  theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
                }`}>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                    <Search className="w-4 h-4 text-rose-900" />
                    <span>Google Search Result Preview</span>
                  </h4>

                  <div className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-1.5 text-left">
                    <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 font-mono">
                      <span>https://webiknows.com</span>
                      <span>›</span>
                      <span className="text-neutral-300">{selectedSeoPage}</span>
                    </div>
                    <div className="text-sm font-medium text-blue-400 hover:underline cursor-pointer line-clamp-1">
                      {seoForm.seoTitle || 'Page Title'}
                    </div>
                    <div className="text-xs text-neutral-300 line-clamp-2">
                      {seoForm.metaDescription || 'Meta description will appear here in Google search results...'}
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-3xl border space-y-4 ${
                  theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
                }`}>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-rose-900" />
                    <span>Social Share Card Preview (OpenGraph)</span>
                  </h4>

                  <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 text-left">
                    {seoForm.ogImage && (
                      <div className="h-36 w-full overflow-hidden bg-neutral-800">
                        <img src={seoForm.ogImage} alt="OG Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-4 space-y-1">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">WEBIKNOWS.COM</div>
                      <div className="text-xs font-bold text-white line-clamp-1">{seoForm.ogTitle || seoForm.seoTitle || 'Social Title'}</div>
                      <div className="text-[11px] text-neutral-400 line-clamp-2">{seoForm.ogDescription || seoForm.metaDescription || 'Social description preview...'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT INFO & GLOBAL OFFICE HUBS CRUD TAB */}
        {activeTab === 'contact-crud' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
                  <MapPin className="w-7 h-7 text-rose-900" />
                  <span>Contact Info & Global Hubs CRUD</span>
                </h1>
                <p className="text-xs text-neutral-400 mt-1">
                  Full administrative CRUD access to update Contact Number, Email ID, Office Address, WhatsApp channels, and Global Studio Office Hubs.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setEditingOffice(null);
                    setIsOfficeModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-rose-900 hover:bg-rose-950 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-rose-900/30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Office Hub</span>
                </button>
              </div>
            </div>

            {/* 1. PRIMARY CONTACT INFORMATION FORM */}
            <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
              theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-900/10 text-rose-800 border border-rose-800/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold">Primary Site Contact Details</h2>
                    <p className="text-xs text-neutral-400">
                      These credentials appear prominently in the website header, footer, and contact discovery sections.
                    </p>
                  </div>
                </div>

                {metadataSavedNotice && (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-950/40 px-3.5 py-1.5 rounded-xl border border-emerald-500/30">
                    <Check className="w-4 h-4" /> Saved & Updated Live in Footer!
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveMetadata} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5 text-xs">
                  {/* Contact Number */}
                  <div>
                    <label className="block font-bold mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-rose-800" />
                        <span>Direct Contact Number (Phone / Mobile) *</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      value={metadataForm.contactPhone || ''}
                      onChange={(e) => setMetadataForm({ ...metadataForm, contactPhone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={`w-full p-3.5 rounded-xl border font-mono outline-none focus:border-rose-800 ${
                        theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                      }`}
                      required
                    />
                    <span className="text-[10px] text-neutral-500 mt-1 block">Visible in Footer & Call buttons</span>
                  </div>

                  {/* Public Email ID */}
                  <div>
                    <label className="block font-bold mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-rose-800" />
                        <span>Inquiries & RFP Email ID *</span>
                      </span>
                    </label>
                    <input
                      type="email"
                      value={metadataForm.contactEmail || ''}
                      onChange={(e) => setMetadataForm({ ...metadataForm, contactEmail: e.target.value })}
                      placeholder="contact@webiknows.com"
                      className={`w-full p-3.5 rounded-xl border font-mono outline-none focus:border-rose-800 ${
                        theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                      }`}
                      required
                    />
                    <span className="text-[10px] text-neutral-500 mt-1 block">Direct destination for incoming client inquiries</span>
                  </div>

                  {/* Registered Office Address */}
                  <div className="sm:col-span-2">
                    <label className="block font-bold mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-800" />
                      <span>Headquarters / Registered Physical Address *</span>
                    </label>
                    <input
                      type="text"
                      value={metadataForm.address || ''}
                      onChange={(e) => setMetadataForm({ ...metadataForm, address: e.target.value })}
                      placeholder="Tech City, Powai IT Corridor, Mumbai, Maharashtra 400076, India"
                      className={`w-full p-3.5 rounded-xl border outline-none focus:border-rose-800 ${
                        theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                      }`}
                      required
                    />
                    <span className="text-[10px] text-neutral-500 mt-1 block">Displayed in Footer "Address"</span>
                  </div>

                  {/* WhatsApp Support Number */}
                  <div>
                    <label className="block font-bold mb-1.5 flex items-center gap-1.5">
                      <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp Support Number</span>
                    </label>
                    <input
                      type="text"
                      value={metadataForm.whatsappNumber || ''}
                      onChange={(e) => setMetadataForm({ ...metadataForm, whatsappNumber: e.target.value })}
                      placeholder="+91 98200 12345"
                      className={`w-full p-3.5 rounded-xl border font-mono outline-none focus:border-rose-800 ${
                        theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                      }`}
                    />
                    <span className="text-[10px] text-neutral-500 mt-1 block">Official WhatsApp contact line</span>
                  </div>

                  {/* WhatsApp Direct Chat URL */}
                  <div>
                    <label className="block font-bold mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>WhatsApp Direct Chat URL</span>
                      </span>
                      {metadataForm.whatsappUrl && (
                        <a
                          href={metadataForm.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-500 hover:underline flex items-center gap-1 text-[11px]"
                        >
                          <ExternalLink className="w-3 h-3" /> Test Chat
                        </a>
                      )}
                    </label>
                    <input
                      type="url"
                      value={metadataForm.whatsappUrl || ''}
                      onChange={(e) => setMetadataForm({ ...metadataForm, whatsappUrl: e.target.value })}
                      placeholder="https://wa.me/919820012345?text=Hello%20Webiknows..."
                      className={`w-full p-3.5 rounded-xl border font-mono outline-none focus:border-rose-800 ${
                        theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                      }`}
                    />
                    <span className="text-[10px] text-neutral-500 mt-1 block">Clicking WhatsApp Direct anywhere on the site opens this link</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-rose-900 hover:bg-rose-950 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-rose-900/30 cursor-pointer flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Primary Contact Details</span>
                  </button>
                </div>
              </form>
            </div>

            {/* 2. GLOBAL OFFICE HUBS & LOCATIONS CRUD */}
            <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
              theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-900/10 text-rose-800 border border-rose-800/20">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold flex items-center gap-2">
                      <span>Global Studio Office Hubs CRUD</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-neutral-800 text-neutral-300">
                        {(cms.officeLocations || []).length} Locations
                      </span>
                    </h2>
                    <p className="text-xs text-neutral-400">
                      Create, Edit, Delete, or Pause individual office hubs (Mumbai HQ, London, San Francisco, etc.) displayed across the website.
                    </p>
                  </div>
                </div>

                {/* Search Box */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={officeSearch}
                    onChange={(e) => setOfficeSearch(e.target.value)}
                    placeholder="Search office by city/name..."
                    className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none ${
                      theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                    }`}
                  />
                </div>
              </div>

              {/* Office Hubs Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(cms.officeLocations || [])
                  .filter((loc) => {
                    if (!officeSearch.trim()) return true;
                    const q = officeSearch.toLowerCase();
                    return (
                      loc.name.toLowerCase().includes(q) ||
                      loc.city.toLowerCase().includes(q) ||
                      loc.division.toLowerCase().includes(q) ||
                      loc.email.toLowerCase().includes(q) ||
                      loc.address.toLowerCase().includes(q)
                    );
                  })
                  .map((office) => (
                    <div
                      key={office.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                        office.active
                          ? theme === 'dark'
                            ? 'bg-neutral-900/60 border-neutral-800 hover:border-rose-800/50'
                            : 'bg-neutral-50 border-neutral-200/90 hover:border-rose-800/50 shadow-xs'
                          : 'opacity-60 border-dashed border-neutral-800'
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Top Badges */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {office.isHq && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-rose-900 text-white shadow-xs">
                                GLOBAL HQ
                              </span>
                            )}
                            <span className="text-xs font-mono font-bold text-neutral-400">
                              {office.city}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => cms.toggleOfficeLocation(office.id)}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase cursor-pointer transition-colors ${
                              office.active
                                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                            }`}
                            title="Toggle public visibility"
                          >
                            {office.active ? 'ACTIVE' : 'PAUSED'}
                          </button>
                        </div>

                        {/* Office Name & Division */}
                        <div>
                          <h3 className="text-base font-bold text-balance">{office.name}</h3>
                          <p className="text-xs text-rose-900 dark:text-rose-800 font-semibold mt-0.5">
                            {office.division}
                          </p>
                        </div>

                        {/* Physical Address */}
                        <div className="flex items-start gap-2 text-xs text-neutral-400">
                          <MapPin className="w-3.5 h-3.5 text-rose-800 shrink-0 mt-0.5" />
                          <p className="leading-relaxed">{office.address}</p>
                        </div>

                        {/* Phone & Email */}
                        <div className="pt-1 space-y-1.5 text-xs font-mono">
                          <div className="flex items-center justify-between">
                            <a
                              href={`tel:${office.phone.replace(/\s+/g, '')}`}
                              className="flex items-center gap-1.5 font-bold hover:text-rose-800 transition-colors"
                            >
                              <Phone className="w-3 h-3 text-neutral-500" />
                              <span>{office.phone}</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(office.phone);
                              }}
                              className="text-[10px] text-neutral-500 hover:text-white cursor-pointer"
                              title="Copy phone"
                            >
                              Copy
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <a
                              href={`mailto:${office.email}`}
                              className="flex items-center gap-1.5 text-neutral-300 hover:text-rose-800 transition-colors truncate"
                            >
                              <Mail className="w-3 h-3 text-neutral-500" />
                              <span className="truncate">{office.email}</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(office.email);
                              }}
                              className="text-[10px] text-neutral-500 hover:text-white cursor-pointer ml-1"
                              title="Copy email"
                            >
                              Copy
                            </button>
                          </div>
                        </div>

                        {/* Timezone Indicator */}
                        <div className="pt-1 flex items-center gap-1.5 text-[11px] font-mono text-neutral-500">
                          <Clock className="w-3 h-3 text-rose-800" />
                          <span>Timezone: {office.timezone}</span>
                        </div>
                      </div>

                      {/* Card Bottom Actions */}
                      <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingOffice(office);
                            setIsOfficeModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-800/80 hover:bg-neutral-700 text-xs font-bold text-neutral-200 cursor-pointer flex items-center gap-1.5"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${office.name}?`)) {
                              cms.deleteOfficeLocation(office.id);
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg border border-red-900/40 bg-rose-950/20 hover:bg-red-900/40 text-xs font-bold text-rose-700 cursor-pointer flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {(cms.officeLocations || []).length === 0 && (
                <div className="py-12 text-center text-neutral-500 text-xs space-y-3">
                  <Building2 className="w-10 h-10 mx-auto text-neutral-600" />
                  <p>No office locations added yet. Click "+ Add New Office Hub" above to create one.</p>
                </div>
              )}
            </div>

            {/* 3. LIVE FOOTER PREVIEW CARD */}
            <div className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
              theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
            }`}>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                <Eye className="w-4 h-4 text-rose-900" />
                <span>Live Footer Preview (How Contact Info Appears to Public Visitors)</span>
              </div>

              <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-950 text-white space-y-4 max-w-md">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span className="text-xs font-mono font-bold text-rose-800">// 03 CONTACT INFO</span>
                  <span className="text-[10px] font-mono text-emerald-400">● ACTIVE</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block">Contact Number</span>
                    <span className="font-mono font-extrabold text-base text-white">{metadataForm.contactPhone || '+91 98765 43210'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block">Email ID</span>
                    <span className="font-mono font-bold text-rose-700 underline">{metadataForm.contactEmail || 'contact@webiknows.com'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block">Address</span>
                    <span className="text-neutral-300">{metadataForm.address || 'Tech City, Mumbai, Maharashtra 400076, India'}</span>
                  </div>
                  <div className="pt-1 flex items-center gap-2 text-emerald-400">
                    <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp Direct Channel Active: {metadataForm.whatsappNumber || '+91 98200 12345'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS & NOTIFICATION CONFIG TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-8 max-w-2xl">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Notification & Site Settings</h1>
              <p className="text-xs text-neutral-400 mt-1">Configure admin notification email for incoming leads, strategy session bookings, and site metadata.</p>
            </div>

            {/* Notification Email Settings Form */}
            <form onSubmit={handleSaveNotificationEmail} className={`p-6 rounded-3xl border space-y-4 ${
              theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
            }`}>
              <div className="flex items-center gap-2 text-sm font-bold text-rose-800 uppercase tracking-wider font-mono">
                <Bell className="w-4 h-4" />
                <span>Admin Notification Routing Email</span>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed">
                Enter the email address where all website contact form submissions and strategy meeting schedule requests will be dispatched:
              </p>

              <div>
                <label className="block text-xs font-bold mb-1">Admin Notification Email ID</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={notificationEmailInput}
                    onChange={(e) => setNotificationEmailInput(e.target.value)}
                    placeholder="admin@webiknows.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs outline-none focus:border-rose-800 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                {emailSavedNotice && (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-4 h-4" /> Notification email saved!
                  </span>
                )}
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-rose-900 hover:bg-rose-950 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-rose-900/30 cursor-pointer ml-auto"
                >
                  Save Notification Email
                </button>
              </div>
            </form>

            {/* Public Contact Info Form (Footer & Public Display) */}
            <div className={`p-6 rounded-3xl border space-y-5 ${
              theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
            }`}>
              <div className="flex items-center justify-between border-b border-neutral-800/40 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-rose-900/10 text-rose-800 border border-rose-800/20">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold">Public Contact Info (Footer & Site Display)</h3>
                    <p className="text-xs text-neutral-400">
                      Update the Contact Number, Email ID, and Office Address displayed in the website Footer.
                    </p>
                  </div>
                </div>

                {metadataSavedNotice && (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                    <Check className="w-4 h-4" /> Saved & Updated in Footer!
                  </span>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                {/* Contact Number */}
                <div>
                  <label className="block font-bold mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-rose-800" />
                    <span>Contact Number (Phone / Mobile)</span>
                  </label>
                  <input
                    type="text"
                    value={metadataForm.contactPhone || ''}
                    onChange={(e) => setMetadataForm({ ...metadataForm, contactPhone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono focus:border-rose-800 outline-none"
                  />
                  <span className="text-[10px] text-neutral-500 mt-1 block">Displayed in Footer "Contact Number"</span>
                </div>

                {/* Email ID */}
                <div>
                  <label className="block font-bold mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-rose-800" />
                    <span>Email ID (Public)</span>
                  </label>
                  <input
                    type="email"
                    value={metadataForm.contactEmail || ''}
                    onChange={(e) => setMetadataForm({ ...metadataForm, contactEmail: e.target.value })}
                    placeholder="contact@webiknows.com"
                    className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono focus:border-rose-800 outline-none"
                  />
                  <span className="text-[10px] text-neutral-500 mt-1 block">Displayed in Footer "Email ID"</span>
                </div>

                {/* Office Address */}
                <div className="sm:col-span-2">
                  <label className="block font-bold mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-800" />
                    <span>Office Address / Headquarters</span>
                  </label>
                  <input
                    type="text"
                    value={metadataForm.address || ''}
                    onChange={(e) => setMetadataForm({ ...metadataForm, address: e.target.value })}
                    placeholder="Tech City, Mumbai, Maharashtra 400076, India"
                    className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:border-rose-800 outline-none"
                  />
                  <span className="text-[10px] text-neutral-500 mt-1 block">Displayed in Footer "Address"</span>
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block font-bold mb-1 flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>WhatsApp Phone Number</span>
                  </label>
                  <input
                    type="text"
                    value={metadataForm.whatsappNumber || ''}
                    onChange={(e) => setMetadataForm({ ...metadataForm, whatsappNumber: e.target.value })}
                    placeholder="+91 98200 12345"
                    className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono focus:border-rose-800 outline-none"
                  />
                </div>

                {/* WhatsApp Chat URL */}
                <div>
                  <label className="block font-bold mb-1 flex items-center gap-1.5">
                    <Link className="w-3.5 h-3.5 text-emerald-500" />
                    <span>WhatsApp Chat URL</span>
                  </label>
                  <input
                    type="text"
                    value={metadataForm.whatsappUrl || ''}
                    onChange={(e) => setMetadataForm({ ...metadataForm, whatsappUrl: e.target.value })}
                    placeholder="https://wa.me/919820012345?text=Hello"
                    className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono text-[11px] focus:border-rose-800 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400">
                  Changes save to browser storage and update the footer instantly.
                </span>
                <button
                  type="button"
                  onClick={handleSaveMetadata}
                  className="px-6 py-2.5 rounded-xl bg-rose-900 hover:bg-rose-950 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-rose-900/30 cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Contact Details</span>
                </button>
              </div>
            </div>

            {/* Site Metadata & Branding Form */}
            <div className={`p-6 rounded-3xl border space-y-4 ${
              theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800' : 'bg-white border-neutral-200'
            }`}>
              <h3 className="text-base font-bold">Hero & Branding Metadata</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">Agency Name</label>
                  <input
                    type="text"
                    value={metadataForm.agencyName}
                    onChange={(e) => setMetadataForm({ ...metadataForm, agencyName: e.target.value })}
                    className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Tagline</label>
                  <input
                    type="text"
                    value={metadataForm.tagline}
                    onChange={(e) => setMetadataForm({ ...metadataForm, tagline: e.target.value })}
                    className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Hero Display Headline</label>
                  <textarea
                    rows={2}
                    value={metadataForm.heroHeadline}
                    onChange={(e) => setMetadataForm({ ...metadataForm, heroHeadline: e.target.value })}
                    className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveMetadata}
                  className="px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase shadow-sm cursor-pointer"
                >
                  Save Branding Metadata
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              <button
                onClick={() => {
                  if (confirm('Reset all CMS content to default state?')) {
                    cms.resetToDefaults();
                  }
                }}
                className="px-4 py-2.5 rounded-xl border border-red-900/50 bg-rose-950/20 text-rose-700 text-xs font-bold hover:bg-red-900/40 cursor-pointer flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset CMS to Original Factory Defaults</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* LEAD FORM MODAL */}
      {isLeadModalOpen && (
        <LeadModalForm
          lead={editingLead}
          onClose={() => setIsLeadModalOpen(false)}
          onSave={(updatedLead) => {
            if (editingLead) {
              cms.updateLead(updatedLead);
            } else {
              cms.addLead(updatedLead);
            }
            setIsLeadModalOpen(false);
          }}
        />
      )}

      {/* SOCIAL MEDIA LINK MODAL */}
      {isSocialModalOpen && (
        <SocialModalForm
          social={editingSocial}
          onClose={() => setIsSocialModalOpen(false)}
          onSave={(updatedSocial) => {
            if (editingSocial) {
              cms.updateSocialLink(updatedSocial);
            } else {
              cms.addSocialLink(updatedSocial);
            }
            setIsSocialModalOpen(false);
          }}
        />
      )}

      {/* SITE FAQ MODAL */}
      {isSiteFaqModalOpen && (
        <SiteFaqModalForm
          faq={editingSiteFaq}
          onClose={() => setIsSiteFaqModalOpen(false)}
          onSave={(updatedFaq) => {
            if (editingSiteFaq) {
              cms.updateSiteFaq(updatedFaq);
            } else {
              cms.addSiteFaq(updatedFaq);
            }
            setIsSiteFaqModalOpen(false);
          }}
        />
      )}

      {/* MEETING FORM MODAL */}
      {isMeetingModalOpen && (
        <MeetingModalForm
          meeting={editingMeeting}
          onClose={() => setIsMeetingModalOpen(false)}
          onSave={(updatedMeeting) => {
            if (editingMeeting) {
              cms.updateMeetingRequest(updatedMeeting);
            } else {
              cms.addMeetingRequest(updatedMeeting);
            }
            setIsMeetingModalOpen(false);
          }}
        />
      )}

      {/* AI FAQ FORM MODAL */}
      {isAiFaqModalOpen && (
        <AiFaqModalForm
          faq={editingAiFaq}
          onClose={() => setIsAiFaqModalOpen(false)}
          onSave={(updatedFaq) => {
            if (editingAiFaq) {
              cms.updateAiFaq(updatedFaq);
            } else {
              cms.addAiFaq(updatedFaq);
            }
            setIsAiFaqModalOpen(false);
          }}
        />
      )}

      {/* AI LEAD FORM MODAL */}
      {isAiLeadModalOpen && (
        <AiLeadModalForm
          lead={editingAiLead}
          onClose={() => setIsAiLeadModalOpen(false)}
          onSave={(updatedLead) => {
            if (editingAiLead) {
              cms.updateAiLead(updatedLead);
            } else {
              cms.addAiLead(updatedLead);
            }
            setIsAiLeadModalOpen(false);
          }}
        />
      )}

      {/* SERVICE FORM MODAL */}
      {isServiceModalOpen && (
        <ServiceModalForm
          service={editingService}
          onClose={() => setIsServiceModalOpen(false)}
          onSave={(svc) => {
            if (editingService) {
              cms.updateService(svc);
            } else {
              cms.addService(svc);
            }
            setIsServiceModalOpen(false);
          }}
        />
      )}

      {/* CASE STUDY FORM MODAL */}
      {isCaseModalOpen && (
        <CaseModalForm
          study={editingCase}
          onClose={() => setIsCaseModalOpen(false)}
          onSave={(cs) => {
            if (editingCase) {
              cms.updateCaseStudy(cs);
            } else {
              cms.addCaseStudy(cs);
            }
            setIsCaseModalOpen(false);
          }}
        />
      )}

      {/* TESTIMONIAL FORM MODAL */}
      {isTestimonialModalOpen && (
        <TestimonialModalForm
          item={editingTestimonial}
          onClose={() => setIsTestimonialModalOpen(false)}
          onSave={(t) => {
            if (editingTestimonial) {
              cms.updateTestimonial(t);
            } else {
              cms.addTestimonial(t);
            }
            setIsTestimonialModalOpen(false);
          }}
        />
      )}

      {/* WHY CHOOSE FORM MODAL */}
      {isWhyChooseModalOpen && (
        <WhyChooseModalForm
          item={editingWhyChoose}
          onClose={() => setIsWhyChooseModalOpen(false)}
          onSave={(w) => {
            if (editingWhyChoose) {
              cms.updateWhyChooseUs(w);
            } else {
              cms.addWhyChooseUs(w);
            }
            setIsWhyChooseModalOpen(false);
          }}
        />
      )}

      {/* TEAM MEMBER FORM MODAL */}
      {isTeamModalOpen && (
        <TeamModalForm
          member={editingTeam}
          onClose={() => setIsTeamModalOpen(false)}
          onSave={(m) => {
            if (editingTeam) {
              cms.updateTeamMember(m);
            } else {
              cms.addTeamMember(m);
            }
            setIsTeamModalOpen(false);
          }}
        />
      )}

      {/* BLOG FORM MODAL */}
      {isBlogModalOpen && (
        <BlogModalForm
          blog={editingBlog}
          onClose={() => setIsBlogModalOpen(false)}
          onSave={(b) => {
            if (editingBlog) {
              cms.updateBlog(b);
            } else {
              cms.addBlog(b);
            }
            setIsBlogModalOpen(false);
          }}
        />
      )}

      {/* OFFICE LOCATION FORM MODAL */}
      {isOfficeModalOpen && (
        <OfficeLocationModalForm
          office={editingOffice}
          onClose={() => {
            setIsOfficeModalOpen(false);
            setEditingOffice(null);
          }}
          onSave={(loc) => {
            if (editingOffice) {
              cms.updateOfficeLocation(loc);
            } else {
              cms.addOfficeLocation(loc);
            }
            setIsOfficeModalOpen(false);
            setEditingOffice(null);
          }}
        />
      )}

      {/* MEETING SLOT FORM MODAL */}
      {isMeetingSlotModalOpen && (
        <MeetingSlotModal
          slot={editingMeetingSlot}
          theme={theme}
          onClose={() => {
            setIsMeetingSlotModalOpen(false);
            setEditingMeetingSlot(null);
          }}
          onSave={(slot) => {
            if (editingMeetingSlot) {
              cms.updateMeetingSlot(slot);
            } else {
              cms.addMeetingSlot(slot);
            }
            setIsMeetingSlotModalOpen(false);
            setEditingMeetingSlot(null);
          }}
        />
      )}

    </div>
  );
};

// LEAD MODAL FORM COMPONENT
const LeadModalForm: React.FC<{
  lead: LeadItem | null;
  onClose: () => void;
  onSave: (lead: LeadItem) => void;
}> = ({ lead, onClose, onSave }) => {
  const [form, setForm] = useState<LeadItem>(lead || {
    id: 'lead-' + Date.now(),
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '₹50,000 - ₹100,000',
    message: '',
    status: 'New',
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    notes: '',
    notificationSent: true
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0F0F12] text-white border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4 my-8">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-rose-900" />
            <h2 className="text-xl font-bold">{lead ? 'Edit Lead Received' : 'Add Manual Lead'}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-800"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-3 text-xs max-h-[65vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Work Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Phone Number</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Company Name</label>
              <input
                type="text"
                value={form.company || ''}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Budget Range</label>
              <select
                value={form.budget || '₹50,000 - ₹100,000'}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              >
                <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                <option value="₹50,000 - ₹100,000">₹50,000 - ₹100,000</option>
                <option value="₹100,000+">₹100,000+</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1">Lead Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              >
                <option value="New">New</option>
                <option value="In Discussion">In Discussion</option>
                <option value="Qualified">Qualified</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Project Brief / Message</label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Admin Internal Notes</label>
            <textarea
              rows={2}
              value={form.notes || ''}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="e.g. Discussed budget scope over call, sent contract."
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-amber-300 font-mono"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 text-xs font-bold uppercase">Cancel</button>
          <button
            onClick={() => onSave(form)}
            className="px-6 py-2.5 rounded-xl bg-rose-900 text-white text-xs font-bold uppercase shadow-md shadow-rose-900/30"
          >
            Save Lead
          </button>
        </div>
      </div>
    </div>
  );
};

// MEETING MODAL FORM COMPONENT
const MeetingModalForm: React.FC<{
  meeting: MeetingRequestItem | null;
  onClose: () => void;
  onSave: (meeting: MeetingRequestItem) => void;
}> = ({ meeting, onClose, onSave }) => {
  const [form, setForm] = useState<MeetingRequestItem>(meeting || {
    id: 'meet-' + Date.now(),
    name: '',
    email: '',
    phone: '',
    company: '',
    date: new Date().toISOString().split('T')[0],
    slot: '10:30 AM IST',
    topic: 'Strategy Session & Software Architecture Consultation',
    status: 'Pending',
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    notes: '',
    notificationSent: true
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0F0F12] text-white border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4 my-8">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-rose-900" />
            <h2 className="text-xl font-bold">{meeting ? 'Reschedule / Edit Meeting Request' : 'Schedule Strategy Session'}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-800"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-3 text-xs max-h-[65vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Client Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Work Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Phone Number</label>
              <input
                type="text"
                value={form.phone || ''}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Company</label>
              <input
                type="text"
                value={form.company || ''}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Scheduled Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Time Slot</label>
              <select
                value={form.slot}
                onChange={(e) => setForm({ ...form, slot: e.target.value })}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono"
              >
                <option value="09:00 AM IST">09:00 AM IST</option>
                <option value="10:30 AM IST">10:30 AM IST</option>
                <option value="01:00 PM IST">01:00 PM IST</option>
                <option value="03:30 PM IST">03:30 PM IST</option>
                <option value="05:00 PM IST">05:00 PM IST</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Meeting Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-bold"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1">Topic / Agenda</label>
              <input
                type="text"
                value={form.topic || ''}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Admin Internal Notes</label>
            <textarea
              rows={2}
              value={form.notes || ''}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="e.g. Calendar link sent to client email."
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-amber-300 font-mono"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 text-xs font-bold uppercase">Cancel</button>
          <button
            onClick={() => onSave(form)}
            className="px-6 py-2.5 rounded-xl bg-rose-900 text-white text-xs font-bold uppercase shadow-md shadow-rose-900/30"
          >
            Save Meeting Request
          </button>
        </div>
      </div>
    </div>
  );
};

// SERVICE FORM MODAL
const ServiceModalForm: React.FC<{
  service: Service | null;
  onClose: () => void;
  onSave: (service: Service) => void;
}> = ({ service, onClose, onSave }) => {
  const [form, setForm] = useState<Service>(service || {
    id: `svc-${Date.now()}`,
    name: '',
    tagline: '',
    description: '',
    iconName: 'Cpu',
    deliverables: ['Custom Software Architecture', 'Production React Application'],
    figmaFeatures: ['Variables & Tokens', 'Auto Layout 5'],
    techStack: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL'],
    estimatedTime: '4 - 8 Weeks',
    typicalRoi: '3.5x Velocity'
  });

  const [deliverablesInput, setDeliverablesInput] = useState((service?.deliverables || ['Custom Software Architecture', 'Production React Application']).join('\n'));
  const [techStackInput, setTechStackInput] = useState((service?.techStack || ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL']).join(', '));
  const [figmaFeaturesInput, setFigmaFeaturesInput] = useState((service?.figmaFeatures || ['Variables & Tokens', 'Auto Layout 5']).join(', '));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedService: Service = {
      ...form,
      deliverables: deliverablesInput.split('\n').map(s => s.trim()).filter(Boolean),
      techStack: techStackInput.split(',').map(s => s.trim()).filter(Boolean),
      figmaFeatures: figmaFeaturesInput.split(',').map(s => s.trim()).filter(Boolean),
    };
    onSave(updatedService);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0F0F12] text-white border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-5 my-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-rose-900" />
            <h2 className="text-xl font-bold">{service ? 'Edit Service Capability' : 'Add New Service Capability'}</h2>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-xl hover:bg-neutral-800 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs max-h-[65vh] overflow-y-auto pr-1">
          <div>
            <label className="block font-bold mb-1 text-neutral-300">Service / Capability Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Custom CRM Development & Automations"
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-semibold"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1 text-neutral-300">Domain Icon Emblem</label>
              <select
                value={form.iconName}
                onChange={(e) => setForm({ ...form, iconName: e.target.value })}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono"
              >
                <option value="Figma">Figma / Layers</option>
                <option value="LayoutGrid">LayoutGrid / CRM</option>
                <option value="Code">Code / React Web</option>
                <option value="Smartphone">Smartphone / Mobile</option>
                <option value="Cpu">Cpu / Enterprise System</option>
                <option value="Sparkles">Sparkles / Prototyping</option>
                <option value="Database">Database / PostgreSQL</option>
                <option value="Globe">Globe / Web Architecture</option>
                <option value="Workflow">Workflow / Pipeline</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1 text-neutral-300">Estimated Timeline SLA</label>
              <input
                type="text"
                value={form.estimatedTime}
                onChange={(e) => setForm({ ...form, estimatedTime: e.target.value })}
                placeholder="e.g. 4 - 8 Weeks"
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1 text-neutral-300">Short Tagline</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              placeholder="e.g. Tailored pipeline engines, automated sales workflows & data synchronization"
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1 text-neutral-300">Typical ROI Benchmark</label>
              <input
                type="text"
                value={form.typicalRoi}
                onChange={(e) => setForm({ ...form, typicalRoi: e.target.value })}
                placeholder="e.g. 184% Pipeline Velocity"
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-emerald-400 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-neutral-300">Figma Features (Comma Separated)</label>
              <input
                type="text"
                value={figmaFeaturesInput}
                onChange={(e) => setFigmaFeaturesInput(e.target.value)}
                placeholder="e.g. Variables & Modes, Component Properties"
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1 text-neutral-300">Full Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Detailed breakdown of the service, architecture, and value proposition..."
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white leading-relaxed"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1 text-neutral-300">Deliverables List (1 Deliverable per Line)</label>
            <textarea
              rows={4}
              value={deliverablesInput}
              onChange={(e) => setDeliverablesInput(e.target.value)}
              placeholder="Kanban & List Pipeline Views&#10;Automated Lead Scoring&#10;Custom Revenue Dashboards"
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono leading-relaxed"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1 text-neutral-300">Tech Stack Tokens (Comma Separated)</label>
            <input
              type="text"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              placeholder="React 19, TypeScript, Node.js, PostgreSQL, Webhooks"
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-rose-300 font-mono"
              required
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white text-xs font-bold uppercase cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-rose-900 hover:bg-rose-950 text-white text-xs font-bold uppercase shadow-lg shadow-rose-900/30 cursor-pointer"
            >
              Save Service Capability
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// CASE STUDY FORM MODAL
const CaseModalForm: React.FC<{
  study: CaseStudy | null;
  onClose: () => void;
  onSave: (study: CaseStudy) => void;
}> = ({ study, onClose, onSave }) => {
  const [form, setForm] = useState<CaseStudy>(study || {
    id: `cs-${Date.now()}`,
    title: '',
    subtitle: '',
    category: 'CRM Systems',
    client: '',
    timeline: '8 Weeks',
    summary: '',
    challenge: '',
    solution: '',
    results: [{ label: 'Performance', value: '3x Faster' }],
    deliverables: ['Custom Architecture'],
    techStack: ['React 19', 'PostgreSQL'],
    wireframeNodes: [{ label: 'Main Board', x: 100, y: 100 }],
    testimonial: { quote: 'Outstanding velocity.', author: 'Client Director', role: 'CTO', company: 'TechCorp' },
    metrics: { conversionBefore: '12%', conversionAfter: '28%', pipelineGrowth: '$12M', designSpeedUp: '3x' }
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0F0F12] text-white border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 my-8">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <h2 className="text-xl font-bold">{study ? 'Edit Case Study' : 'Add Case Study'}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-800"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-3 text-xs max-h-[60vh] overflow-y-auto">
          <div>
            <label className="block font-bold mb-1">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Client Name</label>
            <input
              type="text"
              value={form.client}
              onChange={(e) => setForm({ ...form, client: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Summary</label>
            <textarea
              rows={3}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 text-xs font-bold uppercase">Cancel</button>
          <button
            onClick={() => onSave(form)}
            className="px-6 py-2.5 rounded-xl bg-rose-900 text-white text-xs font-bold uppercase shadow-md shadow-rose-900/30"
          >
            Save Case Study
          </button>
        </div>
      </div>
    </div>
  );
};

// TESTIMONIAL FORM MODAL
const TestimonialModalForm: React.FC<{
  item: TestimonialItem | null;
  onClose: () => void;
  onSave: (item: TestimonialItem) => void;
}> = ({ item, onClose, onSave }) => {
  const [form, setForm] = useState<TestimonialItem>(item || {
    id: `t-${Date.now()}`,
    name: '',
    companyName: '',
    location: '',
    comment: ''
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0F0F12] text-white border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <h2 className="text-xl font-bold">{item ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-800"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold mb-1">Person Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Company Name</label>
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Comment / Feedback Quote</label>
            <textarea
              rows={3}
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 text-xs font-bold uppercase">Cancel</button>
          <button
            onClick={() => onSave(form)}
            className="px-6 py-2.5 rounded-xl bg-rose-900 text-white text-xs font-bold uppercase shadow-md shadow-rose-900/30"
          >
            Save Testimonial
          </button>
        </div>
      </div>
    </div>
  );
};

// WHY CHOOSE US FORM MODAL
const WhyChooseModalForm: React.FC<{
  item: WhyChooseUsItem | null;
  onClose: () => void;
  onSave: (item: WhyChooseUsItem) => void;
}> = ({ item, onClose, onSave }) => {
  const [form, setForm] = useState<WhyChooseUsItem>(item || {
    id: `why-${Date.now()}`,
    title: '',
    tag: '100% Verified',
    description: '',
    iconName: 'ShieldCheck'
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0F0F12] text-white border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <h2 className="text-xl font-bold">{item ? 'Edit Why Choose Item' : 'Add Why Choose Item'}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-800"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold mb-1">Item Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Tag / Pill Label</label>
            <input
              type="text"
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 text-xs font-bold uppercase">Cancel</button>
          <button
            onClick={() => onSave(form)}
            className="px-6 py-2.5 rounded-xl bg-rose-900 text-white text-xs font-bold uppercase shadow-md shadow-rose-900/30"
          >
            Save Item
          </button>
        </div>
      </div>
    </div>
  );
};

// TEAM MEMBER FORM MODAL
const TeamModalForm: React.FC<{
  member: TeamMember | null;
  onClose: () => void;
  onSave: (member: TeamMember) => void;
}> = ({ member, onClose, onSave }) => {
  const [form, setForm] = useState<TeamMember>(member || {
    id: `team-${Date.now()}`,
    name: '',
    role: '',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    location: 'Mumbai, India'
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0F0F12] text-white border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <h2 className="text-xl font-bold">{member ? 'Edit Team Member' : 'Add Team Member'}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-800"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold mb-1">Member Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Role Title</label>
            <input
              type="text"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Image URL</label>
            <input
              type="text"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 text-xs font-bold uppercase">Cancel</button>
          <button
            onClick={() => onSave(form)}
            className="px-6 py-2.5 rounded-xl bg-rose-900 text-white text-xs font-bold uppercase shadow-md shadow-rose-900/30"
          >
            Save Member
          </button>
        </div>
      </div>
    </div>
  );
};

// BLOG FORM MODAL
const BlogModalForm: React.FC<{
  blog: BlogPost | null;
  onClose: () => void;
  onSave: (blog: BlogPost) => void;
}> = ({ blog, onClose, onSave }) => {
  const [form, setForm] = useState<BlogPost>(blog || {
    id: `blog-${Date.now()}`,
    title: '',
    excerpt: '',
    content: '',
    category: 'Figma Systems',
    readTime: '5 min read',
    date: 'Oct 2026',
    author: { name: 'Engineering Team', role: 'System Architect' },
    tags: ['Engineering', 'Figma', 'React']
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0F0F12] text-white border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 my-8">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <h2 className="text-xl font-bold">{blog ? 'Edit Blog Article' : 'Create Blog Article'}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-800"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-3 text-xs max-h-[60vh] overflow-y-auto">
          <div>
            <label className="block font-bold mb-1">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Excerpt</label>
            <textarea
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Full Article Content</label>
            <textarea
              rows={5}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 text-xs font-bold uppercase">Cancel</button>
          <button
            onClick={() => onSave(form)}
            className="px-6 py-2.5 rounded-xl bg-rose-900 text-white text-xs font-bold uppercase shadow-md shadow-rose-900/30"
          >
            Save Article
          </button>
        </div>
      </div>
    </div>
  );
};

// AI FAQ MODAL FORM
const AiFaqModalForm: React.FC<{
  faq: AiConsultantFaqItem | null;
  onClose: () => void;
  onSave: (faq: AiConsultantFaqItem) => void;
}> = ({ faq, onClose, onSave }) => {
  const [form, setForm] = useState<AiConsultantFaqItem>(faq || {
    id: `ai-faq-${Date.now()}`,
    question: '',
    answer: '',
    category: 'General Q&A'
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0F0F12] text-white border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Bot className="w-5 h-5 text-rose-900" />
            {faq ? 'Edit AI Consultant Q&A' : 'Add AI Consultant Q&A'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-800"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold mb-1">Category / Topic</label>
            <input
              type="text"
              value={form.category || ''}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="e.g. Pricing & Budget, Timeline, Design Systems"
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Question *</label>
            <input
              type="text"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              placeholder="e.g. How much does a custom CRM engine cost?"
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Answer *</label>
            <textarea
              rows={4}
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              placeholder="Provide the detailed response for the AI Consultant..."
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 text-xs font-bold uppercase">Cancel</button>
          <button
            onClick={() => onSave(form)}
            className="px-6 py-2.5 rounded-xl bg-rose-900 text-white text-xs font-bold uppercase shadow-md shadow-rose-900/30"
          >
            Save Q&A
          </button>
        </div>
      </div>
    </div>
  );
};

// AI CONSULTANT LEAD MODAL FORM
const AiLeadModalForm: React.FC<{
  lead: AiConsultantLeadItem | null;
  onClose: () => void;
  onSave: (lead: AiConsultantLeadItem) => void;
}> = ({ lead, onClose, onSave }) => {
  const [form, setForm] = useState<AiConsultantLeadItem>(lead || {
    id: `ai-lead-${Date.now()}`,
    name: '',
    mobile: '',
    email: '',
    service: 'CRM Pipeline Engine',
    status: 'New',
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    notes: ''
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0F0F12] text-white border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-500" />
            {lead ? 'Edit AI Consultant Lead' : 'Add AI Consultant Lead'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-800"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold mb-1">Full Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold mb-1">Mobile Number *</label>
              <input
                type="text"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Email Address *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Service Requested *</label>
            <input
              type="text"
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Lead Status *</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as any })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="In Discussion">In Discussion</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-1">Admin Internal Notes</label>
            <textarea
              rows={3}
              value={form.notes || ''}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Add admin follow-up comments..."
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 text-xs font-bold uppercase">Cancel</button>
          <button
            onClick={() => onSave(form)}
            className="px-6 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold uppercase shadow-md shadow-purple-600/30"
          >
            Save Lead
          </button>
        </div>
      </div>
    </div>
  );
};


// SITE FAQ MODAL FORM COMPONENT
const SiteFaqModalForm: React.FC<{
  faq: SiteFaqItem | null;
  onClose: () => void;
  onSave: (faq: SiteFaqItem) => void;
}> = ({ faq, onClose, onSave }) => {
  const [form, setForm] = useState<SiteFaqItem>(faq || {
    id: `faq-${Date.now()}`,
    question: '',
    answer: '',
    category: 'Figma Systems'
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0F0F12] text-white border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-rose-800" />
            {faq ? 'Edit Website FAQ' : 'Add Website FAQ'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-800"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold mb-1">Question *</label>
            <input
              type="text"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              placeholder="e.g. How does the Figma-to-Code handoff work?"
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Category *</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
            >
              <option value="Figma Systems">Figma Systems</option>
              <option value="CRM Engineering">CRM Engineering</option>
              <option value="Process & Delivery">Process & Delivery</option>
              <option value="General">General</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-1">Detailed Answer *</label>
            <textarea
              rows={4}
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              placeholder="Provide clear technical explanation..."
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 text-xs font-bold uppercase">Cancel</button>
          <button
            onClick={() => onSave(form)}
            className="px-6 py-2.5 rounded-xl bg-rose-900 text-white text-xs font-bold uppercase shadow-md shadow-rose-900/30"
          >
            Save FAQ
          </button>
        </div>
      </div>
    </div>
  );
};


// SOCIAL MEDIA LINK MODAL FORM COMPONENT
const SocialModalForm: React.FC<{
  social: SocialMediaLinkItem | null;
  onClose: () => void;
  onSave: (social: SocialMediaLinkItem) => void;
}> = ({ social, onClose, onSave }) => {
  const [form, setForm] = useState<SocialMediaLinkItem>(social || {
    id: 'soc-' + Date.now(),
    platform: '',
    url: 'https://',
    iconName: 'Globe',
    enabled: true
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0F0F12] text-white border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Share2 className="w-5 h-5 text-rose-800" />
            {social ? 'Edit Social Media Link' : 'Add Social Media Platform'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-800"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold mb-1">Platform Name *</label>
            <input
              type="text"
              value={form.platform}
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
              placeholder="e.g. LinkedIn, Twitter / X, GitHub, Instagram"
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Target Profile URL *</label>
            <input
              type="url"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="https://linkedin.com/company/youragency"
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Icon Type</label>
            <select
              value={form.iconName}
              onChange={(e) => setForm({ ...form, iconName: e.target.value })}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono"
            >
              <option value="Linkedin">LinkedIn</option>
              <option value="Twitter">Twitter / X</option>
              <option value="Github">GitHub</option>
              <option value="Instagram">Instagram</option>
              <option value="Youtube">YouTube</option>
              <option value="Facebook">Facebook</option>
              <option value="MessageCircle">WhatsApp</option>
              <option value="Globe">General Web / Globe</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="enableSocial"
              checked={form.enabled}
              onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
              className="w-4 h-4 rounded accent-rose-900 cursor-pointer"
            />
            <label htmlFor="enableSocial" className="font-bold text-neutral-200 cursor-pointer">
              Enable & Display in Footer immediately
            </label>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 text-xs font-bold uppercase">Cancel</button>
          <button
            onClick={() => onSave(form)}
            className="px-6 py-2.5 rounded-xl bg-rose-900 text-white text-xs font-bold uppercase shadow-md shadow-rose-900/30"
          >
            Save Social Link
          </button>
        </div>
      </div>
    </div>
  );
};
// OFFICE LOCATION MODAL FORM COMPONENT
const OfficeLocationModalForm: React.FC<{
  office: OfficeLocationItem | null;
  onClose: () => void;
  onSave: (office: OfficeLocationItem) => void;
}> = ({ office, onClose, onSave }) => {
  const [form, setForm] = useState<OfficeLocationItem>(office || {
    id: `office-${Date.now()}`,
    name: '',
    division: '',
    city: '',
    address: '',
    phone: '',
    email: '',
    timezone: 'Asia/Kolkata',
    isHq: false,
    active: true
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0F0F12] text-white border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Building2 className="w-5 h-5 text-rose-900" />
            {office ? 'Edit Studio Office Hub' : 'Add New Studio Office Hub'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-800"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold mb-1">Office Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. London Operations & Design Studio"
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold mb-1">Division / Department *</label>
              <input
                type="text"
                value={form.division}
                onChange={(e) => setForm({ ...form, division: e.target.value })}
                placeholder="e.g. Cloud Division & Enterprise Hosting"
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-1">City / Region *</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="e.g. London, UK"
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Full Physical Address *</label>
            <textarea
              rows={2}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="30 St Mary Axe, City of London, EC3A 8EP"
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold mb-1">Contact Number *</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+44 20 7946 0912"
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Email ID *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="london@webiknows.com"
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Timezone String</label>
            <input
              type="text"
              value={form.timezone}
              onChange={(e) => setForm({ ...form, timezone: e.target.value })}
              placeholder="e.g. Europe/London, Asia/Kolkata, America/Los_Angeles"
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono"
              required
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isHq"
                checked={form.isHq}
                onChange={(e) => setForm({ ...form, isHq: e.target.checked })}
                className="w-4 h-4 rounded accent-rose-900 cursor-pointer"
              />
              <label htmlFor="isHq" className="font-bold text-neutral-200 cursor-pointer">
                Mark as Global HQ
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="officeActive"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
                className="w-4 h-4 rounded accent-rose-900 cursor-pointer"
              />
              <label htmlFor="officeActive" className="font-bold text-neutral-200 cursor-pointer">
                Active & Visible
              </label>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 text-xs font-bold uppercase">Cancel</button>
          <button
            onClick={() => onSave(form)}
            className="px-6 py-2.5 rounded-xl bg-rose-900 text-white text-xs font-bold uppercase shadow-md shadow-rose-900/30"
          >
            Save Office Hub
          </button>
        </div>
      </div>
    </div>
  );
};

// Meeting Slot Modal for CMS CRUD
const MeetingSlotModal: React.FC<{
  slot: MeetingSlotItem | null;
  onClose: () => void;
  onSave: (slot: MeetingSlotItem) => void;
  theme: Theme;
}> = ({ slot, onClose, onSave, theme }) => {
  const [form, setForm] = useState<MeetingSlotItem>(slot || {
    id: `slot-${Date.now()}`,
    timeString: '11:00 AM IST',
    label: 'Consultation Slot',
    active: true
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className={`w-full max-w-lg p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-6 ${
        theme === 'dark' ? 'bg-[#0E0E12] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
      }`}>
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-900/10 text-rose-800 border border-rose-800/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold">{slot ? 'Edit Meeting Slot' : 'Add New Meeting Slot'}</h3>
              <p className="text-xs text-neutral-400">Configure time string and label for the Schedule Meeting form</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-neutral-800 cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold mb-1.5">Time String (e.g. 10:30 AM IST) *</label>
            <input
              type="text"
              value={form.timeString}
              onChange={(e) => setForm({ ...form, timeString: e.target.value })}
              placeholder="10:30 AM IST"
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1.5">Slot Label / Description</label>
            <input
              type="text"
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              placeholder="Morning Strategy Slot"
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="slotActive"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="w-4 h-4 rounded accent-rose-900 cursor-pointer"
            />
            <label htmlFor="slotActive" className="font-bold text-neutral-200 cursor-pointer">
              Active & Available for Selection in Form
            </label>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 text-xs font-bold uppercase cursor-pointer">Cancel</button>
          <button
            onClick={() => onSave(form)}
            className="px-6 py-2.5 rounded-xl bg-rose-900 text-white text-xs font-bold uppercase shadow-md shadow-rose-900/30 cursor-pointer"
          >
            Save Meeting Slot
          </button>
        </div>
      </div>
    </div>
  );
};
