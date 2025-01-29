import React, { useState, useEffect } from "react";
import FlightSearchForm from "../components/FlightSearchForm";
import FlightResult from "../components/FlightResult";

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [socket, setSocket] = useState(null);

  // Function to fetch flights (search & pagination)
  const fetchFlights = async (params) => {
    setError("");
    setFlights([]);

    const query = new URLSearchParams({
      flightNumber: params.flightNumber || "",
      airline: params.airline || "",
      departure: params.departure || "",
      arrival: params.arrival || "",
      page: params.page || 1,
      pageSize: params.pageSize || 10,
    }).toString();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/live-flights?${query}`);
      if (!response.ok) throw new Error("Flights not found");
      const data = await response.json();
      setFlights(data);
      setPage(params.page || 1);
      setFilters(params);
    } catch (err) {
      setError(err.message);
    }
  };

  // WebSocket connection for real-time updates
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/ws/live-updates");
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setFlights(data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Live Airline Tracker</h1>
      <FlightSearchForm onSearch={fetchFlights} />
      
      {error && <p className="text-red-600 mt-4">{error}</p>}
      
      {flights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flights.map((flight, index) => (
            <FlightResult key={index} flight={flight} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">No flights found.</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => fetchFlights({ ...filters, page: page - 1 })}
          disabled={page <= 1}
          className={`px-4 py-2 rounded ${page <= 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white"}`}
        >
          Previous
        </button>
        <button
          onClick={() => fetchFlights({ ...filters, page: page + 1 })}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
