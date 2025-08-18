import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function CitySelector({ city, setCity }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
      <FormControl fullWidth>
          <InputLabel id="city-label">City</InputLabel>
          <Select
            labelId="city-label"
            value={city}
            label="City" 
            onChange={(e) => setCity(e.target.value)}
          >
            <MenuItem value="Sarajevo">Sarajevo</MenuItem>
            <MenuItem value="Mostar">Mostar</MenuItem>
            <MenuItem value="Tuzla">Tuzla</MenuItem>
            <MenuItem value="Zenica">Zenica</MenuItem>
          </Select>
        </FormControl>
    </Box>
  );
}
