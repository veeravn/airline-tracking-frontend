import React, { useState } from "react";

const airlines = [
  "American Airlines",
  "Delta Airlines",
  "United Airlines",
  "British Airways",
  "Lufthansa",
  "Air France",
  "Emirates",
  "Qatar Airways",
];

const FlightSearchForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    flightNumber: "",
    airline: "",
    departure: "",
    arrival: "",
  });

  const [airportSuggestions, setAirportSuggestions] = useState([]);
  const [inputField, setInputField] = useState("");

  // Fetch airport suggestions from an external API
  const fetchAirports = async (query) => {
    if (query.length < 3) return;

    const response = await fetch(`https://aviation-edge.com/v2/public/autocomplete?key=YOUR_API_KEY&query=${query}`);
    const data = await response.json();
    
    setAirportSuggestions(data.airports || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });

    if (name === "departure" || name === "arrival") {
      setInputField(name);
      fetchAirports(value);
    }
  };

  const selectAirport = (code) => {
    setFilters({ ...filters, [inputField]: code });
    setAirportSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!filters.flightNumber && !filters.airline && !filters.departure && !filters.arrival) {
      alert("Please enter at least one search criterion.");
      return;
    }
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg bg-white dark:bg-gray-800 dark:text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input name="flightNumber" placeholder="Flight Number" onChange={handleChange} className="p-2 border rounded" />
        <input name="airline" placeholder="Airline" onChange={handleChange} className="p-2 border rounded" />
        
        <div className="relative">
          <input name="departure" placeholder="Departure Airport" onChange={handleChange} className="p-2 border rounded" />
          {airportSuggestions.length > 0 && (
            <div className="absolute bg-white dark:bg-gray-700 border shadow-md mt-1 w-full">
              {airportSuggestions.map((airport) => (
                <div key={airport.code} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => selectAirport(airport.code)}>
                  {airport.name} ({airport.code})
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button type="submit" className="mt-4 p-2 bg-blue-600 text-white rounded">Search Flights</button>
    </form>
  );
};

export default FlightSearchForm;
