import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  WiThermometer,
  WiRaindrop,
  WiStrongWind,
  WiDaySunny,
} from "react-icons/wi";
import { fetchWeatherData } from "../services/weatherService";
import { formatTime, getWeatherIcon } from "../utils/weatherUtils";
import Loading from "./Loading";
import ErrorDataLoading from "./ErrorDataLoading";
import WeatherNotFound from "./WeatherNotFound";

const HourlyWeather = () => {
  const { city } = useParams();
  const [hourlyData, setHourlyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHourlyWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const forecastData = await fetchWeatherData(city, "forecast");
        setHourlyData(forecastData);
      } catch (err) {
        setError(err.message || "Failed to fetch hourly forecast");
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchHourlyWeather();
    }
  }, [city]);

  if (loading) {
    return <Loading msg={"Loading hourly forecast..."} />;
  }

  if (error) {
    return <ErrorDataLoading error={error} />;
  }

  if (!hourlyData || !hourlyData.list) {
    return <WeatherNotFound msg={"No hourly forecast available"} />;
  }

  const next24Hours = hourlyData.list.slice(0, 8);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        24-Hour Forecast
      </h3>

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
        <h4 className="font-medium text-gray-800 mb-2">
          Next 24 Hours Summary
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">High: </span>
            <span className="font-semibold text-gray-800">
              {Math.round(Math.max(...next24Hours.map((h) => h.main.temp)))}°C
            </span>
          </div>
          <div>
            <span className="text-gray-600">Low: </span>
            <span className="font-semibold text-gray-800">
              {Math.round(Math.min(...next24Hours.map((h) => h.main.temp)))}°C
            </span>
          </div>
          <div>
            <span className="text-gray-600">Avg Humidity: </span>
            <span className="font-semibold text-gray-800">
              {Math.round(
                next24Hours.reduce((sum, h) => sum + h.main.humidity, 0) /
                  next24Hours.length
              )}
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyWeather;
