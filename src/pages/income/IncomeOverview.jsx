import React from 'react';
import { Link } from 'react-router-dom';
import { initialIncomeTypes } from '../../data/initialData';
import {
  Coins,
  ShieldCheck,
  Calculator,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertOctagon,
  HelpCircle
} from 'lucide-react';

const IncomeOverview = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-emerald-600 text-xs font-black uppercase tracking-widest">
          <Coins className="w-4 h-4" />
          <span>Module 4 — Ethical Livelihood & Commerce</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Halal Rizq (Income & Islamic Finance)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Earning a lawful and honest livelihood is an act of worship. Discover Islamic finance contracts, business ethics, and calculate your annual Zakat with precision.
        </p>
      </div>

      {/* Hero Cards: Concepts & Zakat Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Zakat Calculator */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
              🧮
            </div>
            <h2 className="text-xl font-black">Interactive Zakat Calculator</h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Calculate your annual Zakat with live Nisab thresholds based on gold and silver standards. Save your calculations and track year-over-year giving.
            </p>
          </div>

          <Link
            to="/income/zakat"
            className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white text-emerald-800 text-xs font-black hover:bg-emerald-50 transition shadow"
          >
            Open Zakat Calculator <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Card 2: Islamic Finance Concepts */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between border border-slate-700">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
              ⚖️
            </div>
            <h2 className="text-xl font-black">Islamic Finance & Business Ethics</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Understand Shariah contracts like Mudarabah (profit-sharing), Musharakah (equity), Murabaha (trade), Sukuk, and core business ethics.
            </p>
          </div>

          <Link
            to="/income/finance"
            className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-black hover:bg-emerald-500 transition shadow"
          >
            Learn Finance Concepts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Halal vs Haram Industries Directory */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 dark:text-white">
          Halal vs Haram Career & Industry Guidelines
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialIncomeTypes.map((item) => {
            const isHalal = item.category === 'halal';
            const isHaram = item.category === 'haram';

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                        isHalal
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                          : isHaram
                          ? 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300'
                          : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                      }`}
                    >
                      {isHalal && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      {isHaram && <AlertOctagon className="w-3 h-3 text-red-600" />}
                      {!isHalal && !isHaram && <HelpCircle className="w-3 h-3 text-amber-600" />}
                      {item.category}
                    </span>

                    <span className="text-[10px] font-bold text-slate-400 font-mono">
                      {item.industry}
                    </span>
                  </div>

                  <h4 className="text-base font-black text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {item.explanation}
                  </p>
                </div>

                {item.quran_reference && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                    📜 {item.quran_reference}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IncomeOverview;
