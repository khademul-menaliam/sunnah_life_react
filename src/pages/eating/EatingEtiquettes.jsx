import React from 'react';
import { initialEtiquettes } from '../../data/initialData';
import { Sparkles, ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const EatingEtiquettes = () => {
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
          Sunnah Eating Etiquettes (Adab al-Ta'am)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Transform ordinary meals into rewarded worship by adhering to the manners taught by Prophet Muhammad ﷺ.
        </p>
      </div>

      {/* Etiquette Cards List */}
      <div className="space-y-4">
        {initialEtiquettes.map((etiquette) => (
          <div
            key={etiquette.id}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-emerald-200 dark:hover:border-emerald-800 transition"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-black font-mono flex items-center justify-center text-sm shrink-0">
                #{etiquette.order_number}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2.5 py-0.5 rounded">
                    {etiquette.type}
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {etiquette.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {etiquette.description}
                </p>
              </div>
            </div>

            {etiquette.arabic_text && (
              <div className="bg-slate-50 dark:bg-slate-950/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 shrink-0 self-end sm:self-center">
                <span className="arabic-text text-base font-bold text-emerald-700 dark:text-emerald-300">
                  {etiquette.arabic_text}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EatingEtiquettes;
