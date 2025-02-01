import React, { useState } from "react";
import FlightSearchForm from "../components/FlightSearchForm";
import FlightResult from "../components/FlightResult";

const Search = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");

  // Function to fetch flight search results
  const fetchFlights = async (filters) => {
    setError("");
    setFlights([]);

    const query = new URLSearchParams(filters).toString();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/live-flights?${query}`);
      if (!response.ok) throw new Error("Flights not found");
      const data = await response.json();
      setFlights(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Search Flights</h1>
      <FlightSearchForm onSearch={fetchFlights} />

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

      {flights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {flights.map((flight, index) => (
            <FlightResult key={index} flight={flight} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">No flights found.</p>
      )}
    </div>
  );
};

export default Search;
