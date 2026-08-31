import React from 'react';
import { initialFinanceConcepts, initialBusinessEthics } from '../../data/initialData';
import { ArrowLeft, BookOpen, Scale, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const FinanceConcepts = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <Link
          to="/income"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 mb-3 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Halal Rizq Overview
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Islamic Financial Contracts & Business Ethics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Core principles governing Shariah-compliant investments, trade, partnerships, and ethical business conduct.
        </p>
      </div>

      {/* Financial Contracts Section */}
      <div className="space-y-6">
        <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 border-l-4 border-emerald-600 pl-3">
          1. Key Islamic Financial Contracts (Mu'amalat)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialFinanceConcepts.map((concept) => (
            <div
              key={concept.id}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg">
                  {concept.category}
                </span>
                {concept.arabic_title && (
                  <span className="arabic-text text-lg font-bold text-emerald-800 dark:text-emerald-300">
                    {concept.arabic_title}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {concept.title}
                </h3>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 mt-1">
                  {concept.summary}
                </p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {concept.detailed_explanation}
              </p>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 block">
                  Modern Real-World Example:
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {concept.modern_examples}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Business Ethics Principles Section */}
      <div className="space-y-6">
        <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 border-l-4 border-teal-600 pl-3">
          2. Islamic Principles of Business Ethics (Akhlaq)
        </h2>

        <div className="space-y-4">
          {initialBusinessEthics.map((ethic) => (
            <div
              key={ethic.id}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 font-mono font-black text-xs flex items-center justify-center">
                    #{ethic.id}
                  </span>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">
                    {ethic.principle}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pl-8">
                  {ethic.explanation}
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 text-[11px] font-semibold text-slate-700 dark:text-slate-300 max-w-xs shrink-0 self-end sm:self-center">
                <span className="text-[9px] font-black uppercase text-teal-600 block mb-0.5">Practical Rule:</span>
                {ethic.practical_application}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinanceConcepts;
