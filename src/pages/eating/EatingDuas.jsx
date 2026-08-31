import React from 'react';
import { initialDuas } from '../../data/initialData';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import DuaCard from '../../components/common/DuaCard';

const EatingDuas = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Link
          to="/eating"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 mb-3 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Halal Eating Overview
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Authentic Mealtime Duas (Supplications)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Essential prophetic supplications to recite before, during, and after meals, fasting, and drinking.
        </p>
      </div>

      {/* Duas List */}
      <div className="space-y-6">
        {initialDuas.map((dua) => (
          <DuaCard key={dua.id} dua={dua} />
        ))}
      </div>
    </div>
  );
};

export default EatingDuas;
