import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("Sarajevo");
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrayerTimes() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Bosnia%20and%20Herzegovina&method=2`
        );
        const data = await res.json();
        setPrayerTimes(data.data.timings);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPrayerTimes();
  }, [city]);

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>Prayer Times App</h1>

      {/* Dropdown for selecting city */}
      <label>
        Choose a city:{" "}
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="Sarajevo">Sarajevo</option>
          <option value="Zenica">Zenica</option>
          <option value="Tuzla">Tuzla</option>
          <option value="Mostar">Mostar</option>
          <option value="Banja Luka">Banja Luka</option>
        </select>
      </label>

      <hr />

      {loading ? (
        <p>Loading prayer times for {city}...</p>
      ) : (
        <div>
          <h2>Prayer Times in {city}</h2>
          <ul>
            {Object.entries(prayerTimes).map(([name, time]) => (
              <li key={name}>
                <strong>{name}:</strong> {time}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
