import React, { useState } from 'react';
import { initialFoods } from '../../data/initialData';
import { Search, CheckCircle2, AlertOctagon, HelpCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FoodsDirectory = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredFoods = initialFoods.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      (f.arabic_name && f.arabic_name.includes(search)) ||
      f.reason.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || f.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || f.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'halal':
        return (
          <span className="text-[10px] font-black uppercase bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-300/40 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Halal & Blessed
          </span>
        );
      case 'haram':
        return (
          <span className="text-[10px] font-black uppercase bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 px-2.5 py-1 rounded-lg border border-red-300/40 flex items-center gap-1">
            <AlertOctagon className="w-3 h-3 text-red-600" /> Strictly Haram
          </span>
        );
      case 'doubtful':
        return (
          <span className="text-[10px] font-black uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-2.5 py-1 rounded-lg border border-amber-300/40 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-amber-600" /> Doubtful (Mushtabahat)
          </span>
        );
      case 'makruh':
        return (
          <span className="text-[10px] font-black uppercase bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 px-2.5 py-1 rounded-lg border border-purple-300/40 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-purple-600" /> Disliked (Makruh)
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Back button & Header */}
      <div>
        <Link
          to="/eating"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 mb-3 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Halal Eating Overview
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Halal & Haram Foods Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Search and verify dietary rulings, prophetic superfoods, and prohibited substances.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by food name, Arabic title, or nutritional benefits..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-black uppercase text-slate-400 mr-1">Filter Status:</span>
          {['all', 'halal', 'haram', 'doubtful', 'makruh'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                statusFilter === s
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map((food) => (
          <div
            key={food.id}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                {getStatusBadge(food.status)}
                <span className="text-[10px] font-black uppercase text-slate-400 font-mono">
                  {food.category}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {food.name}
                </h3>
                {food.arabic_name && (
                  <span className="arabic-text text-lg font-bold text-emerald-800 dark:text-emerald-300 shrink-0">
                    {food.arabic_name}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {food.reason}
              </p>
            </div>

            {food.quran_reference && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                📜 {food.quran_reference}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodsDirectory;
