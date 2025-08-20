import axios from "axios";

// Base URL of your backend (make sure backend is running on this port)
const API_BASE = "http://localhost:5000/api";

/**
 * Fetch prayer times for a given city
 * @param {string} city - The city name (e.g., "Sarajevo")
 * @returns {Promise<Object>} - Prayer times data
 */
export async function getPrayerTimes(city) {
  const { data } = await axios.get(
    `${API_BASE}/prayertimes/${encodeURIComponent(city)}`
  );
  return data; // Same structure as the backend response
}
