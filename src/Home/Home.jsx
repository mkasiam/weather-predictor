import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Dummy function for city suggestions (replace with real API)
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    // TODO: Fetch city suggestions from an API
    setSuggestions(
      value
        ? ["London", "Paris", "New York"].filter((city) =>
            city.toLowerCase().includes(value.toLowerCase())
          )
        : []
    );
  };

  const handleCityClick = (city) => {
    navigate(`/city/${city}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <h1 className="text-4xl font-bold mb-2">Weather App</h1>
      <p className="text-lg mb-6">Find real-time weather for any city</p>
      <div className="w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a city..."
          className="w-full p-3 rounded border border-gray-300 focus:outline-none"
        />
        {suggestions.length > 0 && (
          <ul className="bg-white border rounded mt-2 shadow">
            {suggestions.map((city) => (
              <li
                key={city}
                className="p-2 cursor-pointer hover:bg-blue-200"
                onClick={() => handleCityClick(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};


export default Home;