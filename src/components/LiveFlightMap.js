import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define a custom airplane icon
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
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/live-flights`);
        if (!response.ok) throw new Error("Failed to fetch flights");
        const data = await response.json();
        setFlights(data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    fetchFlights();
    const interval = setInterval(fetchFlights, 10000); // Refresh data every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={[20, 0]} zoom={2} className="w-full h-96 rounded-lg shadow-lg">
      {/* Tile Layer for Map Background */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />

      {/* Map Markers for Flights */}
      {flights.map((flight, index) => (
        <Marker
          key={index}
          position={[flight.latitude, flight.longitude]}
          icon={airplaneIcon}
        >
          <Popup>
            <div>
              <h3 className="font-bold text-lg">{flight.flight_number}</h3>
              <p>Airline: {flight.airline}</p>
              <p>Departure: {flight.departure}</p>
              <p>Arrival: {flight.arrival}</p>
              <p>Status: <span className="font-bold">{flight.status}</span></p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LiveFlightMap;
