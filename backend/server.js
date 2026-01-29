import express from "express";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import cors from "cors";
import rideRoutes from "./routes/rides.js";
import { setupSocketHandlers } from "./socket/socketHandlers.js";
import { seed } from "./utils/seed.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/dispatch_demo");

app.use("/rides", rideRoutes(io));

setupSocketHandlers(io);

seed();

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
