import { Box, Paper, Typography } from "@mui/material";

export default function PrayerTimesList({ prayerTimes }) {
  return (
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
  );
}
