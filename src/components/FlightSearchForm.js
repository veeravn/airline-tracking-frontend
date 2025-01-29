import React, { useState } from "react";

const FlightSearchForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    flightNumber: "",
    airline: "",
    departure: "",
    arrival: "",
    page: 1,
    pageSize: 10,
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
      <input name="flightNumber" placeholder="Flight Number" onChange={handleChange} className="p-2 border rounded m-2" />
      <input name="airline" placeholder="Airline" onChange={handleChange} className="p-2 border rounded m-2" />
      <input name="departure" placeholder="Departure Airport" onChange={handleChange} className="p-2 border rounded m-2" />
      <input name="arrival" placeholder="Arrival Airport" onChange={handleChange} className="p-2 border rounded m-2" />
      <button type="submit" className="p-2 bg-green-600 text-white rounded">Search</button>
    </form>
  );
};

export default FlightSearchForm;
