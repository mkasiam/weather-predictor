import React, { createContext, useContext } from 'react';

const WeatherContext = createContext();

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export const WeatherProvider = ({ children }) => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  // Common function to get coordinates for a city
  const getCoordinates = async (cityName) => {
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
    );
    const geoData = await geoResponse.json();

    if (!geoData || geoData.length === 0) {
      throw new Error("City not found");
    }

    return {
      lat: geoData[0].lat,
      lon: geoData[0].lon,
      name: geoData[0].name,
      country: geoData[0].country,
      state: geoData[0].state
    };
  };

  // Common weather API calls
  const fetchCurrentWeather = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    return response.json();
  };

  const fetchForecast = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    return response.json();
  };

  const fetchAirQuality = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    return response.json();
  };

  const value = {
    API_KEY,
    getCoordinates,
    fetchCurrentWeather,
    fetchForecast,
    fetchAirQuality
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};