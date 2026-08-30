import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePrayer } from '../../context/PrayerContext';
import { User, MapPin, Settings2, Bell, Check, Loader2, ShieldCheck } from 'lucide-react';

const Profile = () => {
  const { user, profile, isAdmin, updateProfile } = useAuth();
  const { updateLocation } = usePrayer();

  const [name, setName] = useState(profile?.name || user?.email?.split('@')[0] || '');
  const [city, setCity] = useState(profile?.city || 'Dhaka');
  const [country, setCountry] = useState(profile?.country || 'Bangladesh');
  const [method, setMethod] = useState(profile?.prayer_calculation_method || 'Karachi');
  const [madhab, setMadhab] = useState(profile?.madhab || 'Hanafi');
  
  const [salahAlerts, setSalahAlerts] = useState(profile?.notification_preferences?.salah_alerts ?? true);
  const [dailySunnahAlerts, setDailySunnahAlerts] = useState(profile?.notification_preferences?.daily_sunnah ?? true);

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    const updates = {
      name,
      city,
      country,
      prayer_calculation_method: method,
      madhab,
      notification_preferences: {
        salah_alerts: salahAlerts,
        daily_sunnah: dailySunnahAlerts
      }
    };

    await updateProfile(updates);
    updateLocation(city, country, profile?.latitude || 23.8103, profile?.longitude || 90.4125, method, madhab);

    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Account & Spiritual Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Manage your profile information, city location, and prayer calculation jurisprudence.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          Preferences updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* User Badge */}
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center text-2xl font-black shadow-md">
            {name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">{name}</h2>
              {isAdmin && (
                <span className="text-[10px] font-black uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Admin
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-mono">{user?.email || 'Guest Session'}</p>
          </div>
        </div>

        {/* Basic info */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
            Personal Profile
          </h3>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Country
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Jurisprudence settings */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
            Prayer Jurisprudence Settings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Calculation Method
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Karachi">Karachi (Standard)</option>
                <option value="ISNA">ISNA (North America)</option>
                <option value="MWL">Muslim World League</option>
                <option value="Makkah">Umm Al-Qura (Makkah)</option>
                <option value="Egypt">Egyptian General Authority</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Asr Madhab
              </label>
              <select
                value={madhab}
                onChange={(e) => setMadhab(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Hanafi">Hanafi</option>
                <option value="Shafi">Shafi / Hanbali / Maliki</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification preferences */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
            Reminders & Notifications
          </h3>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={salahAlerts}
              onChange={(e) => setSalahAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Enable Daily Salah Reminders & Countdown Notifications
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={dailySunnahAlerts}
              onChange={(e) => setDailySunnahAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Enable Daily Sunnah Habit Checklist Nudges
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Profile Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
