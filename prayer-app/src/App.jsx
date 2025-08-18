// src/App.jsx
import { useEffect, useState } from "react";
import { getPrayerTimes } from "./api/api";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import CitySelector from "./components/CitySelector";
import PrayerTimesList from "./components/PrayerTimesList";
import DateInfo from "./components/DateInfo";

export default function App() {
  const [city, setCity] = useState("Sarajevo");
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [dateInfo, setDateInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { timings, date } = await getPrayerTimes(city);
        setPrayerTimes(timings);
        setDateInfo(date);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [city]);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Prayer Times - {city}
      </Typography>

      {/* City selector */}
      <CitySelector city={city} setCity={setCity} />

      {/* Show date info */}
      <DateInfo date={dateInfo} />

      {/* Prayer times or loader */}
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <PrayerTimesList prayerTimes={prayerTimes} />
      )}
    </Container>
  );
}
