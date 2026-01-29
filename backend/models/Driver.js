import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
  name: String,
  location: { lat: Number, lng: Number },
  available: Boolean
});

export const Driver = mongoose.model("Driver", DriverSchema);
