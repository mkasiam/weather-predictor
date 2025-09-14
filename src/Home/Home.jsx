import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${import.meta.env.api_key}`
      );
      const data = await response.json();
      setSuggestions(
        data.map((city) => ({
          name: city.name,
          country: city.country,
          state: city.state,
          lat: city.lat,
          lon: city.lon,
        }))
      );
    } catch (error) {
      setSuggestions([]);
      console.error(error);
    }
  };

  const handleCityClick = (city) => {
    navigate(`/city/${city.name}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-2">Weather App</h1>
      <p className="text-lg mb-6">Find real-time weather for any city</p>
      <div className="w-1/3 mx-auto">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a city..."
          className="w-full p-3 rounded border border-gray-300 focus:outline-none"
        />
        {suggestions.length > 0 && (
          <ul className="border rounded mt-2 shadow">
            {suggestions.map((city) => (
              <li
                key={city}
                className="p-2 cursor-pointer hover:bg-blue-400"
                onClick={() => handleCityClick(city)}
              >
                {city.name}, {city.state ? city.state + ", " : ""}
                {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
