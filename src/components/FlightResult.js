import React from "react";

const FlightResult = ({ flight }) => {
  if (!flight) {
    return null;
  }

  return (
    <div className="p-4 mt-4 border rounded shadow">
      <h2 className="text-xl font-bold">Flight Details</h2>
      <p>
        <strong>Flight Number:</strong> {flight.flight_number}
      </p>
      <p>
        <strong>Airline:</strong> {flight.airline}
      </p>
      <p>
        <strong>Departure:</strong> {flight.departure}
      </p>
      <p>
        <strong>Arrival:</strong> {flight.arrival}
      </p>
      <p>
        <strong>Status:</strong> {flight.status}
      </p>
    </div>
  );
};

export default FlightResult;

