import React, { useState, useEffect, useRef } from 'react';
import { BlogPost, Theme, Page } from '../types';
import { useCms } from '../context/CmsContext';
import { BlogModal } from './BlogModal';
import { SpotlightCard } from './SpotlightCard';
import { 
  Clock, ArrowRight, BookOpen, ChevronLeft, ChevronRight, 
  Pause, Play, Sparkles, User, Calendar, Tag, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogsSliderSectionProps {
  theme: Theme;
  setCurrentPage: (page: Page) => void;
}

export const BlogsSliderSection: React.FC<BlogsSliderSectionProps> = ({ theme, setCurrentPage }) => {
  const { blogs } = useCms();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Figma Systems', 'CRM Architecture', 'Micro-Animations'];

  // Filter posts by category
  const filteredPosts = blogs.filter(post => 
    activeCategory === 'All' || post.category === activeCategory
  );

  const totalPosts = filteredPosts.length;

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoSliding || isHovered || totalPosts <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPosts);
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoSliding, isHovered, totalPosts]);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPosts) % totalPosts);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPosts);
  };

  return (
    <section 
      className={`py-24 relative z-10 overflow-hidden transition-colors duration-300 bg-white/20 dark:bg-[#080808]/20 backdrop-blur-sm border-y border-white/10 dark:border-white/5 ${
        theme === 'dark' ? 'text-white' : 'text-neutral-950'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Subtle Gradient Blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-900/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header with Title & Slider Controls */}
        <div className={`p-6 sm:p-8 rounded-3xl backdrop-blur-xl border shadow-xl flex flex-col lg:flex-row lg:items-end justify-between gap-8 ${
          theme === 'dark'
            ? 'bg-neutral-950/80 border-neutral-800/80 shadow-black/80 ring-1 ring-white/5'
            : 'bg-white/85 border-neutral-200/90 shadow-rose-900/10 ring-1 ring-black/5'
        }`}>
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold uppercase tracking-wider text-rose-900 border-rose-800/20 bg-rose-800/10">
              <BookOpen className="w-3.5 h-3.5" />
              <span>06. Knowledge Base & Engineering Blogs</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance">
              Latest Insights & Engineering Articles.
            </h2>
            
            <p className={`text-base sm:text-lg leading-relaxed ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
            }`}>
              Deep dives into Figma token automation, sub-180ms CRM architectures, and high-performance React micro-animations.
            </p>
          </div>

          {/* Action & Slider Navigation Controls */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Category Filter Pills */}
            <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-2xl border bg-neutral-900/40 border-neutral-800/80 mr-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-rose-900 text-white shadow-md shadow-rose-900/30'
                      : theme === 'dark'
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Auto-Slide Pause/Play Toggle */}
            <button
              onClick={() => setIsAutoSliding(!isAutoSliding)}
              title={isAutoSliding ? 'Pause Auto-slide' : 'Play Auto-slide'}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:text-white hover:border-rose-800/50'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:text-neutral-950 hover:border-rose-800/50 shadow-sm'
              }`}
            >
              {isAutoSliding ? (
                <Pause className="w-4 h-4 text-rose-800 animate-pulse" />
              ) : (
                <Play className="w-4 h-4 text-neutral-400 ml-0.5" />
              )}
            </button>

            {/* Prev / Next Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Article"
                className={`p-3 rounded-2xl border transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                  theme === 'dark'
                    ? 'bg-neutral-900/80 border-neutral-800 text-white hover:bg-rose-900 hover:border-rose-900'
                    : 'bg-white border-neutral-200 text-neutral-900 hover:bg-rose-900 hover:text-white hover:border-rose-900 shadow-sm'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next Article"
                className={`p-3 rounded-2xl border transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                  theme === 'dark'
                    ? 'bg-neutral-900/80 border-neutral-800 text-white hover:bg-rose-900 hover:border-rose-900'
                    : 'bg-white border-neutral-200 text-neutral-900 hover:bg-rose-900 hover:text-white hover:border-rose-900 shadow-sm'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* View All Articles Button */}
            <button
              onClick={() => setCurrentPage('blogs')}
              className="px-5 py-3 rounded-2xl text-xs font-bold bg-rose-900 hover:bg-rose-950 text-white transition-all shadow-lg shadow-rose-900/25 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>View All Blogs</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Category Filters */}
        <div className="flex sm:hidden items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-rose-900 text-white'
                  : theme === 'dark'
                  ? 'bg-neutral-900 border border-neutral-800 text-neutral-400'
                  : 'bg-neutral-200 text-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Cards Auto-sliding Carousel Container */}
        <div className="relative">
          {totalPosts === 0 ? (
            <div className="p-12 text-center text-neutral-500 font-mono text-xs">
              No blog articles match this category.
            </div>
          ) : (
            <div className="overflow-hidden">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={false}
              >
                {/* Render visible 3 cards starting from currentIndex */}
                {[0, 1, 2].map((offset) => {
                  const postIndex = (currentIndex + offset) % totalPosts;
                  const post = filteredPosts[postIndex];

                  if (!post) return null;

                  return (
                    <motion.div
                      key={`${post.id}-${offset}`}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`group cursor-pointer ${offset >= 1 ? 'hidden md:block' : ''} ${offset >= 2 ? 'hidden lg:block' : ''}`}
                      onClick={() => setSelectedPost(post)}
                    >
                      <SpotlightCard
                        theme={theme}
                        enableTilt={true}
                        className="p-6 h-full flex flex-col justify-between corner-bracket transition-all duration-300 group-hover:border-rose-900/50 group-hover:shadow-xl group-hover:shadow-rose-900/10"
                      >
                        <div className="space-y-4">
                          {/* Card Header Tag & Read Time */}
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="px-2.5 py-1 rounded-md bg-rose-900/10 border border-rose-800/20 text-rose-900 font-bold uppercase tracking-wider text-[11px]">
                              {post.category}
                            </span>
                            <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                              <Clock className="w-3.5 h-3.5 text-rose-800" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-extrabold tracking-tight leading-snug group-hover:text-rose-900 transition-colors line-clamp-2">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className={`text-xs leading-relaxed line-clamp-3 ${
                            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
                          }`}>
                            {post.excerpt}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {post.tags.map((tag, i) => (
                              <span
                                key={i}
                                className={`px-2 py-0.5 text-[10px] font-mono rounded-md ${
                                  theme === 'dark'
                                    ? 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                                    : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                                }`}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Footer: Author & Read Button */}
                        <div className="pt-6 mt-6 border-t border-neutral-800/30 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-900 to-rose-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-rose-900/30">
                              {post.author.name.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold leading-none">{post.author.name}</span>
                              <span className="text-[10px] text-neutral-400 mt-0.5">{post.author.role}</span>
                            </div>
                          </div>

                          <div className="w-8 h-8 rounded-xl bg-rose-900/10 border border-rose-800/30 flex items-center justify-center text-rose-900 group-hover:bg-rose-900 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </SpotlightCard>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          )}
        </div>

        {/* Carousel Pagination Progress Bar & Dot Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-800/30">
          
          {/* Status Indicator */}
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isAutoSliding && !isHovered ? 'bg-emerald-500 animate-ping' : 'bg-neutral-500'}`} />
              <span className="font-bold text-neutral-300">
                {isAutoSliding && !isHovered ? 'Auto-Sliding Active' : isHovered ? 'Paused on Hover' : 'Auto-Slide Paused'}
              </span>
            </span>
            <span>·</span>
            <span>Article {currentIndex + 1} of {totalPosts}</span>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {filteredPosts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 bg-rose-900'
                    : theme === 'dark'
                    ? 'w-2.5 bg-neutral-800 hover:bg-neutral-700'
                    : 'w-2.5 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* Reader Modal */}
      <BlogModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        theme={theme}
      />
    </section>
  );
};
