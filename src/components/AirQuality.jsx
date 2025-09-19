import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { WiSmog, WiDust, WiWindy } from "react-icons/wi";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiXCircle,
  FiInfo,
} from "react-icons/fi";
import Loading from "./Loading";
import ErrorDataLoading from "./ErrorDataLoading";

const AirQuality = () => {
  const { city } = useParams();
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchAirQuality = async () => {
      try {
        setLoading(true);
        setError(null);

        const geoResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoResponse.json();

        if (!geoData || geoData.length === 0) {
          throw new Error("City not found");
        }

        const { lat, lon } = geoData[0];

        const airResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const airData = await airResponse.json();

        setAirQualityData(airData);
      } catch (err) {
        setError(err.message || "Failed to fetch air quality data");
      } finally {
        setLoading(false);
      }
    };

    if (city && API_KEY) {
      fetchAirQuality();
    }
  }, [city, API_KEY]);

  if (loading) {
    return <Loading msg={"Loading air quality data..."} />;
  }

  if (error) {
    return <ErrorDataLoading error={error} />;
  }

  if (
    !airQualityData ||
    !airQualityData.list ||
    airQualityData.list.length === 0
  ) {
    return <Loading msg={"Loading air quality data..."} />;
  }

  const currentAQ = airQualityData.list[0];
  const { main, components } = currentAQ;

  const getAQILevel = (aqi) => {
    const levels = {
      1: {
        label: "Good",
        color: "text-green-600",
        bgColor: "bg-green-50",
        icon: FiCheckCircle,
      },
      2: {
        label: "Fair",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        icon: FiInfo,
      },
      3: {
        label: "Moderate",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        icon: FiAlertTriangle,
      },
      4: {
        label: "Poor",
        color: "text-red-600",
        bgColor: "bg-red-50",
        icon: FiXCircle,
      },
      5: {
        label: "Very Poor",
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        icon: FiXCircle,
      },
    };
    return levels[aqi] || levels[3];
  };

  const getAQIDescription = (aqi) => {
    const descriptions = {
      1: "Air quality is considered satisfactory, and air pollution poses little or no risk.",
      2: "Air quality is acceptable; however, there may be a moderate health concern for a very small number of people.",
      3: "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
      4: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.",
      5: "Health warnings of emergency conditions. The entire population is more likely to be affected.",
    };
    return descriptions[aqi] || descriptions[3];
  };

  const getConcentrationLevel = (value, pollutant) => {
    const thresholds = {
      co: { good: 4000, moderate: 10000, poor: 15000 },
      no: { good: 40, moderate: 80, poor: 200 },
      no2: { good: 40, moderate: 80, poor: 200 },
      o3: { good: 100, moderate: 160, poor: 240 },
      so2: { good: 20, moderate: 80, poor: 250 },
      pm2_5: { good: 10, moderate: 25, poor: 50 },
      pm10: { good: 20, moderate: 50, poor: 100 },
      nh3: { good: 10, moderate: 50, poor: 100 },
    };

    const threshold = thresholds[pollutant];
    if (!threshold) return "Unknown";

    if (value <= threshold.good) return "Good";
    if (value <= threshold.moderate) return "Moderate";
    if (value <= threshold.poor) return "Poor";
    return "Very Poor";
  };

  const getConcentrationColor = (level) => {
    const colors = {
      Good: "text-green-600",
      Moderate: "text-yellow-600",
      Poor: "text-red-600",
      "Very Poor": "text-purple-600",
      Unknown: "text-gray-600",
    };
    return colors[level] || "text-gray-600";
  };

  const aqiLevel = getAQILevel(main.aqi);
  const AQIIcon = aqiLevel.icon;

  const pollutants = [
    {
      key: "co",
      label: "Carbon Monoxide (CO)",
      value: components.co,
      unit: "μg/m³",
    },
    {
      key: "no",
      label: "Nitrogen Monoxide (NO)",
      value: components.no,
      unit: "μg/m³",
    },
    {
      key: "no2",
      label: "Nitrogen Dioxide (NO₂)",
      value: components.no2,
      unit: "μg/m³",
    },
    { key: "o3", label: "Ozone (O₃)", value: components.o3, unit: "μg/m³" },
    {
      key: "so2",
      label: "Sulfur Dioxide (SO₂)",
      value: components.so2,
      unit: "μg/m³",
    },
    {
      key: "pm2_5",
      label: "Fine Particles (PM2.5)",
      value: components.pm2_5,
      unit: "μg/m³",
    },
    {
      key: "pm10",
      label: "Coarse Particles (PM10)",
      value: components.pm10,
      unit: "μg/m³",
    },
    {
      key: "nh3",
      label: "Ammonia (NH₃)",
      value: components.nh3,
      unit: "μg/m³",
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <WiSmog className="text-2xl text-gray-600" />
        <h3 className="text-xl font-semibold text-gray-800">
          Air Quality in {city}
        </h3>
      </div>

      {/* Main AQI Display */}
      <div className={`${aqiLevel.bgColor} rounded-lg p-6 mb-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <AQIIcon className={`text-3xl ${aqiLevel.color}`} />
            <div>
              <div className="text-2xl font-bold text-gray-800">
                AQI: {main.aqi}
              </div>
              <div className={`text-lg font-semibold ${aqiLevel.color}`}>
                {aqiLevel.label}
              </div>
            </div>
          </div>
          <WiWindy className="text-4xl text-gray-400" />
        </div>

        <p className="text-sm text-gray-700">{getAQIDescription(main.aqi)}</p>
      </div>

      {/* Pollutant Details */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-4">
          Pollutant Concentrations
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pollutants.map((pollutant) => {
            const level = getConcentrationLevel(pollutant.value, pollutant.key);
            const colorClass = getConcentrationColor(level);

            return (
              <div key={pollutant.key} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">
                      {pollutant.label}
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      {pollutant.value.toFixed(1)} {pollutant.unit}
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${colorClass}`}>
                    {level}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Health Recommendations */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-3">
          Health Recommendations
        </h4>
        <div className="space-y-2 text-sm text-gray-700">
          {main.aqi <= 2 && (
            <div className="flex items-start gap-2">
              <FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
              <span>Air quality is good. Ideal for outdoor activities.</span>
            </div>
          )}

          {main.aqi === 3 && (
            <div className="flex items-start gap-2">
              <FiInfo className="text-orange-500 mt-0.5 flex-shrink-0" />
              <span>
                Sensitive individuals should consider reducing prolonged outdoor
                activities.
              </span>
            </div>
          )}

          {main.aqi >= 4 && (
            <>
              <div className="flex items-start gap-2">
                <FiAlertTriangle className="text-red-500 mt-0.5 flex-shrink-0" />
                <span>Consider wearing a mask when outdoors.</span>
              </div>
              <div className="flex items-start gap-2">
                <FiAlertTriangle className="text-red-500 mt-0.5 flex-shrink-0" />
                <span>
                  Limit outdoor activities, especially for children and elderly.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <FiAlertTriangle className="text-red-500 mt-0.5 flex-shrink-0" />
                <span>Keep windows closed and use air purifiers indoors.</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Data Source Info */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        Data provided by OpenWeatherMap Air Pollution API
      </div>
    </div>
  );
};

export default AirQuality;
