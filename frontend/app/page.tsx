"use client";
import Map from "../components/Map";

export default function Home() {
  async function requestRide() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rides`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          riderName: "Demo Rider",
          pickup: { lat: 37.7749, lng: -122.4194 },
          dropoff: { lat: 37.7849, lng: -122.4094 },
          scheduledAt: new Date()
        })
      });
      
      if (!response.ok) {
        throw new Error("Failed to request ride");
      }
      
      const ride = await response.json();
      console.log("Ride requested:", ride);
    } catch (error) {
      console.error("Error requesting ride:", error);
      alert("Failed to request ride. Please try again.");
    }
  }

  return (
    <>
      <button
        onClick={requestRide}
        style={{
          position: "absolute",
          zIndex: 10,
          margin: 16,
          padding: "12px 24px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
        }}
      >
        Request Ride
      </button>
      <Map />
    </>
  );
}
