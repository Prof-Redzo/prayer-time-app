// src/App.jsx
import { useEffect, useState } from "react";
import { getPrayerTimes } from "./api/api"; // 👈 import from api.js
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
} from "@mui/material";

export default function App() {
  const [city, setCity] = useState("Sarajevo"); // default city
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch whenever city changes
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const times = await getPrayerTimes(city);
        setPrayerTimes(times);
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
      {/* Heading */}
      <Typography variant="h4" gutterBottom align="center">
        Prayer Times - {city}
      </Typography>

      {/* City Selector */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <FormControl fullWidth>
          <InputLabel id="city-label">City</InputLabel>
          <Select
            labelId="city-label"
            value={city}
            label="City" // ✅ this fixes the overlap
            onChange={(e) => setCity(e.target.value)}
          >
            <MenuItem value="Sarajevo">Sarajevo</MenuItem>
            <MenuItem value="Mostar">Mostar</MenuItem>
            <MenuItem value="Tuzla">Tuzla</MenuItem>
            <MenuItem value="Zenica">Zenica</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Prayer Times */}
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: "grid", gap: 2 }}>
          {Object.entries(prayerTimes).map(([name, time]) => (
            <Paper
              key={name}
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <Typography variant="h6">{name}</Typography>
              <Typography variant="h6">{time}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
}
