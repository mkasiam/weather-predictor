import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { WiSmog } from "react-icons/wi";
import { FiAlertTriangle, FiCheckCircle, FiXCircle, FiInfo } from "react-icons/fi";
import { fetchWeatherData } from "../services/weatherService";
import Loading from "./Loading";
import ErrorDataLoading from "./ErrorDataLoading";
import WeatherNotFound from "./WeatherNotFound";

const AirQuality = () => {
  const { city } = useParams();
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirQuality = async () => {
      try {
        setLoading(true);
        setError(null);
        const airData = await fetchWeatherData(city, "air-quality");
        setAirQualityData(airData);
      } catch (err) {
        setError(err.message || "Failed to fetch air quality data");
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchAirQuality();
    }
  }, [city]);

  if (loading) {
    return <Loading msg={"Loading air quality..."} />;
  }

  if (error) {
    return <ErrorDataLoading error={error} />;
  }

  if (!airQualityData || !airQualityData.list || airQualityData.list.length === 0) {
    return <WeatherNotFound msg={"No air quality data available"} />;
  }

  const currentAQ = airQualityData.list[0];
  const aqi = currentAQ.main.aqi;

  // Simple AQI mapping
  const getAQIInfo = (aqi) => {
    const levels = {
      1: { label: "Good", color: "text-green-600", bgColor: "bg-green-50", icon: FiCheckCircle },
      2: { label: "Fair", color: "text-yellow-600", bgColor: "bg-yellow-50", icon: FiInfo },
      3: { label: "Moderate", color: "text-orange-600", bgColor: "bg-orange-50", icon: FiAlertTriangle },
      4: { label: "Poor", color: "text-red-600", bgColor: "bg-red-50", icon: FiXCircle },
      5: { label: "Very Poor", color: "text-purple-600", bgColor: "bg-purple-50", icon: FiXCircle }
    };
    return levels[aqi] || levels[3];
  };

  const aqiInfo = getAQIInfo(aqi);
  const IconComponent = aqiInfo.icon;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <WiSmog className="text-2xl text-gray-600" />
        <h3 className="text-xl font-semibold text-gray-800">{city} Air Quality</h3>
      </div>

      {/* AQI Status */}
      <div className={`${aqiInfo.bgColor} rounded-lg p-6 text-center`}>
        <IconComponent className={`text-4xl ${aqiInfo.color} mx-auto mb-3`} />
        <div className={`text-3xl font-bold ${aqiInfo.color} mb-2`}>
          {aqiInfo.label}
        </div>
        <div className="text-gray-600">AQI Level {aqi}</div>
      </div>

      {/* Simple message if not good */}
      {aqi >= 3 && (
        <div className="mt-4 p-3 bg-orange-50 rounded text-center">
          <p className="text-sm text-orange-700">
            Air quality may affect health. Consider limiting outdoor activities.
          </p>
        </div>
      )}
    </div>
  );
};

export default AirQuality;