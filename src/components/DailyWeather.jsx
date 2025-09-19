import React from 'react';
import { 
  WiThermometer, 
  WiRaindrop, 
  WiStrongWind, 
  WiHumidity,
  WiSunrise,
  WiSunset 
} from 'react-icons/wi';

const DailyWeather = ({ dailyData }) => {
  if (!dailyData || !dailyData.list) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-500">Loading daily forecast...</div>
      </div>
    );
  }

  // Get daily forecasts (every 8th item represents roughly 24 hours)
  const dailyForecasts = [];
  for (let i = 0; i < dailyData.list.length; i += 8) {
    if (dailyForecasts.length >= 7) break; // Limit to 7 days
    dailyForecasts.push(dailyData.list[i]);
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">7-Day Forecast</h3>
      
      <div className="space-y-4">
        {dailyForecasts.map((day, index) => (
          <div
            key={index}
            className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors"
          >
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
              {/* Day and Date */}
              <div className="md:col-span-1">
                <div className="font-semibold text-gray-800">
                  {getDayName(day.dt)}
                </div>
                <div className="text-sm text-gray-600">
                  {formatDate(day.dt)}
                </div>
              </div>
              
              {/* Weather Icon and Description */}
              <div className="md:col-span-2 flex items-center gap-3">
                <img
                  src={getWeatherIcon(day.weather[0].icon)}
                  alt={day.weather[0].description}
                  className="w-12 h-12"
                />
                <div>
                  <div className="font-medium text-gray-800 capitalize">
                    {day.weather[0].description}
                  </div>
                  <div className="text-sm text-gray-600">
                    {Math.round(day.main.temp)}°C
                  </div>
                </div>
              </div>
              
              {/* Temperature Range */}
              <div className="md:col-span-1 text-center">
                <div className="text-lg font-semibold text-gray-800">
                  {Math.round(day.main.temp_max)}°
                </div>
                <div className="text-sm text-gray-600">
                  {Math.round(day.main.temp_min)}°
                </div>
              </div>
              
              {/* Weather Details */}
              <div className="md:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                <div className="flex items-center gap-1 text-gray-600">
                  <WiRaindrop className="text-blue-400" />
                  <span>{day.pop ? Math.round(day.pop * 100) : 0}%</span>
                </div>
                
                <div className="flex items-center gap-1 text-gray-600">
                  <WiStrongWind className="text-gray-400" />
                  <span>{Math.round(day.wind.speed)} m/s</span>
                </div>
                
                <div className="flex items-center gap-1 text-gray-600">
                  <WiHumidity className="text-blue-400" />
                  <span>{day.main.humidity}%</span>
                </div>
                
                <div className="flex items-center gap-1 text-gray-600">
                  <WiThermometer className="text-red-400" />
                  <span>{day.main.pressure} hPa</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Weekly Summary */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3">Week Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Highest: </span>
            <span className="font-semibold text-gray-800">
              {Math.round(Math.max(...dailyForecasts.map(d => d.main.temp_max)))}°C
            </span>
          </div>
          <div>
            <span className="text-gray-600">Lowest: </span>
            <span className="font-semibold text-gray-800">
              {Math.round(Math.min(...dailyForecasts.map(d => d.main.temp_min)))}°C
            </span>
          </div>
          <div>
            <span className="text-gray-600">Avg Humidity: </span>
            <span className="font-semibold text-gray-800">
              {Math.round(dailyForecasts.reduce((sum, d) => sum + d.main.humidity, 0) / dailyForecasts.length)}%
            </span>
          </div>
          <div>
            <span className="text-gray-600">Rainy Days: </span>
            <span className="font-semibold text-gray-800">
              {dailyForecasts.filter(d => d.pop && d.pop > 0.3).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyWeather;