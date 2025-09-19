// Monthly weather calculation utilities

/**
 * Calculate comprehensive monthly weather statistics from forecast data
 * @param {Array} forecastList - Array of forecast data points
 * @returns {Object} - Calculated monthly statistics
 */
export const calculateMonthlyStats = (forecastList) => {
  if (!forecastList || !Array.isArray(forecastList) || forecastList.length === 0) {
    return null;
  }

  // Extract all data arrays
  const allTemps = forecastList.map(item => item.main.temp);
  const allHumidity = forecastList.map(item => item.main.humidity);
  const allPressure = forecastList.map(item => item.main.pressure);
  const allWindSpeed = forecastList.map(item => item.wind?.speed || 0);

  // Calculate averages
  const avgTemp = allTemps.reduce((a, b) => a + b, 0) / allTemps.length;
  const avgHumidity = allHumidity.reduce((a, b) => a + b, 0) / allHumidity.length;
  const avgPressure = allPressure.reduce((a, b) => a + b, 0) / allPressure.length;
  const avgWindSpeed = allWindSpeed.reduce((a, b) => a + b, 0) / allWindSpeed.length;

  // Calculate temperature extremes
  const maxTemp = Math.max(...allTemps);
  const minTemp = Math.min(...allTemps);

  // Calculate weather pattern counts
  const rainDays = forecastList.filter(item => item.weather[0].main === "Rain").length;
  const sunnyDays = forecastList.filter(item => item.weather[0].main === "Clear").length;
  const cloudyDays = forecastList.filter(item => item.weather[0].main === "Clouds").length;

  return {
    temperature: {
      average: Math.round(avgTemp),
      maximum: Math.round(maxTemp),
      minimum: Math.round(minTemp)
    },
    humidity: {
      average: Math.round(avgHumidity)
    },
    pressure: {
      average: Math.round(avgPressure)
    },
    wind: {
      averageSpeed: Math.round(avgWindSpeed)
    },
    weatherPatterns: {
      rainyPeriods: rainDays,
      sunnyPeriods: sunnyDays,
      cloudyPeriods: cloudyDays
    }
  };
};