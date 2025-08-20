import mongoose from "mongoose";

/**
 * We store the full AlAdhan payload so we can return it as-is later.
 * TTL index (createdAt) auto-expires docs after 24h.
 */
const PrayerCacheSchema = new mongoose.Schema(
  {
    city: { type: String, index: true },   // lowercase city key
    date: { type: String, index: true },   // e.g. "2025-08-19" or "17-08-2025"
    payload: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now, expires: 86400 } // 24h
  },
  { versionKey: false }
);

export default mongoose.model("PrayerCache", PrayerCacheSchema);