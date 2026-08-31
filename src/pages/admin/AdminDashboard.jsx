import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../../config/supabase';
import { initialHadiths, initialSunnahs, initialFoods } from '../../data/initialData';
import {
  ShieldCheck,
  BookOpen,
  MessageSquare,
  Users,
  Image as ImageIcon,
  ArrowRight,
  Database,
  Cloud
} from 'lucide-react';

const AdminDashboard = () => {
  const { profile } = useAuth();
  const [suggestionCount, setSuggestionCount] = useState(0);

  useEffect(() => {
    if (isSupabaseConfigured()) {
      supabase
        .from('suggestions')
        .select('*', { count: 'exact', head: true })
        .then(({ count }) => {
          if (count !== null) setSuggestionCount(count);
        });
    } else {
      const local = JSON.parse(localStorage.getItem('sunnah_suggestions') || '[]');
      setSuggestionCount(local.length);
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-widest mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Administration Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Manage Hadiths, review user suggestions with Cloudinary media, and oversee platform data.
          </p>
        </div>

        {/* Stack Status Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-3.5 py-2 rounded-2xl text-xs font-bold text-emerald-800 dark:text-emerald-300">
          <Database className="w-4 h-4 text-emerald-600" />
          <span>{isSupabaseConfigured() ? 'Supabase Connected' : 'Local Fallback Mode'}</span>
        </div>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-400 block">Verified Hadiths</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {initialHadiths.length}
          </div>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">
            Across 5 Modules
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-400 block">Sunnah Practices</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {initialSunnahs.length}
          </div>
          <span className="text-[10px] text-teal-600 font-bold block mt-1">
            Daily & Weekly Habits
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-400 block">Halal Foods Listed</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {initialFoods.length}
          </div>
          <span className="text-[10px] text-amber-600 font-bold block mt-1">
            Categorized & Verified
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-400 block">User Suggestions</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {suggestionCount}
          </div>
          <span className="text-[10px] text-slate-400 font-bold block mt-1">
            Community feedback
          </span>
        </div>
      </div>

      {/* Admin Action Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Suggestion Review */}
        <Link
          to="/admin/suggestions"
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-1">
              Review Suggestions & Images
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              View suggestions submitted by users with Cloudinary screenshots and proposed Hadith fixes.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            Open Feedback Inbox <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        {/* Hadiths Management */}
        <Link
          to="/admin/hadiths"
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-1">
              Manage Hadiths Database
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Add new verified Hadiths, edit Arabic text, transliterations, and update book citations.
            </p>
          </div>
          <span className="text-xs font-bold text-teal-600 flex items-center gap-1">
            Manage Hadiths <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        {/* Users Management */}
        <Link
          to="/admin/users"
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-1">
              User Profiles & Roles
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Oversee registered accounts, assign admin permissions, and inspect user activity.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
            View Users <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
