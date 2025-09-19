import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { WiThermometer, WiRaindrop, WiDaySunny, WiCloudy, WiRain, WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";
import { FiCalendar, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { fetchWeatherData } from "../services/weatherService";
import { calculateMonthlyStats } from "../utils/monthlyWeatherUtils";
import Loading from "./Loading";
import ErrorDataLoading from "./ErrorDataLoading";
import WeatherNotFound from "./WeatherNotFound";

const MonthlyWeather = () => {
  const { city } = useParams();
  const [dailyData, setDailyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonthlyWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const forecastData = await fetchWeatherData(city, "forecast");
        setDailyData(forecastData);
      } catch (err) {
        setError(err.message || "Failed to fetch monthly forecast");
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchMonthlyWeather();
    }
  }, [city]);

  if (loading) {
    return <Loading msg={"Loading monthly overview..."} />;
  }

  if (error) {
    return <ErrorDataLoading error={error} />;
  }

  if (!dailyData || !dailyData.list) {
    return <WeatherNotFound msg={"No monthly data available"} />;
  }

  // Calculate monthly statistics using utility functions
  const monthlyStats = calculateMonthlyStats(dailyData.list);

  // If calculations failed, show error
  if (!monthlyStats) {
    return <ErrorDataLoading error="Unable to calculate monthly statistics" />;
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <FiCalendar className="text-2xl text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-800">
          Monthly Weather Overview
        </h3>
      </div>

      {/* Monthly Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center">
          <WiThermometer className="text-3xl text-orange-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Avg Temperature</div>
          <div className="text-lg font-semibold text-gray-800">
            {monthlyStats.temperature.average}°C
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
          <WiHumidity className="text-3xl text-blue-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Avg Humidity</div>
          <div className="text-lg font-semibold text-gray-800">
            {monthlyStats.humidity.average}%
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center">
          <WiBarometer className="text-3xl text-purple-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Avg Pressure</div>
          <div className="text-lg font-semibold text-gray-800">
            {monthlyStats.pressure.average} hPa
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center">
          <WiStrongWind className="text-3xl text-green-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Avg Wind Speed</div>
          <div className="text-lg font-semibold text-gray-800">
            {monthlyStats.wind.averageSpeed} m/s
          </div>
        </div>
      </div>

      {/* Temperature Range */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FiTrendingUp className="text-red-500" />
            <span className="text-sm font-medium text-gray-700">Highest Temperature</span>
          </div>
          <div className="text-2xl font-bold text-red-600">{monthlyStats.temperature.maximum}°C</div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FiTrendingDown className="text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Lowest Temperature</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{monthlyStats.temperature.minimum}°C</div>
        </div>
      </div>

      {/* Weather Pattern Summary */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">Weather Pattern Summary</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <WiDaySunny className="text-3xl text-yellow-500 mx-auto mb-1" />
            <div className="text-sm text-gray-600">Sunny Periods</div>
            <div className="text-lg font-semibold text-gray-800">{monthlyStats.weatherPatterns.sunnyPeriods}</div>
          </div>
          <div className="text-center">
            <WiRain className="text-3xl text-blue-500 mx-auto mb-1" />
            <div className="text-sm text-gray-600">Rainy Periods</div>
            <div className="text-lg font-semibold text-gray-800">{monthlyStats.weatherPatterns.rainyPeriods}</div>
          </div>
          <div className="text-center">
            <WiCloudy className="text-3xl text-gray-500 mx-auto mb-1" />
            <div className="text-sm text-gray-600">Cloudy Periods</div>
            <div className="text-lg font-semibold text-gray-800">{monthlyStats.weatherPatterns.cloudyPeriods}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyWeather;