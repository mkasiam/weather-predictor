import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { WiDaySunny } from "react-icons/wi";
import CitySuggestions from "../components/CitySuggestions";
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
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${
          import.meta.env.VITE_API_KEY
        }`
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
    <div className="bg-weather min-h-screen">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-2xl mx-auto w-full">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <WiDaySunny className="text-6xl text-yellow-300 drop-shadow-lg animate-pulse" />
              <h1 className="text-5xl font-bold text-white drop-shadow-lg">
                Weather App
              </h1>
            </div>
            <p className="text-xl text-white/95 drop-shadow-md font-light">
              Discover real-time weather for any city around the world
            </p>
          </div>

          {/* Search Container */}
          <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 text-xl" />
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for a city..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 focus:border-white/60 focus:outline-none text-white placeholder-white/60 transition-all duration-300 focus:bg-white/25"
              />
            </div>

            {/* Use the new CitySuggestions component */}
            <CitySuggestions
              suggestions={suggestions}
              onCityClick={handleCityClick}
            />

            {/* Search Tips */}
            {suggestions.length === 0 && query.length === 0 && (
              <div className="mt-3 p-3 bg-white/80 rounded-lg">
                <div className="text-sm text-gray-600">
                  Try searching for cities like "New York", "London", "Tokyo"
                </div>
              </div>
            )}
          </div>

          {/* Feature Highlights */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 text-center border border-blue-300/30 hover:from-blue-400/30 hover:to-blue-600/30 transition-all duration-300">
              <div className="text-3xl mb-3">🌤️</div>
              <div className="font-semibold text-white text-lg">
                Current Weather
              </div>
              <div className="text-sm text-white/80">Real-time conditions</div>
            </div>

            <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 backdrop-blur-sm rounded-xl p-6 text-center border border-green-300/30 hover:from-green-400/30 hover:to-green-600/30 transition-all duration-300">
              <div className="text-3xl mb-3">📅</div>
              <div className="font-semibold text-white text-lg">Forecasts</div>
              <div className="text-sm text-white/80">Hourly & Daily</div>
            </div>

            <div className="bg-gradient-to-br from-purple-400/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-300/30 hover:from-purple-400/30 hover:to-purple-600/30 transition-all duration-300">
              <div className="text-3xl mb-3">🌬️</div>
              <div className="font-semibold text-white text-lg">
                Air Quality
              </div>
              <div className="text-sm text-white/80">Pollution data</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
