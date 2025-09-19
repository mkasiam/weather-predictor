// Weather API service functions

const API_KEY = import.meta.env.VITE_API_KEY;

export const getCoordinates = async (cityName) => {
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

export const fetchCurrentWeather = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch current weather');
  }
  return response.json();
};

export const fetchForecast = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch forecast');
  }
  return response.json();
};

export const fetchAirQuality = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch air quality');
  }
  return response.json();
};

// Combined function for weather components
export const fetchWeatherData = async (cityName, type = 'current') => {
  try {
    const coordinates = await getCoordinates(cityName);
    const { lat, lon } = coordinates;

    switch (type) {
      case 'current':
        return await fetchCurrentWeather(lat, lon);
      case 'forecast':
        return await fetchForecast(lat, lon);
      case 'air-quality':
        return await fetchAirQuality(lat, lon);
      default:
        throw new Error('Invalid weather data type');
    }
  } catch (error) {
    console.error(`Error fetching ${type} weather data:`, error);
    throw error;
  }
};