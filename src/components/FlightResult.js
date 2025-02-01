import React from "react";

const FlightResult = ({ flight }) => {
  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-lg font-bold">{flight.flight.number} - {flight.airline.name}</h2>
      <p><strong>Status:</strong> {flight.flight_status}</p>
      <p><strong>Departure:</strong> {flight.departure.airport} ({flight.departure.iata})</p>
      <p><strong>Arrival:</strong> {flight.arrival.airport} ({flight.arrival.iata})</p>
      {flight.live && (
        <div className="mt-2">
          <p><strong>Latitude:</strong> {flight.live.latitude}</p>
          <p><strong>Longitude:</strong> {flight.live.longitude}</p>
          <p><strong>Altitude:</strong> {flight.live.altitude} ft</p>
          <p><strong>Speed:</strong> {flight.live.speed_horizontal} km/h</p>
        </div>
      )}
    </div>
  );
};

export default FlightResult;
