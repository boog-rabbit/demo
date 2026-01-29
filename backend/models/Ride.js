import mongoose from "mongoose";

const RideSchema = new mongoose.Schema({
  riderName: String,
  pickup: { lat: Number, lng: Number },
  dropoff: { lat: Number, lng: Number },
  scheduledAt: Date,
  status: { type: String, default: "pending" },
  driverId: mongoose.Schema.Types.ObjectId,
  price: Number
});

export const Ride = mongoose.model("Ride", RideSchema);
