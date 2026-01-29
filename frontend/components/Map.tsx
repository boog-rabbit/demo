"use client";
import { useEffect, useRef } from "react";
import { socket } from "../lib/socket";

declare global {
  interface Window {
    google: any;
  }
}

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markers = useRef<Record<string, any>>({});

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      if (!window.google) {
        setTimeout(initMap, 100);
        return;
      }

      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 13
      });

      socket.on("location_update", ({ driverId, location }) => {
        if (!markers.current[driverId]) {
          markers.current[driverId] = new window.google.maps.Marker({
            map: mapInstance.current,
            title: `Driver ${driverId}`
          });
        }
        markers.current[driverId].setPosition(location);
      });

      socket.on("ride_assigned", ({ ride, driver }) => {
        alert(`Ride assigned to ${driver.name}. Price: $${ride.price}`);
      });
    };

    initMap();

    return () => {
      socket.off("location_update");
      socket.off("ride_assigned");
    };
  }, []);

  return <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />;
}
