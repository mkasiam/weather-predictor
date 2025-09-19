import React from "react";

const WeatherNotFound = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
      <div className="text-center text-gray-500">No weather data available</div>
    </div>
  );
};

export default WeatherNotFound;
