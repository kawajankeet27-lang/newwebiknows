import React, { useState } from 'react';
import { Theme } from '../types';
import { TEAM_MEMBERS } from '../data/agencyData';
import { MapPin, ArrowUpRight, Award, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TeamPageProps {
  theme: Theme;
  onNavigateToContact?: (expertName?: string) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ theme, onNavigateToContact }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const locations = ['All', 'San Francisco, CA', 'London, UK', 'Tokyo, Japan', 'Austin, TX'];

  const filteredMembers = selectedLocation === 'All' 
    ? TEAM_MEMBERS 
    : TEAM_MEMBERS.filter(m => m.location === selectedLocation);

  return (
    <section className={`pt-28 pb-20 sm:pt-32 sm:pb-24 transition-colors duration-500 bg-white/20 dark:bg-[#080808]/20 backdrop-blur-sm border-y border-white/10 dark:border-white/5 relative z-10 ${
      theme === 'dark' ? 'text-white' : 'text-neutral-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Header */}
        <motion.div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-8 p-6 sm:p-9 rounded-3xl backdrop-blur-xl border shadow-xl ${
            theme === 'dark'
              ? 'bg-neutral-950/80 border-neutral-800/80 shadow-black/80 ring-1 ring-white/5'
              : 'bg-white/85 border-neutral-200/90 shadow-rose-900/10 ring-1 ring-black/5'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3 text-xs font-semibold tracking-wider uppercase text-rose-900">
              <span>Leadership & Core Specialists</span>
              <span aria-hidden="true">·</span>
              <span>Global Expertise</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-balance leading-tight">
              The Minds Behind the Architecture.
            </h1>
            <p className={`text-base sm:text-lg font-normal leading-relaxed max-w-2xl ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
            }`}>
              Decades of combined experience in Figma token engineering, full-stack React systems, and high-conversion CRM pipelines.
            </p>
          </div>

          {/* Location Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-200 ${
                  selectedLocation === loc
                    ? 'bg-rose-900 text-white shadow-lg shadow-rose-900/25'
                    : theme === 'dark'
                      ? 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                      : 'bg-white text-neutral-600 hover:text-neutral-950 border border-neutral-200 shadow-xs'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Team Grid with Immersive Editorial Layout */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {filteredMembers.map((member, index) => {
              const isHovered = hoveredId === member.id;
              return (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  onMouseEnter={() => setHoveredId(member.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative flex flex-col h-full"
                >
                  {/* Card Container */}
                  <div className={`relative flex-1 flex flex-col p-6 rounded-3xl transition-all duration-500 overflow-hidden backdrop-blur-xl ${
                    theme === 'dark' 
                      ? 'bg-neutral-900/75 border border-neutral-800/90 hover:border-rose-900/60 shadow-2xl shadow-black/30' 
                      : 'bg-white/90 border border-neutral-200/90 hover:border-rose-900/50 shadow-2xl shadow-neutral-900/5'
                  }`}>
                    
                    {/* Top Badge / Status */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-neutral-400 uppercase">
                        <ShieldCheck className="w-3.5 h-3.5 text-rose-900" />
                        Verified Expert
                      </span>
                      <span className="text-xs font-mono text-neutral-500">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Portrait Image Container with Zoom & Glow */}
                    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-neutral-800 shadow-md">
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      
                      {/* Gradient Scrim Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                      
                      {/* Floating Location Tag on Image */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-neutral-950/70 backdrop-blur-md border border-white/10 text-white">
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                          <MapPin className="w-3.5 h-3.5 text-rose-800 shrink-0" />
                          <span className="truncate">{member.location}</span>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-bold tracking-tight group-hover:text-rose-900 transition-colors">
                          {member.name}
                        </h3>
                        <p className={`text-xs font-medium leading-relaxed ${
                          theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                        }`}>
                          {member.role}
                        </p>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => onNavigateToContact && onNavigateToContact(member.name)}
                        className={`mt-4 w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                          theme === 'dark'
                            ? 'bg-neutral-800/80 text-white hover:bg-rose-900 hover:text-white'
                            : 'bg-neutral-100 text-neutral-900 hover:bg-rose-900 hover:text-white'
                        }`}
                      >
                        <span>Direct Consultation</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>

                    {/* Subtle Corner Glow on Hover */}
                    <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-rose-900/10 rounded-full blur-2xl group-hover:bg-rose-900/20 transition-all duration-500 pointer-events-none" />

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Trust Quote */}
        <motion.div 
          className={`p-8 rounded-3xl text-center max-w-3xl mx-auto border ${
            theme === 'dark' ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-neutral-200 shadow-lg'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Award className="w-8 h-8 text-rose-900 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Looking for a dedicated team for your next sprint?</h3>
          <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Our specialists embed directly into your product workflow with zero ramp-up time.
          </p>
          <button
            onClick={() => onNavigateToContact && onNavigateToContact('General Team Inquiry')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-900 text-white text-sm font-semibold hover:bg-rose-950 transition-colors shadow-lg shadow-rose-900/25"
          >
            <span>Schedule Discovery Call</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
