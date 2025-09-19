import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { WiThermometer, WiRaindrop, WiStrongWind } from 'react-icons/wi';

const HourlyWeather = () => {
  const { city } = useParams();
  const [hourlyData, setHourlyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchHourlyWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get coordinates for the city
        const geoResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoResponse.json();

        if (!geoData || geoData.length === 0) {
          throw new Error("City not found");
        }

        const { lat, lon } = geoData[0];

        // Fetch 5-day forecast (includes hourly data)
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const forecastData = await forecastResponse.json();

        setHourlyData(forecastData);
      } catch (err) {
        setError(err.message || "Failed to fetch hourly forecast");
      } finally {
        setLoading(false);
      }
    };

    if (city && API_KEY) {
      fetchHourlyWeather();
    }
  }, [city, API_KEY]);

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-500">Loading hourly forecast...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <div className="text-center text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!hourlyData || !hourlyData.list) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-500">No hourly forecast available</div>
      </div>
    );
  }

  // Get next 24 hours (8 intervals of 3 hours each)
  const next24Hours = hourlyData.list.slice(0, 8);

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">24-Hour Forecast</h3>
      
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {next24Hours.map((hour, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-lg p-4 min-w-[140px] text-center hover:bg-blue-100 transition-colors"
            >
              {/* Time */}
              <div className="text-sm text-gray-600 mb-2">
                {formatTime(hour.dt)}
              </div>
              
              {/* Weather Icon */}
              <div className="mb-3">
                <img
                  src={getWeatherIcon(hour.weather[0].icon)}
                  alt={hour.weather[0].description}
                  className="w-12 h-12 mx-auto"
                />
              </div>
              
              {/* Temperature */}
              <div className="text-lg font-semibold text-gray-800 mb-2">
                {Math.round(hour.main.temp)}°C
              </div>
              
              {/* Weather Description */}
              <div className="text-xs text-gray-600 mb-3 capitalize">
                {hour.weather[0].description}
              </div>
              
              {/* Additional Info */}
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                  <WiRaindrop className="text-blue-400" />
                  <span>{hour.pop ? Math.round(hour.pop * 100) : 0}%</span>
                </div>
                
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                  <WiStrongWind className="text-gray-400" />
                  <span>{Math.round(hour.wind.speed)} m/s</span>
                </div>
                
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                  <WiThermometer className="text-red-400" />
                  <span>{hour.main.humidity}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Summary */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Next 24 Hours Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">High: </span>
            <span className="font-semibold text-gray-800">
              {Math.round(Math.max(...next24Hours.map(h => h.main.temp)))}°C
            </span>
          </div>
          <div>
            <span className="text-gray-600">Low: </span>
            <span className="font-semibold text-gray-800">
              {Math.round(Math.min(...next24Hours.map(h => h.main.temp)))}°C
            </span>
          </div>
          <div>
            <span className="text-gray-600">Avg Humidity: </span>
            <span className="font-semibold text-gray-800">
              {Math.round(next24Hours.reduce((sum, h) => sum + h.main.humidity, 0) / next24Hours.length)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyWeather;