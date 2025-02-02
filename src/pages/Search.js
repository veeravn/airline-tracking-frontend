import React, { useState } from "react";
import FlightSearchForm from "../components/FlightSearchForm";
import FlightResult from "../components/FlightResult";

const Search = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch flights based on search filters
  const fetchFlights = async (filters) => {
    setError("");
    setFlights([]);
    setLoading(true);

    const query = new URLSearchParams(filters).toString();
    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/v1/search-flights?${query}`;

    try {
      console.log("Fetching flights from:", apiUrl);
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Flights not found");

      const data = await response.json();
      setFlights(data);
      if (data.length === 0) setError("No flights found matching your criteria.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Search Flights</h1>
      <FlightSearchForm onSearch={fetchFlights} />

      {loading && <p className="text-center text-blue-600 mt-4">Loading flight data...</p>}

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

      {flights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {flights.map((flight, index) => (
            <FlightResult key={index} flight={flight} />
          ))}
        </div>
      ) : (
        !loading && <p className="text-center mt-4">No flights found.</p>
      )}
    </div>
  );
};

export default Search;
