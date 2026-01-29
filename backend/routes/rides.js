import express from "express";
import { Ride } from "../models/Ride.js";
import { Driver } from "../models/Driver.js";
import { calculateCost } from "../utils/calculateCost.js";

const router = express.Router();

async function dispatchDriver(ride, io) {
  const driver = await Driver.findOne({ available: true });
  if (!driver) return;

  driver.available = false;
  await driver.save();

  ride.driverId = driver._id;
  ride.status = "assigned";
  await ride.save();

  io.emit("ride_assigned", { ride, driver });
}

export default function rideRoutes(io) {
  router.post("/", async (req, res) => {
    const { riderName, pickup, dropoff, scheduledAt } = req.body;

    const distanceKm = Math.random() * 10 + 1;
    const price = calculateCost(distanceKm);

    const ride = await Ride.create({
      riderName,
      pickup,
      dropoff,
      scheduledAt,
      price
    });

    dispatchDriver(ride, io);
    res.json(ride);
  });

  return router;
}
