import React, { useState } from 'react';
import { initialHadiths } from '../../data/initialData';
import { BookOpen, Search, Filter } from 'lucide-react';
import HadithCard from '../../components/common/HadithCard';

const HadithList = () => {
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');

  const modules = [
    { id: 'all', label: 'All Hadiths' },
    { id: 'prayer', label: 'Salah & Prayer' },
    { id: 'eating', label: 'Food & Nutrition' },
    { id: 'sunnah', label: 'Sunnah & Adhkar' },
    { id: 'income', label: 'Halal Rizq & Finance' }
  ];

  const filteredHadiths = initialHadiths.filter((h) => {
    const matchesSearch =
      h.translation.toLowerCase().includes(search.toLowerCase()) ||
      h.arabic_text.includes(search) ||
      (h.narrator && h.narrator.toLowerCase().includes(search.toLowerCase())) ||
      h.source.toLowerCase().includes(search.toLowerCase()) ||
      (h.topic && h.topic.toLowerCase().includes(search.toLowerCase()));

    const matchesModule = moduleFilter === 'all' || h.module === moduleFilter;

    return matchesSearch && matchesModule;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-emerald-600 text-xs font-black uppercase tracking-widest mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Verified Scriptures</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Authentic Hadith Library
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Search verified prophetic narrations across prayer, nutrition, ethics, and daily Sunnah practices.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by topic, keyword, narrator (e.g. Aisha, Bukhari, Fajr)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => setModuleFilter(m.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                moduleFilter === m.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hadiths List */}
      <div className="space-y-6">
        {filteredHadiths.length > 0 ? (
          filteredHadiths.map((hadith) => (
            <HadithCard key={hadith.id} hadith={hadith} />
          ))
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-12 text-center text-slate-400">
            No hadiths found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default HadithList;
