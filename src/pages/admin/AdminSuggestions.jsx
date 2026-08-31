import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../config/supabase';
import { MessageSquare, ArrowLeft, Image as ImageIcon, ExternalLink, Trash2, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    setLoading(true);
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('suggestions')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          setSuggestions(data);
        }
      } catch (e) {
        console.error('Error fetching suggestions from Supabase:', e);
      }
    } else {
      const local = JSON.parse(localStorage.getItem('sunnah_suggestions') || '[]');
      setSuggestions(local);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this suggestion?')) return;

    if (isSupabaseConfigured()) {
      await supabase.from('suggestions').delete().eq('id', id);
    }

    const updated = suggestions.filter((s) => s.id !== id);
    setSuggestions(updated);
    localStorage.setItem('sunnah_suggestions', JSON.stringify(updated));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 mb-3 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Admin Dashboard
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Community Suggestions & Media Inbox
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Review community feedback and inspection screenshots uploaded to Cloudinary.
        </p>
      </div>

      {/* Suggestions List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading suggestions...</div>
        ) : suggestions.length > 0 ? (
          suggestions.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {item.email || 'Anonymous Contributor'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {new Date(item.created_at || Date.now()).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                  {item.message}
                </p>
              </div>

              {/* Cloudinary Image Attachment Preview */}
              {item.image_path ? (
                <div className="shrink-0 space-y-2">
                  <div
                    onClick={() => setPreviewImage(item.image_path)}
                    className="relative cursor-pointer group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 w-36 h-28 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-sm"
                  >
                    <img
                      src={item.image_path}
                      alt="Attachment"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold gap-1">
                      <ExternalLink className="w-3.5 h-3.5" /> View
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 block text-center truncate max-w-[140px]">
                    ☁️ Cloudinary
                  </span>
                </div>
              ) : null}

              {/* Action */}
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition self-end md:self-center"
                title="Delete Suggestion"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-12 text-center text-slate-400 text-xs">
            No suggestions submitted yet.
          </div>
        )}
      </div>

      {/* Image Modal Lightbox */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl overflow-hidden p-2 shadow-2xl">
            <img
              src={previewImage}
              alt="Full Preview"
              className="max-h-[80vh] w-auto rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSuggestions;
