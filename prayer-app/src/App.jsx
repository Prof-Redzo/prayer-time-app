import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";

function App() {
  const [city, setCity] = useState("Sarajevo");
  const [prayerTimes, setPrayerTimes] = useState(null);

  useEffect(() => {
    async function fetchPrayerTimes() {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Bosnia%20and%20Herzegovina&method=13`
        );
        const data = await response.json();
        setPrayerTimes(data.data.timings);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    }
    fetchPrayerTimes();
  }, [city]);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      {/* Header */}
      <Typography variant="h4" align="center" gutterBottom>
        🕌 Prayer Times App
      </Typography>

      {/* City Selection */}
      <Box mb={3}>
      <FormControl fullWidth>
      <InputLabel id="city-label">City</InputLabel>
        <Select
          labelId="city-label"
          value={city}
          label="City"   // ✅ this fixes the overlap
          onChange={(e) => setCity(e.target.value)}
        >
             <MenuItem value="Sarajevo">Sarajevo</MenuItem>
             <MenuItem value="Mostar">Mostar</MenuItem>
             <MenuItem value="Tuzla">Tuzla</MenuItem>
             <MenuItem value="Zenica">Zenica</MenuItem>
        </Select>
     </FormControl>
      </Box>

      {/* Prayer Times Box */}
      {prayerTimes && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Prayer Times for {city}
            </Typography>

            {/* Each time in separate line */}
            <Typography>Fajr: {prayerTimes.Fajr}</Typography>
            <Typography>Dhuhr: {prayerTimes.Dhuhr}</Typography>
            <Typography>Asr: {prayerTimes.Asr}</Typography>
            <Typography>Maghrib: {prayerTimes.Maghrib}</Typography>
            <Typography>Isha: {prayerTimes.Isha}</Typography>
            <Typography>Sunrise: {prayerTimes.Sunrise}</Typography>
            <Typography>Sunset: {prayerTimes.Sunset}</Typography>

            {/* Fixed layout for First Third / Last Third */}
            <Box mt={2}>
              <Typography>First Third: {prayerTimes.Firstthird}</Typography>
              <Typography>Last Third: {prayerTimes.Lastthird}</Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default App;
