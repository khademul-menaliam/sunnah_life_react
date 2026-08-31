import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Utensils,
  Sparkles,
  Coins,
  CheckCircle2,
  Send,
  Loader2,
  ArrowRight,
  HeartHandshake,
  Check,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePrayer } from '../context/PrayerContext';
import { initialHadiths, dailyQuranVerses, initialSunnahs } from '../data/initialData';
import HadithCard from '../components/common/HadithCard';
import QuranVerseCard from '../components/common/QuranVerseCard';
import CloudinaryUpload from '../components/common/CloudinaryUpload';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import confetti from 'canvas-confetti';

const Dashboard = () => {
  const { user, profile } = useAuth();
  const { timings, nextPrayer, prayerLogs, sunnahLogs, logPrayer } = usePrayer();

  // Suggestion state
  const [suggestionEmail, setSuggestionEmail] = useState(user?.email || '');
  const [suggestionMessage, setSuggestionMessage] = useState('');
  const [suggestionImageUrl, setSuggestionImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [suggestionStatus, setSuggestionStatus] = useState(null); // 'success' | 'error'

  const hadithOfDay = initialHadiths[0];
  const quranVerse = dailyQuranVerses[0];

  // Calculate sunnah completion
  const totalSunnahs = initialSunnahs.length;
  const completedSunnahs = Object.values(sunnahLogs).filter(Boolean).length;
  const sunnahPercentage = Math.round((completedSunnahs / totalSunnahs) * 100);

  // Prayer list definition
  const prayerList = [
    { id: 1, name: 'Fajr', rakah: '2 Rakah Fard' },
    { id: 2, name: 'Dhuhr', rakah: '4 Rakah Fard' },
    { id: 3, name: 'Asr', rakah: '4 Rakah Fard' },
    { id: 4, name: 'Maghrib', rakah: '3 Rakah Fard' },
    { id: 5, name: 'Isha', rakah: '4 Rakah Fard' }
  ];

  const handleSuggestionSubmit = async (e) => {
    e.preventDefault();
    if (!suggestionMessage.trim()) return;

    setSubmitting(true);
    setSuggestionStatus(null);

    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('suggestions').insert([
          {
            user_id: user?.id || null,
            email: suggestionEmail || null,
            message: suggestionMessage,
            image_path: suggestionImageUrl || null
          }
        ]);
        if (error) throw error;
      } else {
        // Fallback: save to localStorage
        const existing = JSON.parse(localStorage.getItem('sunnah_suggestions') || '[]');
        existing.push({
          id: Date.now(),
          email: suggestionEmail,
          message: suggestionMessage,
          image_path: suggestionImageUrl,
          created_at: new Date().toISOString()
        });
        localStorage.setItem('sunnah_suggestions', JSON.stringify(existing));
      }

      setSuggestionStatus('success');
      setSuggestionMessage('');
      setSuggestionImageUrl('');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    } catch (err) {
      console.error('Suggestion submit error:', err);
      setSuggestionStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 🌟 Welcome / Prayer Countdown Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 text-white shadow-xl shadow-emerald-950/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden">
        {/* Glow circles */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
        <div className="absolute right-24 top-2 w-32 h-32 rounded-full bg-teal-400/20 blur-xl pointer-events-none"></div>

        <div className="relative z-10 space-y-1.5">
          <span className="text-[11px] font-black uppercase tracking-widest bg-emerald-500/40 border border-emerald-400/30 px-3 py-1 rounded-full inline-block">
            Assalamu Alaikum
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome, {profile?.name || user?.email?.split('@')[0] || 'Deen Tracker'}!
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium max-w-xl">
            Keep track of your daily prayers, authentic prophetic Sunnah habits, and spiritual progress.
          </p>
        </div>

        {/* Next Obligatory Salah Countdown Box */}
        <div className="bg-white/15 backdrop-blur-md border border-white/20 p-5 rounded-2xl shrink-0 text-center relative z-10 sm:min-w-[200px]">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-200 block">
            Next Obligatory Salah
          </span>
          <div className="text-2xl font-black mt-1 tracking-tight font-sans">
            {nextPrayer?.name || 'Fajr'}
          </div>
          <div className="text-xs font-bold font-mono bg-emerald-950/40 text-emerald-200 px-3 py-1 rounded-lg mt-2 inline-block shadow-inner">
            in {nextPrayer?.formatted || '--:--:--'}
          </div>
        </div>
      </div>

      {/* 🚀 Quick Navigation Shortcuts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          to="/prayers/tracker"
          className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm text-center block group hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition"
        >
          <span className="text-2xl group-hover:scale-110 transition duration-300 block mb-1.5">🕌</span>
          <span className="text-xs font-black text-slate-800 dark:text-slate-200 block">Salah Tracker</span>
          <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">Log 5 daily prayers</span>
        </Link>
        <Link
          to="/eating"
          className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm text-center block group hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition"
        >
          <span className="text-2xl group-hover:scale-110 transition duration-300 block mb-1.5">🍏</span>
          <span className="text-xs font-black text-slate-800 dark:text-slate-200 block">Halal Eating</span>
          <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">Tayyib foods & duas</span>
        </Link>
        <Link
          to="/sunnahs"
          className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm text-center block group hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition"
        >
          <span className="text-2xl group-hover:scale-110 transition duration-300 block mb-1.5">✨</span>
          <span className="text-xs font-black text-slate-800 dark:text-slate-200 block">Sunnah Habits</span>
          <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">Daily sunnah list</span>
        </Link>
        <Link
          to="/income"
          className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm text-center block group hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition"
        >
          <span className="text-2xl group-hover:scale-110 transition duration-300 block mb-1.5">💼</span>
          <span className="text-xs font-black text-slate-800 dark:text-slate-200 block">Halal Rizq</span>
          <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">Zakat & ethics</span>
        </Link>
      </div>

      {/* 📊 Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Today's Timings & Sunnah Progress */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Today's Salah Timings Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5 mb-4">
              <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span>📅</span> Today's Salah Timings
              </h3>
              <Link
                to="/prayer-times"
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Settings
              </Link>
            </div>

            <div className="space-y-2.5">
              {prayerList.map((prayer) => {
                const timeString = timings?.formatted?.[prayer.name] || '--:--';
                const status = prayerLogs[prayer.id] || 'unlogged';

                return (
                  <div
                    key={prayer.id}
                    className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/30 hover:border-emerald-200 dark:hover:border-emerald-800 transition"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                        {prayer.name}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">
                        {prayer.rakah}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
                        {timeString}
                      </span>

                      {/* Quick Status Toggle Button */}
                      <button
                        onClick={() => {
                          const next = status === 'prayed' ? 'congregation' : status === 'congregation' ? 'unlogged' : 'prayed';
                          logPrayer(prayer.id, next);
                        }}
                        className={`w-4 h-4 rounded-full transition-all shadow-sm ${
                          status === 'prayed'
                            ? 'bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950'
                            : status === 'congregation'
                            ? 'bg-teal-500 ring-4 ring-teal-100 dark:ring-teal-950'
                            : status === 'qada'
                            ? 'bg-amber-500'
                            : status === 'missed'
                            ? 'bg-red-500'
                            : 'bg-slate-200 dark:bg-slate-700 hover:bg-emerald-300'
                        }`}
                        title={`Status: ${status} (Click to toggle)`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Prayed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span> In Jama'ah
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></span> Unlogged
              </span>
            </div>
          </div>

          {/* Daily Sunnah Habit Progress Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5 mb-5">
              <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span>✨</span> Sunnah Habits Progress
              </h3>
              <Link
                to="/sunnahs"
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Track All
              </Link>
            </div>

            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 shadow-inner">
                <span className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                  {sunnahPercentage}%
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Today's Checklist
                </span>
                <div className="text-base font-black text-slate-800 dark:text-slate-100">
                  {completedSunnahs} of {totalSunnahs} Completed
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Follow the Prophet's ﷺ daily footsteps.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Hadith of the Day, Quran Verse, Suggestion Form */}
        <div className="lg:col-span-2 space-y-6">
          
          <div>
            <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <span className="text-emerald-600">⭐</span> Featured Hadith of the Day
            </h3>
            <HadithCard hadith={hadithOfDay} featured={true} />
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <span className="text-emerald-600">📖</span> Featured Quran Verse of the Day
            </h3>
            <QuranVerseCard verse={quranVerse} />
          </div>

          {/* Suggestion Form Card with Cloudinary Upload */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-5">
              <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span>💡</span> Suggest an Improvement or Hadith Correction
              </h3>
              <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">
                Community Feedback
              </span>
            </div>

            {suggestionStatus === 'success' && (
              <div className="mb-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                Jazakallahu Khairan! Your suggestion has been submitted successfully.
              </div>
            )}

            {suggestionStatus === 'error' && (
              <div className="mb-4 p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-800 dark:text-red-300 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                Failed to submit suggestion. Please try again.
              </div>
            )}

            <form onSubmit={handleSuggestionSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                  Your Email (Optional, for updates)
                </label>
                <input
                  type="email"
                  value={suggestionEmail}
                  onChange={(e) => setSuggestionEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                  Your Feedback / Suggestion <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="3"
                  required
                  value={suggestionMessage}
                  onChange={(e) => setSuggestionMessage(e.target.value)}
                  placeholder="Suggest a new feature, report a typo in Arabic text, or propose a verified Hadith..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                ></textarea>
              </div>

              {/* Cloudinary Image / Screenshot Upload Component */}
              <CloudinaryUpload
                onUploadSuccess={(url) => setSuggestionImageUrl(url)}
                label="Attach Screenshot or Reference Image (Uploaded via Cloudinary)"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Submit Suggestion
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
