import React, { useState } from 'react';
import { Theme } from '../types';
import { useCms } from '../context/CmsContext';
import { Mail, Phone, MapPin, Calendar, Clock, Send, CheckCircle2, Sparkles, MessageSquare, ShieldCheck, AlertCircle, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GsapTextEffect } from './GsapTextEffect';
import { CaptchaField } from './CaptchaField';

interface ContactPageProps {
  theme: Theme;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
}

interface FormTouched {
  name?: boolean;
  email?: boolean;
  phone?: boolean;
  company?: boolean;
  message?: boolean;
}

export const ContactPage: React.FC<ContactPageProps> = ({ theme }) => {
  const cms = useCms();
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '₹25,000 - ₹50,000',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [isContactCaptchaValid, setIsContactCaptchaValid] = useState(false);
  const [contactCaptchaResetKey, setContactCaptchaResetKey] = useState(0);

  const [isBookingCaptchaValid, setIsBookingCaptchaValid] = useState(false);
  const [bookingCaptchaResetKey, setBookingCaptchaResetKey] = useState(0);

  // Strategy session booking states
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().split('T')[0];
  });
  const activeSlots = (cms.meetingSlots || []).filter(s => s.active).map(s => s.timeString);
  const availableSlots = activeSlots.length > 0 ? activeSlots : ['10:30 AM IST', '03:30 PM IST'];
  const [selectedSlot, setSelectedSlot] = useState(() => availableSlots[0] || '10:30 AM IST');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingError, setBookingError] = useState('');

  const validateField = (field: keyof FormState, value: string): string => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Full name is required.';
        if (value.trim().length < 2) return 'Full name must be at least 2 characters.';
        return '';
      case 'email':
        if (!value.trim()) return 'Work email address is required.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address (e.g., name@company.com).';
        return '';
      case 'phone':
        if (!value.trim()) return 'Contact phone number is required.';
        const digits = value.replace(/\D/g, '');
        if (digits.length < 8) return 'Please enter a valid phone number (min 8 digits).';
        return '';
      case 'company':
        if (value.trim() && value.trim().length < 2) return 'Company name must be at least 2 characters.';
        return '';
      case 'message':
        if (!value.trim()) return 'Project brief / key requirements are required.';
        if (value.trim().length < 15) return `Project brief needs at least 15 characters (${value.trim().length}/15).`;
        return '';
      default:
        return '';
    }
  };

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
    
    if (touched[field as keyof FormTouched] || submitAttempted) {
      const errorMsg = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: errorMsg }));
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formState[field]);
    setErrors(prev => ({ ...prev, [field]: errorMsg }));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const allTouched: FormTouched = {
      name: true,
      email: true,
      phone: true,
      company: true,
      message: true,
    };
    setTouched(allTouched);

    const newErrors: FormErrors = {
      name: validateField('name', formState.name),
      email: validateField('email', formState.email),
      phone: validateField('phone', formState.phone),
      company: validateField('company', formState.company),
      message: validateField('message', formState.message),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(err => Boolean(err));
    if (hasErrors) {
      const firstInvalidKey = (['name', 'email', 'phone', 'company', 'message'] as const).find(k => newErrors[k]);
      if (firstInvalidKey) {
        const inputEl = document.getElementById(`contact-input-${firstInvalidKey}`);
        if (inputEl) {
          inputEl.focus();
        }
      }
      return;
    }

    if (!isContactCaptchaValid) {
      setErrors(prev => ({ ...prev, message: prev.message || 'Please solve the security captcha verification.' }));
      return;
    }

    setIsSubmitting(true);
    
    // Add lead dynamically to CMS
    cms.addLead({
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      company: formState.company,
      budget: formState.budget,
      message: formState.message
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 700);
  };

  const handleBookSlot = () => {
    if (!selectedDate) {
      setBookingError('Please select a date for your strategy session.');
      return;
    }
    const todayStr = new Date().toISOString().split('T')[0];
    if (selectedDate < todayStr) {
      setBookingError('Please select today or a future date for your consultation.');
      return;
    }
    if (!selectedSlot) {
      setBookingError('Please select an available time slot.');
      return;
    }
    if (!isBookingCaptchaValid) {
      setBookingError('Please solve the security captcha verification to book your strategy session.');
      return;
    }

    // Add meeting request dynamically to CMS
    cms.addMeetingRequest({
      name: formState.name || 'Strategy Guest',
      email: formState.email || 'guest@company.com',
      phone: formState.phone || '+91 98765 43210',
      company: formState.company || 'Enterprise Client',
      date: selectedDate,
      slot: selectedSlot,
      topic: 'Strategy Session & Technical Architecture Consultation'
    });

    setBookingError('');
    setBookingConfirmed(true);
  };

  const resetForm = () => {
    setFormState({
      name: '',
      email: '',
      phone: '',
      company: '',
      budget: '₹25,000 - ₹50,000',
      message: ''
    });
    setErrors({});
    setTouched({});
    setSubmitAttempted(false);
    setFormSubmitted(false);
    setIsContactCaptchaValid(false);
    setContactCaptchaResetKey(prev => prev + 1);
  };

  // Helper for input container styles
  const getInputStateStyles = (field: keyof FormErrors) => {
    const isTouched = touched[field as keyof FormTouched] || submitAttempted;
    const hasError = isTouched && Boolean(errors[field]);
    const isValid = isTouched && !errors[field] && Boolean(formState[field as keyof FormState]);

    if (hasError) {
      return theme === 'dark'
        ? 'bg-rose-950/20 border-rose-800 text-white focus:border-rose-800 focus:ring-1 focus:ring-rose-800/50'
        : 'bg-rose-50 border-rose-800 text-neutral-900 focus:border-rose-800 focus:ring-1 focus:ring-rose-800/50';
    }

    if (isValid) {
      return theme === 'dark'
        ? 'bg-emerald-950/20 border-emerald-500/80 text-white focus:border-emerald-500'
        : 'bg-emerald-50/50 border-emerald-500 text-neutral-900 focus:border-emerald-500';
    }

    return theme === 'dark'
      ? 'bg-neutral-900 border-neutral-800 text-white focus:border-rose-800'
      : 'bg-white border-neutral-300 text-neutral-900 focus:border-rose-800';
  };

  const hasFormErrors = submitAttempted && Object.values(errors).some(err => Boolean(err));

  return (
    <section className={`pt-28 pb-20 sm:pt-32 sm:pb-24 transition-colors duration-300 bg-transparent relative z-10 ${
      theme === 'dark' ? 'text-white' : 'text-neutral-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className={`w-full space-y-4 p-6 sm:p-9 rounded-3xl backdrop-blur-2xl border shadow-xl ${
          theme === 'dark'
            ? 'bg-neutral-950/95 border-neutral-800/80 shadow-black/80 ring-1 ring-white/5'
            : 'bg-white/95 border-neutral-200/90 shadow-xl shadow-neutral-900/5 ring-1 ring-black/5'
        }`}>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 font-mono">
            <span>06. Contact & Consultation</span>
            <span aria-hidden="true">·</span>
            <span>Get In Touch</span>
          </div>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[1.85rem] font-extrabold tracking-tight leading-[1.3] text-balance text-neutral-900 dark:text-white">
            <GsapTextEffect text="Let’s Build Your Figma System or Custom CRM Engine." tag="span" />
          </h1>
          <p className={`gsap-sentence-reveal text-sm sm:text-base leading-relaxed ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Book a 30-minute discovery call with our design architects or submit a project inquiry below.
          </p>
        </div>

        {/* 2-Column Main Contact Layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Inquiry Form */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              theme === 'dark' ? 'bg-[#0F0F12] border-neutral-800' : 'bg-white border-neutral-200 shadow-xl'
            }`}>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight">
                    Send Project Inquiry
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    Fields marked with <span className="text-rose-800 font-bold">*</span> are required.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-rose-900/10 border border-rose-800/20 text-rose-800">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Real-time Validation</span>
                </div>
              </div>

              {/* Form Level Error Alert Banner */}
              <AnimatePresence>
                {hasFormErrors && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="mb-6 p-4 rounded-xl bg-rose-900/10 border border-rose-800/40 text-rose-800 text-xs flex items-start gap-3 overflow-hidden"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-sm">Please correct the highlighted errors</div>
                      <p className="text-neutral-400 mt-0.5">
                        Ensure all required fields are filled with valid contact information before submitting.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold">Inquiry Received!</h4>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                    Thank you <span className="text-white font-bold">{formState.name}</span>. Our lead CRM architect will review your project brief for <span className="text-rose-800 font-semibold">{formState.company || 'your project'}</span> and reply to <span className="text-white font-semibold">{formState.email}</span> within 4 business hours.
                  </p>
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 text-xs font-bold uppercase rounded-xl bg-neutral-800 text-neutral-200 hover:bg-neutral-700 cursor-pointer transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitForm} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="contact-input-name" className="block text-xs font-semibold">
                          Your Full Name <span className="text-rose-800">*</span>
                        </label>
                        {touched.name && !errors.name && formState.name && (
                          <span className="text-[10px] font-semibold text-emerald-500 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Valid
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          id="contact-input-name"
                          type="text"
                          required
                          placeholder="Sarah Vance"
                          value={formState.name}
                          onChange={(e) => handleFieldChange('name', e.target.value)}
                          onBlur={() => handleBlur('name')}
                          aria-invalid={Boolean(errors.name && (touched.name || submitAttempted))}
                          className={`w-full px-3.5 py-3 text-sm rounded-xl border outline-none min-h-[44px] transition-all pr-10 ${getInputStateStyles('name')}`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          {touched.name && errors.name && (
                            <AlertCircle className="w-4 h-4 text-rose-800" />
                          )}
                          {touched.name && !errors.name && formState.name && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          )}
                        </div>
                      </div>
                      <AnimatePresence>
                        {errors.name && (touched.name || submitAttempted) && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="mt-1.5 text-[11px] font-medium text-rose-800 flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.name}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Email Address */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="contact-input-email" className="block text-xs font-semibold">
                          Work Email Address <span className="text-rose-800">*</span>
                        </label>
                        {touched.email && !errors.email && formState.email && (
                          <span className="text-[10px] font-semibold text-emerald-500 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Valid
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          id="contact-input-email"
                          type="email"
                          required
                          placeholder="sarah@company.com"
                          value={formState.email}
                          onChange={(e) => handleFieldChange('email', e.target.value)}
                          onBlur={() => handleBlur('email')}
                          aria-invalid={Boolean(errors.email && (touched.email || submitAttempted))}
                          className={`w-full px-3.5 py-3 text-sm rounded-xl border outline-none min-h-[44px] transition-all pr-10 ${getInputStateStyles('email')}`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          {touched.email && errors.email && (
                            <AlertCircle className="w-4 h-4 text-rose-800" />
                          )}
                          {touched.email && !errors.email && formState.email && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          )}
                        </div>
                      </div>
                      <AnimatePresence>
                        {errors.email && (touched.email || submitAttempted) && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="mt-1.5 text-[11px] font-medium text-rose-800 flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.email}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Company Name */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="contact-input-company" className="block text-xs font-semibold">
                          Company Name <span className="text-neutral-500 text-[10px]">(Optional)</span>
                        </label>
                        {touched.company && !errors.company && formState.company && (
                          <span className="text-[10px] font-semibold text-emerald-500 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Valid
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          id="contact-input-company"
                          type="text"
                          placeholder="Acme Global Inc."
                          value={formState.company}
                          onChange={(e) => handleFieldChange('company', e.target.value)}
                          onBlur={() => handleBlur('company')}
                          className={`w-full px-3.5 py-3 text-sm rounded-xl border outline-none min-h-[44px] transition-all pr-10 ${getInputStateStyles('company')}`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          {touched.company && errors.company && (
                            <AlertCircle className="w-4 h-4 text-rose-800" />
                          )}
                          {touched.company && !errors.company && formState.company && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          )}
                        </div>
                      </div>
                      <AnimatePresence>
                        {errors.company && (touched.company || submitAttempted) && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="mt-1.5 text-[11px] font-medium text-rose-800 flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.company}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Contact Number */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="contact-input-phone" className="block text-xs font-semibold">
                          Contact Number <span className="text-rose-800">*</span>
                        </label>
                        {touched.phone && !errors.phone && formState.phone && (
                          <span className="text-[10px] font-semibold text-emerald-500 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Valid
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          id="contact-input-phone"
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formState.phone}
                          onChange={(e) => handleFieldChange('phone', e.target.value)}
                          onBlur={() => handleBlur('phone')}
                          aria-invalid={Boolean(errors.phone && (touched.phone || submitAttempted))}
                          className={`w-full px-3.5 py-3 text-sm rounded-xl border outline-none min-h-[44px] transition-all pr-10 ${getInputStateStyles('phone')}`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          {touched.phone && errors.phone && (
                            <AlertCircle className="w-4 h-4 text-rose-800" />
                          )}
                          {touched.phone && !errors.phone && formState.phone && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          )}
                        </div>
                      </div>
                      <AnimatePresence>
                        {errors.phone && (touched.phone || submitAttempted) && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="mt-1.5 text-[11px] font-medium text-rose-800 flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.phone}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Target Budget Range */}
                  <div>
                    <label className="block text-xs font-semibold mb-1">Target Budget Range (INR)</label>
                    <select
                      value={formState.budget}
                      onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                      className={`w-full px-3.5 py-3 text-sm rounded-xl border outline-none min-h-[44px] ${
                        theme === 'dark'
                          ? 'bg-neutral-900 border-neutral-800 text-white focus:border-rose-800'
                          : 'bg-white border-neutral-300 text-neutral-900 focus:border-rose-800'
                      }`}
                    >
                      <option>₹25,000 - ₹50,000</option>
                      <option>₹50,000 - ₹75,000</option>
                      <option>₹75,000 - ₹1,00,000</option>
                      <option>₹1,00,000 - ₹1,25,000</option>
                      <option>₹1,25,000 - ₹1,50,000</option>
                      <option>₹1,50,000 - ₹1,75,000</option>
                      <option>₹1,75,000 - ₹2,00,000</option>
                      <option>₹2,00,000 - ₹2,25,000</option>
                      <option>₹2,25,000 - ₹2,50,000</option>
                      <option>₹2,50,000 - ₹2,75,000</option>
                      <option>₹2,75,000 - ₹3,00,000</option>
                      <option>₹3,00,000 - ₹3,25,000</option>
                      <option>₹3,25,000 - ₹3,50,000</option>
                      <option>₹3,50,000 - ₹3,75,000</option>
                      <option>₹3,75,000 - ₹4,00,000</option>
                      <option>₹4,00,000 - ₹4,25,000</option>
                      <option>₹4,25,000 - ₹4,50,000</option>
                      <option>₹4,50,000 - ₹4,75,000</option>
                      <option>₹4,75,000 - ₹5,00,000</option>
                      <option>₹5,00,000+ (5 Lakhs +)</option>
                    </select>
                  </div>

                  {/* Message / Brief */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="contact-input-message" className="block text-xs font-semibold">
                        Project Brief / Key Requirements <span className="text-rose-800">*</span>
                      </label>
                      <span className={`text-[10px] font-mono ${
                        formState.message.trim().length >= 15 ? 'text-emerald-500 font-bold' : 'text-neutral-500'
                      }`}>
                        {formState.message.trim().length} / 15 min chars
                      </span>
                    </div>
                    <div className="relative">
                      <textarea
                        id="contact-input-message"
                        rows={4}
                        required
                        placeholder="Describe your Figma design system needs, custom CRM workflow, or mobile app features..."
                        value={formState.message}
                        onChange={(e) => handleFieldChange('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        aria-invalid={Boolean(errors.message && (touched.message || submitAttempted))}
                        className={`w-full px-3.5 py-3 text-sm rounded-xl border outline-none transition-all ${getInputStateStyles('message')}`}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.message && (touched.message || submitAttempted) && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="mt-1.5 text-[11px] font-medium text-rose-800 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.message}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <CaptchaField theme={theme} onVerify={setIsContactCaptchaValid} resetKey={contactCaptchaResetKey} />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl text-white bg-rose-900 hover:bg-rose-950 disabled:opacity-60 cursor-pointer shadow-md shadow-rose-900/30 flex items-center justify-center gap-2 min-h-[44px] transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Validating & Sending Brief...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Project Brief</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Consultation Scheduler */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-4 sm:p-6 lg:p-8 rounded-3xl border ${
              theme === 'dark' ? 'bg-[#0F0F12] border-neutral-800' : 'bg-white border-neutral-200 shadow-xl'
            }`}>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-900">
                <Calendar className="w-4 h-4" />
                <span>30-Min Discovery Session</span>
              </div>
              <h3 className="text-xl font-extrabold tracking-tight mt-1">
                Schedule Strategy Session
              </h3>

              <AnimatePresence>
                {bookingError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-3 rounded-xl bg-rose-900/10 border border-rose-800/30 text-rose-800 text-xs flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{bookingError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {bookingConfirmed ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 mt-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Call Scheduled!</span>
                  </div>
                  <p>Date: {selectedDate} at {selectedSlot}</p>
                  <p className="text-neutral-400">A Google Meet invitation has been added to your calendar.</p>
                  <button
                    onClick={() => setBookingConfirmed(false)}
                    className="mt-2 text-[11px] font-semibold text-neutral-400 hover:text-white underline cursor-pointer"
                  >
                    Reschedule Call
                  </button>
                </div>
              ) : (
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-xs font-medium mb-1">Select Consultation Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setBookingError('');
                      }}
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none min-h-[44px] ${
                        theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1">Available Time Slots</label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableSlots.map(slot => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            setSelectedSlot(slot);
                            setBookingError('');
                          }}
                          className={`p-2.5 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer min-h-[44px] flex items-center justify-center ${
                            selectedSlot === slot
                              ? 'bg-rose-900 text-white border-rose-800 shadow-md shadow-rose-900/30'
                              : theme === 'dark'
                              ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
                              : 'bg-white border-neutral-200 text-neutral-800 hover:border-rose-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <CaptchaField theme={theme} onVerify={setIsBookingCaptchaValid} resetKey={bookingCaptchaResetKey} />

                  <button
                    type="button"
                    onClick={handleBookSlot}
                    className="w-full py-3 text-xs font-bold uppercase rounded-xl text-white bg-rose-900 hover:bg-rose-950 cursor-pointer shadow-md shadow-rose-900/30"
                  >
                    Confirm Calendar Booking
                  </button>
                </div>
              )}
            </div>

            {/* Direct Studio Contact Info */}
            <div className={`p-6 rounded-2xl border space-y-3.5 text-xs ${
              theme === 'dark' ? 'bg-neutral-950 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-800'
            }`}>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-rose-800 shrink-0" />
                <a href={`mailto:${cms.siteMetadata?.contactEmail || 'contact@webiknows.com'}`} className="hover:text-rose-900 transition-colors font-medium">
                  {cms.siteMetadata?.contactEmail || 'contact@webiknows.com'}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-rose-800 shrink-0" />
                <a href={`tel:${(cms.siteMetadata?.contactPhone || '+91 98765 43210').replace(/\s+/g, '')}`} className="hover:text-rose-900 transition-colors font-medium">
                  {cms.siteMetadata?.contactPhone || '+91 98765 43210'}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-rose-800 shrink-0" />
                <span className="font-medium">{cms.siteMetadata?.address || 'Tech City, Mumbai, Maharashtra 400076, India'}</span>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-neutral-200 dark:border-neutral-800/60">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>NDAs & Enterprise Security Audits Available Upon Request</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Framer Motion Animated Success Toast Notification */}
      <AnimatePresence>
        {formSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed bottom-8 right-8 z-[9999] max-w-sm p-4 rounded-2xl shadow-2xl border bg-neutral-900 border-rose-900/40 text-white flex items-start gap-3 backdrop-blur-xl"
          >
            <div className="w-8 h-8 rounded-full bg-rose-900/20 text-rose-800 border border-rose-800/30 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-0.5">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-800">Success</div>
              <div className="text-sm font-semibold">Project Inquiry Dispatched!</div>
              <div className="text-xs text-neutral-400">Our design lead will review your brief within 4 hours.</div>
            </div>
            <button
              onClick={() => setFormSubmitted(false)}
              className="text-neutral-400 hover:text-white p-1 text-xs cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
