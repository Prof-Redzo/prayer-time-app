import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Allow your React dev server
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/prayertimes/:city", async (req, res) => {
  const { city } = req.params;
  const country = req.query.country || "Bosnia and Herzegovina";
  const method = req.query.method || process.env.ALADHAN_METHOD || 2;

  const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
    city
  )}&country=${encodeURIComponent(country)}&method=${method}`;

  try {
    const { data } = await axios.get(url);
    res.json(data); // forward the API response as-is
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(502).json({ error: "Upstream API failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
