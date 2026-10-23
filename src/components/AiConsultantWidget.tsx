import React, { useState } from 'react';
import { Theme } from '../types';
import { useCms } from '../context/CmsContext';
import { MessageSquare, X, Send, Bot, User, Sparkles, CheckCircle2, Phone, Mail, UserCheck, Briefcase, Lock, ArrowRight, ShieldCheck, MailCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../hooks/useSound';
import { CaptchaField } from './CaptchaField';

interface AiConsultantWidgetProps {
  theme: Theme;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export const AiConsultantWidget: React.FC<AiConsultantWidgetProps> = ({
  theme
}) => {
  const cms = useCms();
  const [isOpen, setIsOpen] = useState(false);
  const [hasFilledForm, setHasFilledForm] = useState(false);
  const [formSubmittedSuccess, setFormSubmittedSuccess] = useState(false);

  // Consultant Pre-Chat Form State
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    service: 'CRM Pipeline Engine'
  });
  const [formError, setFormError] = useState('');

  const [isAiCaptchaValid, setIsAiCaptchaValid] = useState(false);
  const [aiCaptchaResetKey, setAiCaptchaResetKey] = useState(0);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { playHover, playClick } = useSound();

  const handleStartConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim() || !formData.email.trim()) {
      setFormError('Please fill in all required details to unlock AI Consultant.');
      return;
    }
    if (!isAiCaptchaValid) {
      setFormError('Please solve the security captcha verification.');
      return;
    }

    playClick();
    setFormError('');

    // Save lead to CMS
    cms.addAiLead({
      name: formData.name.trim(),
      mobile: formData.mobile.trim(),
      email: formData.email.trim(),
      service: formData.service
    });

    setFormSubmittedSuccess(true);

    // Initial greeting after unlocking
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: `Welcome ${formData.name}! I am Webiknows AI Consultant. Your consultation details for ${formData.service} have been recorded and sent to ${cms.aiConsultantEmail || 'our engineering team'}. How can I assist you today?`
      }
    ]);

    setTimeout(() => {
      setHasFilledForm(true);
      setFormSubmittedSuccess(false);
    }, 1200);
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    playClick();
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let aiReply = "That's an excellent question! Webiknows IT Solutions specializes in turning custom enterprise requirements and Figma tokens into ultra-fast, production-ready web and mobile applications.";

      // Check against CMS FAQs first
      const matchedFaq = cms.aiFaqs.find(f => 
        lower.includes(f.question.toLowerCase().split(' ')[0]) || 
        f.question.toLowerCase().includes(lower) ||
        lower.includes(f.category?.toLowerCase() || '')
      );

      if (matchedFaq) {
        aiReply = matchedFaq.answer;
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('budget')) {
        aiReply = "Our custom CRM and web software projects range from ₹25,000 to ₹3,50,000+ depending on scope. Details have been logged for our strategy team!";
      } else if (lower.includes('time') || lower.includes('speed') || lower.includes('turnaround')) {
        aiReply = "Our turnaround time is 3-8 weeks from Figma system handoff to production deployment with zero downtime.";
      } else if (lower.includes('crm') || lower.includes('pipeline')) {
        aiReply = "Our bespoke CRM engines feature drag-and-drop sales pipelines, lead scoring, WhatsApp integration, and automated RBAC permissions.";
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'ai', text: aiReply }]);
      setIsTyping(false);
    }, 700);
  };

  const serviceOptions = [
    'CRM Pipeline Engine',
    'Custom Enterprise Web App',
    'Figma Design System & Token Export',
    'Mobile Application Development',
    'UI/UX Architecture & Audit',
    'Cloud Infrastructure & Webhooks'
  ];

  return (
    <>
      {/* Floating Trigger Button in Bottom Left */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={playHover}
          onClick={() => {
            playClick();
            setIsOpen(!isOpen);
          }}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl border font-bold text-xs uppercase tracking-wider cursor-pointer backdrop-blur-md transition-all ${
            theme === 'dark'
              ? 'bg-neutral-900/90 border-neutral-700 text-white shadow-rose-950/40 hover:bg-neutral-800'
              : 'bg-white border-neutral-200 text-neutral-950 shadow-xl hover:bg-neutral-50'
          }`}
        >
          <div className="relative">
            <div className="w-7 h-7 rounded-xl bg-rose-900 text-white flex items-center justify-center shadow-md">
              <Bot className="w-4 h-4" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border-2 border-white" />
          </div>
          <span className="hidden sm:inline">AI Consultant</span>
        </motion.button>
      </div>

      {/* Chat Drawer / Pre-Form Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-24 left-6 z-50 w-[92vw] sm:w-[420px] h-[560px] rounded-3xl border shadow-2xl flex flex-col overflow-hidden ${
              theme === 'dark'
                ? 'bg-[#121216] border-neutral-800 text-white shadow-rose-950/50'
                : 'bg-white border-neutral-200 text-neutral-950 shadow-2xl'
            }`}
          >
            {/* Header */}
            <div className={`p-4 border-b flex items-center justify-between ${
              theme === 'dark' ? 'bg-neutral-900/90 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-900 text-white flex items-center justify-center shadow">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold tracking-tight flex items-center gap-1.5">
                    Webiknows AI Consultant
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online · Connected to Strategy Hub
                  </div>
                </div>
              </div>

              <button
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  setIsOpen(false);
                }}
                className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                  theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Area */}
            {!hasFilledForm ? (
              /* Pre-Chat Consultant Form */
              <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-900/10 text-rose-800 border border-rose-800/20 inline-flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Pre-Consultation Required
                    </span>
                    <h3 className="text-base font-extrabold mt-2">Enter Details to Start Chat</h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      Please share your details so our AI Consultant can personalize project scope and record your inquiry directly into our admin dashboard.
                    </p>
                  </div>

                  {formError && (
                    <div className="p-3 mb-3 rounded-xl bg-rose-800/10 border border-rose-800/20 text-rose-800 text-xs font-medium">
                      {formError}
                    </div>
                  )}

                  {formSubmittedSuccess ? (
                    <div className="p-6 text-center space-y-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl my-4">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto animate-bounce" />
                      <h4 className="font-extrabold text-sm text-emerald-500">Details Recorded in CMS!</h4>
                      <p className="text-xs text-neutral-400">
                        Dispatching inquiry to <span className="font-mono text-white">{cms.aiConsultantEmail}</span>...
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleStartConsultation} className="space-y-3">
                      <div>
                        <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3 top-2.5 text-neutral-500" />
                          <input
                            type="text"
                            placeholder="e.g. Rahul Sharma"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border outline-none transition-all ${
                              theme === 'dark' 
                                ? 'bg-neutral-900 border-neutral-800 focus:border-rose-900 text-white' 
                                : 'bg-neutral-50 border-neutral-200 focus:border-rose-900 text-neutral-950'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                            Mobile No *
                          </label>
                          <div className="relative">
                            <Phone className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-500" />
                            <input
                              type="tel"
                              placeholder="+91 98765..."
                              value={formData.mobile}
                              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                              className={`w-full pl-8 pr-2 py-2 rounded-xl text-xs border outline-none transition-all ${
                                theme === 'dark' 
                                  ? 'bg-neutral-900 border-neutral-800 focus:border-rose-900 text-white' 
                                  : 'bg-neutral-50 border-neutral-200 focus:border-rose-900 text-neutral-950'
                              }`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                            Email ID *
                          </label>
                          <div className="relative">
                            <Mail className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-500" />
                            <input
                              type="email"
                              placeholder="you@company.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className={`w-full pl-8 pr-2 py-2 rounded-xl text-xs border outline-none transition-all ${
                                theme === 'dark' 
                                  ? 'bg-neutral-900 border-neutral-800 focus:border-rose-900 text-white' 
                                  : 'bg-neutral-50 border-neutral-200 focus:border-rose-900 text-neutral-950'
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                          Service Needed *
                        </label>
                        <div className="relative">
                          <Briefcase className="w-4 h-4 absolute left-3 top-2.5 text-neutral-500" />
                          <select
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border outline-none cursor-pointer transition-all ${
                              theme === 'dark' 
                                ? 'bg-neutral-900 border-neutral-800 focus:border-rose-900 text-white' 
                                : 'bg-neutral-50 border-neutral-200 focus:border-rose-900 text-neutral-950'
                            }`}
                          >
                            {serviceOptions.map((opt, i) => (
                              <option key={i} value={opt} className={theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <CaptchaField theme={theme} onVerify={setIsAiCaptchaValid} resetKey={aiCaptchaResetKey} />

                      <button
                        type="submit"
                        onMouseEnter={playHover}
                        className="w-full mt-3 py-3 rounded-xl bg-rose-900 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-rose-950 transition-all cursor-pointer shadow-lg shadow-rose-950/50"
                      >
                        Start AI Consultation <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                </div>

                <div className="pt-3 border-t border-neutral-800/50 flex items-center justify-between text-[10px] text-neutral-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" /> Direct CMS Logged
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <MailCheck className="w-3 h-3 text-rose-800" /> Recipient: {cms.aiConsultantEmail}
                  </span>
                </div>
              </div>
            ) : (
              /* Chat Experience */
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                {/* Messages Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                        m.sender === 'user' ? 'bg-neutral-800 text-white' : 'bg-rose-900 text-white'
                      }`}>
                        {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                      </div>
                      <div className={`max-w-[82%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-rose-900 text-white rounded-tr-none'
                          : theme === 'dark'
                          ? 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-tl-none'
                          : 'bg-neutral-100 text-neutral-900 rounded-tl-none'
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono pl-9">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-900 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-900 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-900 animate-bounce [animation-delay:0.4s]" />
                      <span>Webiknows AI is processing...</span>
                    </div>
                  )}
                </div>

                {/* FAQ Prompt Suggestions from CMS */}
                {cms.aiFaqs && cms.aiFaqs.length > 0 && (
                  <div className={`px-4 py-2 border-t flex gap-1.5 overflow-x-auto ${
                    theme === 'dark' ? 'border-neutral-800 bg-neutral-950/50' : 'border-neutral-200 bg-neutral-50'
                  }`}>
                    {cms.aiFaqs.map((faq) => (
                      <button
                        key={faq.id}
                        onMouseEnter={playHover}
                        onClick={() => handleSend(faq.question)}
                        className={`px-2.5 py-1 text-[11px] rounded-lg border whitespace-nowrap cursor-pointer transition-colors ${
                          theme === 'dark'
                            ? 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:border-rose-900'
                            : 'border-neutral-200 bg-white text-neutral-700 hover:text-neutral-950 hover:border-rose-900'
                        }`}
                      >
                        {faq.question}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input Footer */}
                <div className={`p-3 border-t flex items-center gap-2 ${
                  theme === 'dark' ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-white'
                }`}>
                  <input
                    type="text"
                    placeholder="Ask about project timeline, custom features..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 bg-transparent text-xs sm:text-sm outline-none px-2"
                  />
                  <button
                    onMouseEnter={playHover}
                    onClick={() => handleSend()}
                    className="p-2 rounded-xl bg-rose-900 text-white hover:bg-rose-950 cursor-pointer shadow-md transition-transform hover:scale-105"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
