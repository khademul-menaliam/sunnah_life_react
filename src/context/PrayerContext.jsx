import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { calculatePrayerTimes, getNextPrayerInfo } from '../services/prayerTimes';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { useAuth } from './AuthContext';

const PrayerContext = createContext(null);

export const PrayerProvider = ({ children }) => {
  const { user, profile } = useAuth();

  // Location settings
  const [city, setCity] = useState('Dhaka');
  const [country, setCountry] = useState('Bangladesh');
  const [latitude, setLatitude] = useState(23.8103);
  const [longitude, setLongitude] = useState(90.4125);
  const [method, setMethod] = useState('Karachi');
  const [madhab, setMadhab] = useState('Hanafi');

  // Timings & countdown
  const [timings, setTimings] = useState(null);
  const [nextPrayer, setNextPrayer] = useState({
    name: 'Loading...',
    time: null,
    formatted: '--:--:--'
  });

  // Today's logs
  const [prayerLogs, setPrayerLogs] = useState({}); // { [prayerId]: 'prayed' | 'congregation' | 'qada' | 'missed' }
  const [sunnahLogs, setSunnahLogs] = useState({}); // { [sunnahId]: boolean }

  const todayDateStr = new Date().toISOString().split('T')[0];

  // Sync settings with user profile if logged in
  useEffect(() => {
    if (profile) {
      if (profile.city) setCity(profile.city);
      if (profile.country) setCountry(profile.country);
      if (profile.latitude) setLatitude(profile.latitude);
      if (profile.longitude) setLongitude(profile.longitude);
      if (profile.prayer_calculation_method) setMethod(profile.prayer_calculation_method);
      if (profile.madhab) setMadhab(profile.madhab);
    } else {
      // Check localStorage for saved guest preferences
      const saved = localStorage.getItem('sunnah_guest_prayer_settings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.city) setCity(parsed.city);
          if (parsed.country) setCountry(parsed.country);
          if (parsed.latitude) setLatitude(parsed.latitude);
          if (parsed.longitude) setLongitude(parsed.longitude);
          if (parsed.method) setMethod(parsed.method);
          if (parsed.madhab) setMadhab(parsed.madhab);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [profile]);

  // Recalculate prayer times whenever coordinates or method changes
  useEffect(() => {
    const times = calculatePrayerTimes(latitude, longitude, new Date(), method, madhab);
    setTimings(times);
  }, [latitude, longitude, method, madhab]);

  // Update countdown timer every second
  useEffect(() => {
    if (!timings) return;

    const interval = setInterval(() => {
      const info = getNextPrayerInfo(timings);
      setNextPrayer(info);
    }, 1000);

    // Initial run
    setNextPrayer(getNextPrayerInfo(timings));

    return () => clearInterval(interval);
  }, [timings]);

  // Load today's prayer logs
  const loadPrayerLogs = useCallback(async () => {
    if (isSupabaseConfigured() && user) {
      try {
        const { data, error } = await supabase
          .from('prayer_logs')
          .select('prayer_id, status')
          .eq('user_id', user.id)
          .eq('date', todayDateStr);

        if (!error && data) {
          const map = {};
          data.forEach((item) => {
            map[item.prayer_id] = item.status;
          });
          setPrayerLogs(map);
          return;
        }
      } catch (e) {
        console.error('Failed to load prayer logs from Supabase:', e);
      }
    }

    // Fallback: localStorage
    const key = `sunnah_prayer_logs_${user ? user.id : 'guest'}_${todayDateStr}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setPrayerLogs(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      setPrayerLogs({});
    }
  }, [user, todayDateStr]);

  // Load today's Sunnah logs
  const loadSunnahLogs = useCallback(async () => {
    if (isSupabaseConfigured() && user) {
      try {
        const { data, error } = await supabase
          .from('sunnah_logs')
          .select('sunnah_id, completed')
          .eq('user_id', user.id)
          .eq('date', todayDateStr);

        if (!error && data) {
          const map = {};
          data.forEach((item) => {
            map[item.sunnah_id] = item.completed;
          });
          setSunnahLogs(map);
          return;
        }
      } catch (e) {
        console.error('Failed to load sunnah logs from Supabase:', e);
      }
    }

    // Fallback: localStorage
    const key = `sunnah_sunnah_logs_${user ? user.id : 'guest'}_${todayDateStr}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setSunnahLogs(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      setSunnahLogs({});
    }
  }, [user, todayDateStr]);

  useEffect(() => {
    loadPrayerLogs();
    loadSunnahLogs();
  }, [loadPrayerLogs, loadSunnahLogs]);

  // Update Prayer Status (prayed, congregation, qada, missed)
  const logPrayer = async (prayerId, status) => {
    const updated = { ...prayerLogs, [prayerId]: status };
    setPrayerLogs(updated);

    const key = `sunnah_prayer_logs_${user ? user.id : 'guest'}_${todayDateStr}`;
    localStorage.setItem(key, JSON.stringify(updated));

    if (isSupabaseConfigured() && user) {
      try {
        await supabase.from('prayer_logs').upsert(
          {
            user_id: user.id,
            prayer_id: prayerId,
            date: todayDateStr,
            status,
            prayed_at: status === 'prayed' || status === 'congregation' ? new Date().toISOString() : null
          },
          { onConflict: 'user_id, prayer_id, date' }
        );
      } catch (e) {
        console.error('Error logging prayer to Supabase:', e);
      }
    }
  };

  // Toggle Sunnah practice completion
  const toggleSunnah = async (sunnahId) => {
    const nextStatus = !sunnahLogs[sunnahId];
    const updated = { ...sunnahLogs, [sunnahId]: nextStatus };
    setSunnahLogs(updated);

    const key = `sunnah_sunnah_logs_${user ? user.id : 'guest'}_${todayDateStr}`;
    localStorage.setItem(key, JSON.stringify(updated));

    if (isSupabaseConfigured() && user) {
      try {
        await supabase.from('sunnah_logs').upsert(
          {
            user_id: user.id,
            sunnah_id: sunnahId,
            date: todayDateStr,
            completed: nextStatus
          },
          { onConflict: 'user_id, sunnah_id, date' }
        );
      } catch (e) {
        console.error('Error logging sunnah to Supabase:', e);
      }
    }
  };

  // Update location preferences
  const updateLocation = (newCity, newCountry, newLat, newLng, newMethod, newMadhab) => {
    setCity(newCity);
    setCountry(newCountry);
    setLatitude(newLat);
    setLongitude(newLng);
    if (newMethod) setMethod(newMethod);
    if (newMadhab) setMadhab(newMadhab);

    const settings = {
      city: newCity,
      country: newCountry,
      latitude: newLat,
      longitude: newLng,
      method: newMethod || method,
      madhab: newMadhab || madhab
    };

    localStorage.setItem('sunnah_guest_prayer_settings', JSON.stringify(settings));
  };

  // Detect GPS location
  const detectLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lng);

          try {
            // Reverse geocode to get city name
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            if (res.ok) {
              const data = await res.json();
              const detectedCity = data.address?.city || data.address?.town || data.address?.state || 'Detected Location';
              const detectedCountry = data.address?.country || 'Current Country';
              setCity(detectedCity);
              setCountry(detectedCountry);
              updateLocation(detectedCity, detectedCountry, lat, lng, method, madhab);
              resolve({ city: detectedCity, country: detectedCountry, latitude: lat, longitude: lng });
              return;
            }
          } catch (e) {
            console.warn('Geocoding error:', e);
          }

          updateLocation('My GPS Location', 'Current Country', lat, lng, method, madhab);
          resolve({ city: 'My GPS Location', country: 'Current Country', latitude: lat, longitude: lng });
        },
        (error) => {
          reject(error);
        },
        { timeout: 10000 }
      );
    });
  };

  return (
    <PrayerContext.Provider
      value={{
        city,
        country,
        latitude,
        longitude,
        method,
        madhab,
        timings,
        nextPrayer,
        prayerLogs,
        sunnahLogs,
        logPrayer,
        toggleSunnah,
        updateLocation,
        detectLocation
      }}
    >
      {children}
    </PrayerContext.Provider>
  );
};

export const usePrayer = () => useContext(PrayerContext);
