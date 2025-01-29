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

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
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
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Flight Number Input */}
        <div>
          <label htmlFor="flightNumber" className="block mb-2 font-bold text-gray-700">
            Flight Number
          </label>
          <input
            type="text"
            id="flightNumber"
            name="flightNumber"
            value={filters.flightNumber}
            onChange={handleChange}
            placeholder="Enter flight number"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Airline Dropdown */}
        <div>
          <label htmlFor="airline" className="block mb-2 font-bold text-gray-700">
            Airline
          </label>
          <select
            id="airline"
            name="airline"
            value={filters.airline}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Airline</option>
            {airlines.map((airline, index) => (
              <option key={index} value={airline}>
                {airline}
              </option>
            ))}
          </select>
        </div>

        {/* Departure Airport Input */}
        <div>
          <label htmlFor="departure" className="block mb-2 font-bold text-gray-700">
            Departure Airport (IATA)
          </label>
          <input
            type="text"
            id="departure"
            name="departure"
            value={filters.departure}
            onChange={handleChange}
            placeholder="e.g., JFK, LAX"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Arrival Airport Input */}
        <div>
          <label htmlFor="arrival" className="block mb-2 font-bold text-gray-700">
            Arrival Airport (IATA)
          </label>
          <input
            type="text"
            id="arrival"
            name="arrival"
            value={filters.arrival}
            onChange={handleChange}
            placeholder="e.g., DXB, LHR"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
        >
          Search Flights
        </button>
      </div>
    </form>
  );
};

export default FlightSearchForm;
