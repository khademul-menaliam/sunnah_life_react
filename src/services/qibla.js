// ==============================================================================
// Qibla Direction Great Circle Calculation Service
// Kaaba Coordinates: Latitude: 21.4225° N, Longitude: 39.8262° E
// ==============================================================================

const KAABA_LAT = 21.422487;
const KAABA_LNG = 39.826206;

/**
 * Calculates the Qibla bearing in degrees from North (0° to 360°).
 * 
 * @param {number} latitude - User's latitude in degrees
 * @param {number} longitude - User's longitude in degrees
 * @returns {number} Bearing degree from True North (0° = North, 90° = East, etc.)
 */
export const calculateQiblaBearing = (latitude, longitude) => {
  const latUser = (latitude * Math.PI) / 180;
  const lngUser = (longitude * Math.PI) / 180;
  const latKaaba = (KAABA_LAT * Math.PI) / 180;
  const lngKaaba = (KAABA_LNG * Math.PI) / 180;

  const dLng = lngKaaba - lngUser;

  const y = Math.sin(dLng);
  const x =
    Math.cos(latUser) * Math.tan(latKaaba) -
    Math.sin(latUser) * Math.cos(dLng);

  let qiblaRad = Math.atan2(y, x);
  let qiblaDeg = (qiblaRad * 180) / Math.PI;

  // Normalize between 0 and 360
  return (qiblaDeg + 360) % 360;
};

/**
 * Calculates distance from user to Kaaba in kilometers.
 */
export const calculateDistanceToKaaba = (latitude, longitude) => {
  const R = 6371; // Earth radius in km
  const dLat = ((KAABA_LAT - latitude) * Math.PI) / 180;
  const dLng = ((KAABA_LNG - longitude) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((latitude * Math.PI) / 180) *
      Math.cos((KAABA_LAT * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
};
