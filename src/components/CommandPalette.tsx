import React, { useState, useEffect } from 'react';
import { Page, Theme } from '../types';
import { Search, Sparkles, FileText, Cpu, Users, Layers, MessageSquare, Home, X, Command, Moon, Sun, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../hooks/useSound';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  currentPage,
  setCurrentPage,
  theme,
  setTheme
}) => {
  const [query, setQuery] = useState('');
  const { playHover, playClick } = useSound();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'home',
      label: 'Go to Home / Overview',
      category: 'Navigation',
      icon: <Home className="w-4 h-4 text-rose-800" />,
      run: () => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    },
    {
      id: 'services',
      label: 'Explore Services & Engineering',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-rose-800" />,
      run: () => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    },
    {
      id: 'casestudies',
      label: 'View Case Studies & Client Work',
      category: 'Navigation',
      icon: <FileText className="w-4 h-4 text-rose-800" />,
      run: () => { setCurrentPage('casestudies'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    },
    {
      id: 'about',
      label: 'About Webiknows IT Solutions',
      category: 'Navigation',
      icon: <Users className="w-4 h-4 text-rose-800" />,
      run: () => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    },
    {
      id: 'team',
      label: 'Meet Our Expert Engineers & Designers',
      category: 'Navigation',
      icon: <Users className="w-4 h-4 text-rose-800" />,
      run: () => { setCurrentPage('team'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    },
    {
      id: 'blogs',
      label: 'Read Tech & Figma Insights',
      category: 'Navigation',
      icon: <FileText className="w-4 h-4 text-rose-800" />,
      run: () => { setCurrentPage('blogs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    },
    {
      id: 'contact',
      label: 'Book a Consultation / Contact Us',
      category: 'Navigation',
      icon: <MessageSquare className="w-4 h-4 text-rose-800" />,
      run: () => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    },
    {
      id: 'theme',
      label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`,
      category: 'Preferences',
      icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-800" />,
      run: () => { setTheme(theme === 'dark' ? 'light' : 'dark'); }
    }
  ];

  const filteredActions = actions.filter(action =>
    action.label.toLowerCase().includes(query.toLowerCase()) ||
    action.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-32 p-4 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className={`relative w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden ${
          theme === 'dark'
            ? 'bg-[#121216] border-neutral-800 text-white'
            : 'bg-white border-neutral-200 text-neutral-950'
        }`}
      >
        {/* Search Header */}
        <div className={`p-4 border-b flex items-center gap-3 ${
          theme === 'dark' ? 'border-neutral-800 bg-neutral-900/50' : 'border-neutral-200 bg-neutral-50'
        }`}>
          <Search className="w-5 h-5 text-rose-900 shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search pages (e.g. CRM, Estimator, Team)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base outline-none placeholder:text-neutral-500"
          />
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg border text-xs font-mono ${
              theme === 'dark' ? 'border-neutral-700 bg-neutral-800 text-neutral-300' : 'border-neutral-300 bg-neutral-200 text-neutral-700'
            }`}
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredActions.length === 0 ? (
            <div className="py-12 text-center text-sm text-neutral-500">
              No matching commands found.
            </div>
          ) : (
            filteredActions.map((action) => (
              <button
                key={action.id}
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  action.run();
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm transition-colors cursor-pointer group ${
                  theme === 'dark'
                    ? 'hover:bg-rose-950/30 hover:text-rose-700 text-neutral-200'
                    : 'hover:bg-rose-50 hover:text-rose-950 text-neutral-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg border ${
                    theme === 'dark' ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-neutral-100'
                  }`}>
                    {action.icon}
                  </div>
                  <div>
                    <div className="font-semibold">{action.label}</div>
                    <div className="text-xs text-neutral-500">{action.category}</div>
                  </div>
                </div>
                <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity text-rose-900">
                  Select ↵
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className={`px-4 py-2.5 border-t text-xs text-neutral-500 flex items-center justify-between ${
          theme === 'dark' ? 'border-neutral-800 bg-neutral-900/30' : 'border-neutral-200 bg-neutral-50'
        }`}>
          <span>Tip: Use arrow keys or click to select</span>
          <span className="font-mono text-[10px] text-rose-900 font-bold">WEBIKNOWS IT SOLUTIONS SPOTLIGHT</span>
        </div>
      </motion.div>
    </div>
  );
};
