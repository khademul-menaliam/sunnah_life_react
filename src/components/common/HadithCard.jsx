import React, { useState } from 'react';
import { Copy, Check, BookOpen, Share2 } from 'lucide-react';

const HadithCard = ({ hadith, featured = false }) => {
  const [copied, setCopied] = useState(false);

  if (!hadith) return null;

  const handleCopy = () => {
    const text = `"${hadith.translation}"\n— ${hadith.source} (${hadith.narrator || 'Sahih'})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-3xl p-6 sm:p-7 transition-all duration-200 border ${
        featured
          ? 'bg-gradient-to-br from-emerald-900/10 via-teal-900/5 to-emerald-950/10 border-emerald-500/30 dark:border-emerald-500/20 shadow-md'
          : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Top Header info (Topic & Source) */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400 text-xs">
            📖
          </span>
          <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            {hadith.topic || (hadith.module ? `${hadith.module} Wisdom` : 'Verified Hadith')}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Copy Hadith"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Arabic Script */}
      {hadith.arabic_text && (
        <div className="mb-5 bg-emerald-50/40 dark:bg-emerald-950/20 p-5 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/20">
          <p className="arabic-text text-xl sm:text-2xl text-right text-emerald-950 dark:text-emerald-200 font-bold select-all leading-loose">
            {hadith.arabic_text}
          </p>
        </div>
      )}

      {/* Transliteration if available */}
      {hadith.transliteration && (
        <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-3 font-mono">
          {hadith.transliteration}
        </p>
      )}

      {/* English Translation */}
      <div className="border-l-2 border-emerald-500 pl-4 py-1 mb-4">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
          "{hadith.translation}"
        </p>
      </div>

      {/* Footer / Narrator & Citation */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400">
        <div>
          {hadith.narrator && (
            <span>Narrated by: <strong className="text-slate-600 dark:text-slate-300">{hadith.narrator}</strong></span>
          )}
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-slate-600 dark:text-slate-300 font-mono text-[10px]">
          {hadith.source}
        </div>
      </div>
    </div>
  );
};

export default HadithCard;
