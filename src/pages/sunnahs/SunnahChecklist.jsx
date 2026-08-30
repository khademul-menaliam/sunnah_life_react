import React, { useState } from 'react';
import { initialSunnahs } from '../../data/initialData';
import { usePrayer } from '../../context/PrayerContext';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Filter,
  Trophy,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

const SunnahChecklist = () => {
  const { sunnahLogs, toggleSunnah } = usePrayer();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Sunnahs' },
    { id: 'sleep', label: 'Sleep & Night' },
    { id: 'hygiene', label: 'Hygiene & Purity' },
    { id: 'social', label: 'Social & Manners' },
    { id: 'worship', label: 'Voluntary Worship' },
    { id: 'morning', label: 'Morning Habits' }
  ];

  const filteredSunnahs = initialSunnahs.filter((s) => {
    return selectedCategory === 'all' || s.category === selectedCategory;
  });

  const total = initialSunnahs.length;
  const completed = Object.values(sunnahLogs).filter(Boolean).length;
  const percentage = Math.round((completed / total) * 100);

  const handleToggle = (id) => {
    toggleSunnah(id);
    if (completed + 1 === total && !sunnahLogs[id]) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Prophetic Lifestyle
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Daily Sunnah Habits Checklist
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Incorporate the beautiful daily practices of Prophet Muhammad ﷺ into your routine.
          </p>
        </div>

        {/* Progress Gauge Pill */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-5 py-3 rounded-2xl shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center font-mono font-black text-emerald-600 text-sm">
            {percentage}%
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-slate-400 block">Today's Progress</span>
            <span className="text-xs font-black text-slate-800 dark:text-slate-200">
              {completed} of {total} Done
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              selectedCategory === c.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Sunnahs List */}
      <div className="space-y-3">
        {filteredSunnahs.map((sunnah) => {
          const isDone = Boolean(sunnahLogs[sunnah.id]);

          return (
            <div
              key={sunnah.id}
              onClick={() => handleToggle(sunnah.id)}
              className={`p-5 rounded-3xl border transition cursor-pointer flex items-center justify-between gap-4 ${
                isDone
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-800 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <button
                  type="button"
                  className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition shrink-0 ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : 'border-2 border-slate-300 dark:border-slate-700 hover:border-emerald-500'
                  }`}
                >
                  {isDone && <CheckCircle2 className="w-4 h-4" />}
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {sunnah.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 capitalize">
                      {sunnah.difficulty}
                    </span>
                  </div>

                  <h3
                    className={`text-sm font-black transition ${
                      isDone
                        ? 'text-emerald-900 dark:text-emerald-200 line-through opacity-80'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {sunnah.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {sunnah.description}
                  </p>
                </div>
              </div>

              {sunnah.arabic_title && (
                <span className="arabic-text text-base font-bold text-emerald-800 dark:text-emerald-300 shrink-0 hidden sm:block">
                  {sunnah.arabic_title}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SunnahChecklist;
