import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom airplane icon
const airplaneIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/172/172967.png",
  iconSize: [25, 25],
  iconAnchor: [12, 12],
});

const LiveFlightMap = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        console.log("Fetching live flight data...");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/live-flights`);
        console.log("API Response Status:", response.status);
        if (!response.ok) throw new Error("Failed to fetch flights");
        const data = await response.json();
        console.log("Flight Data:", data);
        setFlights(data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    console.log("use effects: backend url: " + `${process.env.REACT_APP_BACKEND_URL}`);
    fetchFlights();
    const interval = setInterval(fetchFlights, 10000);
    return () => clearInterval(interval);
  }, []);
  console.log("return backend url: " + `${process.env.REACT_APP_BACKEND_URL}`);
  return (
    <MapContainer center={[20, 0]} zoom={2} className="w-full h-96 rounded-lg shadow-lg">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {flights.map((flight, index) => (
        flight.live && (
          <Marker
            key={index}
            position={[flight.live.latitude, flight.live.longitude]}
            icon={airplaneIcon}
          >
            <Popup>
              <h3 className="font-bold">{flight.flight.number} - {flight.airline.name}</h3>
              <p><strong>Status:</strong> {flight.flight_status}</p>
              <p><strong>Altitude:</strong> {flight.live.altitude} ft</p>
              <p><strong>Speed:</strong> {flight.live.speed_horizontal} km/h</p>
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
};

export default LiveFlightMap;
