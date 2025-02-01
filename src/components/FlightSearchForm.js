import React, { useState } from "react";

const FlightSearchForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    flightNumber: "",
    airline: "",
    departure: "",
    arrival: "",
    status: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!filters.flightNumber && !filters.airline && !filters.departure && !filters.arrival && !filters.status) {
      alert("Please enter at least one search criterion.");
      return;
    }
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input name="flightNumber" placeholder="Flight Number" onChange={handleChange} className="p-2 border rounded" />
        <input name="airline" placeholder="Airline" onChange={handleChange} className="p-2 border rounded" />
        <input name="departure" placeholder="Departure Airport (IATA)" onChange={handleChange} className="p-2 border rounded" />
        <input name="arrival" placeholder="Arrival Airport (IATA)" onChange={handleChange} className="p-2 border rounded" />
        <select name="status" onChange={handleChange} className="p-2 border rounded">
          <option value="">Flight Status</option>
          <option value="scheduled">Scheduled</option>
          <option value="active">Active</option>
          <option value="landed">Landed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <button type="submit" className="mt-4 p-2 bg-blue-600 text-white rounded">Search Flights</button>
    </form>
  );
};

export default FlightSearchForm;
