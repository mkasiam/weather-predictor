import React from 'react';
import { 
  WiThermometer, 
  WiRaindrop, 
  WiStrongWind, 
  WiHumidity,
  WiDaySunny,
  WiCloudy,
  WiRain
} from 'react-icons/wi';
import { FiCalendar, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const MonthlyWeather = ({ dailyData }) => {
  if (!dailyData || !dailyData.list) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-500">Loading monthly overview...</div>
      </div>
    );
  }

  // Since OpenWeatherMap free tier only provides 5-day forecast,
  // we'll create a monthly overview based on available data and trends
  const availableDays = dailyData.list.slice(0, 40); // All available data points
  
  const getDailyAverages = () => {
    const days = {};
    availableDays.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!days[date]) {
        days[date] = {
          temps: [],
          humidity: [],
          wind: [],
          precipitation: [],
          weather: []
        };
      }
      days[date].temps.push(item.main.temp);
      days[date].humidity.push(item.main.humidity);
      days[date].wind.push(item.wind.speed);
      days[date].precipitation.push(item.pop || 0);
      days[date].weather.push(item.weather[0].main);
    });

    return Object.entries(days).map(([date, data]) => ({
      date,
      avgTemp: data.temps.reduce((a, b) => a + b, 0) / data.temps.length,
      maxTemp: Math.max(...data.temps),
      minTemp: Math.min(...data.temps),
      avgHumidity: data.humidity.reduce((a, b) => a + b, 0) / data.humidity.length,
      avgWind: data.wind.reduce((a, b) => a + b, 0) / data.wind.length,
      avgPrecipitation: data.precipitation.reduce((a, b) => a + b, 0) / data.precipitation.length,
      dominantWeather: getMostFrequent(data.weather)
    }));
  };

  const getMostFrequent = (arr) => {
    const frequency = {};
    arr.forEach(item => frequency[item] = (frequency[item] || 0) + 1);
    return Object.keys(frequency).reduce((a, b) => frequency[a] > frequency[b] ? a : b);
  };

  const dailyAverages = getDailyAverages();
  
  const monthlyStats = {
    avgTemp: dailyAverages.reduce((sum, day) => sum + day.avgTemp, 0) / dailyAverages.length,
    maxTemp: Math.max(...dailyAverages.map(day => day.maxTemp)),
    minTemp: Math.min(...dailyAverages.map(day => day.minTemp)),
    avgHumidity: dailyAverages.reduce((sum, day) => sum + day.avgHumidity, 0) / dailyAverages.length,
    avgWind: dailyAverages.reduce((sum, day) => sum + day.avgWind, 0) / dailyAverages.length,
    rainyDays: dailyAverages.filter(day => day.avgPrecipitation > 0.3).length,
    sunnyDays: dailyAverages.filter(day => day.dominantWeather === 'Clear').length,
    cloudyDays: dailyAverages.filter(day => day.dominantWeather === 'Clouds').length
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getWeatherIcon = (weatherType) => {
    const iconMap = {
      'Clear': WiDaySunny,
      'Clouds': WiCloudy,
      'Rain': WiRain,
      'Drizzle': WiRain,
      'Thunderstorm': WiRain,
      'Snow': WiCloudy,
      'Mist': WiCloudy,
      'Fog': WiCloudy
    };
    return iconMap[weatherType] || WiCloudy;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <FiCalendar className="text-blue-500 text-xl" />
        <h3 className="text-xl font-semibold text-gray-800">Monthly Overview</h3>
      </div>
      
      {/* Monthly Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <WiThermometer className="text-3xl text-red-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Average Temp</div>
          <div className="text-lg font-semibold text-gray-800">
            {Math.round(monthlyStats.avgTemp)}°C
          </div>
          <div className="text-xs text-gray-500 mt-1">
            High: {Math.round(monthlyStats.maxTemp)}° Low: {Math.round(monthlyStats.minTemp)}°
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <WiHumidity className="text-3xl text-blue-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Avg Humidity</div>
          <div className="text-lg font-semibold text-gray-800">
            {Math.round(monthlyStats.avgHumidity)}%
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <WiStrongWind className="text-3xl text-gray-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Avg Wind</div>
          <div className="text-lg font-semibold text-gray-800">
            {Math.round(monthlyStats.avgWind)} m/s
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 text-center">
          <WiRaindrop className="text-3xl text-green-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Rainy Days</div>
          <div className="text-lg font-semibold text-gray-800">
            {monthlyStats.rainyDays}
          </div>
        </div>
      </div>

      {/* Daily Overview Grid */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Daily Breakdown (Available Data)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {dailyAverages.map((day, index) => {
            const WeatherIcon = getWeatherIcon(day.dominantWeather);
            return (
              <div
                key={index}
                className="bg-blue-50 rounded-lg p-3 hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-gray-800">
                    {formatDate(day.date)}
                  </div>
                  <WeatherIcon className="text-xl text-blue-500" />
                </div>
                
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">High:</span>
                    <span className="font-medium">{Math.round(day.maxTemp)}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Low:</span>
                    <span className="font-medium">{Math.round(day.minTemp)}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rain:</span>
                    <span className="font-medium">{Math.round(day.avgPrecipitation * 100)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weather Pattern Summary */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-800 mb-3">Weather Patterns</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <WiDaySunny className="text-2xl text-yellow-500 mx-auto mb-1" />
            <div className="text-sm text-gray-600">Sunny Days</div>
            <div className="font-semibold text-gray-800">{monthlyStats.sunnyDays}</div>
          </div>
          
          <div className="text-center">
            <WiCloudy className="text-2xl text-gray-500 mx-auto mb-1" />
            <div className="text-sm text-gray-600">Cloudy Days</div>
            <div className="font-semibold text-gray-800">{monthlyStats.cloudyDays}</div>
          </div>
          
          <div className="text-center">
            <WiRain className="text-2xl text-blue-500 mx-auto mb-1" />
            <div className="text-sm text-gray-600">Rainy Days</div>
            <div className="font-semibold text-gray-800">{monthlyStats.rainyDays}</div>
          </div>
        </div>
      </div>

      {/* Note about data limitations */}
      <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="text-sm text-yellow-800">
          <strong>Note:</strong> Monthly overview is based on available 5-day forecast data. 
          For complete monthly historical data, a premium weather API subscription would be required.
        </div>
      </div>
    </div>
  );
};

export default MonthlyWeather;