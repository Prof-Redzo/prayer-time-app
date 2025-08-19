const BASE_URL = "https://api.aladhan.com/v1";

/**
 * Fetch prayer times for a given city & country
 * @param {string} city - City name (e.g., "Sarajevo")
 * @param {string} country - Country name (e.g., "Bosnia and Herzegovina")
 * @returns {Promise<Object>} prayer times
 */
export async function getPrayerTimes(city) {
  const response = await fetch(
    `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Bosnia&method=2`
  );
  const data = await response.json();

  return {
    timings: data.data.timings,
    date: {
      gregorian: data.data.date.gregorian.date,
      hijri: `${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year}`,
    },
  };
}