import React, { useState } from 'react';
import { BlogPost, Theme } from '../types';
import { X, Copy, Check, Clock, User, Tag, Sparkles } from 'lucide-react';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
  theme: Theme;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose, theme }) => {
  const [copied, setCopied] = useState(false);

  if (!post) return null;

  const handleCopyCode = () => {
    if (post.codeSnippet) {
      navigator.clipboard.writeText(post.codeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div
        className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border transition-all shadow-2xl ${
          theme === 'dark'
            ? 'bg-[#0F0F12] border-neutral-800 text-white shadow-rose-950/30'
            : 'bg-white border-neutral-200 text-neutral-900 shadow-2xl'
        }`}
      >
        {/* Sticky Header */}
        <div className={`sticky top-0 z-20 px-6 py-4 border-b flex items-center justify-between gap-4 backdrop-blur-md ${
          theme === 'dark' ? 'bg-[#0F0F12]/95 border-neutral-800' : 'bg-white border-neutral-200 shadow-xs'
        }`}>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-900">
              {post.category} · {post.readTime}
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight mt-0.5">
              {post.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors cursor-pointer border ${
              theme === 'dark'
                ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                : 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-neutral-950'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Author & Meta */}
          <div className="flex items-center justify-between gap-4 text-xs font-mono text-neutral-400 pb-4 border-b border-neutral-800/20">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-rose-800" />
              <span>{post.author.name} ({post.author.role})</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-rose-800" />
              <span>{post.date}</span>
            </div>
          </div>

          {/* Code Snippet Box (if available) */}
          {post.codeSnippet && (
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 font-mono text-xs relative overflow-x-auto">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 text-rose-700 font-bold">
                <span>{post.codeSnippet.title} ({post.codeSnippet.language})</span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-neutral-900 border border-neutral-800 hover:text-white cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-red-300 leading-relaxed">
                <code>{post.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Main Article Content */}
          <div className={`prose prose-sm max-w-none space-y-4 text-sm leading-relaxed ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            {post.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-neutral-800/20 flex flex-wrap gap-2">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-rose-950/20 text-rose-700 border border-red-800/30 flex items-center gap-1"
              >
                <Tag className="w-3 h-3" />
                <span>{tag}</span>
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
