import React from 'react';
import { 
  WiThermometer, 
  WiHumidity, 
  WiStrongWind, 
  WiBarometer,
  WiSunrise,
  WiSunset,
  WiCloudyGusts
} from 'react-icons/wi';
import { FiMapPin, FiEye } from 'react-icons/fi';

const TodayWeather = ({ weatherData, cityName }) => {
  if (!weatherData) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-500">Loading weather data...</div>
      </div>
    );
  }

  const {
    main,
    weather,
    wind,
    visibility,
    sys
  } = weatherData;

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': WiThermometer,
      '01n': WiThermometer,
      '02d': WiCloudyGusts,
      '02n': WiCloudyGusts,
      '03d': WiCloudyGusts,
      '03n': WiCloudyGusts,
      '04d': WiCloudyGusts,
      '04n': WiCloudyGusts,
      '09d': WiCloudyGusts,
      '09n': WiCloudyGusts,
      '10d': WiCloudyGusts,
      '10n': WiCloudyGusts,
      '11d': WiCloudyGusts,
      '11n': WiCloudyGusts,
      '13d': WiCloudyGusts,
      '13n': WiCloudyGusts,
      '50d': WiCloudyGusts,
      '50n': WiCloudyGusts,
    };
    return iconMap[iconCode] || WiThermometer;
  };

  const WeatherIcon = getWeatherIcon(weather[0]?.icon);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <FiMapPin className="text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-800">{cityName}</h2>
      </div>

      {/* Main Weather Info */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-4 mb-4">
          <WeatherIcon className="text-6xl text-blue-500" />
          <div>
            <div className="text-4xl font-bold text-gray-800">
              {Math.round(main.temp)}°C
            </div>
            <div className="text-lg text-gray-600 capitalize">
              {weather[0]?.description}
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Feels like {Math.round(main.feels_like)}°C
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <WiHumidity className="text-2xl text-blue-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Humidity</div>
          <div className="font-semibold text-gray-800">{main.humidity}%</div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <WiStrongWind className="text-2xl text-blue-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Wind Speed</div>
          <div className="font-semibold text-gray-800">{wind.speed} m/s</div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <WiBarometer className="text-2xl text-blue-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Pressure</div>
          <div className="font-semibold text-gray-800">{main.pressure} hPa</div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <FiEye className="text-2xl text-blue-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Visibility</div>
          <div className="font-semibold text-gray-800">{Math.round(visibility / 1000)} km</div>
        </div>
      </div>

      {/* Sun Times */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <WiSunrise className="text-2xl text-orange-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Sunrise</div>
          <div className="font-semibold text-gray-800">{formatTime(sys.sunrise)}</div>
        </div>

        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <WiSunset className="text-2xl text-orange-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Sunset</div>
          <div className="font-semibold text-gray-800">{formatTime(sys.sunset)}</div>
        </div>
      </div>
    </div>
  );
};

export default TodayWeather;