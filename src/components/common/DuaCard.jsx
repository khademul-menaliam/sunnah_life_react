import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const DuaCard = ({ dua }) => {
  const [copied, setCopied] = useState(false);

  if (!dua) return null;

  const handleCopy = () => {
    const text = `${dua.arabic_text}\n${dua.transliteration}\n"${dua.translation}"`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatOccasion = (str) => {
    if (!str) return 'Supplication';
    return str
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg">
          {formatOccasion(dua.occasion)}
        </span>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-emerald-600 transition"
          title="Copy Dua"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Arabic text */}
      <div className="bg-emerald-50/30 dark:bg-emerald-950/20 p-5 rounded-2xl border border-emerald-100/30 dark:border-emerald-900/20 mb-4">
        <p className="arabic-text text-xl sm:text-2xl text-right text-emerald-950 dark:text-emerald-200 font-bold leading-loose">
          {dua.arabic_text}
        </p>
      </div>

      {/* Transliteration */}
      {dua.transliteration && (
        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono italic mb-2">
          {dua.transliteration}
        </p>
      )}

      {/* Translation */}
      <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed border-l-2 border-emerald-500 pl-3">
        "{dua.translation}"
      </p>
    </div>
  );
};

export default DuaCard;
