import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';

/**
 * Maps method names to Adhan calculation parameters.
 */
export const getCalculationMethod = (methodName) => {
  switch (methodName?.toLowerCase()) {
    case 'karachi':
      return CalculationMethod.Karachi();
    case 'isna':
      return CalculationMethod.NorthAmerica();
    case 'mwl':
      return CalculationMethod.MuslimWorldLeague();
    case 'makkah':
    case 'umm_al_qura':
      return CalculationMethod.UmmAlQura();
    case 'egypt':
      return CalculationMethod.Egyptian();
    case 'gulf':
      return CalculationMethod.Dubai();
    case 'kuwait':
      return CalculationMethod.Kuwait();
    case 'qatar':
      return CalculationMethod.Qatar();
    case 'singapore':
      return CalculationMethod.Singapore();
    default:
      return CalculationMethod.Karachi();
  }
};

/**
 * Format a Date object into "hh:mm A" (e.g. "04:55 AM").
 */
export const formatTime12h = (date) => {
  if (!date || isNaN(new Date(date).getTime())) return '--:--';
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(new Date(date));
};

/**
 * Calculate accurate offline prayer times for coordinates and date.
 */
export const calculatePrayerTimes = (
  latitude = 23.8103,
  longitude = 90.4125,
  date = new Date(),
  method = 'Karachi',
  madhab = 'Hanafi'
) => {
  try {
    const coordinates = new Coordinates(latitude, longitude);
    const params = getCalculationMethod(method);

    if (madhab?.toLowerCase() === 'hanafi') {
      params.madhab = Madhab.Hanafi;
    } else {
      params.madhab = Madhab.Shafi;
    }

    const prayerTimes = new PrayerTimes(coordinates, date, params);

    return {
      fajr: prayerTimes.fajr,
      sunrise: prayerTimes.sunrise,
      dhuhr: prayerTimes.dhuhr,
      asr: prayerTimes.asr,
      sunset: prayerTimes.sunset,
      maghrib: prayerTimes.maghrib,
      isha: prayerTimes.isha,
      formatted: {
        Fajr: formatTime12h(prayerTimes.fajr),
        Sunrise: formatTime12h(prayerTimes.sunrise),
        Dhuhr: formatTime12h(prayerTimes.dhuhr),
        Asr: formatTime12h(prayerTimes.asr),
        Sunset: formatTime12h(prayerTimes.sunset),
        Maghrib: formatTime12h(prayerTimes.maghrib),
        Isha: formatTime12h(prayerTimes.isha)
      },
      nextPrayer: prayerTimes.nextPrayer(),
      timeForPrayer: (name) => prayerTimes.timeForPrayer(name)
    };
  } catch (err) {
    console.error('Error calculating prayer times:', err);
    return null;
  }
};

/**
 * Fetch prayer times from AlAdhan API with fallback to local calculation.
 */
export const fetchPrayerTimesAlAdhan = async (
  latitude = 23.8103,
  longitude = 90.4125,
  date = new Date(),
  method = 'Karachi',
  madhab = 'Hanafi'
) => {
  // Method mapping for AlAdhan API
  const methodMap = {
    karachi: 1,
    isna: 2,
    mwl: 3,
    makkah: 4,
    egypt: 5,
    gulf: 8,
    kuwait: 9,
    qatar: 10,
    singapore: 11
  };

  const apiMethod = methodMap[method.toLowerCase()] || 1;
  const apiSchool = madhab.toLowerCase() === 'hanafi' ? 1 : 0;

  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  const dateStr = `${d}-${m}-${y}`;

  try {
    const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=${apiMethod}&school=${apiSchool}`;
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.timings) {
        const timings = json.data.timings;
        return {
          source: 'AlAdhan API',
          fajr: parseApiTimeToDate(date, timings.Fajr),
          sunrise: parseApiTimeToDate(date, timings.Sunrise),
          dhuhr: parseApiTimeToDate(date, timings.Dhuhr),
          asr: parseApiTimeToDate(date, timings.Asr),
          sunset: parseApiTimeToDate(date, timings.Sunset),
          maghrib: parseApiTimeToDate(date, timings.Maghrib),
          isha: parseApiTimeToDate(date, timings.Isha),
          formatted: {
            Fajr: formatTime12h(parseApiTimeToDate(date, timings.Fajr)),
            Sunrise: formatTime12h(parseApiTimeToDate(date, timings.Sunrise)),
            Dhuhr: formatTime12h(parseApiTimeToDate(date, timings.Dhuhr)),
            Asr: formatTime12h(parseApiTimeToDate(date, timings.Asr)),
            Sunset: formatTime12h(parseApiTimeToDate(date, timings.Sunset)),
            Maghrib: formatTime12h(parseApiTimeToDate(date, timings.Maghrib)),
            Isha: formatTime12h(parseApiTimeToDate(date, timings.Isha))
          }
        };
      }
    }
  } catch (e) {
    console.warn('Aladhan API unavailable, using offline calculation:', e);
  }

  return calculatePrayerTimes(latitude, longitude, date, method, madhab);
};

const parseApiTimeToDate = (baseDate, timeString) => {
  if (!timeString) return new Date();
  const [hours, minutes] = timeString.split(' ')[0].split(':');
  const d = new Date(baseDate);
  d.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
  return d;
};

/**
 * Determine the next upcoming prayer and remaining countdown.
 */
export const getNextPrayerInfo = (timingsObj) => {
  if (!timingsObj) return { name: 'Fajr', time: null, diffFormatted: '--:--:--' };

  const now = new Date();
  const prayers = [
    { name: 'Fajr', time: timingsObj.fajr },
    { name: 'Dhuhr', time: timingsObj.dhuhr },
    { name: 'Asr', time: timingsObj.asr },
    { name: 'Maghrib', time: timingsObj.maghrib },
    { name: 'Isha', time: timingsObj.isha }
  ];

  for (const prayer of prayers) {
    if (prayer.time && prayer.time > now) {
      const diffMs = prayer.time - now;
      const diffHrs = Math.floor(diffMs / 3600000);
      const diffMins = Math.floor((diffMs % 3600000) / 60000);
      const diffSecs = Math.floor((diffMs % 60000) / 1000);

      return {
        name: prayer.name,
        time: prayer.time,
        hours: diffHrs,
        minutes: diffMins,
        seconds: diffSecs,
        formatted: `${diffHrs}h ${diffMins}m ${diffSecs}s`
      };
    }
  }

  // If all prayers today have passed, the next prayer is tomorrow's Fajr
  const tomorrowFajr = new Date(timingsObj.fajr);
  tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
  const diffMs = tomorrowFajr - now;
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffMins = Math.floor((diffMs % 3600000) / 60000);
  const diffSecs = Math.floor((diffMs % 60000) / 1000);

  return {
    name: 'Fajr (Tomorrow)',
    time: tomorrowFajr,
    hours: diffHrs,
    minutes: diffMins,
    seconds: diffSecs,
    formatted: `${diffHrs}h ${diffMins}m ${diffSecs}s`
  };
};
