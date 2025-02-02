import React, { useState } from "react";

const FlightSearchForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    flight_iata: "",
    airline_iata: "",
    dep_iata: "",
    arr_iata: "",
    flight_status: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!filters.flight_iata && !filters.airline_iata && !filters.dep_iata && !filters.arr_iata && !filters.flight_status) {
      alert("Please enter at least one search criterion.");
      return;
    }
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg bg-white dark:bg-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Flight Number */}
        <div>
          <label htmlFor="flight_iata" className="block mb-2 font-bold text-gray-700 dark:text-white">
            Flight Number (IATA)
          </label>
          <input
            type="text"
            id="flight_iata"
            name="flight_iata"
            value={filters.flight_iata}
            onChange={handleChange}
            placeholder="e.g., ID6140"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Airline Code */}
        <div>
          <label htmlFor="airline_iata" className="block mb-2 font-bold text-gray-700 dark:text-white">
            Airline Code (IATA)
          </label>
          <input
            type="text"
            id="airline_iata"
            name="airline_iata"
            value={filters.airline_iata}
            onChange={handleChange}
            placeholder="e.g., ID"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Departure Airport */}
        <div>
          <label htmlFor="dep_iata" className="block mb-2 font-bold text-gray-700 dark:text-white">
            Departure Airport (IATA)
          </label>
          <input
            type="text"
            id="dep_iata"
            name="dep_iata"
            value={filters.dep_iata}
            onChange={handleChange}
            placeholder="e.g., CGK"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Arrival Airport */}
        <div>
          <label htmlFor="arr_iata" className="block mb-2 font-bold text-gray-700 dark:text-white">
            Arrival Airport (IATA)
          </label>
          <input
            type="text"
            id="arr_iata"
            name="arr_iata"
            value={filters.arr_iata}
            onChange={handleChange}
            placeholder="e.g., TTE"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Flight Status */}
        <div>
          <label htmlFor="flight_status" className="block mb-2 font-bold text-gray-700 dark:text-white">
            Flight Status
          </label>
          <select
            id="flight_status"
            name="flight_status"
            value={filters.flight_status}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="active">Active</option>
            <option value="landed">Landed</option>
            <option value="cancelled">Cancelled</option>
          </select>
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
