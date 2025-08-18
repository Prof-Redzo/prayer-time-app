const BASE_URL = "https://api.aladhan.com/v1";

/**
 * Fetch prayer times for a given city & country
 * @param {string} city - City name (e.g., "Sarajevo")
 * @param {string} country - Country name (e.g., "Bosnia and Herzegovina")
 * @returns {Promise<Object>} prayer times
 */
export async function getPrayerTimes(city, country = "Bosnia and Herzegovina") {
  try {
    const response = await fetch(
      `${BASE_URL}/timingsByCity?city=${city}&country=${country}&method=2`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch prayer times");
    }

    const data = await response.json();
    return data.data.timings; // only return timings
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    throw error;
  }
}