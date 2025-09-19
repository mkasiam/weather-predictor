import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import WeatherNav from '../components/WeatherNav';
import TodayWeather from '../components/TodayWeather';
import HourlyWeather from '../components/HourlyWeather';
import DailyWeather from '../components/DailyWeather';
import MonthlyWeather from '../components/MonthlyWeather';
import AirQuality from '../components/AirQuality';

const City = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('today');
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({
    current: null,
    forecast: null,
    airQuality: null
  });
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchWeatherData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // First, get coordinates for the city
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoResponse.json();
      
      if (!geoData || geoData.length === 0) {
        throw new Error('City not found');
      }

      const { lat, lon } = geoData[0];

      // Fetch current weather, forecast, and air quality in parallel
      const [currentResponse, forecastResponse, airQualityResponse] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
        fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      ]);

      const [currentData, forecastData, airQualityData] = await Promise.all([
        currentResponse.json(),
        forecastResponse.json(),
        airQualityResponse.json()
      ]);

      setWeatherData({
        current: currentData,
        forecast: forecastData,
        airQuality: airQualityData
      });

    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      console.error('Weather data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [city, API_KEY]);

  useEffect(() => {
    if (city && API_KEY) {
      fetchWeatherData();
    }
  }, [city, API_KEY, fetchWeatherData]);

  const renderActiveComponent = () => {
    if (loading) {
      return (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center">
          <div className="text-lg text-gray-600">Loading weather data for {city}...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center">
          <div className="text-lg text-red-600 mb-4">Error: {error}</div>
          <button 
            onClick={fetchWeatherData}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'today':
        return <TodayWeather weatherData={weatherData.current} cityName={city} />;
      case 'hourly':
        return <HourlyWeather hourlyData={weatherData.forecast} />;
      case 'daily':
        return <DailyWeather dailyData={weatherData.forecast} />;
      case 'monthly':
        return <MonthlyWeather dailyData={weatherData.forecast} />;
      case 'air-quality':
        return <AirQuality airQualityData={weatherData.airQuality} cityName={city} />;
      default:
        return <TodayWeather weatherData={weatherData.current} cityName={city} />;
    }
  };

  return (
    <div className="bg-weather min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 hover:bg-white/90 transition-all duration-300 shadow-md"
          >
            <FiArrowLeft className="text-blue-500" />
            <span className="text-gray-700 font-medium">Back to Search</span>
          </button>

          {/* Navigation */}
          <WeatherNav activeTab={activeTab} onTabChange={setActiveTab} />
          
          {/* Content */}
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default City;
