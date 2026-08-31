import React, { useState } from 'react';
import { initialHadiths } from '../../data/initialData';
import { ArrowLeft, Plus, Edit, Trash2, BookOpen, Check, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminHadiths = () => {
  const [hadiths, setHadiths] = useState(initialHadiths);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [module, setModule] = useState('general');
  const [arabicText, setArabicText] = useState('');
  const [transliteration, setTransliteration] = useState('');
  const [translation, setTranslation] = useState('');
  const [source, setSource] = useState('');
  const [narrator, setNarrator] = useState('');
  const [topic, setTopic] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const newHadith = {
      id: Date.now(),
      module,
      arabic_text: arabicText,
      transliteration,
      translation,
      source,
      narrator,
      topic,
      verified: true
    };

    setHadiths([newHadith, ...hadiths]);
    setShowAddForm(false);
    // Reset form
    setArabicText('');
    setTransliteration('');
    setTranslation('');
    setSource('');
    setNarrator('');
    setTopic('');
  };

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this Hadith?')) return;
    setHadiths(hadiths.filter((h) => h.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 mb-3 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Admin Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Hadiths Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Add and manage verified prophetic narrations across all core modules.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" /> {showAddForm ? 'Cancel' : 'Add New Hadith'}
        </button>
      </div>

      {/* Add New Hadith Modal Form */}
      {showAddForm && (
        <form onSubmit={handleAdd} className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 rounded-3xl p-6 sm:p-7 shadow-lg space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Add New Verified Hadith
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Module
              </label>
              <select
                value={module}
                onChange={(e) => setModule(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="prayer">Salah & Prayer</option>
                <option value="eating">Food & Nutrition</option>
                <option value="sunnah">Sunnah & Adhkar</option>
                <option value="income">Halal Rizq & Finance</option>
                <option value="general">General Wisdom</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Topic Title
              </label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Virtue of Congregational Isha"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Arabic Text (Matn)
            </label>
            <textarea
              rows="3"
              required
              value={arabicText}
              onChange={(e) => setArabicText(e.target.value)}
              placeholder="مَنْ صَلَّى..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 arabic-text text-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            ></textarea>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              English Translation
            </label>
            <textarea
              rows="2"
              required
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              placeholder="Whoever prays..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Primary Source
              </label>
              <input
                type="text"
                required
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. Sahih Bukhari 574"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Companion Narrator
              </label>
              <input
                type="text"
                value={narrator}
                onChange={(e) => setNarrator(e.target.value)}
                placeholder="e.g. Abu Hurairah (ra)"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" /> Save Hadith
          </button>
        </form>
      )}

      {/* Table of Hadiths */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4">Topic / Source</th>
                <th className="p-4">Module</th>
                <th className="p-4">Translation</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {hadiths.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                  <td className="p-4">
                    <div className="font-black text-slate-800 dark:text-slate-200">{h.topic || 'General'}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{h.source}</div>
                  </td>
                  <td className="p-4 font-bold text-emerald-600 capitalize">
                    {h.module}
                  </td>
                  <td className="p-4 max-w-xs truncate text-slate-600 dark:text-slate-300 font-medium">
                    {h.translation}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(h.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHadiths;
