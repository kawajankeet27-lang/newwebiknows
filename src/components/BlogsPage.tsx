import React, { useState } from 'react';
import { BlogPost, Theme } from '../types';
import { BLOG_POSTS } from '../data/agencyData';
import { BlogModal } from './BlogModal';
import { SpotlightCard } from './SpotlightCard';
import { Search, Clock, ArrowRight, BookOpen, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogsPageProps {
  theme: Theme;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({ theme }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Figma Systems', 'CRM Architecture', 'Micro-Animations'];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className={`pt-28 pb-20 sm:pt-32 sm:pb-24 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#080808] text-white' : 'bg-white text-neutral-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <motion.div
          className={`max-w-3xl space-y-4 p-6 sm:p-8 rounded-3xl backdrop-blur-xl border shadow-xl ${
            theme === 'dark'
              ? 'bg-neutral-950/80 border-neutral-800/80 shadow-black/80 ring-1 ring-white/5'
              : 'bg-white/85 border-neutral-200/90 shadow-rose-900/10 ring-1 ring-black/5'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-900">
            <span>05. Industry Insights & Engineering Blogs</span>
            <span aria-hidden="true">·</span>
            <span>Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance">
            Technical Insights on Figma Systems & Custom CRMs.
          </h1>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
          }`}>
            Read our engineering articles on tokenized design systems, custom pipeline webhooks, and 60fps React micro-interactions.
          </p>
        </motion.div>

        {/* Filter Bar & Search Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800/20">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-rose-900 text-white shadow-md shadow-rose-900/30'
                    : theme === 'dark'
                    ? 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                    : 'bg-neutral-100 border border-neutral-200 text-neutral-700 hover:text-neutral-950'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles or tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none ${
                theme === 'dark'
                  ? 'bg-neutral-900 border-neutral-800 text-white focus:border-rose-800'
                  : 'bg-neutral-100 border-neutral-200 text-neutral-900 focus:border-rose-800'
              }`}
            />
          </div>
        </div>

        {/* Blog Posts Cards with SpotlightCard */}
        <motion.div layout className="grid md:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <SpotlightCard
                  theme={theme}
                  enableTilt={true}
                  className="p-6 h-full flex flex-col justify-between corner-bracket"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono font-semibold">
                      <span className="text-rose-900 font-bold uppercase tracking-wider">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-neutral-500">
                        <Clock className="w-3 h-3 text-rose-900" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-extrabold tracking-tight group-hover:text-rose-900 transition-colors">
                      {post.title}
                    </h3>

                    <p className={`text-xs leading-relaxed line-clamp-3 ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
                    }`}>
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {post.tags.map((tag, i) => (
                        <span
                          key={i}
                          className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                            theme === 'dark' ? 'bg-neutral-900 text-neutral-400 border border-neutral-800' : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-6 mt-6 border-t border-neutral-800/20 flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-500 group-hover:text-rose-900 transition-colors">
                      Read Full Article
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-rose-900/10 border border-rose-800/30 flex items-center justify-center text-rose-900 group-hover:bg-rose-900 group-hover:text-white transition-all">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Blog Article Reader Modal */}
        <BlogModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          theme={theme}
        />

      </div>
    </section>
  );
};
