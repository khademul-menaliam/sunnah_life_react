import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Shield, Compass, BookOpen, Utensils } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-base">
                🕌
              </div>
              <span className="text-base font-black text-slate-900 dark:text-white">
                Sunnah<span className="text-emerald-600 dark:text-emerald-400">OfLife</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              An authentic, interactive Islamic lifestyle and habit platform for Salah tracking, authentic Hadiths, Halal eating, and spiritual growth.
            </p>
          </div>

          {/* Col 2: Core Modules */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Spiritual Habit Trackers
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/prayers/tracker" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Daily Salah Tracker
                </Link>
              </li>
              <li>
                <Link to="/prayers" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  5 Obligatory Prayers Guide
                </Link>
              </li>
              <li>
                <Link to="/sunnahs" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Daily Sunnah Checklist
                </Link>
              </li>
              <li>
                <Link to="/adhkar" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Digital Tasbeeh & Adhkar
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Lifestyle & Finance */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Halal Living & Finance
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/eating" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Halal & Tayyib Foods
                </Link>
              </li>
              <li>
                <Link to="/eating/duas" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Prophetic Eating Duas
                </Link>
              </li>
              <li>
                <Link to="/income" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Halal Rizq & Ethical Income
                </Link>
              </li>
              <li>
                <Link to="/income/zakat" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Real-time Zakat Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Scriptures & Tools */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Scriptures & Tools
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/hadiths" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Verified Hadith Library
                </Link>
              </li>
              <li>
                <Link to="/qibla" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Accurate Qibla Direction
                </Link>
              </li>
              <li>
                <Link to="/prayer-times" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Worldwide Prayer Timings
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
          <p>© {new Date().getFullYear()} Sunnah of Life. Built with devotion.</p>
          <p className="flex items-center gap-1">
            May Allah accept all our righteous deeds and prayers 🤲
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
