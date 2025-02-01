import React from "react";
import LiveFlightMap from "../components/LiveFlightMap";
import DarkModeToggle from "../components/DarkModeToggle";

const Home = () => {
  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-center">Live Airline Tracker</h1>
        <DarkModeToggle />
      </div>
      <LiveFlightMap />
    </div>
  );
};

export default Home;
