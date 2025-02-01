import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        {/* Navigation Links */}
        <nav className="flex justify-between bg-gray-100 p-4 rounded-md shadow-lg">
          <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Live Flights
          </Link>
          <Link to="/search" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Search Flights
          </Link>
        </nav>

        {/* Routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;