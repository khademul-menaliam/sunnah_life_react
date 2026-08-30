import React, { useState } from 'react';
import { usePrayer } from '../../context/PrayerContext';
import { initialPrayers } from '../../data/initialData';
import {
  CheckCircle2,
  Users,
  AlertTriangle,
  XCircle,
  Calendar,
  Sparkles,
  Trophy,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

const PrayerTracker = () => {
  const { prayerLogs, logPrayer } = usePrayer();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const prayers = initialPrayers;

  // Compute stats
  const loggedCount = Object.values(prayerLogs).filter(
    (s) => s === 'prayed' || s === 'congregation'
  ).length;

  const handleStatusChange = (prayerId, newStatus) => {
    logPrayer(prayerId, newStatus);
    if (loggedCount === 4 && (newStatus === 'prayed' || newStatus === 'congregation')) {
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
            Salah Accountability
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Daily Salah Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Log your daily obligatory prayers and build a consistent spiritual routine.
          </p>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-2xl shadow-sm">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
          />
        </div>
      </div>

      {/* Progress & Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center text-xl shrink-0">
            🕌
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-slate-400">Completed Today</span>
            <div className="text-xl font-black text-slate-900 dark:text-white">
              {loggedCount} of 5 Prayed
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 flex items-center justify-center text-xl shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-slate-400">In Congregation</span>
            <div className="text-xl font-black text-slate-900 dark:text-white">
              {Object.values(prayerLogs).filter((s) => s === 'congregation').length} Prayers
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center text-xl shrink-0">
            <Flame className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-slate-400">Spiritual Target</span>
            <div className="text-xl font-black text-slate-900 dark:text-white">
              {loggedCount === 5 ? '100% Achieved! 🎉' : `${(loggedCount / 5) * 100}% on track`}
            </div>
          </div>
        </div>
      </div>

      {/* 5 Prayers Tracker List */}
      <div className="space-y-4">
        {prayers.map((prayer) => {
          const currentStatus = prayerLogs[prayer.id] || 'unlogged';

          return (
            <div
              key={prayer.id}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-200 dark:hover:border-emerald-800 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold font-mono text-sm shrink-0">
                  {prayer.order_number}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                    {prayer.name}
                    <span className="arabic-text text-sm font-normal text-slate-400">({prayer.arabic_name})</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {prayer.rakat_fard} Rakah Fard • {prayer.time_window_description}
                  </p>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Prayed Alone */}
                <button
                  type="button"
                  onClick={() => handleStatusChange(prayer.id, 'prayed')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    currentStatus === 'prayed'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-400'
                      : 'bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Prayed
                </button>

                {/* In Congregation */}
                <button
                  type="button"
                  onClick={() => handleStatusChange(prayer.id, 'congregation')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    currentStatus === 'congregation'
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20 ring-2 ring-teal-400'
                      : 'bg-slate-50 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" /> In Jama'ah
                </button>

                {/* Qada */}
                <button
                  type="button"
                  onClick={() => handleStatusChange(prayer.id, 'qada')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    currentStatus === 'qada'
                      ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-400'
                      : 'bg-slate-50 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950 text-slate-500'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" /> Qada
                </button>

                {/* Missed */}
                <button
                  type="button"
                  onClick={() => handleStatusChange(prayer.id, 'missed')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    currentStatus === 'missed'
                      ? 'bg-red-500 text-white shadow-md ring-2 ring-red-400'
                      : 'bg-slate-50 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950 text-slate-500'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5" /> Missed
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrayerTracker;
