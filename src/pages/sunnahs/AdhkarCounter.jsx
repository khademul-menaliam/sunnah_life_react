import React, { useState } from 'react';
import { initialAdhkars } from '../../data/initialData';
import { Sparkles, RotateCcw, Volume2, Check, ArrowRight, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

const AdhkarCounter = () => {
  const [selectedCategory, setSelectedCategory] = useState('morning');
  const [activeAdhkarIndex, setActiveAdhkarIndex] = useState(0);
  const [count, setCount] = useState(0);

  const categories = [
    { id: 'morning', label: 'Morning Adhkar' },
    { id: 'evening', label: 'Evening Adhkar' },
    { id: 'after_prayer', label: 'After Prayer (Post-Salah)' },
    { id: 'before_sleep', label: 'Before Sleep' }
  ];

  const currentCategoryAdhkars = initialAdhkars.filter(
    (a) => a.category === selectedCategory
  );
  const activeAdhkar = currentCategoryAdhkars[activeAdhkarIndex] || initialAdhkars[0];

  const handleIncrement = () => {
    // Haptic feedback on supported mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(40);
    }

    const nextCount = count + 1;
    setCount(nextCount);

    if (nextCount === activeAdhkar.repetitions) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleSelectAdhkar = (index) => {
    setActiveAdhkarIndex(index);
    setCount(0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Remembrance of Allah
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Digital Tasbeeh & Daily Adhkar Counter
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          "Unquestionably, by the remembrance of Allah hearts are assured." (Surah Ar-Ra'd 13:28)
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setSelectedCategory(c.id);
              setActiveAdhkarIndex(0);
              setCount(0);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
              selectedCategory === c.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Main Interactive Tasbeeh Counter Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Adhkar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Target: {activeAdhkar.repetitions} {activeAdhkar.repetitions === 1 ? 'Time' : 'Times'}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {activeAdhkar.name}
            </h2>
          </div>

          <div className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-slate-600 dark:text-slate-300 self-start sm:self-center">
            {activeAdhkar.source || 'Authentic Prophetic Sunnah'}
          </div>
        </div>

        {/* Arabic Calligraphy */}
        <div className="bg-emerald-50/40 dark:bg-emerald-950/20 p-6 rounded-3xl border border-emerald-100/50 dark:border-emerald-900/30 text-center">
          <p className="arabic-text text-2xl sm:text-3xl text-emerald-950 dark:text-emerald-200 font-bold leading-loose select-none">
            {activeAdhkar.arabic_text}
          </p>
        </div>

        {/* Transliteration & Translation */}
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          {activeAdhkar.transliteration && (
            <p className="text-xs font-mono italic text-slate-500 dark:text-slate-400">
              {activeAdhkar.transliteration}
            </p>
          )}
          <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
            "{activeAdhkar.translation}"
          </p>
        </div>

        {/* 🔘 Big Interactive Tap Button & Progress Ring */}
        <div className="flex flex-col items-center justify-center pt-4 space-y-4">
          <button
            type="button"
            onClick={handleIncrement}
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-700 hover:to-teal-600 active:scale-95 text-white shadow-2xl shadow-emerald-600/30 flex flex-col items-center justify-center transition-transform cursor-pointer select-none border-4 border-white dark:border-slate-800"
          >
            <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight">
              {count}
            </span>
            <span className="text-[11px] font-black uppercase tracking-widest mt-1 text-emerald-100">
              Tap / Press
            </span>
            <span className="text-[10px] text-emerald-200 font-mono mt-0.5">
              of {activeAdhkar.repetitions}
            </span>
          </button>

          {/* Reset button */}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-red-500 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Count
          </button>
        </div>
      </div>

      {/* Playlist / Switch Adhkar in Current Category */}
      {currentCategoryAdhkars.length > 1 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">
            More in {selectedCategory.replace('_', ' ')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentCategoryAdhkars.map((adhkar, idx) => (
              <button
                key={adhkar.id}
                onClick={() => handleSelectAdhkar(idx)}
                className={`p-3.5 rounded-2xl border text-left transition ${
                  activeAdhkarIndex === idx
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                    : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span className="text-xs font-black text-slate-900 dark:text-white block truncate">
                  {adhkar.name}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Repeat {adhkar.repetitions}x
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdhkarCounter;
