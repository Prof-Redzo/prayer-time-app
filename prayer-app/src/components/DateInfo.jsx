import { Paper, Typography, Box } from "@mui/material";

export default function DateInfo({ date }) {
  if (!date) return null;

  return (
    <Paper
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 2,
        boxShadow: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h6">📅 Today’s Date</Typography>
      <Box sx={{ mt: 1 }}>
        <Typography variant="body1">Gregorian: {date.gregorian}</Typography>
        <Typography variant="body1">Hijri: {date.hijri}</Typography>
      </Box>
    </Paper>
  );
}
