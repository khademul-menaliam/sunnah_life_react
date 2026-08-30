import React, { useState, useEffect } from 'react';
import { usePrayer } from '../../context/PrayerContext';
import { calculateQiblaBearing, calculateDistanceToKaaba } from '../../services/qibla';
import { Compass, MapPin, RefreshCw, Navigation, Info } from 'lucide-react';

const QiblaCompass = () => {
  const { latitude, longitude, city, country, detectLocation } = usePrayer();
  const [heading, setHeading] = useState(0);
  const [hasCompassSensor, setHasCompassSensor] = useState(false);

  const qiblaBearing = calculateQiblaBearing(latitude, longitude);
  const distance = calculateDistanceToKaaba(latitude, longitude);

  // Device orientation / compass sensor listener
  useEffect(() => {
    const handleOrientation = (e) => {
      let compassHeading = e.webkitCompassHeading || e.alpha;
      if (compassHeading !== undefined && compassHeading !== null) {
        setHeading(compassHeading);
        setHasCompassSensor(true);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, []);

  // Compass needle rotation
  const needleRotation = qiblaBearing - heading;

  return (
    <div className="max-w-3xl mx-auto space-y-8 text-center">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Sacred Direction
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Qibla Compass (Kaaba Locator)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Accurately calculate the shortest Great-Circle path towards the Holy Kaaba in Makkah al-Mukarramah.
        </p>
      </div>

      {/* Location Badge */}
      <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-2xl shadow-sm text-xs font-bold text-slate-700 dark:text-slate-300">
        <MapPin className="w-4 h-4 text-emerald-600" />
        <span>{city}, {country}</span>
        <span className="text-slate-400">•</span>
        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{qiblaBearing.toFixed(1)}° from North</span>
      </div>

      {/* 🧭 Interactive Compass Visual */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto my-6 flex items-center justify-center">
        {/* Compass Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl flex items-center justify-center">
          
          {/* Cardinal Directions */}
          <span className="absolute top-3 text-xs font-black text-red-500">N</span>
          <span className="absolute right-4 text-xs font-black text-slate-400">E</span>
          <span className="absolute bottom-3 text-xs font-black text-slate-400">S</span>
          <span className="absolute left-4 text-xs font-black text-slate-400">W</span>

          {/* Dial tick marks */}
          <div className="absolute inset-4 rounded-full border border-dashed border-slate-200 dark:border-slate-800"></div>

          {/* Compass Dial Needle pointing to Qibla */}
          <div
            className="w-full h-full flex items-center justify-center transition-transform duration-300"
            style={{ transform: `rotate(${needleRotation}deg)` }}
          >
            {/* Kaaba Direction Indicator */}
            <div className="absolute top-6 flex flex-col items-center">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 text-base">
                🕋
              </div>
              <div className="w-1 h-20 bg-gradient-to-b from-emerald-600 to-transparent"></div>
            </div>

            {/* South Arrow */}
            <div className="absolute bottom-6 flex flex-col items-center">
              <div className="w-1 h-14 bg-gradient-to-t from-slate-400 to-transparent"></div>
              <div className="w-3 h-3 rounded-full bg-slate-400"></div>
            </div>
          </div>

          {/* Center Pin */}
          <div className="w-6 h-6 rounded-full bg-slate-900 dark:bg-white border-2 border-emerald-500 shadow-md flex items-center justify-center z-10">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-400 block">Qibla Angle</span>
          <span className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1 block">
            {qiblaBearing.toFixed(1)}°
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-400 block">Distance to Makkah</span>
          <span className="text-xl font-black font-mono text-slate-800 dark:text-slate-200 mt-1 block">
            {distance.toLocaleString()} km
          </span>
        </div>
      </div>

      {/* Sensor status note */}
      <div className="max-w-md mx-auto text-xs text-slate-400 flex items-center justify-center gap-1.5">
        <Info className="w-3.5 h-3.5" />
        {hasCompassSensor
          ? 'Live hardware compass active. Rotate your device until the needle points up.'
          : 'Hold your device flat facing True North. Align towards the green Kaaba indicator.'}
      </div>
    </div>
  );
};

export default QiblaCompass;
