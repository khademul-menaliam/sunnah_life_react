import React from 'react';
import { Link } from 'react-router-dom';
import { initialPrayers } from '../../data/initialData';
import { Clock, ArrowRight, ShieldCheck, BookOpen } from 'lucide-react';

const PrayerList = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-emerald-600 text-xs font-black uppercase tracking-widest">
          <Clock className="w-4 h-4" />
          <span>Module 1 — Daily Obligatory Worship</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          The 5 Daily Obligatory Prayers (Salah)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Salah is the second pillar of Islam and the direct link between a servant and their Creator. Learn the virtues, rak'at breakdown, and authentic hadiths for each prayer.
        </p>
      </div>

      {/* Prayer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialPrayers.map((prayer) => (
          <div
            key={prayer.id}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                <span className="text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-lg">
                  Prayer #{prayer.order_number}
                </span>
                <span className="arabic-text text-xl font-bold text-emerald-800 dark:text-emerald-300">
                  {prayer.arabic_name}
                </span>
              </div>

              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                {prayer.name}
              </h2>
              <span className="text-xs font-medium text-slate-400 block mb-3">
                {prayer.transliteration}
              </span>

              {/* Rakah breakdown pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {prayer.rakat_sunnah_before > 0 && (
                  <span className="text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded">
                    {prayer.rakat_sunnah_before} Sunnah Before
                  </span>
                )}
                <span className="text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded">
                  {prayer.rakat_fard} Fard
                </span>
                {prayer.rakat_sunnah_after > 0 && (
                  <span className="text-[10px] font-bold bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 px-2 py-0.5 rounded">
                    {prayer.rakat_sunnah_after} Sunnah After
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                {prayer.significance}
              </p>
            </div>

            <Link
              to={`/prayers/${prayer.id}`}
              className="mt-2 w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-slate-700 dark:text-slate-300 text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              View Full Guide & Hadiths <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerList;
