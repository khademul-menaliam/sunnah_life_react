import React, { useState } from 'react';
import { usePrayer } from '../../context/PrayerContext';
import {
  Clock,
  MapPin,
  Compass,
  Settings2,
  RefreshCw,
  Sun,
  Moon,
  Sunset,
  Sunrise,
  Check
} from 'lucide-react';

const PrayerTimes = () => {
  const {
    city,
    country,
    latitude,
    longitude,
    method,
    madhab,
    timings,
    nextPrayer,
    updateLocation,
    detectLocation
  } = usePrayer();

  const [detecting, setDetecting] = useState(false);
  const [customCity, setCustomCity] = useState(city);
  const [customMethod, setCustomMethod] = useState(method);
  const [customMadhab, setCustomMadhab] = useState(madhab);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const majorCities = [
    { name: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125 },
    { name: 'Makkah', country: 'Saudi Arabia', lat: 21.4225, lng: 39.8262 },
    { name: 'Madinah', country: 'Saudi Arabia', lat: 24.5247, lng: 39.5692 },
    { name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357 },
    { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784 },
    { name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
    { name: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060 },
    { name: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lng: 101.6869 }
  ];

  const handleCitySelect = (c) => {
    updateLocation(c.name, c.country, c.lat, c.lng, customMethod, customMadhab);
    setCustomCity(c.name);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleDetect = async () => {
    try {
      setDetecting(true);
      await detectLocation();
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    } catch (e) {
      alert('Could not detect location: ' + e.message);
    } finally {
      setDetecting(false);
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateLocation(customCity, country, latitude, longitude, customMethod, customMadhab);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const timingRows = [
    { name: 'Fajr', icon: Sunrise, time: timings?.formatted?.Fajr, desc: 'Dawn to Sunrise' },
    { name: 'Sunrise', icon: Sun, time: timings?.formatted?.Sunrise, desc: 'Disallowed for Salah' },
    { name: 'Dhuhr', icon: Sun, time: timings?.formatted?.Dhuhr, desc: 'Zenith to Mid-afternoon' },
    { name: 'Asr', icon: Sun, time: timings?.formatted?.Asr, desc: 'Late Afternoon to Sunset' },
    { name: 'Sunset', icon: Sunset, time: timings?.formatted?.Sunset, desc: 'Sun descends below horizon' },
    { name: 'Maghrib', icon: Sunset, time: timings?.formatted?.Maghrib, desc: 'Post-sunset dusk' },
    { name: 'Isha', icon: Moon, time: timings?.formatted?.Isha, desc: 'Night prayer until midnight' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Astronomical Accuracy
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Daily Prayer Times (Salah Timings)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Computed for <strong className="text-slate-800 dark:text-slate-200">{city}, {country}</strong> using the {method} method ({madhab}).
          </p>
        </div>

        <button
          onClick={handleDetect}
          disabled={detecting}
          className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition flex items-center gap-2"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${detecting ? 'animate-spin' : ''}`} />
          {detecting ? 'Detecting GPS...' : 'Auto-Detect GPS'}
        </button>
      </div>

      {/* Preset Major Cities Quick Selector */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-3">
          Quick Select Location
        </span>
        <div className="flex flex-wrap gap-2">
          {majorCities.map((c) => (
            <button
              key={c.name}
              onClick={() => handleCitySelect(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                city === c.name
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Timetable Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm">
        <h3 className="text-sm font-black text-slate-900 dark:text-white mb-5 flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          Today's Timetable
        </h3>

        <div className="space-y-3">
          {timingRows.map((row) => {
            const Icon = row.icon;
            const isNext = nextPrayer?.name === row.name;

            return (
              <div
                key={row.name}
                className={`flex items-center justify-between p-4 rounded-2xl border transition ${
                  isNext
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                    : 'border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/20'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm ${
                      isNext
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-black text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      {row.name}
                      {isNext && (
                        <span className="text-[10px] font-black uppercase bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                          Upcoming
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{row.desc}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black font-mono text-slate-900 dark:text-white block">
                    {row.time || '--:--'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calculation Settings Form */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5 mb-5">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-emerald-600" />
            Calculation Jurisprudence & Method
          </h3>
          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Saved!
            </span>
          )}
        </div>

        <form onSubmit={handleSaveSettings} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Calculation Method
            </label>
            <select
              value={customMethod}
              onChange={(e) => setCustomMethod(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="Karachi">University of Islamic Sciences, Karachi (Standard)</option>
              <option value="ISNA">Islamic Society of North America (ISNA)</option>
              <option value="MWL">Muslim World League (MWL)</option>
              <option value="Makkah">Umm Al-Qura University, Makkah</option>
              <option value="Egypt">Egyptian General Authority of Survey</option>
              <option value="Gulf">Gulf / Dubai Region</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Asr Madhab (Juridical School)
            </label>
            <select
              value={customMadhab}
              onChange={(e) => setCustomMadhab(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="Hanafi">Hanafi (Shadow twice object length)</option>
              <option value="Shafi">Shafi / Hanbali / Maliki (Shadow equals object length)</option>
            </select>
          </div>

          <div className="sm:col-span-2 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition"
            >
              Save Prayer Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrayerTimes;
