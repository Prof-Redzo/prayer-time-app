import { useEffect, useState } from "react";

function App() {
  const [times, setTimes] = useState(null);

  useEffect(() => {
    fetch("https://api.aladhan.com/v1/timingsByCity?city=Sarajevo&country=Bosnia%20and%20Herzegovina&method=13")
      .then(res => res.json())
      .then(data => setTimes(data.data.timings));
  }, []);

  return (
    <div>
      <h1>Prayer Times - Sarajevo</h1>
      {times ? (
        <ul>
          {Object.entries(times).map(([name, time]) => (
            <li key={name}>{name}: {time}</li>
          ))}
        </ul>
      ) : (
        <p>Loading prayer times...</p>
      )}
    </div>
  );
}

export default App;
