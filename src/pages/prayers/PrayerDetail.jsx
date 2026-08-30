import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { initialPrayers, initialHadiths } from '../../data/initialData';
import { Clock, ArrowLeft, CheckCircle, Info, Sparkles, BookOpen } from 'lucide-react';
import HadithCard from '../../components/common/HadithCard';

const PrayerDetail = () => {
  const { id } = useParams();
  const prayer = initialPrayers.find((p) => p.id === parseInt(id, 10)) || initialPrayers[0];

  // Associated hadiths
  const hadiths = initialHadiths.filter((h) => h.prayer_id === prayer.id);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back button */}
      <Link
        to="/prayers"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to 5 Daily Prayers
      </Link>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500/30 border border-emerald-400/30 px-3 py-1 rounded-full inline-block mb-2">
              Prayer #{prayer.order_number}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black">{prayer.name} Prayer</h1>
            <p className="text-sm text-emerald-200 font-medium mt-1">
              {prayer.transliteration} — {prayer.time_window_description}
            </p>
          </div>

          <div className="arabic-text text-4xl sm:text-5xl font-black text-emerald-300">
            {prayer.arabic_name}
          </div>
        </div>
      </div>

      {/* Rakat Breakdown Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h3 className="text-sm font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          Rak'at Structure Breakdown
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
            <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-400 block">
              Sunnah Before
            </span>
            <span className="text-2xl font-black text-amber-900 dark:text-amber-300 mt-1 block">
              {prayer.rakat_sunnah_before}
            </span>
            <span className="text-[10px] text-amber-600/80">Rakat</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
            <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400 block">
              Obligatory (Fard)
            </span>
            <span className="text-2xl font-black text-emerald-900 dark:text-emerald-300 mt-1 block">
              {prayer.rakat_fard}
            </span>
            <span className="text-[10px] text-emerald-600/80">Rakat</span>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/30">
            <span className="text-[10px] font-black uppercase text-teal-700 dark:text-teal-400 block">
              Sunnah After
            </span>
            <span className="text-2xl font-black text-teal-900 dark:text-teal-300 mt-1 block">
              {prayer.rakat_sunnah_after}
            </span>
            <span className="text-[10px] text-teal-600/80">Rakat</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-black uppercase text-slate-500 block">
              Voluntary (Nafl)
            </span>
            <span className="text-2xl font-black text-slate-700 dark:text-slate-200 mt-1 block">
              {prayer.rakat_nafl}
            </span>
            <span className="text-[10px] text-slate-400">Rakat</span>
          </div>
        </div>
      </div>

      {/* Spiritual Significance & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <Info className="w-4 h-4" /> Spiritual Significance
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {prayer.significance}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" /> Special Instructions
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {prayer.special_notes || 'Ensure Khushu (focus) and perform with devotion and serenity.'}
          </p>
        </div>
      </div>

      {/* Related Authentic Hadiths */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          Authentic Hadiths Regarding {prayer.name}
        </h3>

        {hadiths.length > 0 ? (
          <div className="space-y-4">
            {hadiths.map((h) => (
              <HadithCard key={h.id} hadith={h} />
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">No specific hadiths linked yet.</p>
        )}
      </div>
    </div>
  );
};

export default PrayerDetail;
