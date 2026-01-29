import { Driver } from "../models/Driver.js";

export function setupSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("driver_location", async ({ driverId, location }) => {
      await Driver.findByIdAndUpdate(driverId, { location });
      io.emit("location_update", { driverId, location });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}
