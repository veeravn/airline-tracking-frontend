import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Airplane icon
const airplaneIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/172/172967.png",
  iconSize: [25, 25],
  iconAnchor: [12, 12],
});

const LiveFlightMap = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws/live-updates");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setFlights(data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    return () => socket.close();
  }, []);

  return (
    <MapContainer center={[20, 0]} zoom={2} className="w-full h-96 rounded-lg shadow-lg">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {flights.map((flight, index) => (
        <Marker key={index} position={[flight.latitude, flight.longitude]} icon={airplaneIcon}>
          <Popup>
            <h3>{flight.flight_number}</h3>
            <p>Airline: {flight.airline}</p>
            <p>Departure: {flight.departure}</p>
            <p>Arrival: {flight.arrival}</p>
            <p>Status: <strong>{flight.status}</strong></p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LiveFlightMap;
