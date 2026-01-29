import { Driver } from "../models/Driver.js";

export async function seed() {
  const count = await Driver.countDocuments();
  if (count === 0) {
    await Driver.insertMany([
      { name: "Alice", location: { lat: 37.7749, lng: -122.4194 }, available: true },
      { name: "Bob", location: { lat: 37.7849, lng: -122.4094 }, available: true }
    ]);
    console.log("Demo drivers seeded successfully");
  }
}
