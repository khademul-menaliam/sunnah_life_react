import React from 'react';

const QuranVerseCard = ({ verse }) => {
  if (!verse) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200/40 dark:border-emerald-900/40">
          Surah {verse.surah}
        </span>
        <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500">
          Verse {verse.number}
        </span>
      </div>

      <div className="space-y-4">
        {/* Arabic Text */}
        <p className="arabic-text text-xl sm:text-2xl text-right text-emerald-900 dark:text-emerald-300 font-bold bg-emerald-50/20 dark:bg-emerald-950/10 p-5 rounded-2xl border border-emerald-100/20 dark:border-emerald-900/10 select-none">
          {verse.arabic}
        </p>

        {/* Translation */}
        <div className="border-l-2 border-emerald-500/40 pl-4 py-1">
          <blockquote className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 italic leading-relaxed">
            "{verse.translation}"
          </blockquote>
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 mt-2 block">
            — Quran, Surah {verse.surah} [{verse.number}]
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuranVerseCard;
