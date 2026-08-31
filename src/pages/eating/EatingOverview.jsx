import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, HeartHandshake, BookOpen, ShieldCheck, ArrowRight, Apple, CheckCircle } from 'lucide-react';

const EatingOverview = () => {
  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-emerald-600 text-xs font-black uppercase tracking-widest">
          <Utensils className="w-4 h-4" />
          <span>Module 2 — Nourishment of the Body & Soul</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Halal & Tayyib (Pure) Eating Habits
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Islam places immense emphasis on what we consume. Food must not only be Halal (lawful) but also Tayyib (pure, nutritious, and wholesome).
        </p>
      </div>

      {/* Quranic Principle Card */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-3">
        <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full inline-block">
          Divine Command
        </span>
        <div className="arabic-text text-2xl sm:text-3xl font-bold select-none text-emerald-100">
          يَا أَيُّهَا النَّاسُ كُلُوا مِمَّا فِي الْأَرْضِ حَلَالًا طَيِّبًا
        </div>
        <p className="text-xs sm:text-sm font-semibold text-emerald-50 italic">
          "O mankind, eat from whatever is on earth [that is] lawful and wholesome, and do not follow the footsteps of Satan..."
        </p>
        <span className="text-[10px] font-black text-emerald-200 block">— Surah Al-Baqarah [2:168]</span>
      </div>

      {/* 3 Main Sections Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Foods Directory */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center text-2xl mb-4">
              🍏
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
              Halal & Haram Foods Directory
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Explore blessed Prophetic foods (Ajwa dates, pure honey, olive oil) and understand the rulings on prohibited items and doubtful additives.
            </p>
          </div>
          <Link
            to="/eating/foods"
            className="w-full py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            Explore Food Directory <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 2: Eating Etiquettes */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 flex items-center justify-center text-2xl mb-4">
              🤲
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
              Prophetic Eating Adab & Sunnahs
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Learn the manners of dining: washing hands, eating with the right hand, the 1/3 portion rule, sitting posture, and community meals.
            </p>
          </div>
          <Link
            to="/eating/etiquettes"
            className="w-full py-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-600 text-teal-700 dark:text-teal-300 text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            View Sunnah Etiquettes <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 3: Eating Duas */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center text-2xl mb-4">
              📖
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
              Mealtime Supplications (Duas)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Authentic Duas with Arabic calligraphy, transliteration, and English meanings for before meals, after eating, drinking, and iftar.
            </p>
          </div>
          <Link
            to="/eating/duas"
            className="w-full py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 text-amber-700 dark:text-amber-300 text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            Read Eating Duas <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EatingOverview;
