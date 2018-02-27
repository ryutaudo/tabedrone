class Geocode {
  static getDistance(geocodeA, geocodeB) {
    // point 1
    const between2parallels = 111.3; // unit: km
    const between2meridians = 71.5; // unit: km

    const rad = 0.01745; // 1° = π/180 rad ≈ 0.01745
    const lat = ((geocodeA.latitude - geocodeB.latitude) / 2) * rad;

    // point 2
    const dx = between2meridians * Math.cos(lat) * (geocodeA.longitude - geocodeB.longitude);
    const dy = between2parallels * (geocodeA.latitude - geocodeB.latitude);

    // point 3
    return Math.sqrt((dx * dx) + (dy * dy));
  }
}

module.exports = Geocode;
