import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";
import PrayerCache from "./models/PrayerCache.js";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

let hasMongo = false;
if (process.env.MONGO_URI) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    hasMongo = true;
    console.log("✅ MongoDB connected");
  } catch (e) {
    console.warn("⚠️  MongoDB not connected:", e.message);
  }
}

// ✅ Default root route
app.get("/", (_req, res) => {
  res.send("Prayer API Running 🚀");
});

// ✅ Health check
app.get("/api/health", (_req, res) =>
  res.json({ ok: true, mongo: hasMongo })
);

// ✅ Get prayer times by city
app.get("/api/prayertimes/:city", async (req, res) => {
  const { city } = req.params;
  const country = req.query.country || "Bosnia and Herzegovina";
  const method = req.query.method || process.env.ALADHAN_METHOD || 2;

  const cityKey = city.toLowerCase();

  // helper to fetch from upstream
  const fetchFromUpstream = async () => {
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
      city
    )}&country=${encodeURIComponent(country)}&method=${method}`;
    const { data } = await axios.get(url);
    return data; // full upstream response
  };

  try {
    if (hasMongo) {
      // check cache
      const cached = await PrayerCache.findOne({ city: cityKey }).sort({
        createdAt: -1,
      });

      if (cached) {
        return res.json(cached.payload);
      }

      // not cached → fetch and store
      const payload = await fetchFromUpstream();

      const dateKey =
        payload?.data?.date?.gregorian?.date ||
        new Date().toISOString().slice(0, 10);

      await PrayerCache.create({
        city: cityKey,
        date: dateKey,
        payload,
      });

      return res.json(payload);
    }

    // no Mongo → just proxy
    const payload = await fetchFromUpstream();
    res.json(payload);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(502).json({ error: "Upstream API failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
